// Topic 25 - Present Perfect (Level 3 — Tenses).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 25,
    "topic": "present-perfect",
    "title": "Present Perfect",
    "titleHindi": "पूर्ण वर्तमान काल",
    "level": 3,
    "levelLabel": "Level 3 — Tenses",
    "keywords": [],
    "summary": "Past actions with a link to now: I have gone.",
    "explanationHindi": "पूर्ण वर्तमान काल उस काम के लिए आता है जो भूतकाल में हो चुका है, पर उसका असर या नतीजा अभी भी मौजूद है। इसका ढाँचा है—कर्ता + have या has + क्रिया का तीसरा रूप (जैसे खाया, गया, लिखा)। He, she और it के साथ has लगता है, बाकी सब के साथ have। just, already, yet, ever, never, since और for जैसे शब्द इसी काल के साथ आते हैं।",
    "points": [
      "Use have or has with the past participle: I have eaten, she has gone",
      "Use has with he, she and it, and have with I, you, we and they",
      "Use just, already, yet, ever and never with the present perfect"
    ],
    "examples": [
      {
        "en": "I have finished my homework.",
        "hi": "मैं अपना होमवर्क पूरा कर चुका हूँ।",
        "note": "Shows a finished action with a result now"
      },
      {
        "en": "She has washed the dishes.",
        "hi": "उसने बर्तन धो लिए हैं।",
        "note": "Shows has with the subject she"
      },
      {
        "en": "They have not eaten dinner yet.",
        "hi": "उन्होंने अभी तक रात का खाना नहीं खाया है।",
        "note": "Shows not placed between have and the participle"
      },
      {
        "en": "Have you ever seen a camel?",
        "hi": "क्या तुमने कभी ऊँट देखा है।",
        "note": "Shows a question about past experience"
      },
      {
        "en": "He has lived here for five years.",
        "hi": "वह यहाँ पाँच साल से रह रहा है।",
        "note": "Shows for with a length of time"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "He has wrote a letter.",
          "He has written a letter.",
          "He have written a letter.",
          "He has write a letter."
        ],
        "answer": 1,
        "note": "Has takes the past participle written"
      },
      {
        "type": "cloze",
        "prompt": "She ___ gone to the market.",
        "options": [
          "has",
          "have",
          "having",
          "were"
        ],
        "answer": 0,
        "note": "She always takes has in this tense"
      },
      {
        "type": "cloze",
        "prompt": "We ___ never seen a tiger.",
        "options": [
          "have",
          "has",
          "having",
          "is"
        ],
        "answer": 0,
        "note": "We takes have with the past participle"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "already",
          "have",
          "my",
          "I",
          "work",
          "finished"
        ],
        "answer": "I have already finished my work.",
        "note": "Already sits between have and the participle"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "just",
          "the",
          "She",
          "left",
          "has",
          "office"
        ],
        "answer": "She has just left the office.",
        "note": "Just shows the action happened a moment ago"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He have gone to the shop.",
        "options": [
          "He",
          "have gone",
          "to the shop."
        ],
        "answer": 1,
        "note": "He needs has before the past participle"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "They has eaten all the food.",
        "options": [
          "They",
          "has eaten",
          "all the food."
        ],
        "answer": 1,
        "note": "They takes have, not has, here"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "Have you finished your work yet?",
          "Did you finished your work yet?",
          "You have finished your work yet?",
          "Have you finish your work yet?"
        ],
        "answer": 0,
        "note": "Questions start with have before the subject"
      },
      {
        "type": "cloze",
        "prompt": "We have lived here ___ two years.",
        "options": [
          "for",
          "since",
          "from",
          "in"
        ],
        "answer": 0,
        "note": "For is used with a length of time"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "She has been ill since Monday.",
          "She has been ill for Monday.",
          "She has been ill since two days.",
          "She is ill since Monday."
        ],
        "answer": 0,
        "note": "Since is used with a starting point"
      }
    ],
    "sourceOrder": 25,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + have/has + V3",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + have/has + V3 + O",
          "en": "I have finished my homework."
        },
        {
          "kind": "negative",
          "formula": "S + have/has + not + V3 + O",
          "en": "She has not eaten dinner."
        },
        {
          "kind": "question",
          "formula": "Have/Has + S + V3 + O?",
          "en": "Have you seen this film?"
        }
      ],
      "exceptions": [
        "He, she and it take has; I, you, we and they take have",
        "Use since for a starting point and for with a length of time"
      ],
      "hindiTip": "have या has कर्ता से तय होता है—I, you, we, they के साथ have और he, she, it के साथ has लगता है। इस काल में हमेशा क्रिया का तीसरा रूप (V3) आता है, इसलिए दोनों बातें एक साथ याद रखें।"
    }
  }
);
