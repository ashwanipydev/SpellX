'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const shim = require('./dom-shim.js');

const ws = path.resolve(__dirname, '..');
const env = shim.install();
Object.defineProperty(shim.Element.prototype, 'firstChild', {
  get: function () { return this.children.length ? this.children[0] : null; },
  configurable: true
});
function load(rel) {
  vm.runInThisContext(fs.readFileSync(path.join(ws, rel), 'utf8'), { filename: rel });
}
[
  'data/words.js',
  'data/reading.js',
  'js/store.js',
  'js/srs.js',
  'js/speech.js',
  'js/modes/common.js',
  'js/modes/home.js',
  'js/modes/stats.js',
  'js/modes/reading.js'
].forEach(load);

const S = B850.store;
B850.data = S.normalise();
B850.state = S.load();
B850.ui.init();
B850.ui.navigate = function (name, params) {
  B850.screens[name].render(params);
};

const html = fs.readFileSync(path.join(ws, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ws, 'sw.js'), 'utf8');
assert(html.indexOf('data/reading.js') < html.indexOf('js/modes/reading.js'));
assert(html.indexOf('js/modes/reading.js') < html.indexOf('js/app.js'));
assert(sw.indexOf('b850-v14') !== -1);
assert(sw.indexOf('data/reading.js') !== -1 && sw.indexOf('js/modes/reading.js') !== -1);
const precached = new Set(Array.from(sw.matchAll(/"\.\/([^"]+)"/g), function (match) { return match[1]; }));
const scriptPaths = Array.from(html.matchAll(/<script src="([^"]+)"/g), function (match) { return match[1]; });
assert(scriptPaths.every(function (script) { return precached.has(script); }), 'all page scripts are precached');
assert(Array.from(precached).every(function (file) { return fs.existsSync(path.join(ws, file)); }), 'all precache files exist');

const passages = B850.screens.reading.passages();
const uncoveredWords = [];
assert.strictEqual(passages.length, 6, 'six original passages are available');
['beginner', 'intermediate', 'advanced'].forEach(function (level) {
  assert.strictEqual(passages.filter(function (passage) { return passage.level === level; }).length, 2);
});
passages.forEach(function (passage) {
  assert(passage.sentences.length >= 4, passage.id + ' has a short passage');
  assert.strictEqual(passage.activities.length, 4);
  assert.deepStrictEqual(passage.activities.map(function (activity) { return activity.type; }), ['choice', 'fill', 'vocabulary', 'order']);
  passage.sentences.forEach(function (sentence) {
    assert(sentence.translationHi && sentence.simple, passage.id + ' sentence has on-demand help');
    (sentence.text.toLowerCase().match(/[a-z']+/g) || []).forEach(function (word) {
      const gloss = B850.screens.reading.findGloss(passage, word);
      if (!gloss.hindi || gloss.hindi.indexOf('अर्थ उपलब्ध नहीं') !== -1 ||
          !gloss.definition || !gloss.pronunciation || !gloss.example) {
        uncoveredWords.push(passage.id + ':' + word + ' (' + JSON.stringify(gloss) + ')');
      }
    });
    assert.strictEqual(uncoveredWords.length, 0, 'all passage words have offline dictionary entries: ' + uncoveredWords.join('; '));
  });
});

assert.strictEqual(B850.state.reading, undefined, 'legacy/default state remains compatible before Reading is opened');
B850.screens.home.render();
assert(B850.state.reading, 'opening Home safely initializes reading state');
assert(env.main.querySelectorAll('.mode-card').some(function (card) {
  return card.textContent.indexOf('English Reading') !== -1;
}), 'Home provides an English Reading card');

B850.ui.navigate('reading');
assert.strictEqual(env.main.querySelectorAll('.reading-passage-card').length, 2);
const intermediate = env.main.querySelectorAll('.chip').filter(function (button) {
  return button.textContent === 'Intermediate';
})[0];
intermediate.click();
assert.strictEqual(B850.state.reading.level, 'intermediate');
assert.strictEqual(env.main.querySelectorAll('.reading-passage-card').length, 2);

B850.ui.navigate('reading');
const beginner = env.main.querySelectorAll('.chip').filter(function (button) {
  return button.textContent === 'Beginner';
})[0];
beginner.click();
const morning = env.main.querySelectorAll('.reading-passage-card').filter(function (card) {
  return card.textContent.indexOf('A Quiet Morning') !== -1;
})[0];
morning.click();
assert(env.main.textContent.indexOf('Asha gets up early.') !== -1, 'passage sentences are rendered: ' + env.main.textContent);
assert.strictEqual(env.main.querySelectorAll('.reading-sentence').length, 4, 'full passage view shows all sentences');
env.main.querySelectorAll('.chip').filter(function (button) {
  return button.textContent === 'One sentence';
})[0].click();
assert.strictEqual(env.main.querySelectorAll('.reading-sentence').length, 1, 'sentence view shows one sentence at a time');
assert.strictEqual(env.main.querySelector('.reading-step').hidden, false, 'sentence view exposes navigation controls');
env.main.querySelectorAll('.reading-step button').filter(function (button) {
  return button.textContent === 'Next →';
})[0].click();
assert(env.main.textContent.indexOf('She opens the window') !== -1, 'sentence navigation advances through the passage');
env.main.querySelectorAll('.chip').filter(function (button) {
  return button.textContent === 'Full passage';
})[0].click();
assert(env.main.textContent.indexOf('आशा जल्दी उठती है।') === -1, 'Hindi translation is hidden by default');
assert(env.main.textContent.indexOf('Speech recognition is not supported') !== -1, 'unsupported read-aloud feedback is explained');
B850.screens.reading.openTutorPrompt('beginner-morning');
assert(env.doc.getElementById('sheetHost').textContent.indexOf('SpellX does not connect to an AI service') !== -1, 'AI tutor integration stays copy-ready and offline');
assert(env.doc.getElementById('sheetHost').querySelector('textarea').value.indexOf('A Quiet Morning') !== -1);
env.doc.getElementById('sheetHost').querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Close';
})[0].click();

const translation = env.main.querySelectorAll('.reading-help-btn').filter(function (button) {
  return button.textContent === 'Show Hindi translation';
})[0];
translation.click();
assert(env.main.textContent.indexOf('आशा जल्दी उठती है।') !== -1, 'Hindi translation appears on demand');

const early = env.main.querySelectorAll('.reading-word').filter(function (button) {
  return button.textContent.toLowerCase() === 'early';
})[0];
early.click();
assert(env.doc.getElementById('sheetHost').textContent.indexOf('जल्दी') !== -1, 'word lookup shows Hindi meaning');
assert(env.doc.getElementById('sheetHost').textContent.indexOf('Before the usual time.') !== -1, 'word lookup shows simple English definition');
const save = env.doc.getElementById('sheetHost').querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Save word';
})[0];
save.click();
assert(B850.state.reading.savedWords.early, 'word can be saved to personal vocabulary');
env.doc.getElementById('sheetHost').querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Close';
})[0].click();

env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Start comprehension practice';
})[0].click();
env.main.querySelectorAll('.option').filter(function (button) {
  return button.textContent === 'She reads a story.';
})[0].click();
assert.strictEqual(B850.state.lastMode.params.index, 1, 'answered questions resume at the next item');
assert.strictEqual(B850.state.reading.totalAnswered, 1, 'one answer is recorded before navigation');
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Next question →';
})[0].click();
env.main.querySelectorAll('.option').filter(function (button) {
  return button.textContent === 'cool';
})[0].click();
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Next question →';
})[0].click();
env.main.querySelectorAll('.option').filter(function (button) {
  return button.textContent === 'Before the usual time';
})[0].click();
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Next question →';
})[0].click();

const orderTiles = env.main.querySelectorAll('.reading-activity-controls .chip');
['Asha', 'gets', 'up', 'early.'].forEach(function (word) {
  orderTiles.filter(function (button) { return button.textContent === word; })[0].click();
});
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Check sentence';
})[0].click();
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Finish practice';
})[0].click();

assert(env.main.textContent.indexOf('4 / 4') !== -1, 'results report the comprehension score');
assert.strictEqual(B850.state.reading.completed['beginner-morning'].bestScore, 4);
assert.strictEqual(B850.state.reading.completed['beginner-morning'].attempts, 1);
assert.strictEqual(B850.state.reading.totalAnswered, 4);
assert.strictEqual(B850.state.reading.totalCorrect, 4);
assert.strictEqual(B850.state.xp, 48, 'correct reading answers award XP');
assert(JSON.parse(env.storage['b850:v1']).reading.completed['beginner-morning'].done, 'progress persists in the existing save');

B850.screens.stats.render();
assert(env.main.textContent.indexOf('Passages completed') !== -1, 'Stats includes reading progress');

const brandSub = env.doc.createElement('span');
brandSub.setAttribute('id', 'brandSub');
env.doc.body.appendChild(brandSub);
load('js/app.js');
env.main.querySelectorAll('button').filter(function (button) {
  return button.getAttribute('aria-label') === 'Continue learning';
})[0].click();
assert(env.main.textContent.indexOf('Asha gets up early.') !== -1, 'Home Continue resumes the saved reading passage');
function FakeRecognition() {
  FakeRecognition.instances.push(this);
}
FakeRecognition.instances = [];
FakeRecognition.prototype.start = function () { this.started = true; };
FakeRecognition.prototype.abort = function () { this.aborted = true; };
window.SpeechRecognition = FakeRecognition;
B850.ui.navigate('reading', { view: 'passage', id: 'beginner-morning' });
assert.strictEqual(brandSub.textContent, 'Reading', 'app navigation labels the new screen');
env.main.querySelectorAll('button').filter(function (button) {
  return button.textContent === 'Check one sentence';
})[0].click();
assert(FakeRecognition.instances[0].started, 'supported browser speech recognition starts only on request');
FakeRecognition.instances[0].onresult({ results: [[{ transcript: 'Asha gets up early' }]] });
assert(env.main.querySelectorAll('.reading-speaking .screen-sub')[1].textContent.indexOf('4 of 4 words (100%)') !== -1);
B850.ui.navigate('home');
assert(FakeRecognition.instances[0].aborted, 'leaving Reading stops active speech recognition');
window.SpeechRecognition = undefined;
console.log('English Reading tests passed.');
