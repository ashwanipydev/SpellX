// One suite for the whole grammar course. Loads exactly the files index.html
// lists, so a missing or unlisted topic file fails the build.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const shim = require('./dom-shim.js');

const ws = path.resolve(__dirname, '..');
const env = shim.install();

// stats.js touches firstChild on an SVG node
Object.defineProperty(shim.Element.prototype, 'firstChild', {
  get: function () { return this.children.length ? this.children[0] : null; },
  configurable: true
});

const results = [];
function chk(cond, msg, extra) {
  results.push({ pass: !!cond, msg: msg, extra: extra });
}
function load(rel) {
  vm.runInThisContext(fs.readFileSync(path.join(ws, rel), 'utf8'), { filename: rel });
}

// ---- 1. index.html must list the split data files, in id order, plus index.js
const html = fs.readFileSync(path.join(ws, 'index.html'), 'utf8');
const listed = [];
const re = /<script src="(data\/grammar\/[^"]+)"><\/script>/g;
let m;
while ((m = re.exec(html))) { listed.push(m[1].replace('data/grammar/', '')); }

const onDisk = fs.readdirSync(path.join(ws, 'data', 'grammar')).filter(function (f) { return /\.js$/.test(f); }).sort();
chk(listed.length === 58, 'index.html lists all grammar data, tutor prompts and story scenes', listed.length);
chk(listed[listed.length - 1] === 'index.js', 'index.js is loaded last', listed[listed.length - 1]);
chk(listed[listed.length - 2] === 'story-scenes.js', 'story scenes load before the derived course index');
chk(fs.readFileSync(path.join(ws, 'sw.js'), 'utf8').indexOf('story-scenes.js') !== -1,
  'service worker precaches the connected story data');
chk(fs.readFileSync(path.join(ws, 'sw.js'), 'utf8').indexOf('ai-practice-prompts.js') !== -1,
  'service worker precaches AI practice prompts');
chk(listed.length - 1 === onDisk.length - 1, 'every file on disk is listed', onDisk.length);
const missing = onDisk.filter(function (f) { return listed.indexOf(f) === -1; });
chk(missing.length === 0, 'no data/grammar file is missing from index.html', missing.join(', '));
const dupes = listed.filter(function (f, i) { return listed.indexOf(f) !== i; });
chk(dupes.length === 0, 'no duplicated script tags', dupes.join(', '));

// ---- 2. load data in the page's order, then the app modules
load('data/words.js');
listed.forEach(function (f) { load('data/grammar/' + f); });
['js/store.js', 'js/srs.js', 'js/speech.js', 'js/modes/common.js', 'js/modes/home.js',
 'js/modes/grammar.js', 'js/modes/settings.js', 'js/modes/stats.js'].forEach(load);

const S = B850.store;
B850.data = S.normalise();
B850.state = S.load();
B850.ui.init();
B850.ui.navigate = function (name, params) { B850.screens[name].render(params); };

chk(typeof GRAMMAR_TOPICS !== 'undefined' && GRAMMAR_TOPICS.length === 53, 'registry holds 53 topics', typeof GRAMMAR_TOPICS !== 'undefined' ? GRAMMAR_TOPICS.length : 'missing');
chk(grammarTopics.length === 53, 'grammarTopics rebuilt with 53 entries', grammarTopics.length);
chk(grammarExercises.length === 53, 'grammarExercises rebuilt with 53 entries', grammarExercises.length);
chk(Object.keys(GRAMMAR_AI_PRACTICE_PROMPTS).length === 53, 'AI tutor scenarios cover all 53 lessons',
  Object.keys(GRAMMAR_AI_PRACTICE_PROMPTS).length);
chk(Object.keys(GRAMMAR_AI_PRACTICE_PROMPTS).every(function (id) {
  const plan = GRAMMAR_AI_PRACTICE_PROMPTS[id];
  return plan && plan.situation && Array.isArray(plan.activities) && plan.activities.length >= 3;
}), 'every lesson prompt has a real-world scenario and varied activity ideas');
chk(B850.data.total === 850, 'word dataset still 850', B850.data.total);
chk(B850.state.settings.showGrammarHindi === false, 'reviewed Hindi help defaults to hidden');

// ---- 3. per-topic detail
let ex5 = 0, q10 = 0, pts3 = 0, unreviewedHindi = 0, idsOk = 0;
grammarTopics.forEach(function (t) {
  if (t.id >= 1 && t.id <= 53) { idsOk += 1; }
  if (t.explanationHindi && t.hindiReviewed !== true) { unreviewedHindi += 1; }
  if ((t.points || []).length === 3) { pts3 += 1; }
});
grammarExercises.forEach(function (c) {
  if ((c.examples || []).length === 5) { ex5 += 1; }
  if ((c.exercises || []).length === 10) { q10 += 1; }
});
chk(unreviewedHindi === 52, 'only the reviewed Hindi topic is approved for display', unreviewedHindi);
chk(pts3 === 53, 'every topic has 3 key points', pts3);
chk(ex5 === 53, 'every topic has 5 examples', ex5);
chk(q10 === 53, 'every topic has 10 exercises', q10);
chk(idsOk === 53, 'topic ids 1..53 present', idsOk);
chk(grammarTopics.every(function (t) {
  return typeof t.aiPracticePrompt === 'string' && t.aiPracticePrompt.length > 500 &&
    t.aiPracticePrompt.indexOf("WHAT THIS LESSON TEACHES: " + t.summary) !== -1 &&
    t.aiPracticePrompt.indexOf("SKILLS TO DEVELOP:") !== -1 &&
    t.aiPracticePrompt.indexOf("REAL-WORLD PRACTICE SETTING:") !== -1 &&
    t.aiPracticePrompt.indexOf("exactly one question") !== -1 &&
    t.aiPracticePrompt.indexOf("Wait for my answer") !== -1 &&
    t.aiPracticePrompt.indexOf("If I struggle repeatedly") !== -1 &&
    t.aiPracticePrompt.indexOf("At the end, summarize") !== -1 &&
    t.aiPracticePrompt.indexOf("correct") !== -1;
}), 'every lesson prompt explains its goals, real-world practice and tutor feedback behavior');
const totalQ = grammarExercises.reduce(function (a, c) { return a + c.exercises.length; }, 0);
chk(totalQ === 530, '530 exercises in total', totalQ);
const storyLinkedExercises = grammarExercises.reduce(function (count, c) {
  const story = GRAMMAR_STORY_SCENES[c.topicId];
  return count + (story && Array.isArray(story.scene) && c.exercises.every(function (exercise) {
    return story.scene.some(function (line) { return line.en === exercise.storyContext; });
  }) ? c.exercises.length : 0);
}, 0);
chk(storyLinkedExercises === 530, 'every grammar exercise links to a line from its topic story', storyLinkedExercises);
let rulesOk = 0;
grammarTopics.forEach(function (t) { if (t.rules && t.rules.pattern && (t.rules.forms || []).length === 3) { rulesOk += 1; } });
chk(rulesOk === 53, 'every topic has a rule block with 3 forms', rulesOk);

// ---- 3b. story + why fields
let storyOk = 0, chOk = 0, whyOk = 0;
grammarTopics.forEach(function (t) {
  const story = GRAMMAR_STORY_SCENES[t.id];
  if (t.storyReviewed && story && story.lessonId === t.id && story.reviewed === true &&
      story.ruleFocus && Array.isArray(t.storyScene) && t.storyScene.length >= 4 &&
      t.storyScene.length <= 6 && t.storyScene.every(function (l) { return l.en && !l.hi; }) &&
      t.storyRecap && t.storyRecap.en) { storyOk += 1; }
  if (typeof t.chapter === 'number' && typeof t.chapterTitle === 'string') { chOk += 1; }
  if (t.whyRule && t.whyRule.en) { whyOk += 1; }
});
chk(storyOk === 53, 'all lessons have reviewed, concise, English-only story scenes and recaps', storyOk);
chk(Object.keys(GRAMMAR_STORY_SCENES).length === 53, 'story data covers exactly the 53 lesson ids');
chk(grammarTopics.every(function (t) {
  return GRAMMAR_STORY_SCENES[t.id] && GRAMMAR_STORY_SCENES[t.id].ruleFocus;
}), 'every story declares the grammar point it is written to demonstrate');
const storyExamples = {
  19: "opens each Saturday",
  20: "I am arranging the books",
  21: "We opened the doors at ten",
  22: "I was carrying the boxes",
  23: "We will add a second session",
  24: "will be choosing their books",
  25: "We have welcomed forty families",
  26: "had already chosen their books",
  27: "will have listed all the books",
  41: "First, Meera found a torch"
};
chk(Object.keys(storyExamples).every(function (id) {
  return GRAMMAR_STORY_SCENES[id].scene.some(function (line) {
    return line.en.indexOf(storyExamples[id]) !== -1;
  });
}), 'tense and narrative lessons demonstrate their target forms in context');
chk(chOk === 53, 'every topic has chapter + chapterTitle', chOk);
chk(whyOk === 53, 'every topic has an English whyRule', whyOk);

// ---- 4. levels view
let err = null;
try { B850.screens.grammar.render({}); } catch (e) { err = e; }
chk(!err, 'levels view renders', err && err.message);
chk(env.main.querySelectorAll('.topic-row').length === 53, '53 topic rows', env.main.querySelectorAll('.topic-row').length);
chk(env.main.querySelectorAll('.level-head').length === 7, '7 curriculum sections', env.main.querySelectorAll('.level-head').length);
chk(env.main.querySelectorAll('.book-ch-intro').length === 7, '7 chapter intros rendered', env.main.querySelectorAll('.book-ch-intro').length);
chk(env.main.querySelectorAll('.book-ch-intro-hi').length === 0, 'unreviewed Hindi chapter intros stay hidden', env.main.querySelectorAll('.book-ch-intro-hi').length);
chk(env.main.querySelectorAll('.topic-num').length === 53, '53 numbered topic rows', env.main.querySelectorAll('.topic-num').length);
chk(env.main.querySelector('.topic-num').textContent === '0.1', 'chapter numbering follows the stored 0–6 structure');
chk(env.main.querySelector('.screen-sub').textContent.indexOf('53 topics across 7 sections') !== -1, 'course count matches topic and section data');

// ---- 5. topic view with the new detail
err = null;
try { B850.screens.grammar.render({ view: 'topic', id: 19 }); } catch (e) { err = e; }
chk(!err, 'topic view renders', err && err.message);
const title = env.main.querySelector('.q-title');
chk(title && title.textContent === 'Simple Present', 'topic title', title ? title.textContent : 'none');
chk(env.main.querySelectorAll('.gr-ex').length === 5, '5 examples rendered', env.main.querySelectorAll('.gr-ex').length);
chk(!!env.main.querySelector('.gr-help'), 'English key-points card rendered');
chk(env.main.querySelectorAll('.gr-help-hi').length === 0, 'unreviewed Hindi explanations and tips stay hidden');
chk(env.main.querySelectorAll('.gr-points li').length === 3, '3 rule points rendered', env.main.querySelectorAll('.gr-points li').length);
chk(!!env.main.querySelector('.gr-rule'), 'rule card rendered');
chk(env.main.querySelectorAll('.gr-form').length === 3, '3 rule forms rendered', env.main.querySelectorAll('.gr-form').length);
chk(!!env.main.querySelector('.gr-story'), 'revised story renders for topic 19');
chk(env.main.querySelectorAll('.gr-story-line').length >= 4, 'simple present story scene has four lines');
chk(env.main.querySelector('.gr-story').textContent.indexOf('opens each Saturday') !== -1,
  'simple present story demonstrates a recurring routine');
chk(!env.main.querySelector('.gr-why'), 'unreviewed historical note is withheld for topic 19');
chk(!env.main.querySelector('.gr-why-hi'), 'unreviewed Hindi why text stays hidden');
chk(env.main.querySelectorAll('.gr-ex-hi').length === 0, 'unreviewed Hindi example translations stay hidden');
const aiPrompt = env.main.querySelector('.gr-ai-prompt-text');
chk(!!aiPrompt && aiPrompt.value.indexOf('Simple Present') !== -1,
  'topic lesson displays its tailored AI tutor prompt');
chk(!!aiPrompt && aiPrompt.hasAttribute('readonly'),
  'AI tutor prompt is available as selectable text');
const copyPrompt = env.main.querySelector('.gr-ai-prompt-actions button');
chk(!!copyPrompt && copyPrompt.textContent === 'Copy AI tutor prompt', 'lesson offers a prompt copy action');
if (copyPrompt) {
  copyPrompt.click();
  chk(env.main.querySelector('.gr-ai-prompt-status').textContent.indexOf('copy it') !== -1,
    'copy action explains manual copying when clipboard access is unavailable');
}

B850.screens.grammar.render({ view: 'topic', id: 10 });
chk(!!env.main.querySelector('.gr-story'), 'audited story card renders for topic 10');
chk(env.main.querySelectorAll('.gr-story-line').length >= 4, 'audited story has at least four English lines');
chk(env.main.querySelectorAll('.gr-ex-hi').length === 0, 'reviewed Hindi remains hidden by default');

B850.screens.settings.render();
const hindiHelpSwitch = env.main.querySelectorAll('.switch')[0];
chk(!!hindiHelpSwitch, 'settings offers a Hindi grammar help preference');
chk(hindiHelpSwitch && hindiHelpSwitch.getAttribute('aria-checked') === 'false', 'Hindi help switch starts off');
if (hindiHelpSwitch) { hindiHelpSwitch.click(); }
chk(B850.state.settings.showGrammarHindi === true, 'Hindi grammar preference persists when enabled');
B850.screens.grammar.render({ view: 'topic', id: 10 });
chk(env.main.querySelectorAll('.gr-ex-hi').length === 5, 'reviewed example translations appear when enabled');
chk(!!env.main.querySelector('.gr-help-hi') && !env.main.querySelector('.gr-story-hi'),
  'reviewed Hindi explanations appear while unrevised story translations stay absent');
B850.screens.grammar.render({ view: 'topic', id: 19 });
chk(env.main.querySelectorAll('.gr-help-hi').length === 0, 'enabling Hindi does not expose unreviewed content');
S.state.settings.showGrammarHindi = false;
S.save(S.state);

B850.screens.grammar.render({ view: 'topic', id: 28 });
chk(env.main.querySelectorAll('.kw-chip.linked').length >= 3, 'keywords still cross-link to the word deck', env.main.querySelectorAll('.kw-chip.linked').length);
B850.screens.grammar.render({ view: 'topic', id: 18 });
chk(env.main.querySelectorAll('.gr-reference-item').length === 24, 'modal guide renders modal entries, mistakes and email references', env.main.querySelectorAll('.gr-reference-item').length);
chk(env.main.querySelectorAll('.gr-guide-list li').length === 24, 'modal guide renders politeness levels and 20 office sentences', env.main.querySelectorAll('.gr-guide-list li').length);
B850.screens.grammar.render({ view: 'topic', id: 46 });
chk(env.main.querySelectorAll('.gr-verb-table').length === 5, 'V1/V2/V3 lesson renders five verb groups', env.main.querySelectorAll('.gr-verb-table').length);
chk(env.main.querySelectorAll('.gr-verb-table tbody tr').length === 76, 'V1/V2/V3 lesson includes 74 verbs and two be forms', env.main.querySelectorAll('.gr-verb-table tbody tr').length);
chk(env.main.querySelectorAll('.gr-reference-item').length === 17, 'V2 study guide renders ten mistakes and seven study-plan days', env.main.querySelectorAll('.gr-reference-item').length);
B850.screens.grammar.render({ view: 'topic', id: 47 });
chk(env.main.querySelector('.q-title').textContent === 'English Pronunciation', 'pronunciation topic is titled correctly');
chk(env.main.querySelectorAll('.gr-reference-item').length === 26, 'pronunciation guide renders syllables, stress and suffix patterns', env.main.querySelectorAll('.gr-reference-item').length);
chk(env.main.querySelectorAll('.gr-guide-list li').length === 14, 'pronunciation guide renders four steps and ten revision notes', env.main.querySelectorAll('.gr-guide-list li').length);
chk(env.main.querySelectorAll('.gr-ex').length === 5, 'pronunciation topic renders five examples', env.main.querySelectorAll('.gr-ex').length);

// ---- 6. practice: answer one item and check state
err = null;
let clickable = null;
try {
  B850.screens.grammar.render({ view: 'practice', id: 19 });
  clickable = env.main.querySelector('.option') || env.main.querySelector('.gr-word');
} catch (e) { err = e; }
chk(!err, 'practice view renders', err && err.message);
chk(!!clickable, 'practice offers an answer control');
const practiceStory = env.main.querySelector('.gr-practice-story');
chk(!!practiceStory, 'practice question shows its Ravi story context');
chk(!!practiceStory && practiceStory.textContent.indexOf('From Ravi’s story') !== -1,
  'practice story context explains its connection to the rule');
if (clickable) {
  const before = B850.state.answers.total;
  const opt = env.main.querySelector('.option');
  if (opt) { opt.click(); } else {
    let guard = 0;
    while (guard++ < 60) {
      const next = env.main.querySelectorAll('.gr-tray .gr-word').filter(function (w) { return !w.classList.contains('used'); })[0];
      if (!next) { break; }
      next.click();
    }
    const check = env.main.querySelectorAll('.btn').filter(function (b) { return b.textContent === 'Check'; })[0];
    if (check) { check.click(); }
  }
  chk(B850.state.answers.total === before + 1, 'answer recorded', before + ' -> ' + B850.state.answers.total);
  const saved = env.storage['b850:v1'] || '';
  chk(saved.indexOf('"grammar"') !== -1, 'grammar progress persisted');
}
B850.screens.grammar.render({ view: 'practice', id: 10 });
const productionInput = env.main.querySelector('.gr-production-input');
chk(!!productionInput, 'early grammar practice includes a sentence-production task');
chk(!!env.main.querySelector('.gr-practice-story'), 'sentence-production task includes its Ravi story context');
const productionButtons = env.main.querySelectorAll('.btn');
const showExample = productionButtons.filter(function (b) { return b.textContent === 'Show an example'; })[0];
const canDoIt = productionButtons.filter(function (b) { return b.textContent === 'I can do this'; })[0];
chk(!!showExample && !!canDoIt, 'production task offers an optional model and self-assessment');
if (showExample && canDoIt && productionInput) {
  showExample.click();
  chk(env.main.querySelector('.gr-sentence-2').style.display === 'block', 'model answer can be revealed on demand');
  const beforeProduction = B850.state.answers.total;
  canDoIt.click();
  chk(B850.state.answers.total === beforeProduction, 'production task requires learner input before self-rating');
  productionInput.value = 'I am learning English.';
  canDoIt.click();
  chk(B850.state.answers.total === beforeProduction + 1, 'self-rated production task records practice');
}
chk(grammarExercises.filter(function (c) { return c.topicId === 10 || c.topicId === 15 || c.topicId === 36 || c.topicId === 43; })
  .every(function (c) { return c.exercises.some(function (e) { return e.type === 'produce'; }); }),
  'communication production tasks appear in early and applied lessons');

// ---- 7. stats block
B850.state.grammar = {
  19: { seen: 5, correct: 4, wrong: 1, last: S.todayStr(), done: false },
  20: { seen: 6, correct: 6, wrong: 0, last: S.todayStr(), done: true }
};
err = null;
try { B850.screens.stats.render(); } catch (e) { err = e; }
chk(!err, 'stats renders', err && err.message);
const names = env.main.querySelectorAll('.cat-name').map(function (n) { return n.textContent; });
chk(names.filter(function (n) { return n.indexOf('Ch ') === 0; }).length === 7, 'stats shows 7 grammar chapter rows');
chk(names.filter(function (n) { return /Operations|Things|Qualities/.test(n); }).length === 5, 'stats still shows 5 word categories');
const summary = env.main.querySelectorAll('.screen-sub').map(function (n) { return n.textContent; })
  .filter(function (t) { return t.indexOf('Topics done') === 0; })[0] || '';
chk(summary.indexOf('Topics done 1/53') !== -1, 'stats summary reports topics done', summary);

// ---- 8. home card
err = null;
try { B850.screens.home.render(); } catch (e) { err = e; }
chk(!err, 'home renders', err && err.message);
const grammarCard = env.main.querySelectorAll('.mode-card').filter(function (c) {
  return c.querySelectorAll('.mode-name').some(function (n) { return n.textContent === 'Grammar'; });
})[0];
chk(!!grammarCard, 'home shows the Grammar card');
if (grammarCard) {
  const texts = grammarCard.querySelectorAll('.mode-desc').map(function (d) { return d.textContent; });
  chk(texts.join(' ').indexOf('53 topics') !== -1, 'card describes the course', texts.join(' | '));
  chk(texts.some(function (t) { return /\/53 done$/.test(t); }), 'home progress uses the current topic total', texts.join(' | '));
}

// ---- 9. legacy save migration
env.storage['b850:v1'] = JSON.stringify({ version: 1, xp: 42, settings: { langFirst: 'hindi', voiceURI: '', rate: 0.9, sound: false, goal: 20 }, answers: { total: 5, correct: 3 }, daily: { date: S.todayStr(), count: 2 }, streak: { count: 1, lastDate: S.todayStr() }, seen: { 1: 1 }, learned: { 1: 1 }, sessions: {}, accuracy: {}, srs: {}, lastMode: { mode: 'quiz' }, updatedAt: 1 });
const legacy = S.load();
chk(legacy.xp === 42 && legacy.grammar && Object.keys(legacy.grammar).length === 0, 'legacy save migrates', 'xp=' + legacy.xp);
chk(legacy.settings.showGrammarHindi === false, 'legacy saves migrate with Hindi help hidden');
B850.state = legacy;
err = null;
try { B850.screens.grammar.render({}); } catch (e) { err = e; }
chk(!err, 'levels render on a migrated save', err && err.message);

// ---- report
results.forEach(function (r) {
  console.log((r.pass ? 'PASS  ' : 'FAIL  ') + r.msg + (r.extra !== undefined ? '  [' + r.extra + ']' : ''));
});
const fails = results.filter(function (r) { return !r.pass; }).length;
console.log('\n' + (results.length - fails) + '/' + results.length + ' passed');
process.exit(fails ? 1 : 0);
