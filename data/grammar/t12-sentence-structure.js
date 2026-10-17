// Topic 12 - Basic Sentence Structure (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 12,
    "topic": "sentence-structure",
    "title": "Basic Sentence Structure",
    "titleHindi": "वाक्य की संरचना",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [],
    "summary": "The word order that makes a clear English sentence.",
    "explanationHindi": "अंग्रेज़ी वाक्य में शब्दों का क्रम सरल और स्थिर होता है — पहले कर्ता (subject), फिर क्रिया (verb), और उसके बाद कर्म या बाकी जानकारी। हिंदी में क्रिया वाक्य के अंत में आती है, पर अंग्रेज़ी में क्रिया कर्ता के तुरंत बाद आती है। इसलिए 'मैं चावल खाता हूँ' का अंग्रेज़ी रूप 'I eat rice' होता है, 'I rice eat' नहीं।",
    "points": [
      "English sentences usually follow subject + verb + object order",
      "Put the verb right after the subject, not at the end",
      "Keep time and place words after the object, not before it"
    ],
    "examples": [
      {
        "en": "I drink tea every morning.",
        "hi": "मैं हर सुबह चाय पीता हूँ।",
        "note": "Subject, verb and object come in that order."
      },
      {
        "en": "She does not like cold coffee.",
        "hi": "उसे ठंडी कॉफ़ी पसंद नहीं है।",
        "note": "Put not right after the helping verb."
      },
      {
        "en": "Do you play cricket on Sundays?",
        "hi": "क्या तुम रविवार को क्रिकेट खेलते हो।",
        "note": "A question starts with the helping verb."
      },
      {
        "en": "My father bought a new phone.",
        "hi": "मेरे पिता ने नया फ़ोन खरीदा।",
        "note": "The object comes after the verb bought."
      },
      {
        "en": "We eat dinner at eight.",
        "hi": "हम आठ बजे रात का खाना खाते हैं।",
        "note": "Time words follow the object at the end."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence has the correct word order?",
        "options": [
          "Rice I eat every day.",
          "I rice eat every day.",
          "I eat rice every day.",
          "Every day rice I eat."
        ],
        "answer": 2,
        "note": "English keeps the verb right after the subject."
      },
      {
        "type": "chooser",
        "prompt": "Which question is correct?",
        "options": [
          "Where you are going?",
          "Where going you are?",
          "Where are you going?"
        ],
        "answer": 2,
        "note": "In questions the helping verb comes before the subject."
      },
      {
        "type": "cloze",
        "prompt": "I ___ rice for lunch.",
        "options": [
          "eat",
          "eats",
          "eating",
          "am eat"
        ],
        "answer": 0,
        "note": "The plain verb comes just after the subject I."
      },
      {
        "type": "cloze",
        "prompt": "My brother ___ football every evening.",
        "options": [
          "plays",
          "play",
          "playing",
          "is play"
        ],
        "answer": 0,
        "note": "The verb comes straight after the subject."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "books",
          "evening",
          "I",
          "the",
          "in",
          "read"
        ],
        "answer": "I read books in the evening.",
        "note": "Subject, verb, object, then the time phrase."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "milk",
          "The",
          "every",
          "drinks",
          "morning",
          "baby"
        ],
        "answer": "The baby drinks milk every morning.",
        "note": "Milk is the object and stays after the verb."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "football",
          "We",
          "school",
          "after",
          "play"
        ],
        "answer": "We play football after school.",
        "note": "The time phrase after school comes last."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "I rice eat in the morning.",
        "options": [
          "I rice",
          "eat",
          "in the morning."
        ],
        "answer": 0,
        "note": "The verb eat must come before rice."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "They eats lunch at noon.",
        "options": [
          "They",
          "eats",
          "lunch",
          "at noon."
        ],
        "answer": 1,
        "note": "With they the verb is eat, without s."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Yesterday we a movie watched.",
        "options": [
          "Yesterday",
          "we",
          "a movie",
          "watched."
        ],
        "answer": 3,
        "note": "The verb belongs after the subject, not last."
      }
    ],
    "sourceOrder": 12,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + V + O + Adv (time/place last)",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V + O + Adv",
          "en": "I drink tea every morning."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + V + O",
          "en": "She does not like cold coffee."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + V + O + Adv?",
          "en": "Do you play cricket on Sundays?"
        }
      ],
      "exceptions": [
        "Time and place words come after O, not before V",
        "In questions the Aux comes before S: Do you eat rice?"
      ],
      "hindiTip": "अंग्रेज़ी में शब्दों का क्रम S + V + O रहता है, इसलिए क्रिया कर्ता के तुरंत बाद आती है, अंत में नहीं। समय और स्थान के शब्द कर्म के बाद रखें।"
    }
  }
);
