// Topic 13 - Positive Sentences (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 13,
    "topic": "positive-sentences",
    "title": "Positive Sentences",
    "titleHindi": "सकारात्मक वाक्य",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [],
    "summary": "Statements that say something is true.",
    "explanationHindi": "सकारात्मक वाक्य वे होते हैं जिनमें हम किसी बात को सच बताते हैं। इनमें कर्ता पहले आता है और उसके बाद क्रिया। ऐसे वाक्य में not नहीं होता और न ही कोई प्रश्न पूछा जाता। हमारी रोज़ की बातचीत के ज़्यादातर वाक्य इसी तरह के होते हैं।",
    "points": [
      "Put the subject first, then the verb, then the rest",
      "Use a positive sentence to state a fact or a habit",
      "Do not add not or an unnecessary helper before the verb"
    ],
    "examples": [
      {
        "en": "The sun rises in the east.",
        "hi": "सूरज पूर्व में उगता है।",
        "note": "A plain statement gives information about the sun."
      },
      {
        "en": "I drink tea every morning.",
        "hi": "मैं हर सुबह चाय पीता हूँ।",
        "note": "The subject comes first in a positive sentence."
      },
      {
        "en": "My brother plays cricket well.",
        "hi": "मेरा भाई क्रिकेट अच्छा खेलता है।",
        "note": "The verb takes -s with a singular subject here."
      },
      {
        "en": "We live near the river.",
        "hi": "हम नदी के पास रहते हैं।",
        "note": "Positive sentences need no extra helping word at all."
      },
      {
        "en": "The shop opens at nine.",
        "hi": "दुकान नौ बजे खुलती है।",
        "note": "Facts are often written as positive sentences."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "She go to school daily.",
          "She goes to school daily.",
          "She going to school daily.",
          "She is go to school daily."
        ],
        "answer": 1,
        "note": "The verb takes -s with she in the simple present."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is a positive sentence?",
        "options": [
          "The baby does not sleep.",
          "Does the baby sleep now?",
          "The baby sleeps in the afternoon.",
          "Please sleep for two hours."
        ],
        "answer": 2,
        "note": "A positive sentence states something without not."
      },
      {
        "type": "cloze",
        "prompt": "He ___ his hands before dinner.",
        "options": [
          "wash",
          "washing",
          "washes",
          "is wash"
        ],
        "answer": 2,
        "note": "A singular subject takes the -s form of the verb."
      },
      {
        "type": "cloze",
        "prompt": "They ___ football in the park.",
        "options": [
          "plays",
          "play",
          "playing",
          "are play"
        ],
        "answer": 1,
        "note": "Plural subjects use the base form of the verb."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "dinner",
          "My",
          "every",
          "cooks",
          "sister",
          "night"
        ],
        "answer": "My sister cooks dinner every night.",
        "note": "Subject, verb and object build a positive sentence."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "games",
          "The",
          "lunch",
          "play",
          "after",
          "boys"
        ],
        "answer": "The boys play games after lunch.",
        "note": "The time phrase comes at the end here."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He write a letter every week.",
        "options": [
          "He",
          "write",
          "a letter",
          "every week."
        ],
        "answer": 1,
        "note": "The verb needs -s after the subject he."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "The children goes to school by bus.",
        "options": [
          "The",
          "children",
          "goes",
          "to school by bus."
        ],
        "answer": 2,
        "note": "A plural subject takes go, never goes."
      },
      {
        "type": "cloze",
        "prompt": "My friends ___ happy today.",
        "options": [
          "is",
          "am",
          "be",
          "are"
        ],
        "answer": 3,
        "note": "Plural subjects take are in the present."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "I am like this song very much.",
          "I liking this song very much.",
          "I like this song very much.",
          "I likes this song very much."
        ],
        "answer": 2,
        "note": "A simple present verb needs no am before it."
      }
    ],
    "sourceOrder": 13,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + V + O",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V1(+s/es) + O",
          "en": "She reads a book."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + V1 + O",
          "en": "She does not read a book."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + V1 + O?",
          "en": "Does she read a book?"
        }
      ],
      "exceptions": [
        "he/she/it take -s but have becomes has",
        "Plural subjects keep V1: they play, children go"
      ],
      "hindiTip": "सकारात्मक वाक्य में कर्ता पहले, फिर क्रिया और फिर कर्म आता है। he, she, it के साथ क्रिया में -s या -es जोड़ना न भूलें।"
    }
  }
);
