// Topic 18 - Can, Could, Should, Would, Must (Level 2 — Making Sentences).
// Self-registering: data/grammar/index.js rebuilds grammarTopics from this registry.
(window.GRAMMAR_TOPICS = window.GRAMMAR_TOPICS || []).push(
  {
    "id": 18,
    "topic": "modal-verbs",
    "title": "Modal Verbs",
    "titleHindi": "सहायक क्रियाएँ",
    "level": 2,
    "levelLabel": "Level 2 — Making Sentences",
    "keywords": [
      "can", "could", "will", "would", "should", "must", "may", "might", "need to"
    ],
    "summary": "Modal and semi-modal helpers for ability, permission, advice, possibility, future and obligation.",
    "explanationHindi": "can, could, will, would, should, must, may और might जैसे modal सहायक शब्द मुख्य क्रिया से पहले आकर क्षमता, अनुमति, भविष्य, सलाह, संभावना या ज़रूरत का भाव बताते हैं। इनके बाद मुख्य क्रिया का मूल रूप बिना to के आता है। Need to एक semi-modal है और इसके बाद to + मूल क्रिया आती है। विनम्रता के अलग स्तर दिखाने के लिए can, could और would का प्रयोग किया जा सकता है।",
    "points": [
      "Can/could show ability or requests; will shows future and decisions",
      "Should gives advice; must shows a strong rule or necessity",
      "Modal + base verb without to; need to is a semi-modal exception"
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
      "hindiTip": "मुख्य modal के बाद V1 बिना to और बिना -s के आता है। Need to अलग है: इसके बाद to + V1 आता है।"
    },
    "modalGuide": {
      "modals": [
        { "name": "Can", "use": "Ability, informal request or possibility", "hindi": "सकना / अनौपचारिक निवेदन", "example": "I can speak Hindi and English." },
        { "name": "Could", "use": "Past ability, polite request or suggestion", "hindi": "सकता था / विनम्र निवेदन", "example": "Could you please send me the report?" },
        { "name": "Will", "use": "Future event, promise or decision", "hindi": "करूँगा / होगा", "example": "I will send you the file today." },
        { "name": "Would", "use": "Polite request, invitation or conditional idea", "hindi": "विनम्र इच्छा / निवेदन", "example": "Would you be available for a quick call?" },
        { "name": "Should", "use": "Advice or recommendation", "hindi": "चाहिए", "example": "You should review the budget first." },
        { "name": "Must", "use": "Strong necessity, rule or obligation", "hindi": "ज़रूर करना है / अनिवार्य", "example": "All changes must be tested before release." },
        { "name": "May", "use": "Formal permission or possibility", "hindi": "क्या मैं / संभव है", "example": "May I share my screen?" },
        { "name": "Might", "use": "Less-certain possibility", "hindi": "शायद, कम संभावना", "example": "I might be late to the meeting." },
        { "name": "Need to", "use": "Semi-modal for everyday necessity; keep to", "hindi": "ज़रूरत है / करना है", "example": "I need to finish this before the deadline." }
      ],
      "politeness": [
        "Direct: Send me the file.",
        "Friendly: Can you send me the file?",
        "Polite: Could you please send me the file?",
        "Very polite: Would you be able to send me the file when you get a chance?"
      ],
      "mistakes": [
        { "wrong": "I can to speak English.", "right": "I can speak English.", "why": "Use the base verb directly after a modal." },
        { "wrong": "She musts attend the meeting.", "right": "She must attend the meeting.", "why": "Modals do not take -s for he, she or it." },
        { "wrong": "You should to call him.", "right": "You should call him.", "why": "Do not put to after should." },
        { "wrong": "Can you please to send the file?", "right": "Can you please send the file?", "why": "Use the base verb directly after can." },
        { "wrong": "I am willing to can go.", "right": "I can go. / I am willing to go.", "why": "Do not put two modals together." },
        { "wrong": "You must to register.", "right": "You must register.", "why": "Must is followed by the base verb without to." },
        { "wrong": "May I to ask a question?", "right": "May I ask a question?", "why": "May is followed by the base verb without to." },
        { "wrong": "He might to be late.", "right": "He might be late.", "why": "Might is followed by the base verb without to." },
        { "wrong": "I would like going.", "right": "I would like to go.", "why": "Would like is followed by to + verb." },
        { "wrong": "We could went yesterday.", "right": "We could have gone yesterday.", "why": "For a past possibility use modal + have + V3." }
      ],
      "officeSentences": [
        "Could you please review this before the meeting?",
        "I will send the summary email shortly.",
        "We should align on the deliverables first.",
        "May I share a few thoughts on this?",
        "Would you be available for a 15-minute call?",
        "This document must be approved before publishing.",
        "Can you take the lead on this task?",
        "The timeline might shift by a day or two.",
        "Could we table this for the next meeting?",
        "You should keep the client informed about the delay.",
        "I will follow up with the team and share an update.",
        "I would appreciate it if you could review this today.",
        "The results may not be available until next week.",
        "All changes must be tested before going live.",
        "We need to finalize the agenda before Friday.",
        "Can everyone confirm their availability for Monday?",
        "I might need to escalate this issue.",
        "Could you clarify what you mean by urgent?",
        "We should document this process for future reference.",
        "Would it be possible to get this done by Wednesday?"
      ],
      "emailPhrases": [
        "I would like to follow up on my earlier email.",
        "Could you please share your feedback by Thursday?",
        "I will send you the updated report by end of day.",
        "You may find the attached document useful.",
        "Please let me know if I can help with anything else."
      ],
      "tips": [
        "Politeness often moves from can to could to would; choose the tone that fits the situation.",
        "Modal verbs do not take -s or -ed. Say he can, not he cans.",
        "Should gives advice; must expresses a stronger requirement.",
        "May and might both show possibility; might often sounds less certain."
      ]
    }
  }
);
