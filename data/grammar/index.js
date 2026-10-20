// Derived index for the grammar course. Load after every topic and story data file.
// Rebuilds the two arrays the rest of the app already uses, so the screen,
// the store and the tests do not need to know about the per-topic split.
const GRAMMAR_REGISTRY = (window.GRAMMAR_TOPICS || []).slice();
// The continuous story data replaces the old topic-local draft scenes.
const GRAMMAR_STORIES = window.GRAMMAR_STORY_SCENES || {};

const grammarTopics = GRAMMAR_REGISTRY
  .slice()
  .sort(function (a, b) { return (a.sourceOrder || a.id) - (b.sourceOrder || b.id); })
  .map(function (t) {
    const story = GRAMMAR_STORIES[t.id];
    return {
      id: t.id, topic: t.topic, title: t.title, titleHindi: t.titleHindi,
      level: t.level, levelLabel: t.levelLabel, keywords: t.keywords || [],
      summary: t.summary, explanationHindi: t.explanationHindi || "",
      hindiReviewed: t.hindiReviewed === true,
      storyReviewed: !!(story && story.lessonId === t.id && story.reviewed === true),
      whyReviewed: t.whyReviewed === true,
      points: t.points || [], rules: t.rules || null,
      modalGuide: t.modalGuide || null, verbFormGroups: t.verbFormGroups || [],
      studyGuide: t.studyGuide || null, pronunciationGuide: t.pronunciationGuide || null,
      chapter: t.chapter, chapterTitle: t.chapterTitle,
      storyScene: story ? story.scene : [], storyRecap: story ? story.recap : null,
      whyRule: t.whyRule || null,
      sourceOrder: t.sourceOrder, source: t.source
    };
  });

const grammarExercises = GRAMMAR_REGISTRY.map(function (t) {
  const story = GRAMMAR_STORIES[t.id];
  const scene = story && Array.isArray(story.scene) ? story.scene : [];
  return {
    topicId: t.id, hindiReviewed: t.hindiReviewed === true,
    examples: t.examples || [],
    exercises: (t.exercises || []).map(function (exercise, index) {
      const copy = {};
      Object.keys(exercise).forEach(function (key) { copy[key] = exercise[key]; });
      if (scene.length) {
        copy.storyContext = scene[index % scene.length].en;
      }
      return copy;
    })
  };
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { grammarTopics: grammarTopics, grammarExercises: grammarExercises };
}
