// Topic 29 - Conjunctions (Level 4 — Important Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 29,
    "topic": "conjunctions",
    "title": "Conjunctions",
    "titleHindi": "संयोजक",
    "level": 4,
    "levelLabel": "Level 4 — Important Grammar",
    "keywords": [
      "and",
      "but",
      "because"
    ],
    "summary": "Joining words and ideas together.",
    "explanationHindi": "संयोजक वे शब्द हैं जो दो शब्दों, वाक्यांशों या वाक्यों को आपस में जोड़ते हैं, जैसे and, but और because। and दो मिलती-जुलती बातें जोड़ता है, but दो बातों के बीच अंतर बताता है और because किसी काम का कारण सामने रखता है। सही संयोजक चुनने से दो छोटे वाक्यों की जगह एक साफ़ और पूरा वाक्य बन जाता है।",
    "points": [
      "Use and to join two similar ideas or actions",
      "Use but to show a difference between two ideas",
      "Use because to give the reason for something"
    ],
    "examples": [
      {
        "en": "I like tea and coffee.",
        "hi": "मुझे चाय और कॉफ़ी पसंद है।",
        "note": "Joins two nouns with and"
      },
      {
        "en": "She is tired but happy.",
        "hi": "वह थकी है लेकिन खुश है।",
        "note": "Shows contrast between two feelings"
      },
      {
        "en": "He is late because the bus stopped.",
        "hi": "वह देर से है क्योंकि बस रुक गई।",
        "note": "Gives a reason with because"
      },
      {
        "en": "Do you want tea or milk?",
        "hi": "क्या आप चाय या दूध चाहते हैं।",
        "note": "Offers a choice inside a question"
      },
      {
        "en": "We did not go out because it rained.",
        "hi": "हम बाहर नहीं गए क्योंकि बारिश हुई।",
        "note": "Joins a negative sentence to its reason"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "My father and mother is at home.",
          "My father and mother are at home.",
          "My father and mother am at home."
        ],
        "answer": 1,
        "note": "Two subjects joined by and take a plural verb"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "The match was cancelled because rain.",
          "The match was cancelled because of rain.",
          "The match was cancelled because it rain."
        ],
        "answer": 1,
        "note": "Because of comes before a noun"
      },
      {
        "type": "cloze",
        "prompt": "I wanted to play ___ it was raining.",
        "options": [
          "but",
          "and",
          "so",
          "or"
        ],
        "answer": 0,
        "note": "But shows contrast between the two ideas"
      },
      {
        "type": "cloze",
        "prompt": "She missed the bus ___ she woke up late.",
        "options": [
          "because",
          "but",
          "so",
          "or"
        ],
        "answer": 0,
        "note": "Because gives the reason for the action"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "very",
          "He",
          "but",
          "happy.",
          "is",
          "poor"
        ],
        "answer": "He is poor but very happy.",
        "note": "But joins two opposite descriptions"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "crowded.",
          "but",
          "shop",
          "The",
          "very",
          "open",
          "was"
        ],
        "answer": "The shop was open but very crowded.",
        "note": "But joins two contrasting facts"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "We stayed home because the heavy rain.",
        "options": [
          "We stayed home",
          "because",
          "the heavy rain."
        ],
        "answer": 1,
        "note": "Because needs a verb; because of needs a noun"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "I was tired because so I slept early.",
        "options": [
          "I was tired",
          "because so",
          "I slept early."
        ],
        "answer": 1,
        "note": "Use because or so, never both together"
      },
      {
        "type": "cloze",
        "prompt": "My sister ___ I go to the same school.",
        "options": [
          "and",
          "but",
          "or",
          "because"
        ],
        "answer": 0,
        "note": "And joins two people as one subject"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "cheap",
          "The",
          "very",
          "and",
          "tasty.",
          "was",
          "food"
        ],
        "answer": "The food was cheap and very tasty.",
        "note": "And joins two similar descriptions"
      }
    ],
    "sourceOrder": 29,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "S + V + and/but/because + S + V",
      "forms": [
        {
          "kind": "positive",
          "formula": "S + V1 + N + and + N",
          "en": "I like tea and coffee."
        },
        {
          "kind": "negative",
          "formula": "S + did + not + V1 + because + S + V2",
          "en": "We did not go out because it rained."
        },
        {
          "kind": "question",
          "formula": "Do + S + V1 + N + or + N?",
          "en": "Do you want tea or milk?"
        }
      ],
      "exceptions": [
        "Because comes before S + V, but because of comes before a noun",
        "Never use because and so together in one sentence"
      ],
      "hindiTip": "and दो मिलती बातें जोड़ता है, but अंतर दिखाता है और because कारण बताता है। because के बाद कर्ता और क्रिया दोनों चाहिए, केवल संज्ञा नहीं।"
    }
  }
);
