!function () {
  "use strict";
  var S = B850.store, U = B850.ui, MAX_WORDS = 5, MIN_WORDS = 3;

  function topics() {
    return typeof grammarTopics !== "undefined" && Array.isArray(grammarTopics) ? grammarTopics : [];
  }

  function topicById(id) {
    var all = topics(), i;
    for (i = 0; i < all.length; i++) {
      if (String(all[i].id) === String(id)) { return all[i]; }
    }
    return null;
  }

  function buildPrompt(topic, words) {
    var plan = (window.GRAMMAR_AI_PRACTICE_PROMPTS || {})[topic.id];
    var lines = [
      "You are my patient, encouraging personal English tutor. Help me use the grammar lesson and vocabulary together in realistic situations.",
      "GRAMMAR LESSON: " + topic.title + " — Chapter " + topic.chapter + ": " + topic.chapterTitle,
      "WHAT THE LESSON TEACHES: " + topic.summary,
      "SKILLS TO PRACTISE:"
    ];
    (topic.points || []).forEach(function (point) { lines.push("- " + point); });
    if (topic.rules && topic.rules.pattern) {
      lines.push("RELEVANT RULE OR PATTERN: " + topic.rules.pattern);
      (topic.rules.forms || []).forEach(function (form) {
        lines.push("- " + form.formula + ": " + form.en);
      });
      (topic.rules.exceptions || []).forEach(function (exception) {
        lines.push("- Caution: " + exception);
      });
    } else {
      lines.push("This lesson has no formal rule card. Teach its stated concepts and practical skills without inventing a grammar rule.");
    }
    lines.push("MY SELECTED VOCABULARY:");
    words.forEach(function (word) {
      lines.push("- " + word.word + " — " + word.meaningEnglish + ". Example: " + word.exampleSentence);
    });
    if (plan) {
      lines.push("PRACTICE SETTING: " + plan.situation);
      lines.push("PRACTICE IDEAS:");
      (plan.activities || []).forEach(function (activity) { lines.push("- " + activity); });
    }
    lines.push(
      "PERSONALIZE BEFORE PRACTICE:",
      "- Ask me how comfortable I feel with this grammar topic. Wait for my answer before the next question.",
      "- Then ask which real-life context I prefer and wait. Then ask how challenging I want the practice and wait.",
      "- Let me skip any check-in; adapt the pace and scenarios to my answers without changing the selected lesson or vocabulary.",
      "HOW TO TUTOR ME:",
      "- Use all selected words meaningfully and practise them with the lesson concept in natural sentences and conversation. Do not force an awkward sentence just to fit a word.",
      "- Use realistic role-play, sentence building or transformation, and error correction as appropriate.",
      "- Ask exactly one question or give one task at a time. Wait for my response before continuing.",
      "- Let me try before showing a model answer. Accept correct natural alternatives.",
      "- Tell me what I did well. Correct mistakes related to the selected words or grammar, briefly explain why, and give me a similar retry.",
      "- If I struggle, simplify the next task and explain the idea another way. If I answer accurately, gradually increase the challenge.",
      "- Keep practice focused on both the selected vocabulary and grammar. Give Hindi explanations only if I ask.",
      "- At the end, summarize my progress with the words and grammar, recurring errors, and one next practice goal.",
      "Start by asking only the first check-in question about my comfort with the grammar topic. Wait for my answer."
    );
    return lines.join("\n");
  }

  function render() {
    U.clearKey();
    var root = U.h("section", { "class": "screen", "aria-label": "Words and grammar AI practice" });
    var selectedWords = [];
    var wordData = S.data && Array.isArray(S.data.words) ? S.data.words : [];
    var topicSelect = U.h("select", {
      "class": "combo-topic-select",
      id: "comboTopic",
      "aria-label": "Choose a grammar lesson"
    });
    var wordSearch = U.h("input", {
      "class": "combo-word-search",
      id: "comboWordSearch",
      type: "search",
      placeholder: "Search English words or meanings",
      "aria-label": "Search vocabulary words"
    });
    var results = U.h("div", { "class": "combo-word-results", role: "group", "aria-label": "Matching vocabulary" });
    var selectedList = U.h("div", { "class": "combo-selected-words", role: "group", "aria-label": "Selected vocabulary" });
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
    var i;
    var placeholder = U.h("option", { value: "", text: "Choose a grammar lesson" });
    topicSelect.appendChild(placeholder);
    topics().forEach(function (topic) {
      topicSelect.appendChild(U.h("option", { value: String(topic.id), text: topic.title }));
    });

    function renderSelected() {
      selectedList.innerHTML = "";
      selectedWords.forEach(function (word) {
        var item = U.h("div", { "class": "combo-selected-word" }, [
          U.h("span", { text: word.word + " — " + word.meaningEnglish }),
          U.h("button", {
            "class": "combo-remove-word",
            type: "button",
            "aria-label": "Remove " + word.word,
            text: "Remove"
          })
        ]);
        item.querySelector("button").addEventListener("click", function () {
          selectedWords = selectedWords.filter(function (selected) { return selected.id !== word.id; });
          update();
        });
        selectedList.appendChild(item);
      });
    }

    function renderResults() {
      results.innerHTML = "";
      var query = String(wordSearch.value || "").trim().toLowerCase();
      if (!query) {
        results.appendChild(U.h("p", { "class": "screen-sub", text: "Type to search the 850-word list." }));
        return;
      }
      var matches = wordData.filter(function (word) {
        return selectedWords.every(function (selected) { return selected.id !== word.id; }) &&
          (word.word.toLowerCase().indexOf(query) !== -1 ||
           word.meaningEnglish.toLowerCase().indexOf(query) !== -1 ||
           word.meaningHindi.toLowerCase().indexOf(query) !== -1);
      }).slice(0, 15);
      if (!matches.length) {
        results.appendChild(U.h("p", { "class": "screen-sub", text: "No matching words. Try another search." }));
        return;
      }
      matches.forEach(function (word) {
        var button = U.h("button", {
          "class": "combo-word-result",
          type: "button",
          disabled: selectedWords.length >= MAX_WORDS ? "disabled" : null,
          "aria-label": "Add " + word.word + ", " + word.meaningEnglish
        }, [
          U.h("span", { "class": "combo-word-result-name", text: word.word }),
          U.h("span", { "class": "combo-word-result-meaning", text: word.meaningEnglish })
        ]);
        button.addEventListener("click", function () {
          if (selectedWords.length >= MAX_WORDS) { return; }
          selectedWords.push(word);
          wordSearch.value = "";
          update();
          wordSearch.focus();
        });
        results.appendChild(button);
      });
    }

    function update() {
      var topic = topicById(topicSelect.value);
      renderSelected();
      renderResults();
      selectionStatus.textContent = selectedWords.length + " of " + MAX_WORDS + " words selected. " +
        (selectedWords.length < MIN_WORDS
          ? "Choose " + (MIN_WORDS - selectedWords.length) + " more."
          : (topic ? "Your combined practice prompt is ready." : "Choose a grammar lesson to build your prompt."));
      promptStatus.textContent = "";
      copyButton.disabled = !(topic && selectedWords.length >= MIN_WORDS && selectedWords.length <= MAX_WORDS);
      promptText.value = topic && selectedWords.length >= MIN_WORDS
        ? buildPrompt(topic, selectedWords)
        : "";
    }

    topicSelect.addEventListener("change", update);
    wordSearch.addEventListener("input", renderResults);
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
      text: "Choose one grammar lesson and 3–5 words. Copy a prompt for an interactive tutor session in ChatGPT or another AI agent."
    }));
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboTopic", text: "1. Choose a grammar lesson" }));
    root.appendChild(topicSelect);
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboWordSearch", text: "2. Choose 3–5 vocabulary words" }));
    root.appendChild(wordSearch);
    root.appendChild(results);
    root.appendChild(selectionStatus);
    root.appendChild(selectedList);
    root.appendChild(U.h("label", { "class": "combo-label", "for": "comboPrompt", text: "3. Copy your combined practice prompt" }));
    root.appendChild(promptText);
    root.appendChild(U.h("div", { "class": "combo-prompt-actions" }, [copyButton]));
    root.appendChild(promptStatus);
    update();
    U.render(root);
  }

  B850.screens.aiPractice = { render: render, buildPrompt: buildPrompt };
}();
