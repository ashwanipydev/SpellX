// Topic 14 - Negative Sentences (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 14,
    "topic": "negative-sentences",
    "title": "Negative Sentences",
    "titleHindi": "नकारात्मक वाक्य",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [],
    "summary": "Sentences that say something is not true, using not.",
    "explanationHindi": "नकारात्मक वाक्य में हम बताते हैं कि कोई बात सच नहीं है और इसके लिए not का प्रयोग करते हैं। am, is, are या was के बाद सीधे not आता है। पर सामान्य क्रिया के साथ पहले do not या does not लगाते हैं और क्रिया अपने मूल रूप में रहती है। बोलचाल में don't, doesn't और isn't जैसे छोटे रूप बहुत आम हैं।",
    "points": [
      "Put not after am, is, are, was or were",
      "Use do not or does not before an action verb",
      "Keep the main verb in its base form after does not"
    ],
    "examples": [
      {
        "en": "I am not hungry now.",
        "hi": "मैं अब भूखा नहीं हूँ।",
        "note": "Not comes right after the verb am."
      },
      {
        "en": "She does not like cold coffee.",
        "hi": "उसे ठंडी कॉफ़ी पसंद नहीं है।",
        "note": "Use does not with he, she and it."
      },
      {
        "en": "They do not play after dark.",
        "hi": "वे अंधेरे के बाद नहीं खेलते।",
        "note": "The main verb stays in its base form."
      },
      {
        "en": "The door is not open today.",
        "hi": "दरवाज़ा आज खुला नहीं है।",
        "note": "A negative sentence can also describe a thing."
      },
      {
        "en": "We don't eat meat at home.",
        "hi": "हम घर पर मांस नहीं खाते।",
        "note": "The short form of do not is don't."
      }
    ],
    "exercises": [
      {
        "type": "cloze",
        "prompt": "He ___ not come to class.",
        "options": [
          "do",
          "is",
          "are",
          "does"
        ],
        "answer": 3,
        "note": "Use does not with he, she and it."
      },
      {
        "type": "cloze",
        "prompt": "They ___ not ready for the test.",
        "options": [
          "is",
          "are",
          "am",
          "do"
        ],
        "answer": 1,
        "note": "The verb be takes are with they."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "She do not sing well.",
          "She does not sings well.",
          "She does not sing well.",
          "She not sing well."
        ],
        "answer": 2,
        "note": "After does not the verb stays in base form."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is a negative sentence?",
        "options": [
          "The cat is on the bed.",
          "Is the cat on the bed?",
          "Put the cat on the bed.",
          "The cat is not on the bed."
        ],
        "answer": 3,
        "note": "The word not makes this sentence negative."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "like",
          "I",
          "food",
          "not",
          "bitter",
          "do"
        ],
        "answer": "I do not like bitter food.",
        "note": "Do not comes before the main verb."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "late",
          "The",
          "today",
          "not",
          "bus",
          "is"
        ],
        "answer": "The bus is not late today.",
        "note": "Not follows is in this negative sentence."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "She does not needs any help.",
        "options": [
          "She does not",
          "needs",
          "any help."
        ],
        "answer": 1,
        "note": "The verb after does not takes no -s."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "We are not go to the market.",
        "options": [
          "We are not",
          "go",
          "to the market."
        ],
        "answer": 1,
        "note": "After are not we need going, not go."
      },
      {
        "type": "cloze",
        "prompt": "It ___ not rain in winter.",
        "options": [
          "do",
          "does",
          "is",
          "are"
        ],
        "answer": 1,
        "note": "The subject it takes does in a negative."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "He aren't at home now.",
          "He doesn't at home now.",
          "He not is at home now.",
          "He isn't at home now."
        ],
        "answer": 3,
        "note": "The short form of is not is isn't."
      }
    ],
    "sourceOrder": 14,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + Aux + not + V",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V1(+s/es) + O",
          "en": "They play after dark."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + V1 + O",
          "en": "They do not play after dark."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + V1 + O?",
          "en": "Do they play after dark?"
        }
      ],
      "exceptions": [
        "After does not the verb takes no -s: does not go",
        "Be verbs take not directly: is not, are not, was not"
      ],
      "hindiTip": "not लगाने से पहले देखें कि वाक्य में am, is, are है या सामान्य क्रिया। सामान्य क्रिया के साथ do not या does not लगाएँ और क्रिया को मूल रूप में रखें।"
    }
  }
);
