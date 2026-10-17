// Topic 3 - Pronouns (Level 1 — Basic Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 3,
    "topic": "pronouns",
    "title": "Pronouns",
    "titleHindi": "सर्वनाम",
    "level": 1,
    "levelLabel": "Level 1 — Basic Grammar",
    "keywords": [
      "I",
      "you",
      "he",
      "she",
      "it",
      "they"
    ],
    "summary": "Words that stand in for a noun: I, you, he, she, it, they.",
    "explanationHindi": "सर्वनाम वे शब्द होते हैं जो संज्ञा के बदले आते हैं, ताकि हम एक ही नाम बार-बार न दोहराएँ। जैसे लड़की के लिए she, लड़के के लिए he और किताब के लिए it कह सकते हैं। जब संज्ञा कर्ता हो तो I, he, she, it, we, they आते हैं, और जब वह कर्म हो तो me, him, her, them आते हैं।",
    "points": [
      "A pronoun stands in place of a noun",
      "Use he or she for people and it for a thing or animal",
      "Use I as the subject and me as the object"
    ],
    "examples": [
      {
        "en": "The baby is hungry, so she cries.",
        "hi": "बच्ची भूखी है, इसलिए वह रोती है।",
        "note": "She replaces the noun baby in this sentence."
      },
      {
        "en": "I see him every day.",
        "hi": "मैं उसे हर दिन देखता हूँ।",
        "note": "Him is the object form of he."
      },
      {
        "en": "We go to school by bus.",
        "hi": "हम बस से स्कूल जाते हैं।",
        "note": "We stands for the speaker and other people."
      },
      {
        "en": "They live in a small town.",
        "hi": "वे एक छोटे शहर में रहते हैं।",
        "note": "They stands for more than one person."
      },
      {
        "en": "The cat is hungry and it wants milk.",
        "hi": "बिल्ली भूखी है और उसे दूध चाहिए।",
        "note": "It replaces a singular animal or thing."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "He is my best friend.",
          "Him is my best friend.",
          "His is my best friend.",
          "He are my best friend."
        ],
        "answer": 0,
        "note": "As the subject we use he, not him."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The children are tired and they want to sleep.",
          "The children are tired and it wants to sleep.",
          "The children are tired and they wants to sleep.",
          "The children are tired and he want to sleep."
        ],
        "answer": 0,
        "note": "Two children take they and the verb want."
      },
      {
        "type": "cloze",
        "prompt": "I give ___ a new book.",
        "options": [
          "her",
          "she",
          "hers",
          "he"
        ],
        "answer": 0,
        "note": "After a verb we use the object form her."
      },
      {
        "type": "cloze",
        "prompt": "The girls are ready, so ___ sit down.",
        "options": [
          "they",
          "he",
          "it",
          "she"
        ],
        "answer": 0,
        "note": "The plural noun girls takes they."
      },
      {
        "type": "cloze",
        "prompt": "My father is a doctor and ___ works hard.",
        "options": [
          "he",
          "she",
          "it",
          "they"
        ],
        "answer": 0,
        "note": "One male person takes the pronoun he."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "evening.",
          "park",
          "They",
          "in",
          "every",
          "football",
          "play",
          "the"
        ],
        "answer": "They play football in the park every evening.",
        "note": "They stands for two or more people."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "pen.",
          "me",
          "new",
          "She",
          "a",
          "gives"
        ],
        "answer": "She gives me a new pen.",
        "note": "Me is the object pronoun used after gives."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "My sister she is a doctor.",
        "options": [
          "My sister",
          "she",
          "is a",
          "doctor."
        ],
        "answer": 1,
        "note": "Do not repeat a pronoun after its noun."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Him and his brother play cricket.",
        "options": [
          "Him",
          "and his brother",
          "play cricket."
        ],
        "answer": 0,
        "note": "The subject pronoun is he, not him."
      },
      {
        "type": "cloze",
        "prompt": "The book is new, but ___ is very costly.",
        "options": [
          "it",
          "he",
          "she",
          "they"
        ],
        "answer": 0,
        "note": "A thing takes the pronoun it."
      }
    ],
    "sourceOrder": 3,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "Pronoun + V + O",
      "forms": [
        {
          "kind": "positive",
          "formula": "Pronoun + V1(+s/es) + O",
          "en": "I see him every day."
        },
        {
          "kind": "negative",
          "formula": "Pronoun + do/does + not + V1 + O",
          "en": "He does not see me."
        },
        {
          "kind": "question",
          "formula": "Do/Does + Pronoun + V1 + O?",
          "en": "Does he see me?"
        }
      ],
      "exceptions": [
        "Use I as subject and me as object: I see him, not Me see he.",
        "Do not repeat a pronoun after its noun (My sister she is wrong)."
      ],
      "hindiTip": "कर्ता के लिए I, he, she, it, we, they और कर्म के लिए me, him, her, them का प्रयोग करें। संज्ञा के बाद सर्वनाम दोबारा न लगाएँ।"
    }
  }
);
