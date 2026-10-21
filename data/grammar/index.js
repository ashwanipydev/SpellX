// Derived index for the grammar course. Load after every topic and story data file.
// Rebuilds the two arrays the rest of the app already uses, so the screen,
// the store and the tests do not need to know about the per-topic split.
const GRAMMAR_REGISTRY = (window.GRAMMAR_TOPICS || []).slice();
// The continuous story data replaces the old topic-local draft scenes.
const GRAMMAR_STORIES = window.GRAMMAR_STORY_SCENES || {};
const GRAMMAR_AI_PRACTICE_PROMPTS = window.GRAMMAR_AI_PRACTICE_PROMPTS || {};

function buildAiPracticePrompt(topic) {
  const plan = GRAMMAR_AI_PRACTICE_PROMPTS[topic.id];
  if (!plan) { return ""; }
  const skills = (topic.points || []).map(function (point) { return "- " + point; });
  const activities = (plan.activities || []).map(function (activity) { return "- " + activity; });
  return [
    "You are my patient, encouraging personal English tutor. Help me use this lesson in real situations, not just memorize rules.",
    "LESSON: " + topic.title + " — Chapter " + topic.chapter + ": " + topic.chapterTitle,
    "WHAT THIS LESSON TEACHES: " + topic.summary,
    "SKILLS TO DEVELOP:",
    skills.join("\n"),
    "REAL-WORLD PRACTICE SETTING: " + plan.situation,
    "PRACTICAL CONVERSATION AND EXERCISE IDEAS:",
    activities.join("\n"),
    "PERSONALIZE THIS SESSION BEFORE TEACHING:",
    "- Ask me three short check-in questions, one per turn, waiting for my answer before asking the next: first, how comfortable I feel with this topic (new to it, somewhat comfortable, or confident); second, which real-life context I prefer (work, travel, everyday life, or another choice); third, how challenging I want the practice to be (gentle, standard, challenging, or you choose).",
    "- Let me skip any check-in question. If I skip or am unsure, choose an accessible default and adjust as you see how I do.",
    "- Use my answers to tailor the scenarios, vocabulary, explanation detail, and pace. Keep the lesson objectives and target concepts unchanged.",
    "HOW TO TUTOR ME:",
    "- After the check-in, give a brief, plain-English reminder of the lesson and its goal.",
    "- Begin a realistic role-play or exercise and ask exactly one question or give one task at a time. Wait for my answer before continuing.",
    "- Let me try before showing a model answer. Accept correct natural alternatives, not only one memorized wording.",
    "- Evaluate each answer: identify what I did well, then correct any lesson-related mistake and explain the relevant idea simply.",
    "- If I make a mistake, give me a similar retry before moving on. If I struggle repeatedly, explain the concept another way and make the next task easier.",
    "- If I answer confidently and correctly, make later tasks more challenging and vary the context.",
    "- Use several practical task types from the ideas above, such as role-play, making or transforming sentences, correcting a message, and short speaking or writing tasks when suitable.",
    "- Keep the conversation supportive and focused on this lesson. Use clear, simple English; give a brief Hindi explanation only if I ask for one.",
    "- At the end, summarize my strengths, recurring errors, and one useful next practice goal.",
    "Start now by asking only the first check-in question about my comfort with this topic. Wait for my answer. Never ask multiple questions at once."
  ].join("\n");
}

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
      aiPracticePrompt: buildAiPracticePrompt(t),
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
