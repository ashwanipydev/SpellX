!function () {
  "use strict";

  var S = B850.store;
  var U = B850.ui;
  var srs = S.srs;
  var current = null;
  var keyHandler = null;
  var HINT_COST = { audio: 5, first: 5, meaning: 10, sentence: 15 };

  function shuffle(items) {
    return S.shuffle(items.slice());
  }

  function acceptedSpellings(word) {
    var lengths = word.variants[0].length;
    return word.variants.filter(function (variant, index, list) {
      return variant.length === lengths && list.indexOf(variant) === index;
    });
  }

  function announce(message) {
    U.announce(message);
  }

  function modePicker() {
    if (current && current.word) { stopTimer(current.word); }
    current = null;
    U.clearKey();
    U.stopAudio();
    var root = U.h("section", { "class": "screen sp-setup", "aria-label": "Choose spelling practice" });
    root.appendChild(U.h("div", { "class": "q-head" }, [
      U.h("button", {
        "class": "icon-btn", type: "button", "aria-label": "Back to home",
        onclick: function () { U.back(); }
      }, [U.h("span", { "aria-hidden": "true", text: "‹" })]),
      U.h("span", { "class": "q-title", text: "Spelling practice" }),
      U.h("span", { "class": "q-count", text: "" })
    ]));
    root.appendChild(U.h("p", {
      "class": "screen-sub sp-setup-intro",
      text: "Build each word from letter tiles. Choose a relaxed round or try the optional speed bonus."
    }));
    root.appendChild(U.h("div", { "class": "sp-mode-grid" }, [
      modeCard("Relaxed practice", "No timer. Take your time, use hints, and retry misspelled words.", "Start relaxed practice", "relaxed"),
      modeCard("Timed challenge", "Get a bonus timer on harder words. Time running out never ends your round.", "Start timed challenge", "timed")
    ]));
    U.render(root);
  }

  function modeCard(title, description, label, mode) {
    var button = U.h("button", {
      "class": "card sp-mode-card sp-mode-btn", type: "button",
      "aria-label": label
    }, [
      U.h("span", { "class": "sp-mode-icon", "aria-hidden": "true", text: mode === "relaxed" ? "🌿" : "⚡" }),
      U.h("span", { "class": "sp-mode-title", text: title }),
      U.h("span", { "class": "sp-mode-description", text: description }),
      U.h("span", { "class": "sp-mode-action", text: "10 words · choose" })
    ]);
    button.addEventListener("click", function () { startSession({ mode: mode }); });
    return button;
  }

  function startSession(params) {
    params = params || {};
    if (params.mode !== "relaxed" && params.mode !== "timed") {
      modePicker();
      return;
    }
    U.clearKey();
    U.stopAudio();
    var state = S.state;
    var ids = S.data.words.filter(function (word) { return word.base.length >= 2; }).map(function (word) { return word.id; });
    var unseen = ids.filter(function (id) { return !state.seen[id]; });
    var seen = ids.filter(function (id) { return state.seen[id]; });
    var deck = shuffle(unseen).concat(shuffle(seen));
    if (!deck.length) {
      U.toast("No words to spell.");
      return;
    }

    current = {
      ids: deck.slice(0, 10),
      index: 0,
      attempted: 0,
      correct: 0,
      revealed: 0,
      reviewed: 0,
      mode: params.mode,
      word: null,
      host: null
    };
    var root = U.h("section", { "class": "screen sp-session", "aria-label": "Spelling puzzle" });
    root.appendChild(U.h("div", { "class": "q-head" }, [
      U.h("button", {
        "class": "icon-btn", type: "button", "aria-label": "End spelling session",
        onclick: endSession
      }, [U.h("svg", {
        width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round",
        "aria-hidden": "true", focusable: "false"
      }, [U.h("path", { d: "M15 19l-7-7 7-7" })])]),
      U.h("span", { "class": "q-title", text: "Spelling" }),
      U.h("span", { "class": "q-count", id: "spCount", text: "" })
    ]));
    root.appendChild(U.h("div", { "class": "sp-session-progress" }, [
      U.h("div", { "class": "sp-progress-copy", id: "spProgressCopy" }),
      U.h("div", { "class": "progress-bar", role: "progressbar", "aria-label": "Spelling session progress",
        "aria-valuemin": "0", "aria-valuemax": String(current.ids.length), "aria-valuenow": "0" }, [
        U.h("i", { id: "spProgressBar", style: "width:0%" })
      ])
    ]));
    var body = U.h("div", { "class": "sp-body" });
    root.appendChild(body);
    U.render(root);
    current.host = body;
    keyHandler = function (event) { handleKey(event); };
    U.registerKey(keyHandler);
    nextWord();
  }

  function updateProgress() {
    if (!current) { return; }
    var count = document.getElementById("spCount");
    var copy = document.getElementById("spProgressCopy");
    var bar = document.getElementById("spProgressBar");
    var value = Math.min(current.index + 1, current.ids.length);
    if (count) { count.textContent = value + "/" + current.ids.length; }
    if (copy) {
      copy.textContent = (current.mode === "timed" ? "Timed challenge" : "Relaxed practice") +
        " · Word " + value + " of " + current.ids.length;
    }
    var progress = current.host.querySelector(".progress-bar");
    if (progress) { progress.setAttribute("aria-valuenow", String(value)); }
    if (bar) { bar.style.width = Math.round((value / current.ids.length) * 100) + "%"; }
  }

  function tierFor(word) {
    var length = word.base.length;
    return word.difficulty >= 3 ? 4 : (word.difficulty === 2 || length >= 6 ? 3 :
      (word.difficulty === 1 && length >= 5 ? 2 : 1));
  }

  function makeTiles(letters, tier) {
    var tiles = letters.slice();
    if (tier >= 2) {
      var lettersInWord = {};
      letters.forEach(function (letter) { lettersInWord[letter] = true; });
      var decoys = shuffle("abcdefghijklmnopqrstuvwxyz".split("")).filter(function (letter) {
        return !lettersInWord[letter];
      }).slice(0, tier >= 3 ? 3 : 2);
      tiles = tiles.concat(decoys);
    }
    return shuffle(tiles).map(function (letter, index) {
      return { id: "tile-" + index, letter: letter, used: false };
    });
  }

  function nextWord() {
    if (!current) { return; }
    if (current.word) { stopTimer(current.word); }
    current.index += current.word ? 1 : 0;
    if (current.index >= current.ids.length) {
      endSession();
      return;
    }
    var word = S.data.byId[current.ids[current.index]];
    if (!word) {
      current.index += 1;
      nextWord();
      return;
    }
    var tier = tierFor(word);
    var letters = word.variants[0].split("");
    var puzzle = {
      word: word,
      tier: tier,
      letters: letters,
      tiles: makeTiles(letters, tier),
      slots: letters.map(function () { return null; }),
      correctSlots: letters.map(function () { return false; }),
      cursor: 0,
      hints: {},
      misses: 0,
      reviewAdded: false,
      locked: false,
      done: false,
      timer: null,
      timerLeft: null,
      bonusEarned: false
    };
    current.word = puzzle;
    current.attempted += 1;
    updateProgress();
    renderPuzzle(puzzle);
  }

  function renderPuzzle(puzzle) {
    var langFirst = S.state.settings.langFirst || "hindi";
    var promptKids = [
      U.h("div", { "class": "sp-pron", text: "🔊 " + (puzzle.word.pronunciation || "Pronunciation unavailable") })
    ];
    if (langFirst === "english" && puzzle.tier < 3) {
      promptKids.push(U.h("div", { "class": "sp-meaning-en", text: puzzle.word.meaningEnglish }));
      promptKids.push(U.h("div", { "class": "sp-hindi", text: puzzle.word.meaningHindi }));
    } else {
      promptKids.push(U.h("div", { "class": "sp-hindi", text: puzzle.word.meaningHindi }));
      if (puzzle.tier < 3) {
        promptKids.push(U.h("div", { "class": "sp-meaning-en", text: puzzle.word.meaningEnglish }));
      } else {
        promptKids.push(U.h("div", { "class": "sp-hindi-only", text: "🇮🇳 Hindi only" }));
      }
    }
    var prompt = U.h("div", { "class": "prompt-card card sp-prompt" }, [
      U.h("div", { "class": "sp-title", text: "Spell this word" }),
      U.h("div", { "class": "sp-prompt-main" }, promptKids),
      U.h("div", { "class": "sp-word-length", text: puzzle.letters.length + " letters" }),
      U.h("div", { "class": "sp-prompt-sub", text: "Tap or drag tiles into the slots, or type the word." })
    ]);
    var host = current.host;
    host.innerHTML = "";
    host.appendChild(prompt);
    host.appendChild(U.h("div", { "class": "sp-hints", role: "group", "aria-label": "Hints" }, [
      hintButton(puzzle, "audio", "🔊", "Hear it"),
      hintButton(puzzle, "first", "🔤", "First letter"),
      hintButton(puzzle, "meaning", "💬", "English meaning"),
      hintButton(puzzle, "sentence", "📝", "Example sentence")
    ]));
    host.appendChild(revealButton(puzzle));
    host.appendChild(U.h("div", { "class": "sp-reveal", "data-meaning": "1", hidden: "hidden" }));
    host.appendChild(U.h("div", { "class": "sp-reveal sp-sentence", "data-sentence": "1", hidden: "hidden" }));
    host.appendChild(U.h("div", {
      "class": "sp-feedback", role: "status", "aria-live": "polite", hidden: "hidden"
    }));
    var board = U.h("div", { "class": "sp-board" }, [
      U.h("div", { "class": "sp-slots", role: "group", "aria-label": "Word letter slots" }),
      current.mode === "timed" && puzzle.tier >= 4 ?
        U.h("div", { "class": "sp-bonus", "aria-live": "polite" }, [
          U.h("span", { "class": "sp-bonus-txt", text: "60 seconds · bonus only" })
        ]) : null,
      U.h("div", { "class": "sp-tray", role: "group", "aria-label": "Available letter tiles" })
    ]);
    host.appendChild(board);
    puzzle.bonusEl = board.querySelector(".sp-bonus-txt");
    renderBoard(puzzle);
    if (current.mode === "timed" && puzzle.tier >= 4) { startTimer(puzzle); }
  }

  function renderBoard(puzzle) {
    if (!current || !current.host) { return; }
    renderSlots(puzzle);
    renderTiles(puzzle);
  }

  function renderSlots(puzzle) {
    var wrap = current.host.querySelector(".sp-slots");
    if (!wrap) { return; }
    wrap.innerHTML = "";
    puzzle.slots.forEach(function (tileId, index) {
      var tile = tileById(puzzle, tileId);
      var className = "slot";
      if (tileId !== null) { className += " filled"; }
      if (puzzle.correctSlots[index]) { className += " correct"; }
      if (index === puzzle.cursor && !puzzle.done) { className += " focus"; }
      var button = U.h("button", {
        "class": className, type: "button", "data-idx": String(index),
        "aria-label": "Letter slot " + (index + 1) + (tile ? ", " + tile.letter : ", empty") +
          (puzzle.correctSlots[index] ? ", correct" : ""),
        "aria-pressed": index === puzzle.cursor ? "true" : "false"
      }, [U.h("span", {
        "class": "slot-letter" + (!tile && puzzle.hints.first && index === 0 ? " hint" : ""),
        text: tile ? tile.letter.toUpperCase() :
          (puzzle.hints.first && index === 0 ? puzzle.letters[0].toUpperCase() : "")
      })]);
      button.addEventListener("click", function () {
        if (puzzle.locked || puzzle.done) { return; }
        if (tileId !== null && !puzzle.correctSlots[index]) { removeTile(puzzle, index); }
        puzzle.cursor = nextOpenSlot(puzzle, index);
        renderSlots(puzzle);
      });
      wrap.appendChild(button);
    });
  }

  function renderTiles(puzzle) {
    var tray = current.host.querySelector(".sp-tray");
    if (!tray) { return; }
    tray.innerHTML = "";
    puzzle.tiles.filter(function (tile) { return !tile.used; }).forEach(function (tile) {
      var button = U.h("button", {
        "class": "tile", type: "button", "data-id": tile.id,
        "aria-label": "Letter " + tile.letter.toUpperCase()
      }, [U.h("span", { "class": "tile-ch", text: tile.letter.toUpperCase() })]);
      button.addEventListener("click", function () {
        if (puzzle.locked || puzzle.done) { return; }
        var at = nextOpenSlot(puzzle, puzzle.cursor);
        if (at < 0) { return; }
        placeTile(puzzle, tile, at);
      });
      attachDrag(puzzle, button, tile);
      tray.appendChild(button);
    });
  }

  function tileById(puzzle, id) {
    if (id === null) { return null; }
    for (var i = 0; i < puzzle.tiles.length; i++) {
      if (puzzle.tiles[i].id === id) { return puzzle.tiles[i]; }
    }
    return null;
  }

  function nextOpenSlot(puzzle, start) {
    var i;
    for (i = Math.max(0, start); i < puzzle.slots.length; i++) {
      if (puzzle.slots[i] === null) { return i; }
    }
    for (i = 0; i < Math.min(start, puzzle.slots.length); i++) {
      if (puzzle.slots[i] === null) { return i; }
    }
    return -1;
  }

  function placeTile(puzzle, tile, index) {
    if (puzzle.locked || puzzle.done || tile.used || index < 0 ||
        index >= puzzle.slots.length || puzzle.slots[index] !== null) { return; }
    puzzle.slots[index] = tile.id;
    tile.used = true;
    puzzle.cursor = nextOpenSlot(puzzle, index + 1);
    U.sound("tap");
    renderBoard(puzzle);
    checkGuess(puzzle);
  }

  function removeTile(puzzle, index) {
    if (puzzle.locked || puzzle.done || index < 0 || puzzle.correctSlots[index]) { return; }
    var tile = tileById(puzzle, puzzle.slots[index]);
    if (!tile) { return; }
    tile.used = false;
    puzzle.slots[index] = null;
    puzzle.cursor = index;
    renderBoard(puzzle);
    U.sound("back");
  }

  function currentSpelling(puzzle) {
    return puzzle.slots.map(function (id) {
      var tile = tileById(puzzle, id);
      return tile ? tile.letter : "";
    }).join("");
  }

  function checkGuess(puzzle) {
    if (puzzle.slots.some(function (id) { return id === null; })) { return; }
    if (acceptedSpellings(puzzle.word).indexOf(currentSpelling(puzzle)) !== -1) {
      solveWord(puzzle);
      return;
    }
    handleIncorrectGuess(puzzle);
  }

  function handleIncorrectGuess(puzzle) {
    if (puzzle.locked || puzzle.done) { return; }
    puzzle.misses += 1;
    var correctCount = 0;
    puzzle.slots.forEach(function (tileId, index) {
      var tile = tileById(puzzle, tileId);
      var correct = !!tile && tile.letter === puzzle.letters[index];
      puzzle.correctSlots[index] = correct;
      if (correct) {
        correctCount += 1;
      } else if (tile) {
        tile.used = false;
        puzzle.slots[index] = null;
      }
    });
    if (puzzle.misses >= 2 && !puzzle.reviewAdded) {
      puzzle.reviewAdded = true;
      current.reviewed += 1;
      srs.answer(S.state, puzzle.word.id, false, S.todayStr());
      S.save(S.state);
      U.toast("Added to Review");
    }
    puzzle.cursor = nextOpenSlot(puzzle, 0);
    var feedback = current.host.querySelector(".sp-feedback");
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = correctCount + " letter" + (correctCount === 1 ? "" : "s") +
        " in the right position. The other slots are ready to retry.";
    }
    U.sound("bad");
    announce(correctCount + (correctCount === 1 ? " letter is" : " letters are") +
      " in the right position. Try the remaining slots again.");
    renderBoard(puzzle);
  }

  function solveWord(puzzle) {
    if (puzzle.done) { return; }
    puzzle.done = true;
    puzzle.locked = true;
    current.correct += 1;
    stopTimer(puzzle);
    puzzle.bonusEarned = puzzle.timerLeft !== null && puzzle.timerLeft > 0;
    var state = S.state;
    var today = S.todayStr();
    srs.answer(state, puzzle.word.id, true, today);
    var hintsUsed = Object.keys(puzzle.hints).filter(function (key) { return puzzle.hints[key]; }).length;
    var xp = 20 + 10 * (puzzle.word.difficulty - 1) - 5 * hintsUsed + (puzzle.bonusEarned ? 15 : 0);
    var streakMultiplier = 1 + 0.05 * Math.min(state.streak.count || 0, 20);
    xp = Math.max(5, Math.round(xp * streakMultiplier));
    var beforeLevel = S.xpToLevel(state.xp);
    state.xp += xp;
    state.learned[puzzle.word.id] = 1;
    state.seen[puzzle.word.id] = 1;
    S.touchDay(state);
    var goalHit = state.daily.count + 1 === state.settings.goal;
    state.daily.count += 1;
    S.save(state);
    U.sound("ok");
    U.refreshChrome();
    if (puzzle.bonusEarned) { U.toast("Speed bonus +15 XP"); }
    if (goalHit) { U.celebrate("Daily goal reached!"); }
    if (S.xpToLevel(state.xp) > beforeLevel) { U.celebrate("Level " + S.xpToLevel(state.xp) + "!"); }
    announce("Correct! " + puzzle.word.word + ". " + xp + " XP.");
    showSuccess(puzzle, xp, false);
  }

  function showSuccess(puzzle, xp, revealed) {
    var word = puzzle.word;
    var exampleParts = exampleWithBlank(word);
    var body = U.h("div", { "class": "sp-success card" }, [
      U.h("div", { "class": "sp-success-emoji", "aria-hidden": "true", text: revealed ? "💡" : "🎉" }),
      U.h("div", { "class": "sp-success-word", text: word.word + (revealed ? "" : " ✓") }),
      U.h("div", { "class": "sp-success-pron", text: word.pronunciation || "—" }),
      U.h("div", { "class": "sp-success-mean", text: word.meaningHindi + " · " + word.meaningEnglish }),
      U.h("div", { "class": "sp-success-sent" }, [
        U.h("div", {}, exampleParts),
        U.h("div", { "class": "sp-success-sent-hi", text: word.exampleHindi })
      ]),
      U.h("div", { "class": "sp-success-xp", text: "+ " + xp + " XP" + (revealed ? " (revealed)" :
        puzzle.bonusEarned ? " · speed bonus" : "") }),
      U.h("button", { "class": "btn btn-lg", type: "button", text: "Next word" })
    ]);
    body.querySelector("button").addEventListener("click", nextWord);
    current.host.innerHTML = "";
    current.host.appendChild(body);
    U.registerKey(function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); nextWord(); }
      else if (event.key === "Escape") { event.preventDefault(); endSession(); }
    });
  }

  function exampleWithBlank(word) {
    var variants = acceptedSpellings(word).slice().sort(function (a, b) { return b.length - a.length; });
    var expression = new RegExp("\\b(" + variants.map(function (variant) {
      return variant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("|") + ")\\b", "i");
    var match = expression.exec(word.exampleSentence || "");
    if (!match) { return [document.createTextNode(word.exampleSentence || "")]; }
    var before = word.exampleSentence.slice(0, match.index);
    var after = word.exampleSentence.slice(match.index + match[0].length);
    return [
      document.createTextNode(before),
      U.h("span", { "class": "blank", text: "____" }),
      document.createTextNode(after)
    ];
  }

  function hintButton(puzzle, kind, emoji, label) {
    var cost = HINT_COST[kind];
    var button = U.h("button", {
      "class": "hint-btn", type: "button", "data-hint": kind,
      "aria-label": label + ", costs " + cost + " XP",
      text: emoji + " " + label + " · " + cost + " XP"
    });
    button.addEventListener("click", function () { useHint(puzzle, kind); });
    return button;
  }

  function useHint(puzzle, kind) {
    if (puzzle.locked || puzzle.done || puzzle.hints[kind]) { return; }
    puzzle.hints[kind] = true;
    var state = S.state;
    state.xp = Math.max(0, state.xp - HINT_COST[kind]);
    S.save(state);
    U.refreshChrome();
    U.toast("Hint · -" + HINT_COST[kind] + " XP");
    if (kind === "audio") {
      U.stopAudio();
      S.speech.speak(puzzle.word.word);
    } else if (kind === "first") {
      renderSlots(puzzle);
      announce("First letter: " + puzzle.letters[0].toUpperCase());
    } else if (kind === "meaning") {
      var meaning = current.host.querySelector("[data-meaning]");
      if (meaning) {
        meaning.hidden = false;
        meaning.textContent = "Meaning: " + puzzle.word.meaningEnglish;
      }
      announce("English meaning: " + puzzle.word.meaningEnglish);
    } else if (kind === "sentence") {
      var sentence = current.host.querySelector("[data-sentence]");
      if (sentence) {
        sentence.hidden = false;
        sentence.innerHTML = "";
        exampleWithBlank(puzzle.word).forEach(function (part) { sentence.appendChild(part); });
      }
      announce("Example: " + puzzle.word.exampleSentence);
    }
    var button = current.host.querySelector('[data-hint="' + kind + '"]');
    if (button) { button.disabled = true; button.classList.add("used"); }
  }

  function revealButton(puzzle) {
    var button = U.h("button", {
      "class": "reveal-btn", type: "button", "aria-label": "Show the answer (free, no XP)",
      text: "💡 Show word"
    });
    button.addEventListener("click", function () {
      if (puzzle.locked || puzzle.done) { return; }
      puzzle.done = true;
      puzzle.locked = true;
      stopTimer(puzzle);
      var state = S.state;
      S.touchDay(state);
      state.seen[puzzle.word.id] = 1;
      state.daily.count += 1;
      S.save(state);
      U.sound("bad");
      U.refreshChrome();
      current.revealed += 1;
      announce("The word is " + puzzle.word.word + ".");
      showSuccess(puzzle, 0, true);
    });
    return button;
  }

  function handleKey(event) {
    var puzzle = current && current.word;
    if (!puzzle || !document.getElementById("spCount") || puzzle.locked || puzzle.done) { return; }
    if (event.key === "Escape") {
      event.preventDefault();
      endSession();
    } else if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      var last = -1;
      for (var i = puzzle.slots.length - 1; i >= 0; i--) {
        if (puzzle.slots[i] !== null && !puzzle.correctSlots[i]) { last = i; break; }
      }
      if (last >= 0) { removeTile(puzzle, last); }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      puzzle.cursor = Math.max(0, Math.min(puzzle.slots.length - 1,
        puzzle.cursor + (event.key === "ArrowLeft" ? -1 : 1)));
      renderSlots(puzzle);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      puzzle.cursor = event.key === "Home" ? 0 : puzzle.slots.length - 1;
      renderSlots(puzzle);
    } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
      if (document.activeElement && document.activeElement.tagName === "INPUT") { return; }
      var letter = event.key.toLowerCase();
      var tile = puzzle.tiles.filter(function (item) { return !item.used && item.letter === letter; })[0];
      var target = nextOpenSlot(puzzle, puzzle.cursor);
      if (tile && target >= 0) {
        event.preventDefault();
        placeTile(puzzle, tile, target);
      }
    }
  }

  function startTimer(puzzle) {
    puzzle.timerLeft = 60;
    puzzle.timer = window.setInterval(function () {
      if (!current || current.word !== puzzle || puzzle.done || !document.getElementById("spCount")) {
        stopTimer(puzzle);
        return;
      }
      puzzle.timerLeft -= 1;
      if (puzzle.bonusEl) {
        puzzle.bonusEl.textContent = puzzle.timerLeft > 0 ?
          puzzle.timerLeft + " seconds · bonus only" : "Bonus time is up · keep playing";
        if (puzzle.timerLeft <= 0) { puzzle.bonusEl.classList.add("off"); }
      }
      if (puzzle.timerLeft <= 0) { stopTimer(puzzle); }
    }, 1000);
  }

  function stopTimer(puzzle) {
    if (puzzle.timer !== null) {
      window.clearInterval(puzzle.timer);
      puzzle.timer = null;
    }
  }

  function attachDrag(puzzle, button, tile) {
    button.addEventListener("pointerdown", function (event) {
      if (puzzle.locked || puzzle.done || tile.used || (event.pointerType === "mouse" && event.button !== 0)) { return; }
      var startX = event.clientX;
      var startY = event.clientY;
      var moved = false;
      var ghost = null;
      var rect = null;
      function slotAt(x, y) {
        var element = document.elementFromPoint && document.elementFromPoint(x, y);
        return element && element.closest ? element.closest(".slot") : null;
      }
      function move(e) {
        if (!moved) {
          if (Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) <= 8) { return; }
          moved = true;
          rect = button.getBoundingClientRect();
          ghost = button.cloneNode(true);
          ghost.classList.add("ghost");
          ghost.style.width = rect.width + "px";
          ghost.style.height = rect.height + "px";
          document.body.appendChild(ghost);
        }
        if (ghost) {
          ghost.style.left = (e.clientX - rect.width / 2) + "px";
          ghost.style.top = (e.clientY - rect.height / 2) + "px";
        }
        var slot = slotAt(e.clientX, e.clientY);
        current.host.querySelectorAll(".slot.drop-target").forEach(function (item) {
          item.classList.remove("drop-target");
        });
        if (slot) { slot.classList.add("drop-target"); }
      }
      function end(e) {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
        if (!moved) { return; }
        current.host.querySelectorAll(".slot.drop-target").forEach(function (item) {
          item.classList.remove("drop-target");
        });
        if (ghost && ghost.parentNode) { ghost.parentNode.removeChild(ghost); }
        if (puzzle.locked || puzzle.done) { return; }
        var slot = slotAt(e.clientX, e.clientY);
        var index = slot ? Number(slot.getAttribute("data-idx")) : -1;
        if (index >= 0 && index < puzzle.slots.length && puzzle.slots[index] === null) {
          placeTile(puzzle, tile, index);
        } else if (slot && puzzle.slots[index] !== null && !puzzle.correctSlots[index]) {
          removeTile(puzzle, index);
          placeTile(puzzle, tile, index);
        } else {
          U.sound("bad");
          announce("Drop the letter into an empty slot.");
        }
      }
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", end);
      window.addEventListener("pointercancel", end);
    });
    button.addEventListener("contextmenu", function (event) { event.preventDefault(); });
  }

  function endSession() {
    if (!current) { return; }
    if (current.word) { stopTimer(current.word); }
    U.clearKey();
    U.stopAudio();
    var finished = current;
    current = null;
    var attempted = finished.attempted;
    var root = U.h("section", { "class": "screen sp-summary", "aria-label": "Spelling session summary" });
    root.appendChild(U.h("div", { "class": "card session-summary" }, [
      U.h("div", { "class": "big-score", text: finished.correct + " solved" }),
      U.h("p", { "class": "screen-sub", text: (finished.mode === "timed" ? "Timed challenge" : "Relaxed practice") +
        " · " + attempted + " of " + finished.ids.length + " words attempted" }),
      U.h("div", { "class": "sp-summary-stats" }, [
        summaryStat("Solved", finished.correct, "pill-good"),
        summaryStat("Revealed", finished.revealed, ""),
        summaryStat("Added to Review", finished.reviewed, finished.reviewed ? "pill-bad" : ""),
        summaryStat("Unfinished", Math.max(0, attempted - finished.correct - finished.revealed), "")
      ]),
      U.h("p", { "class": "sp-summary-note", text: "A reveal or a missed word is practice—not a failure. The timer never ends a round." })
    ]));
    root.appendChild(U.h("div", { "class": "fc-actions" }, [
      U.h("button", { "class": "btn btn-secondary btn-lg", type: "button", text: "Go home",
        onclick: function () { U.back(); } }),
      U.h("button", { "class": "btn btn-lg", type: "button", text: "One more round",
        onclick: function () { startSession({ mode: finished.mode }); } })
    ]));
    U.render(root);
  }

  function summaryStat(label, value, modifier) {
    return U.h("div", { "class": "sp-summary-stat" }, [
      U.h("span", { "class": "pill" + (modifier ? " " + modifier : ""), text: String(value) }),
      U.h("span", { text: label })
    ]);
  }

  B850.screens.spelling = {
    render: modePicker,
    start: startSession
  };
}();
