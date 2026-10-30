"use strict";
var CACHE = "b850-v15";
var SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./css/styles.css",
  "./data/words.js", "./data/reading.js",
  "./data/grammar/ai-practice-prompts.js", "./data/grammar/ch6-write-it-right.js",
  "./data/grammar/chapters.js", "./data/grammar/story-scenes.js", "./data/grammar/index.js",
  "./data/grammar/t01-alphabet-basic-words.js", "./data/grammar/t02-nouns.js",
  "./data/grammar/t03-pronouns.js", "./data/grammar/t04-verbs.js",
  "./data/grammar/t05-adjectives.js", "./data/grammar/t06-adverbs.js",
  "./data/grammar/t07-articles.js", "./data/grammar/t08-singular-plural.js",
  "./data/grammar/t09-this-that-these-those.js", "./data/grammar/t10-am-is-are.js",
  "./data/grammar/t11-subject-predicate.js", "./data/grammar/t12-sentence-structure.js",
  "./data/grammar/t13-positive-sentences.js", "./data/grammar/t14-negative-sentences.js",
  "./data/grammar/t15-question-sentences.js", "./data/grammar/t16-do-does-did.js",
  "./data/grammar/t17-have-has-had.js", "./data/grammar/t18-can-could-should-would-must.js",
  "./data/grammar/t19-simple-present.js", "./data/grammar/t20-present-continuous.js",
  "./data/grammar/t21-simple-past.js", "./data/grammar/t22-past-continuous.js",
  "./data/grammar/t23-simple-future.js", "./data/grammar/t24-future-continuous.js",
  "./data/grammar/t25-present-perfect.js", "./data/grammar/t26-past-perfect.js",
  "./data/grammar/t27-future-perfect.js", "./data/grammar/t28-prepositions.js",
  "./data/grammar/t29-conjunctions.js", "./data/grammar/t30-interjections.js",
  "./data/grammar/t31-possessives.js", "./data/grammar/t32-comparisons.js",
  "./data/grammar/t33-countable-uncountable.js", "./data/grammar/t34-some-any-much-many.js",
  "./data/grammar/t35-question-words.js", "./data/grammar/t36-everyday-sentences.js",
  "./data/grammar/t37-asking-questions.js", "./data/grammar/t38-answering-questions.js",
  "./data/grammar/t39-describing-people.js", "./data/grammar/t40-describing-places.js",
  "./data/grammar/t41-telling-a-story.js", "./data/grammar/t42-writing-a-paragraph.js",
  "./data/grammar/t43-conversation-practice.js", "./data/grammar/t44-common-mistakes.js",
  "./data/grammar/t45-daily-speaking-practice.js", "./data/grammar/t46-v1-v2-v3-verb-forms.js",
  "./data/grammar/t47-english-pronunciation.js", "./data/grammar/t48-why-spelling-is-wild.js",
  "./data/grammar/t49-vowel-patterns.js", "./data/grammar/t50-silent-letters.js",
  "./data/grammar/t51-capitalization.js", "./data/grammar/t52-punctuation.js",
  "./data/grammar/t53-spelling-for-indian-learners.js",
  "./js/store.js", "./js/srs.js", "./js/speech.js", "./js/app.js",
  "./js/modes/common.js", "./js/modes/home.js", "./js/modes/flashcards.js",
  "./js/modes/quiz.js", "./js/modes/typing.js", "./js/modes/spelling.js",
  "./js/modes/review.js", "./js/modes/stats.js", "./js/modes/settings.js",
  "./js/modes/grammar.js", "./js/modes/ai-practice.js", "./js/modes/reading.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function (cache) { return cache.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (key) { return key !== CACHE; }).map(function (key) {
          return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) { return; }
  event.respondWith(caches.match(request).then(function (cached) {
    var update = fetch(request).then(function (response) {
      if (response && response.ok) {
        var copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    }).catch(function () { return cached; });
    return cached || update;
  }));
});
