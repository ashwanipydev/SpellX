// Topic 38 - Answering Questions (Level 5 — Speaking & Writing).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 38,
    "topic": "answering-questions",
    "title": "Answering Questions",
    "titleHindi": "प्रश्नों के उत्तर देना",
    "level": 5,
    "levelLabel": "Level 5 — Speaking & Writing",
    "keywords": [],
    "summary": "Answering short and long, politely and clearly.",
    "explanationHindi": "प्रश्न का उत्तर छोटा या पूरा, दोनों तरह से दिया जा सकता है। हाँ या नहीं में उत्तर वाले प्रश्न के छोटे उत्तर में Yes या No के बाद वही सहायक क्रिया दोहराइए जो प्रश्न में थी, जैसे I do या she is। wh-प्रश्न का उत्तर हमेशा पूरे वाक्य में दीजिए। यदि उत्तर नहीं आता तो विनम्रता से क्षमा माँगिए और साफ़ कहिए कि आप नहीं जानते।",
    "points": [
      "Answer a yes-no question with Yes or No and the same helper",
      "Answer a wh-question with a full sentence about the missing detail",
      "Repeat the helping verb in short answers: Yes, I do"
    ],
    "examples": [
      {
        "en": "Yes, I am a student.",
        "hi": "हाँ, मैं एक विद्यार्थी हूँ।",
        "note": "A yes answer repeats am from the question"
      },
      {
        "en": "No, she is not my sister.",
        "hi": "नहीं, वह मेरी बहन नहीं है।",
        "note": "Negative answers put not after the helping verb"
      },
      {
        "en": "I live in a small town.",
        "hi": "मैं एक छोटे शहर में रहता हूँ।",
        "note": "A wh-question is answered with a full sentence"
      },
      {
        "en": "Sorry, I do not know.",
        "hi": "क्षमा करें, मुझे यह नहीं पता।",
        "note": "Use sorry politely when you cannot answer"
      },
      {
        "en": "Because my father works here.",
        "hi": "क्योंकि मेरे पिता यहाँ काम करते हैं।",
        "note": "A why-question is answered with because"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which answer is correct?",
        "options": [
          "No, he not is a doctor.",
          "No, he is not a doctor.",
          "No, he does not a doctor."
        ],
        "answer": 1,
        "note": "The negative answer keeps is and adds not"
      },
      {
        "type": "chooser",
        "prompt": "Which answer fits the question 'Where do you live?'",
        "options": [
          "I live near the old market.",
          "Yes, I live near the old market.",
          "Because I live near the old market."
        ],
        "answer": 0,
        "note": "A where-question is answered with a place, not yes"
      },
      {
        "type": "chooser",
        "prompt": "Which answer is correct?",
        "options": [
          "No, she not eat meat.",
          "No, she does not eats meat.",
          "No, she does not eat meat."
        ],
        "answer": 2,
        "note": "Not comes after does, and eat stays base"
      },
      {
        "type": "cloze",
        "prompt": "Yes, I ___ like this book.",
        "options": [
          "do",
          "does",
          "am",
          "are"
        ],
        "answer": 0,
        "note": "With I, the answer uses do"
      },
      {
        "type": "cloze",
        "prompt": "No, she ___ not like coffee.",
        "options": [
          "do",
          "does",
          "is",
          "are"
        ],
        "answer": 1,
        "note": "She takes does, so the answer uses does not"
      },
      {
        "type": "cloze",
        "prompt": "Yes, she ___ a good teacher.",
        "options": [
          "are",
          "do",
          "is",
          "does"
        ],
        "answer": 2,
        "note": "A yes answer repeats the verb is"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "near",
          "station",
          "I",
          "the",
          "live",
          "railway"
        ],
        "answer": "I live near the railway station.",
        "note": "A full answer repeats the subject and the verb"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "my",
          "friends",
          "They",
          "are",
          "close"
        ],
        "answer": "They are my close friends.",
        "note": "Plural answers use are, not is"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "No, she not is my teacher.",
        "options": [
          "No,",
          "she not",
          "is",
          "my teacher."
        ],
        "answer": 1,
        "note": "In a short answer, not comes after is"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "No, he do not play cricket.",
        "options": [
          "No,",
          "he",
          "do",
          "not play cricket."
        ],
        "answer": 2,
        "note": "With he, the negative answer uses does not"
      }
    ],
    "sourceOrder": 38,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "Yes/No + S + Aux",
      "forms": [
        {
          "kind": "form",
          "formula": "Yes/No + S + Aux",
          "en": "Yes, I am a student."
        },
        {
          "kind": "example",
          "formula": "S + V1 + O (full answer)",
          "en": "I live in a small town."
        },
        {
          "kind": "avoid",
          "formula": "Yes/No + S + N",
          "en": "Yes, I student."
        }
      ],
      "exceptions": [
        "In short answers repeat only the Aux, not the V: Yes, I do",
        "Use do not with I/you/we/they and does not with he/she/it"
      ],
      "hindiTip": "हाँ या नहीं वाले प्रश्न के छोटे उत्तर में Yes या No के बाद वही सहायक क्रिया दोहराइए जो प्रश्न में थी, जैसे Yes, I do। wh-प्रश्न का उत्तर हमेशा पूरे वाक्य में दीजिए, और उत्तर न आने पर विनम्रता से Sorry, I do not know कहिए।"
    }
  }
);
