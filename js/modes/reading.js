!function () {
  "use strict";
  var S = B850.store, U = B850.ui;
  var LEVELS = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" }
  ];
  var recognition = null, recognitionActive = false;

  function passages() {
    return B850.reading && Array.isArray(B850.reading.passages) ? B850.reading.passages : [];
  }

  function readingState() {
    var state = S.state;
    if (!state.reading || typeof state.reading !== "object" || Array.isArray(state.reading)) {
      state.reading = { level: "beginner", completed: {}, savedWords: {}, totalCorrect: 0, totalAnswered: 0 };
    }
    var read = state.reading;
    if (["beginner", "intermediate", "advanced"].indexOf(read.level) === -1) { read.level = "beginner"; }
    if (!read.completed || typeof read.completed !== "object" || Array.isArray(read.completed)) { read.completed = {}; }
    if (!read.savedWords || typeof read.savedWords !== "object" || Array.isArray(read.savedWords)) { read.savedWords = {}; }
    if (typeof read.totalCorrect !== "number") { read.totalCorrect = 0; }
    if (typeof read.totalAnswered !== "number") { read.totalAnswered = 0; }
    return read;
  }

  function passageById(id) {
    var list = passages();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { return list[i]; } }
    return null;
  }

  function labelForLevel(id) {
    for (var i = 0; i < LEVELS.length; i++) { if (LEVELS[i].id === id) { return LEVELS[i].label; } }
    return "Beginner";
  }

  function setLastMode(params) {
    S.state.lastMode = { mode: "reading", params: params || {} };
  }

  function heading(title, backAction) {
    return U.h("div", { "class": "reading-heading" }, [
      U.h("button", {
        "class": "btn btn-secondary", type: "button", text: "← Reading",
        onclick: backAction
      }),
      U.h("h1", { "class": "screen-title", text: title })
    ]);
  }

  function renderLibrary() {
    var read = readingState();
    var root = U.h("section", { "class": "screen reading-screen", "aria-label": "English Reading" });
    setLastMode({});
    root.appendChild(U.h("h1", { "class": "screen-title", text: "English Reading" }));
    root.appendChild(U.h("p", {
      "class": "screen-sub",
      text: "Tap any word for its meaning, pronunciation and example. Reveal Hindi sentence help only when you need it."
    }));
    root.appendChild(U.h("div", { "class": "reading-levels", role: "group", "aria-label": "Reading level" },
      LEVELS.map(function (level) {
        return U.h("button", {
          "class": "chip", type: "button", text: level.label,
          "aria-pressed": read.level === level.id ? "true" : "false",
          onclick: function () { read.level = level.id; S.save(S.state); renderLibrary(); }
        });
      })
    ));
    var current = passages().filter(function (item) { return item.level === read.level; });
    var done = current.filter(function (item) { return read.completed[item.id] && read.completed[item.id].done; }).length;
    root.appendChild(U.h("p", {
      "class": "screen-sub", text: done + " of " + current.length + " passages completed at " + labelForLevel(read.level) + " level."
    }));
    var recommended = current.filter(function (item) { return !read.completed[item.id] || !read.completed[item.id].done; })[0];
    if (recommended) {
      root.appendChild(U.h("button", {
        "class": "btn btn-lg btn-block", type: "button", text: "Recommended next: " + recommended.title,
        onclick: function () { B850.ui.navigate("reading", { view: "passage", id: recommended.id }); }
      }));
    }
    current.forEach(function (item) {
      var progress = read.completed[item.id];
      root.appendChild(U.h("button", {
        "class": "card reading-passage-card", type: "button",
        "aria-label": "Read " + item.title + (progress && progress.done ? ", completed" : ""),
        onclick: function () { B850.ui.navigate("reading", { view: "passage", id: item.id }); }
      }, [
        U.h("span", { "class": "pill pill-accent", text: item.kind }),
        U.h("strong", { text: item.title }),
        U.h("span", { "class": "screen-sub", text: item.description }),
        U.h("span", { "class": "reading-card-meta", text: item.sentences.length + " sentences · " + (progress && progress.done ? "Best " + progress.bestScore + "/" + progress.total : "Not completed") })
      ]));
    });
    root.appendChild(U.h("button", {
      "class": "btn btn-secondary btn-block", type: "button",
      text: "Saved vocabulary (" + Object.keys(read.savedWords).length + ")",
      onclick: function () { B850.ui.navigate("reading", { view: "saved" }); }
    }));
    root.appendChild(U.h("p", {
      "class": "screen-sub reading-note",
      text: "Original learning material. Translations and explanations appear only when you ask."
    }));
    S.save(S.state);
    U.render(root);
  }

  function findGloss(passage, word) {
    var key = String(word || "").toLowerCase().replace(/[^a-z']/g, "");
    var item = passage && passage.vocabulary && passage.vocabulary[key];
    var extra = B850.reading && B850.reading.glossary || {};
    var base = S.data && S.data.byWord && S.data.byWord[key];
    var candidates = [key];
    if (key.slice(-3) === "ies") { candidates.push(key.slice(0, -3) + "y"); }
    if (key.slice(-3) === "ing") {
      candidates.push(key.slice(0, -3), key.slice(0, -3) + "e");
      if (/([a-z])\1$/.test(key.slice(0, -3))) { candidates.push(key.slice(0, -4)); }
    }
    if (key.slice(-2) === "ed") {
      candidates.push(key.slice(0, -2), key.slice(0, -1));
      if (/([a-z])\1$/.test(key.slice(0, -2))) { candidates.push(key.slice(0, -3)); }
    }
    if (key.slice(-2) === "es") { candidates.push(key.slice(0, -2), key.slice(0, -1)); }
    if (key.slice(-1) === "s") { candidates.push(key.slice(0, -1)); }
    for (var i = 0; !item && !base && i < candidates.length; i++) {
      item = (passage && passage.vocabulary && passage.vocabulary[candidates[i]]) || extra[candidates[i]];
      base = S.data && S.data.byWord && S.data.byWord[candidates[i]];
    }
    if (Array.isArray(item)) {
      item = { hi: item[0], definition: item[1], pronunciation: item[2] };
    }
    if (item) {
      return {
        word: key, hindi: item.hi, definition: item.definition, pronunciation: item.pronunciation || key,
        example: item.example || (passage && passage.sentences.filter(function (sentence) {
          return sentence.text.toLowerCase().indexOf(key) !== -1;
        })[0] || passage.sentences[0]).text
      };
    }
    if (base) {
      return {
        word: key, hindi: base.meaningHindi, definition: base.meaningEnglish,
        pronunciation: base.pronunciation || key, example: (passage && passage.sentences.filter(function (sentence) {
          return sentence.text.toLowerCase().indexOf(key) !== -1;
        })[0] || { text: base.exampleSentence }).text
      };
    }
    return {
      word: key, hindi: "इस ऑफ़लाइन पाठ में अर्थ उपलब्ध नहीं है।",
      definition: "This word is not in the built-in glossary yet. You can still save it for later.",
      pronunciation: key, example: passage.sentences.map(function (sentence) { return sentence.text; }).join(" ")
    };
  }

  function saveWord(gloss) {
    var read = readingState();
    if (read.savedWords[gloss.word]) {
      delete read.savedWords[gloss.word];
      U.toast("Removed from vocabulary");
    } else {
      read.savedWords[gloss.word] = {
        word: gloss.word, hindi: gloss.hindi, definition: gloss.definition,
        pronunciation: gloss.pronunciation, example: gloss.example
      };
      U.toast("Saved to vocabulary");
    }
    S.save(S.state);
  }

  function showGloss(passage, word) {
    var gloss = findGloss(passage, word);
    var read = readingState();
    U.openSheet({
      title: gloss.word,
      body: U.h("div", { "class": "reading-gloss" }, [
        U.h("p", { "class": "reading-gloss-hi", text: gloss.hindi }),
        U.h("p", { text: gloss.definition }),
        U.h("p", { "class": "reading-pronunciation", text: "Pronunciation: " + gloss.pronunciation }),
        U.h("p", { "class": "reading-example", text: "Example: " + gloss.example }),
        U.h("div", { "class": "reading-gloss-actions" }, [
          U.h("button", {
            "class": "btn btn-secondary", type: "button", text: "Hear word",
            onclick: function () {
              if (S.speech.supported()) { S.speech.speak(gloss.word); }
              else { U.toast("English speech is not available on this device."); }
            }
          }),
          U.h("button", {
            "class": "btn", type: "button",
            text: read.savedWords[gloss.word] ? "Remove saved word" : "Save word",
            onclick: function () {
              saveWord(gloss);
              this.textContent = readingState().savedWords[gloss.word] ? "Remove saved word" : "Save word";
            }
          })
        ])
      ]),
      actions: [{ label: "Close", value: "close", primary: true }]
    });
  }

  function sentenceNode(passage, sentence, index, active, textSize) {
    var parts = sentence.text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?|[^A-Za-z]+/g) || [sentence.text];
    var words = parts.map(function (part) {
      if (!/^[A-Za-z]/.test(part)) { return document.createTextNode(part); }
      return U.h("button", {
        "class": "reading-word", type: "button",
        "aria-label": "Look up " + part,
        onclick: function () { showGloss(passage, part); }
      }, [part]);
    });
    var section = U.h("div", {
      "class": "reading-sentence" + (active ? " is-speaking" : ""),
      "aria-current": active ? "true" : null
    }, [U.h("p", { "class": "reading-sentence-text", style: "font-size:" + textSize + "px" }, words)]);
    section.appendChild(U.h("button", {
      "class": "btn btn-secondary reading-help-btn", type: "button", text: "Show Hindi translation",
      onclick: function () {
        var existing = section.querySelector(".reading-translation");
        if (existing) { existing.parentNode.removeChild(existing); this.textContent = "Show Hindi translation"; }
        else { section.appendChild(U.h("p", { "class": "reading-translation", lang: "hi", text: sentence.translationHi })); this.textContent = "Hide Hindi translation"; }
      }
    }));
    section.appendChild(U.h("button", {
      "class": "btn btn-secondary reading-help-btn", type: "button", text: "Explain simply",
      onclick: function () {
        var existing = section.querySelector(".reading-simple");
        if (existing) { existing.parentNode.removeChild(existing); this.textContent = "Explain simply"; }
        else {
          section.appendChild(U.h("p", { "class": "reading-simple", text: sentence.simple }));
          section.appendChild(U.h("p", { "class": "reading-simple reading-explanation-hi", lang: "hi", text: "सरल अर्थ: " + sentence.translationHi }));
          this.textContent = "Hide explanation";
        }
      }
    }));
    return section;
  }

  function renderPassage(id) {
    var passage = passageById(id);
    if (!passage) { renderLibrary(); return; }
    var read = readingState(), params = { view: "passage", id: id };
    setLastMode(params);
    var root = U.h("section", { "class": "screen reading-screen", "aria-label": passage.title });
    root.appendChild(heading(passage.title, renderLibrary));
    root.appendChild(U.h("div", { "class": "reading-meta" }, [
      U.h("span", { "class": "pill pill-accent", text: labelForLevel(passage.level) }),
      U.h("span", { "class": "pill", text: passage.kind })
    ]));
    var mode = "all", currentSentence = 0, activeSentence = -1, textSize = 20;
    var sentWrap = U.h("div", { "class": "reading-text" });
    function drawSentences() {
      sentWrap.innerHTML = "";
      passage.sentences.forEach(function (sentence, index) {
        if (mode === "one" && index !== currentSentence) { return; }
        sentWrap.appendChild(sentenceNode(passage, sentence, index, activeSentence === index, textSize));
      });
    }
    var modeToggle = U.h("div", { "class": "reading-toolbar", role: "group", "aria-label": "Reading view" }, [
      U.h("button", {
        "class": "chip", type: "button", text: "Full passage", "aria-pressed": "true",
        onclick: function () { mode = "all"; this.parentNode.querySelectorAll(".chip").forEach(function (button) { button.setAttribute("aria-pressed", button.textContent === "Full passage" ? "true" : "false"); }); drawSentences(); updateStep(); }
      }),
      U.h("button", {
        "class": "chip", type: "button", text: "One sentence", "aria-pressed": "false",
        onclick: function () { mode = "one"; currentSentence = Math.min(currentSentence, passage.sentences.length - 1); this.parentNode.querySelectorAll(".chip").forEach(function (button) { button.setAttribute("aria-pressed", button.textContent === "One sentence" ? "true" : "false"); }); drawSentences(); updateStep(); }
      })
    ]);
    root.appendChild(modeToggle);
    var step = U.h("div", { "class": "reading-toolbar reading-step", hidden: true });
    var sentenceCount = U.h("span", { "class": "screen-sub", text: "" });
    step.appendChild(U.h("button", {
      "class": "btn btn-secondary", type: "button", text: "← Previous",
      onclick: function () { currentSentence = Math.max(0, currentSentence - 1); drawSentences(); updateStep(); }
    }));
    step.appendChild(sentenceCount);
    step.appendChild(U.h("button", {
      "class": "btn btn-secondary", type: "button", text: "Next →",
      onclick: function () { currentSentence = Math.min(passage.sentences.length - 1, currentSentence + 1); drawSentences(); updateStep(); }
    }));
    function updateStep() {
      sentenceCount.textContent = (currentSentence + 1) + " / " + passage.sentences.length;
      step.hidden = mode !== "one";
    }
    root.appendChild(step);
    root.appendChild(sentWrap);
    var textControls = U.h("div", { "class": "reading-controls" });
    var textSlider = U.h("label", { "class": "reading-slider" }, [
      U.h("span", { text: "Text size" }),
      U.h("input", { type: "range", min: "18", max: "28", value: "20", "aria-label": "Text size" })
    ]);
    textSlider.querySelector("input").addEventListener("input", function () {
      textSize = Number(this.value) || 20; drawSentences();
    });
    var rateSlider = U.h("label", { "class": "reading-slider" }, [
      U.h("span", { text: "Speech speed" }),
      U.h("input", { type: "range", min: "0.65", max: "1.2", step: "0.05", value: String(S.state.settings.rate || 0.9), "aria-label": "Speech speed" })
    ]);
    rateSlider.querySelector("input").addEventListener("input", function () {
      S.state.settings.rate = Number(this.value); S.save(S.state);
    });
    textControls.appendChild(textSlider);
    textControls.appendChild(rateSlider);
    root.appendChild(textControls);
    var speechStatus = U.h("p", { "class": "screen-sub reading-speech-status", "aria-live": "polite", text: "" });
    var audioControls = U.h("div", { "class": "reading-toolbar" });
    var playButton = U.h("button", {
      "class": "btn", type: "button", text: "▶ Listen to passage",
      onclick: function () {
        if (!S.speech.supported()) { speechStatus.textContent = "English speech is not available on this device."; return; }
        S.speech.cancel();
        playButton.disabled = true;
        speechStatus.textContent = "Playing the passage. The current sentence is highlighted.";
        function playAt(index) {
          if (index >= passage.sentences.length) {
            activeSentence = -1; drawSentences(); playButton.disabled = false;
            speechStatus.textContent = "Passage audio finished.";
            return;
          }
          activeSentence = index; drawSentences();
          S.speech.speak(passage.sentences[index].text, function (ok) {
            if (!playButton.disabled) { return; }
            if (!ok) { activeSentence = -1; drawSentences(); playButton.disabled = false; speechStatus.textContent = "Audio stopped or could not play."; return; }
            playAt(index + 1);
          });
        }
        playAt(0);
      }
    });
    var stopButton = U.h("button", {
      "class": "btn btn-secondary", type: "button", text: "Stop audio",
      onclick: function () { S.speech.cancel(); activeSentence = -1; drawSentences(); playButton.disabled = false; speechStatus.textContent = "Audio stopped."; }
    });
    audioControls.appendChild(playButton);
    audioControls.appendChild(stopButton);
    root.appendChild(audioControls);
    root.appendChild(speechStatus);
    drawSentences();
    updateStep();

    var speechCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (speechCtor) {
      var practiceStatus = U.h("p", { "class": "screen-sub", "aria-live": "polite", text: "" });
      root.appendChild(U.h("div", { "class": "card reading-speaking" }, [
        U.h("h2", { "class": "section-title", text: "Read aloud" }),
        U.h("p", { "class": "screen-sub", text: "Browser speech recognition can compare the words it hears with this passage. This is not a pronunciation-accuracy score. Your browser may process audio using its own service; SpellX does not store recordings." }),
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "Check one sentence",
          onclick: function () {
            if (recognition) {
              if (recognitionActive) { recognition.abort(); }
              recognition = null;
              recognitionActive = false;
            }
            recognition = new speechCtor();
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            practiceStatus.textContent = "Listening. Read the current sentence aloud.";
            recognition.onresult = function (event) {
              var target = passage.sentences[mode === "one" ? currentSentence : 0].text;
              var spoken = event.results[0][0].transcript;
              var targetWords = target.toLowerCase().match(/[a-z']+/g) || [];
              var spokenWords = spoken.toLowerCase().match(/[a-z']+/g) || [];
              var matches = 0;
              targetWords.forEach(function (word, index) { if (spokenWords[index] === word) { matches += 1; } });
              var pct = targetWords.length ? Math.round(matches / targetWords.length * 100) : 0;
              practiceStatus.textContent = "Browser recognition matched " + matches + " of " + targetWords.length + " words (" + pct + "%). Recognition can make mistakes; this is not a pronunciation rating.";
            };
            recognition.onerror = function (event) {
              practiceStatus.textContent = "Speech recognition could not run (" + (event.error || "unknown error") + "). You can still practise by listening and reading.";
            };
            recognition.onend = function () {
              recognitionActive = false;
              if (practiceStatus.textContent === "Listening. Read the current sentence aloud.") { practiceStatus.textContent = "No speech result was returned. Try again or continue reading."; }
            };
            try { recognition.start(); recognitionActive = true; }
            catch (error) { recognitionActive = false; recognition = null; practiceStatus.textContent = "Could not start speech recognition: " + error.message; }
          }
        }),
        practiceStatus
      ]));
    } else {
      root.appendChild(U.h("p", {
        "class": "screen-sub reading-note",
        text: "Speech recognition is not supported in this browser. You can still listen to the passage and practise aloud."
      }));
    }
    root.appendChild(U.h("button", {
      "class": "btn btn-lg btn-block", type: "button", text: "Start comprehension practice",
      onclick: function () { B850.ui.navigate("reading", { view: "exercise", id: id, index: 0 }); }
    }));
    root.appendChild(U.h("button", {
      "class": "btn btn-secondary btn-block", type: "button", text: "Copy an optional AI tutor prompt",
      onclick: function () { renderTutorPrompt(id); }
    }));
    root.appendChild(U.h("button", {
      "class": "btn btn-secondary btn-block", type: "button", text: "Back to passages",
      onclick: renderLibrary
    }));
    S.save(S.state);
    U.render(root);
  }

  function recordAnswer(correct) {
    var state = S.state, read = readingState(), today = S.todayStr();
    S.touchDay(state);
    state.answers.total += 1;
    if (correct) { state.answers.correct += 1; }
    state.daily.count += 1;
    var day = state.sessions[today] || (state.sessions[today] = { answered: 0, correct: 0 });
    day.answered += 1;
    if (correct) { day.correct += 1; }
    var accuracy = state.accuracy[today] || (state.accuracy[today] = { answered: 0, correct: 0 });
    accuracy.answered += 1;
    if (correct) { accuracy.correct += 1; read.totalCorrect += 1; state.xp += 12; }
    read.totalAnswered += 1;
    S.save(state);
    U.refreshChrome();
  }

  function finishPassage(passage) {
    var read = readingState(), run = passage.activities.reduce(function (sum, activity, index) {
      return sum + (S.state.reading._run && S.state.reading._run[passage.id] && S.state.reading._run[passage.id][index] ? 1 : 0);
    }, 0);
    var previous = read.completed[passage.id] || { attempts: 0, bestScore: 0, total: passage.activities.length };
    var score = run;
    previous.done = true;
    previous.attempts += 1;
    previous.bestScore = Math.max(previous.bestScore || 0, score);
    previous.lastScore = score;
    previous.total = passage.activities.length;
    previous.completedAt = S.todayStr();
    read.completed[passage.id] = previous;
    if (S.state.reading._run) { delete S.state.reading._run[passage.id]; }
    S.save(S.state);
    U.refreshChrome();
  }

  function renderExercise(id, params) {
    var passage = passageById(id);
    if (!passage) { renderLibrary(); return; }
    var read = readingState(), index = Number(params.index) || 0;
    setLastMode({ view: "exercise", id: id, index: index });
    if (index >= passage.activities.length) {
      finishPassage(passage);
      var result = read.completed[id];
      var summary = U.h("section", { "class": "screen reading-screen", "aria-label": "Practice results" });
      setLastMode({ view: "passage", id: id });
      summary.appendChild(heading("Practice complete", renderLibrary));
      summary.appendChild(U.h("div", { "class": "card reading-result" }, [
        U.h("p", { "class": "reading-result-score", text: result.lastScore + " / " + result.total }),
        U.h("p", { text: "Correct answers this attempt · best score " + result.bestScore + "/" + result.total }),
        U.h("p", { "class": "screen-sub", text: "Passage completed " + result.attempts + (result.attempts === 1 ? " time." : " times.") })
      ]));
      summary.appendChild(U.h("button", { "class": "btn btn-lg btn-block", type: "button", text: "Choose another passage", onclick: renderLibrary }));
      summary.appendChild(U.h("button", { "class": "btn btn-secondary btn-block", type: "button", text: "Read this passage again", onclick: function () { B850.ui.navigate("reading", { view: "passage", id: id }); } }));
      S.save(S.state);
      U.render(summary);
      return;
    }
    var activity = passage.activities[index];
    var root = U.h("section", { "class": "screen reading-screen", "aria-label": "Comprehension practice" });
    root.appendChild(heading("Practice · " + passage.title, function () { B850.ui.navigate("reading", { view: "passage", id: id }); }));
    root.appendChild(U.h("p", { "class": "screen-sub", text: "Question " + (index + 1) + " of " + passage.activities.length + " · " + activity.type }));
    root.appendChild(U.h("div", { "class": "card reading-question" }, [
      U.h("h2", { "class": "section-title", text: activity.prompt })
    ]));
    var status = U.h("p", { "class": "feedback", "aria-live": "polite", text: "" });
    var selected = [], tileButtons = [], controls = U.h("div", { "class": "reading-activity-controls" });
    if (activity.type === "order") {
      var answer = U.h("p", { "class": "reading-order-answer", "aria-live": "polite", text: "Your sentence: " });
      activity.words.forEach(function (word) {
        var tile = U.h("button", {
          "class": "chip", type: "button", text: word, onclick: function () {
            selected.push(word);
            answer.textContent = "Your sentence: " + selected.join(" ");
            this.disabled = true;
            check.disabled = selected.length !== activity.words.length;
          }
        });
        tileButtons.push(tile);
        controls.appendChild(tile);
      });
      root.appendChild(controls);
      root.appendChild(answer);
      root.appendChild(U.h("button", {
        "class": "btn btn-secondary", type: "button", text: "Reset order",
        onclick: function () {
          selected = [];
          answer.textContent = "Your sentence: ";
          tileButtons.forEach(function (tile) { tile.disabled = false; });
          check.disabled = true;
        }
      }));
      var check = U.h("button", {
        "class": "btn", type: "button", text: "Check sentence",
        disabled: true,
        onclick: function () {
          if (params.answered) { return; }
          var correct = selected.join(" ") === activity.answer;
          recordAnswer(correct);
          var run = S.state.reading._run || (S.state.reading._run = {});
          (run[id] || (run[id] = {}))[index] = correct;
          status.className = "feedback " + (correct ? "ok" : "no");
          status.textContent = correct ? "✓ Correct. " + activity.answer : "✕ The sentence is: " + activity.answer;
          params.answered = true;
          setLastMode({ view: "exercise", id: id, index: index + 1 });
          check.disabled = true;
          next.hidden = false;
          S.save(S.state);
        }
      });
      root.appendChild(check);
    } else {
      var options = activity.options.slice();
      options.forEach(function (option) {
        controls.appendChild(U.h("button", {
          "class": "option", type: "button", text: option, onclick: function () {
            if (params.answered) { return; }
            var correct = option === activity.answer;
            recordAnswer(correct);
            var run = S.state.reading._run || (S.state.reading._run = {});
            (run[id] || (run[id] = {}))[index] = correct;
            status.className = "feedback " + (correct ? "ok" : "no");
            status.textContent = (correct ? "✓ Correct. " : "✕ Not quite. The answer is " + activity.answer + ". ") + activity.explanation;
            params.answered = true;
            setLastMode({ view: "exercise", id: id, index: index + 1 });
            controls.querySelectorAll("button").forEach(function (button) { button.disabled = true; });
            next.hidden = false;
            S.save(S.state);
          }
        }));
      });
      root.appendChild(controls);
    }
    root.appendChild(status);
    var next = U.h("button", {
      "class": "btn btn-lg btn-block", type: "button", text: index + 1 === passage.activities.length ? "Finish practice" : "Next question →", hidden: true,
      onclick: function () { B850.ui.navigate("reading", { view: "exercise", id: id, index: index + 1 }); }
    });
    root.appendChild(next);
    U.render(root);
  }

  function renderSaved() {
    var read = readingState(), words = Object.keys(read.savedWords).sort();
    setLastMode({ view: "saved" });
    var root = U.h("section", { "class": "screen reading-screen", "aria-label": "Saved vocabulary" });
    root.appendChild(heading("Saved vocabulary", renderLibrary));
    root.appendChild(U.h("p", { "class": "screen-sub", text: words.length + " words saved for review." }));
    if (!words.length) {
      root.appendChild(U.h("div", { "class": "card", text: "Tap a word in any passage and choose Save word to build your vocabulary list." }));
    }
    words.forEach(function (word) {
      var item = read.savedWords[word];
      root.appendChild(U.h("div", { "class": "card reading-saved-word" }, [
        U.h("div", { "class": "reading-saved-title" }, [
          U.h("strong", { text: item.word }),
          U.h("span", { "class": "reading-gloss-hi", text: item.hindi })
        ]),
        U.h("p", { text: item.definition }),
        U.h("p", { "class": "reading-example", text: "Example: " + item.example }),
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "Remove",
          onclick: function () { delete read.savedWords[word]; S.save(S.state); renderSaved(); }
        })
      ]));
    });
    S.save(S.state);
    U.render(root);
  }

  function renderTutorPrompt(id) {
    var passage = passageById(id);
    if (!passage) { return; }
    var text = "I am a Hindi-speaking English learner at " + labelForLevel(passage.level) + " level. Help me understand this original reading passage. Explain unfamiliar words in simple English and Hindi, ask one comprehension question at a time, and wait for my answer. Keep explanations short and do not claim to analyse my pronunciation.\\n\\n" +
      passage.title + "\\n" + passage.sentences.map(function (sentence) { return sentence.text; }).join(" ");
    var area = U.h("textarea", { "class": "reading-prompt", readonly: "readonly", "aria-label": "Copy-ready AI tutor prompt" });
    area.value = text;
    U.openSheet({
      title: "Optional AI tutor prompt",
      body: U.h("div", {}, [
        U.h("p", { "class": "screen-sub", text: "SpellX does not connect to an AI service. Copy this prompt into a tutor you choose." }),
        area,
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "Copy prompt",
          onclick: function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              try {
                navigator.clipboard.writeText(text).then(function () {
                  U.toast("Prompt copied");
                }, function () {
                  area.focus();
                  area.select();
                  U.toast("Copy was blocked. Select the text and copy it manually.");
                });
              } catch (error) {
                area.focus();
                area.select();
                U.toast("Could not copy the prompt: " + error.message + ". Select the text and copy it manually.");
              }
            } else { area.focus(); area.select(); U.toast("Select and copy the prompt."); }
          }
        })
      ]),
      actions: [{ label: "Close", value: "close", primary: true }]
    });
  }

  B850.screens.reading = {
    stopSpeechRecognition: function () {
      if (!recognition) { return; }
      var active = recognitionActive;
      recognitionActive = false;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      if (active) {
        try { recognition.abort(); }
        catch (error) {
          if (window.console && console.warn) { console.warn("Unable to stop reading speech recognition:", error); }
        }
      }
      recognition = null;
    },
    render: function (params) {
      params = params || {};
      U.clearKey();
      this.stopSpeechRecognition();
      readingState();
      S.save(S.state);
      if (params.view === "passage") { renderPassage(params.id); return; }
      if (params.view === "exercise") { renderExercise(params.id, params); return; }
      if (params.view === "saved") { renderSaved(); return; }
      renderLibrary();
    },
    passages: passages,
    findGloss: findGloss,
    openTutorPrompt: renderTutorPrompt
  };

  var homeRender = B850.screens.home && B850.screens.home.render;
  if (homeRender) {
    B850.screens.home.render = function () {
      homeRender.apply(this, arguments);
      var main = document.getElementById("main");
      var grid = main && main.querySelector(".mode-grid");
      if (!grid) { return; }
      var read = readingState(), totalDone = Object.keys(read.completed).filter(function (id) {
        return read.completed[id] && read.completed[id].done;
      }).length;
      grid.appendChild(U.h("button", {
        "class": "mode-card", type: "button",
        "aria-label": "English Reading: original passages and comprehension practice",
        onclick: function () { B850.ui.navigate("reading"); }
      }, [
        U.h("span", { "class": "mode-emoji", text: "📖", "aria-hidden": "true" }),
        U.h("span", { "class": "mode-name", text: "English Reading" }),
        U.h("span", { "class": "mode-desc", text: "Original passages · Beginner to Advanced" }),
        U.h("span", { "class": "mode-desc", style: "margin-top:auto", text: totalDone + "/" + passages().length + " completed" })
      ]));
      S.save(S.state);
      var continueButton = null;
      main.querySelectorAll("button").forEach(function (button) {
        if (button.getAttribute("aria-label") === "Continue learning") { continueButton = button; }
      });
      if (continueButton && S.state.lastMode && S.state.lastMode.mode === "reading") {
        var lastReadingParams = S.state.lastMode.params || {};
        continueButton.addEventListener("click", function () {
          B850.ui.navigate("reading", lastReadingParams);
        });
      }
    };
  }

  var statsRender = B850.screens.stats && B850.screens.stats.render;
  if (statsRender) {
    B850.screens.stats.render = function () {
      statsRender.apply(this, arguments);
      var main = document.getElementById("main"), read = readingState();
      var done = Object.keys(read.completed).filter(function (id) { return read.completed[id] && read.completed[id].done; }).length;
      var saved = Object.keys(read.savedWords).length;
      var accuracy = read.totalAnswered ? Math.round(read.totalCorrect / read.totalAnswered * 100) : 0;
      var root = main && main.querySelector(".screen");
      if (root) {
        root.appendChild(U.h("h2", { "class": "section-title", text: "English Reading" }));
        root.appendChild(U.h("div", { "class": "stat-list" }, [
          U.h("div", { "class": "stat-item" }, [
            U.h("div", {}, [
              U.h("div", { "class": "stat-label", text: "Passages completed" }),
              U.h("div", { "class": "stat-sub", text: "Across all reading levels" })
            ]),
            U.h("div", { "class": "stat-value", text: done + " / " + passages().length })
          ]),
          U.h("div", { "class": "stat-item" }, [
            U.h("div", {}, [
              U.h("div", { "class": "stat-label", text: "Reading comprehension" }),
              U.h("div", { "class": "stat-sub", text: read.totalCorrect + " of " + read.totalAnswered + " answers" })
            ]),
            U.h("div", { "class": "stat-value", text: accuracy + "%" })
          ]),
          U.h("div", { "class": "stat-item" }, [
            U.h("div", {}, [U.h("div", { "class": "stat-label", text: "Vocabulary saved" })]),
            U.h("div", { "class": "stat-value", text: String(saved) })
          ])
        ]));
      }
    };
  }
}();
