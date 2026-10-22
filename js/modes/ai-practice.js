!function () {
  "use strict";
  var S = B850.store, U = B850.ui;

  function topics() {
    return typeof grammarTopics !== "undefined" && Array.isArray(grammarTopics) ? grammarTopics : [];
  }

  function chapters() {
    return Array.isArray(window.GRAMMAR_CHAPTERS) ? window.GRAMMAR_CHAPTERS : [];
  }

  function categories() {
    return Array.isArray(S.CATEGORIES) ? S.CATEGORIES : [];
  }

  function chapterById(id) {
    var all = chapters(), i;
    for (i = 0; i < all.length; i++) {
      if (String(all[i].chapter) === String(id)) { return all[i]; }
    }
    return null;
  }

  function categoryById(id) {
    var all = categories(), i;
    for (i = 0; i < all.length; i++) {
      if (String(all[i].id) === String(id)) { return all[i]; }
    }
    return null;
  }

  function wordsForCategory(category) {
    var words = S.data && Array.isArray(S.data.words) ? S.data.words : [];
    return words.filter(function (word) { return word.category === category.id; });
  }

  function buildPrompt(chapter, category, words) {
    if (!chapter || !category || !Array.isArray(words) || !words.length) { return ""; }
    var lessons = topics().filter(function (topic) {
      return Number(topic.chapter) === Number(chapter.chapter);
    });
    if (!lessons.length) { return ""; }

    var lines = [
      "You are my patient, encouraging personal English tutor. Help me use this chapter's English concepts and vocabulary in realistic situations, not memorize isolated rules.",
      "GRAMMAR CHAPTER: " + chapter.title,
      "CHAPTER OVERVIEW: " + chapter.intro,
      "LESSON OBJECTIVES IN THIS CHAPTER:"
    ];
    lessons.forEach(function (topic) {
      lines.push("LESSON: " + topic.title);
      lines.push("WHAT IT TEACHES: " + topic.summary);
      lines.push("SKILLS TO PRACTISE:");
      (topic.points || []).forEach(function (point) { lines.push("- " + point); });
      if (topic.rules && topic.rules.pattern) {
        lines.push("APPLICABLE RULE OR PATTERN: " + topic.rules.pattern);
        (topic.rules.forms || []).forEach(function (form) {
          lines.push("- " + form.formula + ": " + form.en);
        });
        (topic.rules.exceptions || []).forEach(function (exception) {
          lines.push("- Caution: " + exception);
        });
      } else {
        lines.push("No formal rule is provided for this lesson; teach its concepts and skills without inventing one.");
      }
      var plan = (window.GRAMMAR_AI_PRACTICE_PROMPTS || {})[topic.id];
      if (plan) {
        lines.push("PRACTICE SETTING: " + plan.situation);
        (plan.activities || []).forEach(function (activity) { lines.push("- Practice idea: " + activity); });
      }
    });
    lines.push("VOCABULARY CATEGORY: " + category.label);
    lines.push("WORD BANK (English word — meaning):");
    words.forEach(function (word) {
      lines.push("- " + word.word + " — " + word.meaningEnglish);
    });
    lines.push(
      "PERSONALIZE BEFORE PRACTICE:",
      "- Ask how comfortable I feel with this chapter. Wait for my answer before asking the next question.",
      "- Then ask which real-life context I prefer and wait. Then ask how challenging I want the practice and wait.",
      "- Let me skip any check-in and adapt the scenarios, explanations, and pace to my answers.",
      "HOW TO TUTOR ME:",
      "- Start with one suitable lesson objective from this chapter. Teach and practise one concept at a time, then move to another when I am ready.",
      "- Choose an appropriate, manageable subset of words from the supplied word bank. Do not ask me to select individual words, do not invent meanings, and do not force an awkward sentence just to use a word.",
      "- Begin with a few useful words, then introduce, revisit, or vary words from the bank according to my confidence and performance. Do not try to use every word in one session.",
      "- Combine the vocabulary and chapter concepts in realistic role-play, sentence building or transformation, useful writing, and error correction as appropriate.",
      "- Ask exactly one question or give one task at a time. Wait for my response before continuing.",
      "- Let me try before showing a model answer. Accept correct natural alternatives.",
      "- Tell me what I did well. Correct relevant vocabulary or lesson mistakes, explain the idea simply, and give me a similar retry.",
      "- If I struggle, make the next task easier and explain the concept another way. If I answer accurately, gradually increase the challenge.",
      "- Keep practice focused on real communication. Give Hindi explanations only if I ask.",
      "- At the end, summarize my strengths, recurring errors, and one useful next practice goal.",
      "Start by asking only the first check-in question about my comfort with this chapter. Wait for my answer."
    );
    return lines.join("\n");
  }

  function render() {
    U.clearKey();
    var root = U.h("section", { "class": "screen", "aria-label": "Words and grammar AI practice" });
    var chapterSelect = U.h("select", {
      "class": "combo-chapter-select",
      id: "comboChapter",
      "aria-label": "Choose a grammar chapter"
    });
    var categorySelect = U.h("select", {
      "class": "combo-category-select",
      id: "comboCategory",
      "aria-label": "Choose a vocabulary category"
    });
    var selectionStatus = U.h("p", { "class": "combo-status", role: "status", "aria-live": "polite" });
    var promptText = U.h("textarea", {
      "class": "combo-prompt-text",
      id: "comboPrompt",
      rows: 14,
      readonly: "readonly",
      "aria-label": "Combined vocabulary and grammar tutor prompt"
    });
    var promptStatus = U.h("p", { "class": "combo-status", role: "status", "aria-live": "polite" });
    var copyButton = U.h("button", {
      "class": "btn btn-secondary combo-copy",
      type: "button",
      text: "Copy combined AI tutor prompt",
      disabled: "disabled"
    });

    chapterSelect.appendChild(U.h("option", { value: "", text: "Choose a grammar chapter" }));
    chapters().forEach(function (chapter) {
      chapterSelect.appendChild(U.h("option", {
        value: String(chapter.chapter),
        text: chapter.title
      }));
    });
    categorySelect.appendChild(U.h("option", { value: "", text: "Choose a vocabulary category" }));
    categories().forEach(function (category) {
      categorySelect.appendChild(U.h("option", {
        value: category.id,
        text: category.label
      }));
    });

    function update() {
      var chapter = chapterById(chapterSelect.value);
      var category = categoryById(categorySelect.value);
      var words = category ? wordsForCategory(category) : [];
      var ready = !!(chapter && category && words.length);
      if (!chapter || !category) {
        selectionStatus.textContent = "Choose one grammar chapter and one vocabulary category. The AI tutor will select words and adapt practice as you learn.";
      } else if (!words.length) {
        selectionStatus.textContent = "No words are available in this category, so a prompt cannot be built.";
      } else {
        selectionStatus.textContent = category.label + ": " + words.length + " words available. " +
          chapter.title + ": " + topics().filter(function (topic) {
            return Number(topic.chapter) === Number(chapter.chapter);
          }).length + " lesson objectives. The tutor will choose words and pace practice for you.";
      }
      promptStatus.textContent = "";
      copyButton.disabled = !ready;
      promptText.value = ready ? buildPrompt(chapter, category, words) : "";
    }

    chapterSelect.addEventListener("change", update);
    categorySelect.addEventListener("change", update);
    copyButton.addEventListener("click", function () {
      function selectForManualCopy() {
        promptText.focus();
        if (typeof promptText.select === "function") { promptText.select(); }
        promptStatus.textContent = "Copy was unavailable. The prompt is selected; copy it and paste it into your AI agent.";
        U.announce(promptStatus.textContent);
      }
      var clipboard = window.navigator && window.navigator.clipboard;
      if (!clipboard || typeof clipboard.writeText !== "function") {
        selectForManualCopy();
        return;
      }
      Promise.resolve().then(function () {
        return clipboard.writeText(promptText.value);
      }).then(function () {
        promptStatus.textContent = "Prompt copied. Paste it into your AI agent to begin.";
        U.announce(promptStatus.textContent);
      }, selectForManualCopy);
    });

    root.appendChild(U.h("div", { "class": "q-head" }, [
      U.h("button", {
        "class": "icon-btn",
        type: "button",
        "aria-label": "Back",
        onclick: function () { U.back(); }
      }, [U.h("span", { "aria-hidden": "true", text: "‹" })]),
      U.h("span", { "class": "q-title", text: "Words + Grammar" })
    ]));
    root.appendChild(U.h("p", {
      "class": "screen-sub",
      text: "Choose a vocabulary category and a grammar chapter. Copy a prompt for an interactive AI tutor that selects words and adapts practice to you."
    }));
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboCategory", text: "1. Choose a vocabulary category" }));
    root.appendChild(categorySelect);
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboChapter", text: "2. Choose a grammar chapter" }));
    root.appendChild(chapterSelect);
    root.appendChild(selectionStatus);
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboPrompt", text: "3. Copy your combined practice prompt" }));
    root.appendChild(promptText);
    root.appendChild(U.h("div", { "class": "combo-prompt-actions" }, [copyButton]));
    root.appendChild(promptStatus);
    update();
    U.render(root);
  }

  B850.screens.aiPractice = { render: render, buildPrompt: buildPrompt };
}();
