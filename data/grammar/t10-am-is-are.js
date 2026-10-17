// Topic 10 - Am, Is, Are (Level 1 — Basic Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 10,
    "topic": "am-is-are",
    "title": "Am, Is, Are",
    "titleHindi": "होना (am, is, are)",
    "level": 1,
    "levelLabel": "Level 1 — Basic Grammar",
    "keywords": [
      "am",
      "is",
      "are"
    ],
    "summary": "The three present forms of be, and when to use each one.",
    "explanationHindi": "am, is और are 'होना' क्रिया के वर्तमान काल के तीन रूप हैं। इनमें am केवल कर्ता I के साथ आता है, is एक व्यक्ति या वस्तु के लिए और are अनेक लोगों के लिए प्रयोग होता है। ये शब्द हमेशा कर्ता के तुरंत बाद आते हैं, जैसे 'मैं खुश हूँ' का अंग्रेज़ी रूप 'I am happy' होता है।",
    "points": [
      "Use am with I, is with he, she, it, and are with we, you, they",
      "Place am, is or are just after the subject in the sentence",
      "Use is for one person or thing and are for two or more"
    ],
    "examples": [
      {
        "en": "I am a student.",
        "hi": "मैं एक विद्यार्थी हूँ।",
        "note": "A statement with I takes am."
      },
      {
        "en": "She is very happy today.",
        "hi": "वह आज बहुत खुश है।",
        "note": "One person takes the form is."
      },
      {
        "en": "They are at home.",
        "hi": "वे घर पर हैं।",
        "note": "Many people take the form are."
      },
      {
        "en": "He is not a doctor.",
        "hi": "वह डॉक्टर नहीं है।",
        "note": "Add not after is to make a negative."
      },
      {
        "en": "Are you ready now?",
        "hi": "क्या तुम अब तैयार हो।",
        "note": "A question puts are before the subject."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "We is good friends.",
          "We are good friends.",
          "We am good friends.",
          "We be good friends."
        ],
        "answer": 1,
        "note": "The plural subject we always takes are."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The boys is in the garden.",
          "The boys am in the garden.",
          "The boys are in the garden.",
          "The boys be in the garden."
        ],
        "answer": 2,
        "note": "A plural subject takes are, not is."
      },
      {
        "type": "cloze",
        "prompt": "She ___ a teacher in this school.",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "answer": 0,
        "note": "One person takes is in the present."
      },
      {
        "type": "cloze",
        "prompt": "I ___ very tired today.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 0,
        "note": "The subject I always takes am."
      },
      {
        "type": "cloze",
        "prompt": "You ___ my best friend.",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "answer": 0,
        "note": "The subject you takes are in the present."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "are",
          "sweet",
          "very",
          "These",
          "mangoes"
        ],
        "answer": "These mangoes are very sweet.",
        "note": "These mangoes are plural, so are comes next."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "at",
          "are",
          "now",
          "home",
          "My",
          "parents"
        ],
        "answer": "My parents are at home now.",
        "note": "The plural subject my parents takes are."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He are my close friend.",
        "options": [
          "He",
          "are",
          "my close",
          "friend."
        ],
        "answer": 1,
        "note": "He needs is, never are."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "The books is on the table.",
        "options": [
          "The books",
          "is",
          "on the",
          "table."
        ],
        "answer": 1,
        "note": "A plural noun needs are, not is."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "I are happy with my work.",
        "options": [
          "I",
          "are",
          "happy with",
          "my work."
        ],
        "answer": 1,
        "note": "With the subject I we always use am."
      }
    ],
    "sourceOrder": 10,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + be + Adj/N",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + am/is/are + N",
          "en": "I am a student."
        },
        {
          "kind": "negative",
          "formula": "S + am/is/are + not + Adj",
          "en": "The boys are not lazy."
        },
        {
          "kind": "question",
          "formula": "Am/Is/Are + S + Adj?",
          "en": "Is she very happy?"
        }
      ],
      "exceptions": [
        "am only with I; is with he/she/it; are with we/you/they",
        "No do/does with be: say 'Is he ready?', not 'Does he be ready?'"
      ],
      "hindiTip": "am, is और are 'होना' के तीन वर्तमान रूप हैं — I के साथ am, एक व्यक्ति या वस्तु के साथ is और अनेक के साथ are। इन्हें कर्ता के तुरंत बाद रखें।"
    }
  }
);
