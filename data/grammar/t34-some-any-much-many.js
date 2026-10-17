// Topic 34 - Some / Any / Much / Many (Level 4 — Important Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 34,
    "topic": "some-any-much-many",
    "title": "Some / Any / Much / Many",
    "titleHindi": "कुछ / कोई / बहुत / अनेक (some, any, much, many)",
    "level": 4,
    "levelLabel": "Level 4 — Important Grammar",
    "keywords": [
      "some",
      "any",
      "much",
      "many"
    ],
    "summary": "Quantity words and when each one is used.",
    "explanationHindi": "some और any दोनों मात्रा बताते हैं, पर some सकारात्मक वाक्यों में और any प्रश्नों तथा नकारात्मक वाक्यों में आता है। much अगणनीय संज्ञाओं के साथ आता है और many गणनीय संज्ञाओं के साथ। इन शब्दों के बाद संज्ञा का रूप भी ठीक रखना पड़ता है, इसलिए many के साथ बहुवचन और much के साथ एकवचन संज्ञा आती है।",
    "points": [
      "Use some in positive sentences and any in questions or negatives",
      "Use much with uncountable nouns and many with countable plurals",
      "Some and any can go with both countable and uncountable nouns"
    ],
    "examples": [
      {
        "en": "I need some sugar for my tea.",
        "hi": "मुझे अपनी चाय के लिए थोड़ी चीनी चाहिए।",
        "note": "Some is used in a positive statement"
      },
      {
        "en": "We do not have any milk today.",
        "hi": "आज हमारे पास दूध नहीं है।",
        "note": "Any appears in negative sentences"
      },
      {
        "en": "Do you have any fresh bread?",
        "hi": "क्या आपके पास ताज़ी ब्रेड है।",
        "note": "Any is common in questions"
      },
      {
        "en": "Many students are waiting outside the gate.",
        "hi": "बहुत से विद्यार्थी गेट के बाहर इंतज़ार कर रहे हैं।",
        "note": "Many goes with countable plural nouns"
      },
      {
        "en": "He does not spend much money on clothes.",
        "hi": "वह कपड़ों पर ज़्यादा पैसा खर्च नहीं करता।",
        "note": "Much goes with uncountable nouns"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "I need some help with my homework.",
          "I need any help with my homework.",
          "I need many help with my homework."
        ],
        "answer": 0,
        "note": "Some is correct in a positive sentence"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "There is not many water in the bottle.",
          "There is not some water in the bottle.",
          "There is not any waters in the bottle.",
          "There is not much water in the bottle."
        ],
        "answer": 3,
        "note": "Much is used with the uncountable word water"
      },
      {
        "type": "cloze",
        "prompt": "She does not have ___ free time today.",
        "options": [
          "much",
          "many",
          "a",
          "few"
        ],
        "answer": 0,
        "note": "Much is used with uncountable time"
      },
      {
        "type": "cloze",
        "prompt": "There are ___ beautiful flowers in the garden.",
        "options": [
          "much",
          "many",
          "any",
          "a"
        ],
        "answer": 1,
        "note": "Many is used with countable plural flowers"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "some",
          "We",
          "at",
          "fruit",
          "home",
          "have",
          "fresh"
        ],
        "answer": "We have some fresh fruit at home.",
        "note": "Some is used in an affirmative sentence"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "do",
          "you",
          "many",
          "read",
          "How",
          "books",
          "each",
          "month"
        ],
        "answer": "How many books do you read each month?",
        "note": "Many asks about a countable number"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "She gave me any useful advice.",
        "options": [
          "She gave me",
          "any",
          "useful advice."
        ],
        "answer": 1,
        "note": "Use some, not any, in a positive sentence"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "He has much friends in this city.",
        "options": [
          "He has",
          "much",
          "friends in this city."
        ],
        "answer": 1,
        "note": "Friends are countable, so use many"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "How much eggs do we need for the cake?",
          "How many egg do we need for the cake?",
          "How many eggs do we need for the cake?"
        ],
        "answer": 2,
        "note": "Eggs are countable, so we use many"
      },
      {
        "type": "cloze",
        "prompt": "We did not buy ___ vegetables at the market.",
        "options": [
          "any",
          "some",
          "much",
          "a"
        ],
        "answer": 0,
        "note": "Any is used in a negative sentence"
      }
    ],
    "sourceOrder": 34,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "some/any + N; much/many + N",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V1 + some + N",
          "en": "We have some fresh fruit."
        },
        {
          "kind": "negative",
          "formula": "S + do/does + not + V1 + much + N",
          "en": "She does not spend much money."
        },
        {
          "kind": "question",
          "formula": "Do/Does + S + V1 + any + N?",
          "en": "Do you have any fresh bread?"
        }
      ],
      "exceptions": [
        "many is for countable plurals (many books), much for uncountables (much water)",
        "Use some, not any, in positive sentences and polite offers"
      ],
      "hindiTip": "some सकारात्मक वाक्यों में और any प्रश्नों तथा नकारात्मक वाक्यों में आता है। much अगणनीय संज्ञाओं के साथ और many गणनीय बहुवचन संज्ञाओं के साथ आता है।"
    }
  }
);
