// Topic 17 - Have, Has, Had (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 17,
    "topic": "have-has-had",
    "title": "Have, Has, Had",
    "titleHindi": "रखना (have, has, had)",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [
      "have",
      "has",
      "had"
    ],
    "summary": "Showing possession and completed actions with have, has and had.",
    "explanationHindi": "have, has और had के दो मुख्य काम हैं — अधिकार बताना और पूरे हो चुके काम को बताना। वर्तमान काल में I, you, we, they के साथ have और he, she, it के साथ has लगता है। भूतकाल में हर कर्ता के साथ had का प्रयोग होता है। जब इनके बाद कोई क्रिया आती है तो क्रिया का तीसरा रूप आता है, जैसे has finished या had gone।",
    "points": [
      "Use have with I, you, we, they and has with he, she, it",
      "Use had with every subject when the time is in the past",
      "After have, has and had use the third form of the verb"
    ],
    "examples": [
      {
        "en": "I have two brothers.",
        "hi": "मेरे दो भाई हैं।",
        "note": "Have shows possession with I."
      },
      {
        "en": "She has a new phone.",
        "hi": "उसके पास नया फ़ोन है।",
        "note": "Has is the form for he, she and it."
      },
      {
        "en": "My brother does not have a bike.",
        "hi": "मेरे भाई के पास साइकिल नहीं है।",
        "note": "Use does not have for he or she."
      },
      {
        "en": "We had a small house then.",
        "hi": "तब हमारे पास एक छोटा घर था।",
        "note": "Had shows possession in the past."
      },
      {
        "en": "She has finished her homework.",
        "hi": "उसने अपना गृहकार्य पूरा कर लिया है।",
        "note": "Has plus the third form shows a finished action."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "My uncle has a red car.",
          "My uncle have a red car.",
          "My uncle haves a red car.",
          "My uncle having a red car."
        ],
        "answer": 0,
        "note": "A singular subject always takes has."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence shows possession?",
        "options": [
          "I have a new bicycle.",
          "I have finished my dinner.",
          "I have gone to the market.",
          "I have seen that film."
        ],
        "answer": 0,
        "note": "Only the first sentence shows something you own."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is about the past?",
        "options": [
          "They had a big garden.",
          "They have a big garden.",
          "They has a big garden.",
          "They are having a big garden."
        ],
        "answer": 0,
        "note": "Had shows the garden was theirs before."
      },
      {
        "type": "cloze",
        "prompt": "My sister ___ two pet cats.",
        "options": [
          "has",
          "have",
          "having",
          "be"
        ],
        "answer": 0,
        "note": "A singular subject like sister takes has."
      },
      {
        "type": "cloze",
        "prompt": "We ___ no school last Monday.",
        "options": [
          "had",
          "have",
          "has",
          "having"
        ],
        "answer": 0,
        "note": "Last Monday puts this sentence in the past."
      },
      {
        "type": "cloze",
        "prompt": "They ___ two tickets for the show now.",
        "options": [
          "have",
          "has",
          "had",
          "having"
        ],
        "answer": 0,
        "note": "They takes have, and now keeps it present."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "finished",
          "she",
          "yet?",
          "Has",
          "homework",
          "her"
        ],
        "answer": "Has she finished her homework yet?",
        "note": "Has comes before the subject in a question."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "seen",
          "you",
          "Have",
          "shoes?",
          "new",
          "my"
        ],
        "answer": "Have you seen my new shoes?",
        "note": "Have plus the third form asks about the past."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "She have a big doll.",
        "options": [
          "She have",
          "a big",
          "doll."
        ],
        "answer": 0,
        "note": "She needs has, not have."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He has went to the shop.",
        "options": [
          "He has",
          "went",
          "to the shop."
        ],
        "answer": 1,
        "note": "Use gone, not went, after has."
      }
    ],
    "sourceOrder": 17,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + have/has + N",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + have/has + N",
          "en": "We have two tickets for the show."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + have + N",
          "en": "My brother does not have a bike."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + have + N?",
          "en": "Does she have a car?"
        }
      ],
      "exceptions": [
        "Use has only with he/she/it; I/you/we/they take have",
        "After have/has/had use V3: 'has gone', not 'has went'"
      ],
      "hindiTip": "he, she, it के साथ has और बाकी सब कर्ताओं के साथ have आता है; भूतकाल में हर कर्ता के लिए had ही लगता है।"
    }
  }
);
