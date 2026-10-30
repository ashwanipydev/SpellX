!function () {
  "use strict";
  window.B850 = window.B850 || {};
  window.B850.reading = {
    passages: [
    {
      id: "beginner-morning",
      level: "beginner",
      kind: "Daily life",
      title: "A Quiet Morning",
      description: "A short story about a morning routine.",
      sentences: [
        { text: "Asha gets up early.", translationHi: "आशा जल्दी उठती है।", simple: "Asha wakes up before most people." },
        { text: "She opens the window and looks at the garden.", translationHi: "वह खिड़की खोलती है और बगीचे को देखती है।", simple: "She lets fresh air in and sees the garden." },
        { text: "The air is cool, and the birds sing.", translationHi: "हवा ठंडी है और पक्षी गाते हैं।", simple: "The weather is cool. Birds make their morning sounds." },
        { text: "Asha reads a short story before breakfast.", translationHi: "आशा नाश्ते से पहले एक छोटी कहानी पढ़ती है।", simple: "She reads for a little while before she eats." }
      ],
      vocabulary: {
        early: { hi: "जल्दी", definition: "Before the usual time.", pronunciation: "UR-lee", example: "Asha gets up early." },
        garden: { hi: "बगीचा", definition: "A place outside where plants and flowers grow.", pronunciation: "GAR-dn", example: "She looks at the garden." },
        cool: { hi: "ठंडा", definition: "A little cold, but not very cold.", pronunciation: "kool", example: "The air is cool." },
        breakfast: { hi: "नाश्ता", definition: "The first meal of the day.", pronunciation: "BREK-fuhst", example: "She reads before breakfast." }
      },
      activities: [
        { type: "choice", prompt: "What does Asha do before breakfast?", options: ["She reads a story.", "She goes to work.", "She buys some fruit."], answer: "She reads a story.", explanation: "The last sentence says that Asha reads before breakfast." },
        { type: "fill", prompt: "Choose the missing word: The air is ___.", options: ["cool", "loud", "late"], answer: "cool", explanation: "The passage describes the morning air as cool." },
        { type: "vocabulary", prompt: "What does “early” mean in this passage?", options: ["Before the usual time", "Very far away", "Without any sound"], answer: "Before the usual time", explanation: "Asha gets up before the usual time." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["gets", "early.", "Asha", "up"], answer: "Asha gets up early." }
      ]
    },
    {
      id: "beginner-market",
      level: "beginner",
      kind: "Everyday conversation",
      title: "At the Market",
      description: "A family shops for food.",
      sentences: [
        { text: "Ravi walks to the market with his mother.", translationHi: "रवि अपनी माँ के साथ बाज़ार जाता है।", simple: "Ravi goes to the place where people buy things." },
        { text: "They buy fresh fruit and a loaf of bread.", translationHi: "वे ताज़े फल और एक डबलरोटी खरीदते हैं।", simple: "They choose fruit and one whole piece of bread." },
        { text: "Ravi carries the bag home.", translationHi: "रवि थैला घर ले जाता है।", simple: "Ravi takes the bag to their house." },
        { text: "His mother thanks him for helping.", translationHi: "उसकी माँ मदद करने के लिए उसे धन्यवाद देती है।", simple: "His mother says she is glad he helped." }
      ],
      vocabulary: {
        market: { hi: "बाज़ार", definition: "A place where people buy and sell things.", pronunciation: "MAR-kit", example: "Ravi walks to the market." },
        fresh: { hi: "ताज़ा", definition: "New, clean, or recently made or picked.", pronunciation: "fresh", example: "They buy fresh fruit." },
        loaf: { hi: "डबलरोटी का पूरा टुकड़ा", definition: "A whole piece of bread, usually shaped for slicing.", pronunciation: "lohf", example: "They buy a loaf of bread." },
        carries: { hi: "ले जाता है", definition: "Takes something while holding or supporting it.", pronunciation: "KAR-eez", example: "Ravi carries the bag home." }
      },
      activities: [
        { type: "choice", prompt: "Who goes to the market with Ravi?", options: ["His mother", "His teacher", "His friend"], answer: "His mother", explanation: "Ravi walks with his mother." },
        { type: "fill", prompt: "Choose the missing word: They buy fresh fruit and a ___ of bread.", options: ["loaf", "box", "cup"], answer: "loaf", explanation: "A loaf is a whole piece of bread." },
        { type: "vocabulary", prompt: "What is a “market”?", options: ["A place to buy and sell things", "A place to grow flowers", "A room for sleeping"], answer: "A place to buy and sell things", explanation: "People go to a market to buy or sell things." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["the", "Ravi", "home.", "bag", "carries"], answer: "Ravi carries the bag home." }
      ]
    },
    {
      id: "intermediate-team-update",
      level: "intermediate",
      kind: "Software development",
      title: "A Small App Update",
      description: "A team reviews feedback and plans a software change.",
      sentences: [
        { text: "Our team planned a small update for the reading app.", translationHi: "हमारी टीम ने रीडिंग ऐप के लिए एक छोटा अपडेट बनाया।", simple: "The team decided to make a small change to the app." },
        { text: "At the meeting, Mira shared feedback from new users.", translationHi: "बैठक में मीरा ने नए उपयोगकर्ताओं की राय साझा की।", simple: "Mira told the team what new users thought about the app." },
        { text: "They agreed to fix the sign-in issue first.", translationHi: "वे पहले साइन-इन की समस्या ठीक करने पर सहमत हुए।", simple: "The team chose to repair the login problem before other work." },
        { text: "Then they will test the change before Friday.", translationHi: "फिर वे शुक्रवार से पहले बदलाव की जाँच करेंगे।", simple: "After fixing it, they will check that the change works." }
      ],
      vocabulary: {
        update: { hi: "अपडेट / नया बदलाव", definition: "A change that improves or adds something.", pronunciation: "UHP-dayt", example: "The team planned a small update." },
        feedback: { hi: "राय / प्रतिक्रिया", definition: "Information about what someone thinks or experiences.", pronunciation: "FEED-bak", example: "Mira shared feedback from users." },
        agreed: { hi: "सहमत हुए", definition: "Had the same opinion or made a shared decision.", pronunciation: "uh-GREED", example: "They agreed to fix the issue." },
        issue: { hi: "समस्या", definition: "A problem that needs attention.", pronunciation: "ISH-oo", example: "They fixed the sign-in issue." },
        test: { hi: "जाँच करना", definition: "To check whether something works correctly.", pronunciation: "test", example: "They will test the change." }
      },
      activities: [
        { type: "choice", prompt: "What did the team decide to fix first?", options: ["The sign-in issue", "The app colours", "The meeting room"], answer: "The sign-in issue", explanation: "The team agreed to fix the sign-in issue first." },
        { type: "fill", prompt: "Choose the missing word: Mira shared ___ from new users.", options: ["feedback", "a recipe", "a password"], answer: "feedback", explanation: "Feedback tells the team what users think." },
        { type: "vocabulary", prompt: "What is “feedback”?", options: ["Information about what someone thinks", "A list of computer parts", "A date for a meeting"], answer: "Information about what someone thinks", explanation: "The team uses feedback to learn what users think." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["the", "They", "change.", "will", "test", "the"], answer: "They will test the change." }
      ]
    },
    {
      id: "intermediate-work-email",
      level: "intermediate",
      kind: "Workplace email",
      title: "A Clear Project Email",
      description: "A polite email shares a task and a deadline.",
      sentences: [
        { text: "Subject: Draft for the team guide.", translationHi: "विषय: टीम गाइड का प्रारूप।", simple: "The email is about an early version of a guide for the team." },
        { text: "Hello team, I have attached the first draft.", translationHi: "नमस्ते टीम, मैंने पहला प्रारूप साथ में भेजा है।", simple: "The writer sent an early version of the guide with the email." },
        { text: "Please review the safety steps and share your comments.", translationHi: "कृपया सुरक्षा के चरण पढ़ें और अपनी टिप्पणियाँ साझा करें।", simple: "The writer asks the team to check the safety steps and respond." },
        { text: "If possible, send your feedback by Thursday afternoon.", translationHi: "यदि संभव हो, तो गुरुवार दोपहर तक अपनी राय भेजें।", simple: "The writer would like a reply before Thursday afternoon." },
        { text: "Thank you for helping us prepare the final version.", translationHi: "अंतिम संस्करण तैयार करने में मदद के लिए धन्यवाद।", simple: "The writer thanks the team for helping finish the guide." }
      ],
      vocabulary: {
        draft: { hi: "प्रारूप", definition: "An early version that may still change.", pronunciation: "draft", example: "I have attached the first draft." },
        attached: { hi: "साथ में जोड़ा हुआ", definition: "Included with a message or document.", pronunciation: "uh-TACHT", example: "I have attached the first draft." },
        review: { hi: "समीक्षा करना", definition: "To read or check something carefully.", pronunciation: "ri-VYOO", example: "Please review the safety steps." },
        comments: { hi: "टिप्पणियाँ", definition: "Ideas or opinions written in response.", pronunciation: "KOM-ents", example: "Share your comments." },
        version: { hi: "संस्करण", definition: "A particular form of a document or product.", pronunciation: "VUR-zhun", example: "Prepare the final version." }
      },
      activities: [
        { type: "choice", prompt: "What should the team review?", options: ["The safety steps", "A travel plan", "A new password"], answer: "The safety steps", explanation: "The email asks the team to review the safety steps." },
        { type: "fill", prompt: "Choose the missing word: Please review the safety steps and share your ___.", options: ["comments", "lunch", "address"], answer: "comments", explanation: "The email requests written comments." },
        { type: "vocabulary", prompt: "What is a “draft”?", options: ["An early version that may change", "A final meeting time", "A message sent by phone"], answer: "An early version that may change", explanation: "The first draft is an early version of the guide." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["draft.", "I", "attached", "have", "first", "the"], answer: "I have attached the first draft." }
      ]
    },
    {
      id: "advanced-interview",
      level: "advanced",
      kind: "Interview practice",
      title: "Explaining a Difficult Project",
      description: "An interview answer connects a challenge, an action, and a result.",
      sentences: [
        { text: "The interviewer asked Nisha to describe a project that had not gone as planned.", translationHi: "साक्षात्कारकर्ता ने निशा से ऐसी परियोजना के बारे में बताने को कहा जो योजना के अनुसार नहीं चली थी।", simple: "The interviewer asked Nisha to talk about a project with problems." },
        { text: "She explained that unclear requirements had delayed the first release.", translationHi: "उसने बताया कि अस्पष्ट आवश्यकताओं के कारण पहली रिलीज़ में देरी हुई थी।", simple: "She said that the team did not fully understand what was needed, so the release was late." },
        { text: "Rather than blaming a colleague, she described how the team clarified priorities and shared progress each week.", translationHi: "किसी सहकर्मी को दोष देने के बजाय, उसने बताया कि टीम ने प्राथमिकताएँ कैसे स्पष्ट कीं और हर सप्ताह प्रगति साझा की।", simple: "Instead of saying someone was at fault, she explained how the team agreed on important work and gave weekly updates." },
        { text: "The revised process reduced confusion and helped the next release arrive on schedule.", translationHi: "संशोधित प्रक्रिया ने भ्रम कम किया और अगली रिलीज़ समय पर तैयार करने में मदद की।", simple: "The new way of working made things clearer, so the next release was on time." }
      ],
      vocabulary: {
        interviewer: { hi: "साक्षात्कारकर्ता", definition: "A person who asks questions during an interview.", pronunciation: "IN-ter-vyoo-er", example: "The interviewer asked Nisha a question." },
        requirements: { hi: "आवश्यकताएँ", definition: "The things that a task or product must include.", pronunciation: "ri-KWY-er-ments", example: "The team clarified the requirements." },
        delayed: { hi: "देरी की", definition: "Made something happen later than planned.", pronunciation: "di-LAYD", example: "Unclear requirements delayed the release." },
        priorities: { hi: "प्राथमिकताएँ", definition: "The things that are most important to do first.", pronunciation: "pry-OR-uh-teez", example: "The team clarified priorities." },
        revised: { hi: "संशोधित", definition: "Changed in order to improve or correct something.", pronunciation: "ri-VYZD", example: "The revised process reduced confusion." }
      },
      activities: [
        { type: "choice", prompt: "What caused the first release to be delayed?", options: ["Unclear requirements", "A missing interview", "A new office"], answer: "Unclear requirements", explanation: "Nisha connected the delay to requirements that were not clear." },
        { type: "fill", prompt: "Choose the missing word: The team clarified its ___ and shared progress each week.", options: ["priorities", "holidays", "addresses"], answer: "priorities", explanation: "Priorities are the most important tasks to do first." },
        { type: "vocabulary", prompt: "What are “requirements”?", options: ["Things a task or product must include", "People who attend a meeting", "Changes made after a release"], answer: "Things a task or product must include", explanation: "The team needed to understand what the project had to include." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["reduced", "The", "confusion.", "process", "revised"], answer: "The revised process reduced confusion." }
      ]
    },
    {
      id: "advanced-city-transport",
      level: "advanced",
      kind: "News-style explainer",
      title: "Why a City Is Rethinking Bus Routes",
      description: "An original explainer about planning public transport.",
      sentences: [
        { text: "A city transport committee is reviewing bus routes after residents reported long waits in several neighbourhoods.", translationHi: "कई मोहल्लों के निवासियों द्वारा लंबे इंतज़ार की सूचना देने के बाद नगर परिवहन समिति बस मार्गों की समीक्षा कर रही है।", simple: "People in several areas said that buses took a long time to arrive, so the city group is checking the routes." },
        { text: "The proposal would add more frequent service near the hospital and the evening market.", translationHi: "प्रस्ताव में अस्पताल और शाम के बाज़ार के पास अधिक बार बस सेवा जोड़ने की बात है।", simple: "The plan would send buses more often near two busy places." },
        { text: "Officials say the change depends on driver availability and a public review of the timetable.", translationHi: "अधिकारियों के अनुसार, बदलाव चालकों की उपलब्धता और समय-सारणी की सार्वजनिक समीक्षा पर निर्भर है।", simple: "The plan can happen only if there are enough drivers and people can comment on the schedule." },
        { text: "A final decision has not been announced, and residents can submit feedback before the next meeting.", translationHi: "अंतिम निर्णय की घोषणा नहीं हुई है, और निवासी अगली बैठक से पहले अपनी राय भेज सकते हैं।", simple: "The city has not decided yet. People still have time to share their views." }
      ],
      vocabulary: {
        committee: { hi: "समिति", definition: "A group of people chosen to discuss or decide something.", pronunciation: "kuh-MIT-ee", example: "The transport committee is reviewing the routes." },
        residents: { hi: "निवासी", definition: "People who live in a particular place.", pronunciation: "REZ-uh-dents", example: "Residents reported long waits." },
        proposal: { hi: "प्रस्ताव", definition: "A suggested plan for people to consider.", pronunciation: "pruh-POH-zul", example: "The proposal would add more service." },
        availability: { hi: "उपलब्धता", definition: "The state of being ready or able to be used.", pronunciation: "uh-vay-luh-BIL-uh-tee", example: "The change depends on driver availability." },
        submit: { hi: "जमा करना / भेजना", definition: "To give or send something for consideration.", pronunciation: "sub-MIT", example: "Residents can submit feedback." }
      },
      activities: [
        { type: "choice", prompt: "Why is the committee reviewing bus routes?", options: ["Residents reported long waits.", "The hospital has closed.", "The market moved away."], answer: "Residents reported long waits.", explanation: "Residents said they had to wait a long time for buses." },
        { type: "fill", prompt: "Choose the missing word: The proposal would add more ___ service near the hospital.", options: ["frequent", "silent", "private"], answer: "frequent", explanation: "Frequent service means buses come more often." },
        { type: "vocabulary", prompt: "Who are “residents”?", options: ["People who live in a place", "People who drive buses", "People who visit a market once"], answer: "People who live in a place", explanation: "Residents are people who live in the neighbourhoods." },
        { type: "order", prompt: "Put the words in the order used in the passage.", words: ["submit", "can", "Residents", "feedback."], answer: "Residents can submit feedback." }
      ]
    }
    ],
    articles: [
      { id: "internet-protocol-suite", title: "Internet protocol suite", topic: "Networking", level: "intermediate" },
      { id: "transmission-control-protocol", title: "Transmission Control Protocol", topic: "Networking", level: "advanced" },
      { id: "domain-name-system", title: "Domain Name System", topic: "Networking", level: "intermediate" },
      { id: "world-wide-web", title: "World Wide Web", topic: "Networking", level: "beginner" },
      { id: "linux", title: "Linux", topic: "Operating systems", level: "intermediate" },
      { id: "operating-system", title: "Operating system", topic: "Operating systems", level: "beginner" },
      { id: "unix", title: "Unix", topic: "Operating systems", level: "advanced" },
      { id: "continuous-integration", title: "Continuous integration", topic: "DevOps", level: "intermediate" },
      { id: "version-control", title: "Version control", topic: "DevOps", level: "beginner" },
      { id: "docker-software", title: "Docker (software)", topic: "DevOps", level: "intermediate" },
      { id: "history-of-computing", title: "History of computing", topic: "History and learning", level: "intermediate" },
      { id: "apollo-11", title: "Apollo 11", topic: "History and learning", level: "beginner" }
    ],
    glossary: {
    add: ["जोड़ना", "To put something together with something else.", "ad"],
    afternoon: ["दोपहर", "The part of the day after noon.", "af-ter-NOON"],
    announced: ["घोषणा की", "Made information known publicly.", "uh-NOWNST"],
    app: ["ऐप", "A program made for a phone or computer.", "ap"],
    arrive: ["पहुँचना", "To reach a place.", "uh-RYV"],
    asha: ["आशा (नाम)", "A person's name in this story.", "AA-shaa"],
    asked: ["पूछा", "Said a question or requested information.", "askt"],
    been: ["रहा / हुआ", "A form of “be” used with another verb.", "bin"],
    blaming: ["दोष देना", "Saying that someone is responsible for a problem.", "BLAY-ming"],
    bus: ["बस", "A large road vehicle that carries passengers.", "bus"],
    buy: ["खरीदना", "To get something by paying for it.", "by"],
    can: ["सकना", "Be able to do something.", "kan"],
    city: ["शहर", "A large town where many people live and work.", "SIT-ee"],
    clarified: ["स्पष्ट किया", "Made an idea easier to understand.", "KLAR-uh-fyd"],
    colleague: ["सहकर्मी", "A person you work with.", "KOL-eeg"],
    confusion: ["भ्रम", "A state of not understanding something clearly.", "kun-FYOO-zhun"],
    depends: ["निर्भर करता है", "Needs something else in order to happen.", "di-PENDZ"],
    describe: ["वर्णन करना", "To say what something is like.", "di-SKRYB"],
    described: ["वर्णन किया", "Said what something was like.", "di-SKRYBD"],
    driver: ["चालक", "A person who operates a vehicle.", "DRY-ver"],
    each: ["प्रत्येक", "Every one of two or more people or things, considered separately.", "eech"],
    explained: ["समझाया", "Made an idea clear by giving details.", "ik-SPLAYND"],
    feedback: ["राय / प्रतिक्रिया", "Information about what someone thinks or experiences.", "FEED-bak"],
    final: ["अंतिम", "Coming at the end; not an earlier version.", "FY-nul"],
    fix: ["ठीक करना", "To repair or correct a problem.", "fiks"],
    friday: ["शुक्रवार", "The day after Thursday.", "FRY-day"],
    gone: ["गया / चली गई", "Moved away or left a place.", "gawn"],
    had: ["था / थी", "The past form of “have”.", "had"],
    has: ["है / उसके पास है", "A form of “have” used with he, she, or it.", "haz"],
    hello: ["नमस्ते", "A greeting used when meeting someone.", "heh-LOH"],
    him: ["उसे / उसको", "A word used for a male person as an object.", "him"],
    his: ["उसका", "Belonging to a male person.", "hiz"],
    home: ["घर", "The place where a person lives.", "hohm"],
    mira: ["मीरा (नाम)", "A person's name in this story.", "MEE-raa"],
    more: ["अधिक", "A greater amount or number.", "mor"],
    neighbourhoods: ["मोहल्ले", "Areas of a town where people live.", "NAY-ber-hoodz"],
    next: ["अगला", "Coming immediately after this one.", "nekst"],
    nisha: ["निशा (नाम)", "A person's name in this story.", "NISH-aa"],
    officials: ["अधिकारी", "People who have an official role or responsibility.", "uh-FISH-ulz"],
    our: ["हमारा / हमारी", "Belonging to us.", "OW-er"],
    planned: ["योजना बनाई", "Decided in advance what to do.", "pland"],
    prepare: ["तैयार करना", "To make something ready.", "pri-PAIR"],
    progress: ["प्रगति", "Movement or improvement toward a goal.", "PRAH-gres"],
    project: ["परियोजना", "A piece of planned work with a goal.", "PRAH-jekt"],
    rather: ["बजाय", "Used to show a choice or preference.", "RATH-er"],
    ravi: ["रवि (नाम)", "A person's name in this story.", "RAA-vee"],
    reads: ["पढ़ता / पढ़ती है", "Looks at and understands written words.", "reedz"],
    reduced: ["कम किया", "Made something smaller or less.", "ri-DOOST"],
    release: ["रिलीज़ / जारी करना", "A version of software made available to users.", "ri-LEES"],
    reported: ["बताया / सूचना दी", "Gave information about something that happened.", "ri-POR-tid"],
    review: ["समीक्षा करना", "To look at or check something carefully.", "ri-VYOO"],
    reviewing: ["समीक्षा कर रहा है", "Looking at or checking something carefully.", "ri-VYOO-ing"],
    routes: ["मार्ग", "Ways or paths used to travel between places.", "roots"],
    safety: ["सुरक्षा", "Protection from danger or harm.", "SAYF-tee"],
    schedule: ["समय-सारणी", "A plan showing times for events or services.", "SKEJ-ool"],
    service: ["सेवा", "Work done to help people or meet a need.", "SUR-vis"],
    several: ["कई", "More than two, but not a large number.", "SEV-er-ul"],
    share: ["साझा करना", "To give part of something or tell others about it.", "shair"],
    shared: ["साझा किया", "Gave something to others or told them about it.", "shaird"],
    she: ["वह (स्त्री)", "A word used for a female person.", "shee"],
    sing: ["गाना", "To make music with the voice.", "sing"],
    subject: ["विषय", "The topic or main point of a message.", "SUB-jekt"],
    team: ["टीम", "A group of people working together.", "teem"],
    thank: ["धन्यवाद देना", "To tell someone you are grateful.", "thank"],
    thanks: ["धन्यवाद", "Words used to show gratitude.", "thanks"],
    they: ["वे", "A word used for two or more people or things.", "thay"],
    thursday: ["गुरुवार", "The day before Friday.", "THURZ-day"],
    timetable: ["समय-सारणी", "A list of times when events or services happen.", "TYM-tay-bul"],
    unclear: ["अस्पष्ट", "Not easy to understand.", "un-KLEER"],
    us: ["हमें / हमको", "A word used for the speaker and other people as an object.", "us"],
    users: ["उपयोगकर्ता", "People who use a product or service.", "YOO-zerz"],
    waits: ["इंतज़ार करता है", "Stays until something happens or someone arrives.", "wayts"],
    would: ["होता / करता", "A helping verb used for an imagined or polite action.", "wood"],
    your: ["आपका / तुम्हारा", "Belonging to the person being spoken to.", "yor"]
    }
  };
}();
