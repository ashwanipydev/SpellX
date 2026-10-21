'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const shim = require('./dom-shim.js');

const ws = path.resolve(__dirname, '..');
const env = shim.install();

function load(rel) {
  vm.runInThisContext(fs.readFileSync(path.join(ws, rel), 'utf8'), { filename: rel });
}

[
  'data/words.js',
  'js/store.js',
  'js/srs.js',
  'js/speech.js',
  'js/modes/common.js',
  'js/modes/spelling.js'
].forEach(load);

const S = B850.store;
B850.data = S.normalise();
B850.state = S.load();
let keydownHandler = null;
env.doc.addEventListener = function (eventName, handler) {
  if (eventName === 'keydown') { keydownHandler = handler; }
};
B850.ui.init();
S.shuffle = function (items) { return items.slice(); };

const sample = Object.assign({}, S.data.words[0], {
  id: 9001,
  word: 'cat',
  base: 'cat',
  variants: ['cat'],
  difficulty: 3,
  pronunciation: 'kat',
  meaningHindi: 'बिल्ली',
  meaningEnglish: 'a small animal',
  exampleSentence: 'The cat sat on the mat.',
  exampleHindi: 'बिल्ली चटाई पर बैठी।'
});
S.data.words = [sample];
S.data.byId = { 9001: sample };
S.state.seen = {};
S.state.learned = {};
S.state.srs = {};

function buttonByLabel(label) {
  let result = null;
  env.main.walk(function (element) {
    if (element.getAttribute('aria-label') === label) { result = element; }
  });
  return result;
}

function buttonByText(text) {
  return env.main.querySelectorAll('button').find(function (element) {
    return element.textContent === text;
  }) || null;
}

function startMode(mode) {
  B850.screens.spelling.render();
  const start = buttonByLabel(mode === 'timed' ? 'Start timed challenge' : 'Start relaxed practice');
  assert(start, 'mode picker offers ' + mode + ' practice');
  start.click();
}

const originalSetInterval = global.setInterval;
const originalClearInterval = global.clearInterval;
let tick;
global.setInterval = function (callback) { tick = callback; return 17; };
global.clearInterval = function () {};

startMode('timed');
assert(env.main.querySelector('.sp-bonus'), 'timed challenge displays the bonus timer');
assert(env.main.querySelectorAll('.tile').length > 0, 'timed challenge starts a spelling round');
for (let i = 0; i < 60; i++) { tick(); }
assert(env.main.querySelector('.sp-bonus-txt').textContent.indexOf('keep playing') !== -1,
  'timer expiry ends the bonus but leaves the round playable');
assert(env.main.querySelectorAll('.tile').length > 0, 'tiles remain available after bonus time expires');
buttonByLabel('End spelling session').click();
assert(env.main.querySelector('.sp-summary').textContent.indexOf('Timed challenge') !== -1,
  'session summary identifies the selected mode');
assert(env.main.querySelector('.sp-summary').textContent.indexOf('1 of 1 words attempted') !== -1,
  'summary counts a word as attempted once it is shown');

startMode('relaxed');
assert.strictEqual(env.main.querySelector('.sp-bonus'), null, 'relaxed practice has no timer');
assert.strictEqual(env.main.querySelector('.sp-word-length').textContent, '3 letters',
  'round displays the target word length');
assert(env.main.querySelector('.sp-session-progress'), 'round displays session progress');

function clickLetter(letter) {
  const button = buttonByLabel('Letter ' + letter.toUpperCase());
  assert(button, 'letter tile ' + letter + ' is available');
  button.click();
}

clickLetter('a');
clickLetter('c');
clickLetter('t');
assert(env.main.querySelector('.sp-feedback'), 'incorrect completed spelling shows feedback');
assert.strictEqual(env.main.querySelectorAll('.slot.correct').length, 1,
  'first miss preserves and marks correctly positioned letters');
assert.strictEqual(env.main.querySelectorAll('.tile').length, 5,
  'incorrect letters return to the tray for another attempt');

clickLetter('a');
clickLetter('c');
assert.strictEqual(S.state.srs[9001].lapses, 1, 'two incorrect completed spellings add the word to Review');
clickLetter('c');
clickLetter('a');
assert(env.main.querySelector('.sp-success'), 'learner can retry and solve after position feedback');
buttonByText('Next word').click();
assert(env.main.querySelector('.sp-summary'), 'completed round displays a session summary');
assert(env.main.querySelector('.sp-summary').textContent.indexOf('1 solved') !== -1,
  'summary counts solved words');
assert(env.main.querySelectorAll('.sp-summary-stat').some(function (item) {
  return item.textContent.indexOf('Added to Review') !== -1 && item.textContent.indexOf('1') !== -1;
}),
  'summary counts words sent to Review');

startMode('relaxed');
buttonByLabel('Show the answer (free, no XP)').click();
assert(env.main.querySelector('.sp-success'), 'show-word action reveals the answer');
buttonByText('Next word').click();
assert(env.main.querySelectorAll('.sp-summary-stat').some(function (item) {
  return item.textContent.indexOf('Revealed') !== -1 && item.textContent.indexOf('1') !== -1;
}),
  'summary counts revealed words separately from solved words');

startMode('relaxed');
clickLetter('a');
buttonByLabel('First letter, costs 5 XP').click();
assert.strictEqual(env.main.querySelector('.slot-letter').textContent, 'A',
  'first-letter hint does not overwrite a letter already placed');
assert.strictEqual(env.main.querySelector('.slot').classList.contains('correct'), false,
  'first-letter hint does not lock an incorrect letter in place');
env.main.querySelector('.slot').click();
assert.strictEqual(env.main.querySelector('.slot-letter').textContent, 'C',
  'first-letter hint appears once the occupied slot is cleared');
buttonByLabel('End spelling session').click();

startMode('relaxed');
['c', 'a', 't'].forEach(function (key) {
  keydownHandler({ key: key, preventDefault: function () {} });
});
assert(env.main.querySelector('.sp-success'), 'physical keyboard input remains supported');

global.setInterval = originalSetInterval;
global.clearInterval = originalClearInterval;
console.log('Spelling redesign tests passed.');
