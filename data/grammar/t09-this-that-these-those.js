// Topic 9 - This / That / These / Those (Level 1 — Basic Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 9,
    "topic": "this-that-these-those",
    "title": "This / That / These / Those",
    "titleHindi": "यह / वह / ये / वे",
    "level": 1,
    "levelLabel": "Level 1 — Basic Grammar",
    "keywords": [
      "this",
      "that",
      "these",
      "those"
    ],
    "summary": "Pointing words for near and far, one and many.",
    "explanationHindi": "जब कोई चीज़ हमारे पास होती है तो उसके लिए this या these का प्रयोग करते हैं। एक चीज़ के लिए this आता है और कई चीज़ों के लिए these लगता है। जो चीज़ दूर होती है उसके लिए एकवचन में that और बहुवचन में those आता है। इन शब्दों के बाद क्रिया भी बदलती है, क्योंकि this और that के साथ is तथा these और those के साथ are आता है।",
    "points": [
      "Use this for one near thing and these for many near things",
      "Use that for one far thing and those for many far things",
      "This and that take is; these and those take are"
    ],
    "examples": [
      {
        "en": "This book is very useful for me.",
        "hi": "यह किताब मेरे लिए बहुत उपयोगी है।",
        "note": "This points to one book near the speaker."
      },
      {
        "en": "These flowers smell very sweet today.",
        "hi": "ये फूल आज बहुत मीठी खुशबू देते हैं।",
        "note": "These points to many flowers close by."
      },
      {
        "en": "That hill looks very far away.",
        "hi": "वह पहाड़ी बहुत दूर दिखाई देती है।",
        "note": "That points to one thing at a distance."
      },
      {
        "en": "Those mangoes are not ripe yet.",
        "hi": "वे आम अभी पके नहीं हैं।",
        "note": "Those points to many mangoes far away."
      },
      {
        "en": "Are these your new shoes?",
        "hi": "क्या ये तुम्हारे नए जूते हैं।",
        "note": "A question keeps these before the plural noun."
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "This apples are very fresh today.",
          "These apples are very fresh today.",
          "These apple are very fresh today."
        ],
        "answer": 1,
        "note": "These goes with many apples and the verb are."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "Those bird is sitting on the wall.",
          "That bird is sitting on the wall.",
          "That birds is sitting on the wall."
        ],
        "answer": 1,
        "note": "That matches one bird and the verb is."
      },
      {
        "type": "cloze",
        "prompt": "Look at ___ children near the gate.",
        "options": [
          "this",
          "that",
          "these",
          "them"
        ],
        "answer": 2,
        "note": "Children are plural and near, so these fits."
      },
      {
        "type": "cloze",
        "prompt": "___ bag on the far table is mine.",
        "options": [
          "This",
          "That",
          "These",
          "Those"
        ],
        "answer": 1,
        "note": "One far bag needs that and the verb is."
      },
      {
        "type": "cloze",
        "prompt": "___ shoes under your chair are dirty.",
        "options": [
          "This",
          "That",
          "These",
          "Those"
        ],
        "answer": 2,
        "note": "Shoes are plural and near, so we use these."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "hungry",
          "children",
          "These",
          "very",
          "small",
          "are",
          "two"
        ],
        "answer": "These two small children are very hungry.",
        "note": "These comes first and takes the plural verb are."
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "stick",
          "walks",
          "That",
          "with",
          "old",
          "man",
          "a"
        ],
        "answer": "That old man walks with a stick.",
        "note": "That points to one old man who is far."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "This books are too heavy for me.",
        "options": [
          "This books",
          "are too heavy",
          "for me."
        ],
        "answer": 0,
        "note": "Change this to these before the plural books."
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Those temple is very old and beautiful.",
        "options": [
          "Those temple",
          "is very old",
          "and beautiful."
        ],
        "answer": 0,
        "note": "Use that with a single temple, not those."
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "These is my new school bag.",
          "This is my new school bag.",
          "This are my new school bag."
        ],
        "answer": 1,
        "note": "This points to one thing and takes is."
      }
    ],
    "sourceOrder": 9,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "This/That + N + is + Adj",
      "forms": [
        {
          "kind": "positive",
          "formula": "This + N + is + Adj",
          "en": "This book is very useful for me."
        },
        {
          "kind": "negative",
          "formula": "Those + N + are + not + Adj",
          "en": "Those mangoes are not ripe yet."
        },
        {
          "kind": "question",
          "formula": "Are + these + N + Adj?",
          "en": "Are these your new shoes?"
        }
      ],
      "exceptions": [
        "This and that take is; these and those take are",
        "Use these or those only with plural nouns"
      ],
      "hindiTip": "पास की चीज़ के लिए this (एक) या these (कई) और दूर की चीज़ के लिए that (एक) या those (कई) लगता है। this/that के साथ is आता है और these/those के साथ are।"
    }
  }
);
