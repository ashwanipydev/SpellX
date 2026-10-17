// Topic 18 - Can, Could, Should, Would, Must (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 18,
    "topic": "can-could-should-would-must",
    "title": "Can, Could, Should, Would, Must",
    "titleHindi": "सहायक क्रियाएँ (can, could, should, would, must)",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [
      "can",
      "could",
      "should",
      "would",
      "must"
    ],
    "summary": "Modal helpers for ability, permission, advice, possibility and obligation.",
    "explanationHindi": "can, could, should, would और must जैसे शब्द क्रिया से पहले आकर उसका भाव बदल देते हैं। can क्षमता और अनुमति के लिए, could भूतकाल की क्षमता या विनम्र निवेदन के लिए, should सलाह के लिए और must मज़बूत कर्तव्य या नियम के लिए प्रयोग होता है। would विनम्रता से कोई इच्छा या माँग बताने में काम आता है। इन सबके बाद क्रिया हमेशा मूल रूप में और बिना to के आती है।",
    "points": [
      "Use can and could for ability, permission and polite requests",
      "Use should for advice and must for a strong rule or duty",
      "A modal verb is followed by the base verb without to or -s"
    ],
    "examples": [
      {
        "en": "I can swim very well.",
        "hi": "मैं बहुत अच्छी तरह तैर सकता हूँ।",
        "note": "Can shows ability in the present."
      },
      {
        "en": "Could you open the window?",
        "hi": "क्या आप खिड़की खोल सकते हैं।",
        "note": "Could makes a request polite."
      },
      {
        "en": "You should drink more water.",
        "hi": "तुम्हें और पानी पीना चाहिए।",
        "note": "Should gives friendly advice."
      },
      {
        "en": "You must not touch these wires.",
        "hi": "तुम्हें इन तारों को नहीं छूना चाहिए।",
        "note": "Must not shows that something is not allowed."
      },
      {
        "en": "I would like some tea.",
        "hi": "मुझे थोड़ी चाय चाहिए।",
        "note": "Would like asks for something politely."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "He can swim very fast.",
          "He can swims very fast.",
          "He can to swim very fast.",
          "He cans swim very fast."
        ],
        "answer": 0,
        "note": "A modal verb never takes -s."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is about ability?",
        "options": [
          "She can speak three languages.",
          "She should speak three languages.",
          "She must speak three languages.",
          "She would speak three languages."
        ],
        "answer": 0,
        "note": "Can is the modal for ability."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence shows a strong rule?",
        "options": [
          "Students must wear a uniform.",
          "Students can wear a uniform.",
          "Students could wear a uniform.",
          "Students would wear a uniform."
        ],
        "answer": 0,
        "note": "Must shows a rule that people have to follow."
      },
      {
        "type": "cloze",
        "prompt": "___ you please close the door?",
        "options": [
          "Could",
          "Should",
          "Must",
          "Do"
        ],
        "answer": 0,
        "note": "Could makes this request sound polite."
      },
      {
        "type": "cloze",
        "prompt": "He ___ not walk when he was two.",
        "options": [
          "could",
          "can",
          "must",
          "should"
        ],
        "answer": 0,
        "note": "The past time was two needs could."
      },
      {
        "type": "cloze",
        "prompt": "I ___ like a glass of water.",
        "options": [
          "would",
          "should",
          "must",
          "can"
        ],
        "answer": 0,
        "note": "Would like asks for something politely."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "help",
          "Could",
          "this?",
          "me",
          "you",
          "with"
        ],
        "answer": "Could you help me with this?",
        "note": "The modal could comes first in a request."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "speak",
          "two",
          "Can",
          "languages?",
          "you"
        ],
        "answer": "Can you speak two languages?",
        "note": "Can comes before the subject in a question."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "She can sings very well.",
        "options": [
          "She can",
          "sings",
          "very well."
        ],
        "answer": 1,
        "note": "After can the verb must be sing."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "You should to eat more fruit.",
        "options": [
          "You should",
          "to eat",
          "more fruit."
        ],
        "answer": 1,
        "note": "We do not use to after should."
      }
    ],
    "sourceOrder": 18,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + modal + V1",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + can/could + V1 + O",
          "en": "I can swim very well."
        },
        {
          "kind": "negative",
          "formula": "S + must + not + V1 + O",
          "en": "You must not touch these wires."
        },
        {
          "kind": "question",
          "formula": "Could + S + V1 + O?",
          "en": "Could you open the window?"
        }
      ],
      "exceptions": [
        "Modals never take -s or -ed: 'he can', not 'he cans'",
        "After a modal use V1 without to: 'should eat', not 'should to eat'"
      ],
      "hindiTip": "can, could, should, would और must के बाद क्रिया बिना to के मूल रूप में आती है, और इनके साथ कभी -s नहीं जुड़ता। must not मना करने के लिए और should सलाह के लिए प्रयोग करें।"
    }
  }
);
