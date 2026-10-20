// Derived index for the grammar course. Load AFTER every t*.js topic file.
// Rebuilds the two arrays the rest of the app already uses, so the screen,
// the store and the tests do not need to know about the per-topic split.
const GRAMMAR_REGISTRY = (window.GRAMMAR_TOPICS || []).slice();
// English scenes are shown only after their lesson alignment has been checked.
const REVIEWED_STORY_IDS = [
  1, 2, 3, 8, 9, 10, 11, 12, 15, 16,
  28, 29, 31, 33, 36, 40, 46, 48, 49, 50, 51, 52, 53
];

const grammarTopics = GRAMMAR_REGISTRY
  .slice()
  .sort(function (a, b) { return (a.sourceOrder || a.id) - (b.sourceOrder || b.id); })
  .map(function (t) {
    return {
      id: t.id, topic: t.topic, title: t.title, titleHindi: t.titleHindi,
      level: t.level, levelLabel: t.levelLabel, keywords: t.keywords || [],
      summary: t.summary, explanationHindi: t.explanationHindi || "",
      hindiReviewed: t.hindiReviewed === true,
      storyReviewed: REVIEWED_STORY_IDS.indexOf(t.id) !== -1,
      whyReviewed: t.whyReviewed === true,
      points: t.points || [], rules: t.rules || null,
      modalGuide: t.modalGuide || null, verbFormGroups: t.verbFormGroups || [],
      studyGuide: t.studyGuide || null, pronunciationGuide: t.pronunciationGuide || null,
      chapter: t.chapter, chapterTitle: t.chapterTitle,
      storyScene: t.storyScene || [], storyRecap: t.storyRecap || null,
      whyRule: t.whyRule || null,
      sourceOrder: t.sourceOrder, source: t.source
    };
  });

const grammarExercises = GRAMMAR_REGISTRY.map(function (t) {
  return {
    topicId: t.id, hindiReviewed: t.hindiReviewed === true,
    examples: t.examples || [], exercises: t.exercises || []
  };
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { grammarTopics: grammarTopics, grammarExercises: grammarExercises };
}
