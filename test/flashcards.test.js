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
  'js/modes/flashcards.js'
].forEach(load);

const S = B850.store;
B850.data = S.normalise();
B850.state = S.load();
B850.ui.init();
B850.screens.learn.render();

const chips = env.main.querySelectorAll('.chip');
const allChip = chips.find(function (chip) { return chip.textContent === 'All 850'; });
const generalChip = chips.find(function (chip) {
  return chip.getAttribute('aria-label') === 'Things — General, 400 words';
});
const picturableChip = chips.find(function (chip) {
  return chip.getAttribute('aria-label') === 'Things — Picturable, 200 words';
});

assert(allChip && generalChip && picturableChip, 'Learn renders all expected category chips');

generalChip.click();
assert.strictEqual(generalChip.getAttribute('aria-pressed'), 'true');
assert.strictEqual(allChip.getAttribute('aria-pressed'), 'false');

picturableChip.click();
assert.strictEqual(generalChip.getAttribute('aria-pressed'), 'false');
assert.strictEqual(picturableChip.getAttribute('aria-pressed'), 'true');

allChip.click();
assert.strictEqual(allChip.getAttribute('aria-pressed'), 'true');
assert.strictEqual(picturableChip.getAttribute('aria-pressed'), 'false');

const shuffleInputs = [];
S.shuffle = function (ids) {
  shuffleInputs.push(ids.slice());
  return ids.slice();
};

generalChip.click();

assert.strictEqual(shuffleInputs[0].length, 400, 'selected Things — General deck contains 400 words');
assert.deepStrictEqual(shuffleInputs[0], S.data.byCategory.things_general);
assert.strictEqual(env.main.querySelector('.fc-meta .pill').textContent, 'Things — General');
assert.strictEqual(env.main.querySelector('.q-count').textContent, '1/400');
assert.strictEqual(B850.state.lastMode.params.category, 'things_general');

B850.screens.learn.render();
let startButton = null;
env.main.walk(function (el) {
  if (el.getAttribute('aria-label') === 'Start flashcards') { startButton = el; }
});
assert(startButton, 'Learn renders the start-flashcards button for all words');
startButton.click();
assert.strictEqual(shuffleInputs[2].length, 850, 'Start flashcards still starts the all-words deck');
assert.strictEqual(env.main.querySelector('.q-count').textContent, '1/850');

console.log('Flashcard category selection tests passed.');
