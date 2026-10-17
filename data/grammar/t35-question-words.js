// Topic 35 - Question Words (Level 4 — Important Grammar).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 35,
    "topic": "question-words",
    "title": "Question Words",
    "titleHindi": "प्रश्नवाचक शब्द",
    "level": 4,
    "levelLabel": "Level 4 — Important Grammar",
    "keywords": [
      "who",
      "what",
      "where",
      "when",
      "why",
      "how"
    ],
    "summary": "The six words that start most questions.",
    "explanationHindi": "who, what, where, when, why और how वे शब्द हैं जिनसे अधिकतर प्रश्न शुरू होते हैं। प्रश्न बनाते समय पहले प्रश्नवाचक शब्द आता है, उसके बाद सहायक क्रिया और फिर कर्ता। who व्यक्ति के लिए, what वस्तु के लिए, where स्थान के लिए, when समय के लिए, why कारण के लिए और how तरीके के लिए पूछता है।",
    "points": [
      "Question words come first, before the helping verb and the subject",
      "Use who for people, what for things and where for places",
      "Use when for time, why for reasons and how for manner"
    ],
    "examples": [
      {
        "en": "Who is waiting at the front door?",
        "hi": "सामने के दरवाज़े पर कौन इंतज़ार कर रहा है।",
        "note": "Who asks about a person"
      },
      {
        "en": "What do you want for dinner?",
        "hi": "आप रात के खाने में क्या चाहते हैं।",
        "note": "What asks about a thing"
      },
      {
        "en": "Where did you find this old key?",
        "hi": "आपको यह पुरानी चाबी कहाँ मिली।",
        "note": "Where asks about a place"
      },
      {
        "en": "When does the last bus leave?",
        "hi": "आख़िरी बस कब निकलती है।",
        "note": "When asks about time"
      },
      {
        "en": "Why is the baby crying so loudly?",
        "hi": "बच्चा इतनी ज़ोर से क्यों रो रहा है।",
        "note": "Why asks about a reason"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "What do you keep your school bag?",
          "Where do you keep your school bag?",
          "Who do you keep your school bag?"
        ],
        "answer": 1,
        "note": "Where asks about a place"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "How many do you go to school every day?",
          "How much you go to school every day?",
          "How do you go to school every day?"
        ],
        "answer": 2,
        "note": "How asks about the way you do something"
      },
      {
        "type": "cloze",
        "prompt": "___ is your English teacher called?",
        "options": [
          "Who",
          "What",
          "Where",
          "When"
        ],
        "answer": 1,
        "note": "What asks for a name here"
      },
      {
        "type": "cloze",
        "prompt": "___ are you late for the class today?",
        "options": [
          "What",
          "Where",
          "Why",
          "Who"
        ],
        "answer": 2,
        "note": "Why asks for a reason"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "the",
          "Where",
          "post",
          "is",
          "nearest",
          "office"
        ],
        "answer": "Where is the nearest post office?",
        "note": "Where comes first in the question"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "your",
          "When",
          "from",
          "return",
          "brother",
          "will",
          "work"
        ],
        "answer": "When will your brother return from work?",
        "note": "When asks about the time of an action"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Why you are crying so loudly?",
        "options": [
          "Why",
          "you are",
          "crying so loudly?"
        ],
        "answer": 1,
        "note": "The helping verb comes before the subject"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "How much brothers do you have?",
        "options": [
          "How",
          "much",
          "brothers do you have?"
        ],
        "answer": 1,
        "note": "Brothers are countable, so use how many"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "Who you did meet at the market?",
          "Who did you met at the market?",
          "Who did you meet at the market?"
        ],
        "answer": 2,
        "note": "After who, the helping verb comes next"
      },
      {
        "type": "cloze",
        "prompt": "___ colour do you like the most?",
        "options": [
          "When",
          "What",
          "Who",
          "Why"
        ],
        "answer": 1,
        "note": "What asks about a thing"
      }
    ],
    "sourceOrder": 35,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "Wh-word + Aux + S + V",
      "forms": [
        {
          "kind": "form",
          "formula": "Wh-word + Aux + S + V?",
          "en": "Where is the post office?"
        },
        {
          "kind": "example",
          "formula": "Who + V1 + O?",
          "en": "Who wants more tea?"
        },
        {
          "kind": "avoid",
          "formula": "Wh-word + S + V?",
          "en": "Where you are going?"
        }
      ],
      "exceptions": [
        "When who is the subject, no do/does/did comes: Who broke the glass?",
        "how many asks about countable N, how much about uncountable N"
      ],
      "hindiTip": "प्रश्नवाचक शब्द हमेशा सबसे पहले आता है, उसके बाद सहायक क्रिया और फिर कर्ता आता है। who व्यक्ति के लिए, where स्थान के लिए और when समय के लिए पूछता है।"
    }
  }
);
