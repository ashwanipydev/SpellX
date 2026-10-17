// Topic 40 - Describing Places (Level 5 — Speaking & Writing).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 40,
    "topic": "describing-places",
    "title": "Describing Places",
    "titleHindi": "स्थानों का वर्णन करना",
    "level": 5,
    "levelLabel": "Level 5 — Speaking & Writing",
    "keywords": [],
    "summary": "Talking about places, directions and surroundings.",
    "explanationHindi": "किसी जगह का वर्णन करते समय पहले बताइए कि वहाँ क्या-क्या मौजूद है और वह कैसी दिखती है। एक चीज़ के लिए एकवचन और अनेक चीज़ों के लिए बहुवचन वाला रूप प्रयोग करें, फिर स्थान बताने वाले शब्दों से यह भी स्पष्ट करें कि वस्तु कहाँ है। जगह की विशेषता बताने के लिए बड़ा, साफ़ या शांत जैसे विशेषण संज्ञा से पहले रखें।",
    "points": [
      "Use there is for one thing and there are for many things",
      "Use in, on, near, behind and next to to show where a place is",
      "Put a describing word like big or clean before the noun"
    ],
    "examples": [
      {
        "en": "There is a big park near my house.",
        "hi": "मेरे घर के पास एक बड़ा बगीचा है।",
        "note": "There is names one thing in a place"
      },
      {
        "en": "There are two shops behind the school.",
        "hi": "स्कूल के पीछे दो दुकानें हैं।",
        "note": "There are names many things in a place"
      },
      {
        "en": "Our village is quiet and very clean.",
        "hi": "हमारा गाँव शांत और बहुत साफ़ है।",
        "note": "Two describing words tell us about the place"
      },
      {
        "en": "There is no hotel in our town.",
        "hi": "हमारे कस्बे में कोई होटल नहीं है।",
        "note": "No makes the sentence negative about the place"
      },
      {
        "en": "Where is the nearest bus stop?",
        "hi": "सबसे पास का बस अड्डा कहाँ है।",
        "note": "A question about where a place is"
      }
    ],
    "exercises": [
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "There is many shops near my house.",
          "There are many shops near my house.",
          "There have many shops near my house."
        ],
        "answer": 1,
        "note": "Many shops need there are, not there is"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "My town is a busy place.",
          "My town are a busy place.",
          "My town be a busy place."
        ],
        "answer": 0,
        "note": "One town takes is, not are"
      },
      {
        "type": "cloze",
        "prompt": "There ___ a small river near the farm.",
        "options": [
          "is",
          "are",
          "have",
          "be"
        ],
        "answer": 0,
        "note": "One river takes there is"
      },
      {
        "type": "cloze",
        "prompt": "The shops ___ behind the new hospital.",
        "options": [
          "is",
          "are",
          "was",
          "has"
        ],
        "answer": 1,
        "note": "Plural shops take are, not is"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "behind",
          "There",
          "a",
          "lake",
          "is",
          "village",
          "the",
          "small"
        ],
        "answer": "There is a small lake behind the village.",
        "note": "There is comes before the thing described"
      },
      {
        "type": "order",
        "prompt": "Put the words in the right order.",
        "words": [
          "is",
          "temple",
          "near",
          "The",
          "river",
          "old",
          "the"
        ],
        "answer": "The old temple is near the river.",
        "note": "The place word comes after the verb"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "Our city have many big parks.",
        "options": [
          "Our city",
          "have",
          "many big parks."
        ],
        "answer": 1,
        "note": "One city takes has, not have"
      },
      {
        "type": "spot",
        "prompt": "Find the mistake.",
        "sentence": "The shop is near of the temple.",
        "options": [
          "The shop",
          "is",
          "near of",
          "the temple."
        ],
        "answer": 2,
        "note": "Near does not need of after it"
      },
      {
        "type": "chooser",
        "prompt": "Which sentence is correct?",
        "options": [
          "Our school is opposite the post office.",
          "Our school is opposite to near the post office.",
          "Our school is opposite of the post office."
        ],
        "answer": 0,
        "note": "Opposite stands alone without of or to"
      },
      {
        "type": "cloze",
        "prompt": "The garden ___ very beautiful in spring.",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "answer": 1,
        "note": "One garden takes is in the present"
      }
    ],
    "sourceOrder": 40,
    "source": "English Grammar Topics list supplied by user",
    "rules": {
      "pattern": "there is/are + N + Adv",
      "forms": [
        {
          "kind": "positive",
          "formula": "there is/are + Adj + N + Adv",
          "en": "There is a big park near my house."
        },
        {
          "kind": "negative",
          "formula": "there is/are + no + N + Adv",
          "en": "There is no hotel in our town."
        },
        {
          "kind": "question",
          "formula": "is/are + there + N + Adv?",
          "en": "Is there a bus stop near the school?"
        }
      ],
      "exceptions": [
        "Use there are with plural nouns and there is with one thing",
        "Near and opposite take no of after them: near the temple"
      ],
      "hindiTip": "एक चीज़ के लिए there is और अनेक चीज़ों के लिए there are का प्रयोग कीजिए, जैसे there is a park और there are two shops। जगह बताने वाले शब्द संज्ञा के बाद आते हैं, इसलिए near my house कहिए, my house near नहीं।"
    }
  }
);
