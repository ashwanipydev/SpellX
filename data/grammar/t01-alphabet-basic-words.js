// Topic 1 - Alphabet & Basic Words (Level 1 — Basic Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 1,
    "topic": "alphabet-basic-words",
    "title": "Alphabet & Basic Words",
    "titleHindi": "वर्णमाला और बुनियादी शब्द",
    "level": 1,
    "levelLabel": "Level 1 — Basic Grammar",
    "keywords": [],
    "summary": "The 26 English letters and the first everyday words to read and say.",
    "explanationHindi": "अंग्रेज़ी में कुल छब्बीस अक्षर होते हैं, जो A से Z तक एक तय क्रम में चलते हैं। इन्हीं अक्षरों से मिलकर शब्द बनते हैं और शब्दों से वाक्य बनते हैं। हर वाक्य का पहला अक्षर हमेशा बड़ा लिखा जाता है, और लोगों तथा भाषाओं के नाम भी बड़े अक्षर से शुरू होते हैं।",
    "points": [
      "English uses twenty-six letters, from A to Z",
      "Every sentence begins with a capital letter",
      "Names of people and languages take a capital letter"
    ],
    "examples": [
      {
        "en": "Every English word uses letters from the alphabet.",
        "hi": "हर अंग्रेज़ी शब्द वर्णमाला के अक्षरों से बनता है।",
        "note": "Words are built from the twenty-six letters."
      },
      {
        "en": "A comes first and Z comes last.",
        "hi": "A सबसे पहले आता है और Z सबसे अंत में।",
        "note": "The letters always follow one fixed order."
      },
      {
        "en": "The word sun has three letters.",
        "hi": "Sun शब्द में तीन अक्षर होते हैं।",
        "note": "A word is a small group of letters."
      },
      {
        "en": "We write a capital letter at the start.",
        "hi": "हम वाक्य की शुरुआत में बड़ा अक्षर लिखते हैं।",
        "note": "The first word of a sentence is capital."
      },
      {
        "en": "Names do not start with a small letter.",
        "hi": "नाम छोटे अक्षर से शुरू नहीं होते।",
        "note": "Names of people take a capital first letter."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The alphabet has twenty-six letters.",
          "the alphabet has twenty-six letters.",
          "The alphabet has twenty-six letter.",
          "The alphabet have twenty-six letters."
        ],
        "answer": 0,
        "note": "The first letter of a sentence is always capital."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "I read a book every night.",
          "i read a book every night.",
          "I reads a book every night.",
          "I reading a book every night."
        ],
        "answer": 0,
        "note": "I is always a capital letter, even mid-sentence."
      },
      {
        "type": "cloze",
        "prompt": "The word book has four ___.",
        "options": [
          "letters",
          "letter",
          "word",
          "words"
        ],
        "answer": 0,
        "note": "The number four needs the plural noun letters."
      },
      {
        "type": "cloze",
        "prompt": "The alphabet begins with the letter ___.",
        "options": [
          "A",
          "C",
          "O",
          "Z"
        ],
        "answer": 0,
        "note": "The alphabet opens with the letter A."
      },
      {
        "type": "cloze",
        "prompt": "A name always begins with a ___ letter.",
        "options": [
          "capital",
          "small",
          "long",
          "last"
        ],
        "answer": 0,
        "note": "The names of people begin with capitals."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "letters.",
          "three",
          "word",
          "A",
          "have",
          "short",
          "can"
        ],
        "answer": "A short word can have three letters.",
        "note": "Letters join together to make a short word."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "letter.",
          "one",
          "has",
          "word",
          "least",
          "Every",
          "at"
        ],
        "answer": "Every word has at least one letter.",
        "note": "A word cannot be made without letters."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "my friend Ravi reads many books.",
        "options": [
          "my",
          "friend Ravi",
          "reads many",
          "books."
        ],
        "answer": 0,
        "note": "The first word here needs a capital M."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "The word english has seven letters.",
        "options": [
          "The word",
          "english",
          "has seven",
          "letters."
        ],
        "answer": 1,
        "note": "Language names like English always take a capital."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "Every letter has a big and small form.",
          "Every letter have a big and small form.",
          "Every letters has a big and small form.",
          "Every letter has big and small a form."
        ],
        "answer": 0,
        "note": "Each letter has a capital and a small form."
      }
    ],
    "sourceOrder": 1,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "Capital letter + S + V + O",
      "forms": [
        {
          "kind": "positive",
          "formula": "Capital letter + S + V + O",
          "en": "Ravi reads a good book."
        },
        {
          "kind": "negative",
          "formula": "N + do/does + not + start with small letter",
          "en": "A name does not start with a small letter."
        },
        {
          "kind": "question",
          "formula": "What + is + the first N?",
          "en": "What is the first letter?"
        }
      ],
      "exceptions": [
        "I is always a capital letter, even in the middle of a sentence.",
        "Names of people and languages take a capital first letter."
      ],
      "hindiTip": "अंग्रेज़ी में छब्बीस अक्षर A से Z तक तय क्रम में आते हैं। हर वाक्य का पहला अक्षर और नामों का पहला अक्षर हमेशा बड़ा लिखें।"
    }
  }
);
