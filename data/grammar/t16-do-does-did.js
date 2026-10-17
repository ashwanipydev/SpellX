// Topic 16 - Do, Does, Did (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 16,
    "topic": "do-does-did",
    "title": "Do, Does, Did",
    "titleHindi": "करना (do, does, did)",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [
      "do",
      "does",
      "did"
    ],
    "summary": "Helping verbs for questions, negatives and emphasis in the present and past.",
    "explanationHindi": "do, does और did सहायक क्रियाएँ हैं जो प्रश्न बनाने, नकारात्मक वाक्य बनाने और किसी बात पर ज़ोर देने के लिए काम आती हैं। वर्तमान काल में I, you, we, they के साथ do और he, she, it के साथ does लगाया जाता है। भूतकाल में हर कर्ता के साथ did का ही प्रयोग होता है। इन तीनों के बाद मुख्य क्रिया हमेशा अपने मूल रूप में रहती है, जैसे does not like या did not go।",
    "points": [
      "Use do with I, you, we, they and does with he, she, it",
      "Use did with every subject for questions and negatives in the past",
      "After do, does or did use the base verb, never -s or -ed"
    ],
    "examples": [
      {
        "en": "I do like your new bag.",
        "hi": "मुझे तुम्हारा नया बैग सचमुच बहुत पसंद है।",
        "note": "Do adds emphasis to a positive sentence."
      },
      {
        "en": "She does not eat meat.",
        "hi": "वह मांस नहीं खाती है।",
        "note": "Use does not with he, she and it."
      },
      {
        "en": "Did they finish the work?",
        "hi": "क्या उन्होंने काम पूरा किया।",
        "note": "Did carries the past tense in a question."
      },
      {
        "en": "We did not see the film.",
        "hi": "हमने फ़िल्म नहीं देखी।",
        "note": "Did not works with every subject in the past."
      },
      {
        "en": "Do you need some help?",
        "hi": "क्या तुम्हें थोड़ी मदद चाहिए।",
        "note": "Do can begin a simple yes-no question."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "My father does not drink tea.",
          "My father does not drinks tea.",
          "My father do not drink tea.",
          "My father not drink tea."
        ],
        "answer": 0,
        "note": "After does not the verb stays in base form."
      },
      {
        "type": "chooser",
        "prompt": "Which question is correct?",
        "options": [
          "Did she call you yesterday?",
          "Did she called you yesterday?",
          "Does she called you yesterday?",
          "She did called you yesterday?"
        ],
        "answer": 0,
        "note": "After did we use the base verb call."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is about the past?",
        "options": [
          "They did visit the museum.",
          "They do visit the museum.",
          "They does visit the museum.",
          "They are visiting the museum."
        ],
        "answer": 0,
        "note": "Did puts the action in the past."
      },
      {
        "type": "cloze",
        "prompt": "___ she live with her parents now?",
        "options": [
          "Does",
          "Do",
          "Did",
          "Is"
        ],
        "answer": 0,
        "note": "Now means the present, so she takes does."
      },
      {
        "type": "cloze",
        "prompt": "___ you see the doctor yesterday?",
        "options": [
          "Did",
          "Do",
          "Does",
          "Are"
        ],
        "answer": 0,
        "note": "Yesterday needs the past helper did."
      },
      {
        "type": "cloze",
        "prompt": "He ___ his homework every evening.",
        "options": [
          "does",
          "do",
          "doing",
          "done"
        ],
        "answer": 0,
        "note": "Here does is the main verb for he."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "film",
          "Did",
          "last",
          "the",
          "you",
          "night?",
          "enjoy"
        ],
        "answer": "Did you enjoy the film last night?",
        "note": "Did comes before the subject in a past question."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "speak",
          "at",
          "Do",
          "English",
          "home?",
          "parents",
          "your"
        ],
        "answer": "Do your parents speak English at home?",
        "note": "Do comes before the subject your parents."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He do not like cold coffee.",
        "options": [
          "He do not",
          "like",
          "cold coffee."
        ],
        "answer": 0,
        "note": "He needs does, not do."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Did she went to the market?",
        "options": [
          "Did she",
          "went",
          "to the market?"
        ],
        "answer": 1,
        "note": "After did we use the base verb go."
      }
    ],
    "sourceOrder": 16,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + do/does/did + V1",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + do/does + V1 + O",
          "en": "I do like your new bag."
        },
        {
          "kind": "negative",
          "formula": "S + did + not + V1 + O",
          "en": "We did not see the film."
        },
        {
          "kind": "question",
          "formula": "Did + S + V1 + O?",
          "en": "Did they finish the work?"
        }
      ],
      "exceptions": [
        "Use does with he/she/it and do with I/you/we/they",
        "After do, does or did use V1 only, never V1+s or V2"
      ],
      "hindiTip": "do, does और did के बाद क्रिया हमेशा मूल रूप में रहती है, इसलिए \"does not like\" सही है और \"does not likes\" ग़लत। भूतकाल में हर कर्ता के साथ did लगता है।"
    }
  }
);
