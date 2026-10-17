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
chk(listed.length === 48, 'index.html lists 47 topic files + index.js', listed.length);
chk(listed[listed.length - 1] === 'index.js', 'index.js is loaded last', listed[listed.length - 1]);
chk(listed.length - 1 === onDisk.length - 1, 'every file on disk is listed', onDisk.length);
const missing = onDisk.filter(function (f) { return listed.indexOf(f) === -1; });
chk(missing.length === 0, 'no data/grammar file is missing from index.html', missing.join(', '));
const dupes = listed.filter(function (f, i) { return listed.indexOf(f) !== i; });
chk(dupes.length === 0, 'no duplicated script tags', dupes.join(', '));

// ---- 2. load data in the page's order, then the app modules
load('data/words.js');
listed.forEach(function (f) { load('data/grammar/' + f); });
['js/store.js', 'js/srs.js', 'js/speech.js', 'js/modes/common.js', 'js/modes/home.js',
 'js/modes/grammar.js', 'js/modes/stats.js'].forEach(load);

const S = B850.store;
B850.data = S.normalise();
B850.state = S.load();
B850.ui.init();
B850.ui.navigate = function (name, params) { B850.screens[name].render(params); };

chk(typeof GRAMMAR_TOPICS !== 'undefined' && GRAMMAR_TOPICS.length === 47, 'registry holds 47 topics', typeof GRAMMAR_TOPICS !== 'undefined' ? GRAMMAR_TOPICS.length : 'missing');
chk(grammarTopics.length === 47, 'grammarTopics rebuilt with 47 entries', grammarTopics.length);
chk(grammarExercises.length === 47, 'grammarExercises rebuilt with 47 entries', grammarExercises.length);
chk(B850.data.total === 850, 'word dataset still 850', B850.data.total);

// ---- 3. per-topic detail
const dev = /[\u0900-\u097F]/;
let ex5 = 0, q10 = 0, pts3 = 0, hi = 0, idsOk = 0;
grammarTopics.forEach(function (t) {
  if (t.id >= 1 && t.id <= 47) { idsOk += 1; }
  if (dev.test(t.explanationHindi || '')) { hi += 1; }
  if ((t.points || []).length === 3) { pts3 += 1; }
});
grammarExercises.forEach(function (c) {
  if ((c.examples || []).length === 5) { ex5 += 1; }
  if ((c.exercises || []).length === 10) { q10 += 1; }
});
chk(hi === 47, 'every topic has a Hindi explanation', hi);
chk(pts3 === 47, 'every topic has 3 key points', pts3);
chk(ex5 === 47, 'every topic has 5 examples', ex5);
chk(q10 === 47, 'every topic has 10 exercises', q10);
chk(idsOk === 47, 'topic ids 1..47 present', idsOk);
const totalQ = grammarExercises.reduce(function (a, c) { return a + c.exercises.length; }, 0);
chk(totalQ === 470, '470 exercises in total', totalQ);
let rulesOk = 0;
grammarTopics.forEach(function (t) { if (t.rules && t.rules.pattern && (t.rules.forms || []).length === 3) { rulesOk += 1; } });
chk(rulesOk === 47, 'every topic has a rule block with 3 forms', rulesOk);

// ---- 4. levels view
let err = null;
try { B850.screens.grammar.render({}); } catch (e) { err = e; }
chk(!err, 'levels view renders', err && err.message);
chk(env.main.querySelectorAll('.topic-row').length === 47, '47 topic rows', env.main.querySelectorAll('.topic-row').length);
chk(env.main.querySelectorAll('.level-head').length === 5, '5 level sections', env.main.querySelectorAll('.level-head').length);

// ---- 5. topic view with the new detail
err = null;
try { B850.screens.grammar.render({ view: 'topic', id: 19 }); } catch (e) { err = e; }
chk(!err, 'topic view renders', err && err.message);
const title = env.main.querySelector('.q-title');
chk(title && title.textContent === 'Simple Present', 'topic title', title ? title.textContent : 'none');
chk(env.main.querySelectorAll('.gr-ex').length === 5, '5 examples rendered', env.main.querySelectorAll('.gr-ex').length);
chk(!!env.main.querySelector('.gr-help'), 'Hindi explanation card rendered');
chk(env.main.querySelectorAll('.gr-points li').length === 3, '3 rule points rendered', env.main.querySelectorAll('.gr-points li').length);
chk(!!env.main.querySelector('.gr-rule'), 'rule card rendered');
chk(env.main.querySelectorAll('.gr-form').length === 3, '3 rule forms rendered', env.main.querySelectorAll('.gr-form').length);

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

// ---- 7. stats block
B850.state.grammar = {
  19: { seen: 5, correct: 4, wrong: 1, last: S.todayStr(), done: false },
  20: { seen: 6, correct: 6, wrong: 0, last: S.todayStr(), done: true }
};
err = null;
try { B850.screens.stats.render(); } catch (e) { err = e; }
chk(!err, 'stats renders', err && err.message);
const names = env.main.querySelectorAll('.cat-name').map(function (n) { return n.textContent; });
chk(names.filter(function (n) { return n.indexOf('Level ') === 0; }).length === 5, 'stats shows 5 grammar level rows');
chk(names.filter(function (n) { return /Operations|Things|Qualities/.test(n); }).length === 5, 'stats still shows 5 word categories');
const summary = env.main.querySelectorAll('.screen-sub').map(function (n) { return n.textContent; })
  .filter(function (t) { return t.indexOf('Topics done') === 0; })[0] || '';
chk(summary.indexOf('Topics done 1/47') !== -1, 'stats summary reports topics done', summary);

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
  chk(texts.join(' ').indexOf('47 topics') !== -1, 'card describes the course', texts.join(' | '));
}

// ---- 9. legacy save migration
env.storage['b850:v1'] = JSON.stringify({ version: 1, xp: 42, settings: { langFirst: 'hindi', voiceURI: '', rate: 0.9, sound: false, goal: 20 }, answers: { total: 5, correct: 3 }, daily: { date: S.todayStr(), count: 2 }, streak: { count: 1, lastDate: S.todayStr() }, seen: { 1: 1 }, learned: { 1: 1 }, sessions: {}, accuracy: {}, srs: {}, lastMode: { mode: 'quiz' }, updatedAt: 1 });
const legacy = S.load();
chk(legacy.xp === 42 && legacy.grammar && Object.keys(legacy.grammar).length === 0, 'legacy save migrates', 'xp=' + legacy.xp);
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
