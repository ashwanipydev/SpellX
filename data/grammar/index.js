// Derived index for the grammar course. Load AFTER every t*.js topic file.
// Rebuilds the two arrays the rest of the app already uses, so the screen,
// the store and the tests do not need to know about the per-topic split.
const GRAMMAR_REGISTRY = (window.GRAMMAR_TOPICS || []).slice();

const grammarTopics = GRAMMAR_REGISTRY
  .slice()
  .sort(function (a, b) { return (a.sourceOrder || a.id) - (b.sourceOrder || b.id); })
  .map(function (t) {
    return {
      id: t.id, topic: t.topic, title: t.title, titleHindi: t.titleHindi,
      level: t.level, levelLabel: t.levelLabel, keywords: t.keywords || [],
      summary: t.summary, explanationHindi: t.explanationHindi || "",
      points: t.points || [], rules: t.rules || null,
      sourceOrder: t.sourceOrder, source: t.source
    };
  });

const grammarExercises = GRAMMAR_REGISTRY.map(function (t) {
  return { topicId: t.id, examples: t.examples || [], exercises: t.exercises || [] };
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { grammarTopics: grammarTopics, grammarExercises: grammarExercises };
}
