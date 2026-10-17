// Topic 4 - Verbs (Level 1 — Basic Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 4,
    "topic": "verbs",
    "title": "Verbs",
    "titleHindi": "क्रिया",
    "level": 1,
    "levelLabel": "Level 1 — Basic Grammar",
    "keywords": [
      "eat",
      "play",
      "go"
    ],
    "summary": "Action words that tell what someone or something does.",
    "explanationHindi": "क्रिया वह शब्द है जो बताता है कि कोई व्यक्ति या वस्तु क्या काम करती है। जैसे खाना, खेलना और जाना क्रियाएँ हैं। हर अंग्रेज़ी वाक्य में एक क्रिया ज़रूर होती है, और कर्ता के अनुसार उसका रूप बदल जाता है। इसलिए he के साथ goes और they के साथ go कहना सही है।",
    "points": [
      "A verb is an action word that tells what someone or something does",
      "Every complete English sentence needs at least one verb",
      "The verb changes with the subject: I go, he goes"
    ],
    "examples": [
      {
        "en": "Ravi eats a mango every day.",
        "hi": "रवि हर दिन एक आम खाता है।",
        "note": "Eats is the action word in this sentence."
      },
      {
        "en": "The baby does not cry at night.",
        "hi": "बच्चा रात में नहीं रोता है।",
        "note": "Shows a verb made negative with does not."
      },
      {
        "en": "Please close the door now.",
        "hi": "कृपया अब दरवाज़ा बंद करो।",
        "note": "An order still needs a clear action verb."
      },
      {
        "en": "We clean our room every morning.",
        "hi": "हम हर सुबह अपना कमरा साफ करते हैं।",
        "note": "Names a daily action with a clear verb."
      },
      {
        "en": "Birds sing sweetly in the garden.",
        "hi": "पक्षी बगीचे में मधुर स्वर में गाते हैं।",
        "note": "Shows a verb telling what birds do."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "He play football every evening.",
          "He plays football every evening.",
          "He playing football every evening."
        ],
        "answer": 1,
        "note": "The verb takes s with he in the present."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The children a new game.",
          "The children plays a new game.",
          "The children play a new game."
        ],
        "answer": 2,
        "note": "A plural subject takes the plain verb play."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The boys in the park.",
          "The boys play in the park.",
          "The boys playing in the park."
        ],
        "answer": 1,
        "note": "A sentence needs a real verb, not only ing."
      },
      {
        "type": "cloze",
        "prompt": "She ___ to school every morning.",
        "options": [
          "go",
          "goes",
          "going",
          "gone"
        ],
        "answer": 1,
        "note": "Add s to the verb when the subject is she."
      },
      {
        "type": "cloze",
        "prompt": "Do you ___ cricket after school?",
        "options": [
          "plays",
          "play",
          "playing",
          "to play"
        ],
        "answer": 1,
        "note": "A question also needs the plain verb play."
      },
      {
        "type": "cloze",
        "prompt": "The train ___ at six every morning.",
        "options": [
          "leave",
          "leaves",
          "leaving",
          "to leave"
        ],
        "answer": 1,
        "note": "One train takes leaves, with an s at the end."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "sings",
          "a",
          "dinner",
          "Sita",
          "after",
          "song"
        ],
        "answer": "Sita sings a song after dinner.",
        "note": "The verb sings comes right after the subject Sita."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "park",
          "runs",
          "The",
          "small",
          "around",
          "dog",
          "the"
        ],
        "answer": "The dog runs around the small park.",
        "note": "The verb runs tells what the dog does."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He go to school by bus.",
        "options": [
          "He",
          "go",
          "to school by bus."
        ],
        "answer": 1,
        "note": "With he we must say goes, not go."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Every morning the birds sings loudly.",
        "options": [
          "Every morning",
          "the birds",
          "sings loudly."
        ],
        "answer": 2,
        "note": "The plural subject birds needs the verb sing."
      }
    ],
    "sourceOrder": 4,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + V + O",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V1(+s/es) + O",
          "en": "Ravi eats a mango every day."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + V1 + O",
          "en": "The baby does not cry at night."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + V1 + O?",
          "en": "Does Sita sing a song?"
        }
      ],
      "exceptions": [
        "he/she/it take -s but have becomes has",
        "go becomes goes and do becomes does, not gos or dos"
      ],
      "hindiTip": "हर पूरा अंग्रेज़ी वाक्य बिना क्रिया के नहीं बनता, इसलिए क्रिया पहचानना सबसे ज़रूरी है। he, she, it के साथ क्रिया में -s या -es जोड़ें।"
    }
  }
);
