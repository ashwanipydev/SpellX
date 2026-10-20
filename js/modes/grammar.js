/* Grammar course screen - 53 topics in 5 levels.
   Reads data/grammar.js (global grammarTopics) and data/grammar-exercises.js
   (global grammarExercises). Progress lives in state.grammar under the single
   "b850:v1" save key. */
!function () {
  "use strict";
  var S = B850.store, U = B850.ui, LEVELS = [1, 2, 3, 4, 5];

  function topics() {
    return (typeof grammarTopics !== "undefined" && Array.isArray(grammarTopics)) ? grammarTopics : [];
  }
  function content() {
    return (typeof grammarExercises !== "undefined" && Array.isArray(grammarExercises)) ? grammarExercises : [];
  }
  function topicById(id) {
    var t = topics(), i;
    for (i = 0; i < t.length; i++) { if (t[i] && t[i].id === id) { return t[i]; } }
    return null;
  }
  function contentOf(id) {
    var c = content(), i;
    for (i = 0; i < c.length; i++) { if (c[i] && c[i].topicId === id) { return c[i]; } }
    return null;
  }
  function gmap() {
    var st = S.state;
    if (!st.grammar || typeof st.grammar !== "object") { st.grammar = {}; }
    return st.grammar;
  }
  function rec(id) {
    var m = gmap(), r = m[id];
    if (!r || typeof r !== "object") { r = m[id] = { seen: 0, correct: 0, wrong: 0, last: null, done: false }; }
    return r;
  }
  function mastery(id) {
    var r = rec(id), n = r.correct + r.wrong;
    return n ? r.correct / n : 0;
  }
  function doneCount() {
    var m = gmap(), k, d = 0;
    for (k in m) { if (m[k] && m[k].done) { d += 1; } }
    return d;
  }

  // Same bookkeeping as the word modes, but XP is flat and nothing touches
  // st.seen / st.learned, so the 850-word progress stays honest.
  function score(topicId, correct) {
    var st = S.state, t = S.todayStr(), r = rec(topicId);
    S.touchDay(st);
    st.answers.total += 1;
    if (correct) { st.answers.correct += 1; }
    st.daily.count += 1;
    var day = st.sessions[t] || (st.sessions[t] = { answered: 0, correct: 0 });
    day.answered += 1;
    if (correct) { day.correct += 1; }
    var acc = st.accuracy[t] || (st.accuracy[t] = { answered: 0, correct: 0 });
    acc.answered += 1;
    if (correct) { acc.correct += 1; }
    r.seen += 1;
    r.last = t;
    if (correct) {
      r.correct += 1;
      if (r.correct >= 6) { r.done = true; }
      var before = S.xpToLevel(st.xp);
      st.xp += 12;
      if (S.xpToLevel(st.xp) > before) { U.celebrate("Level " + S.xpToLevel(st.xp) + "!"); }
    } else {
      r.wrong += 1;
    }
    S.save(st);
    U.refreshChrome();
    return { goalHit: st.daily.count > 0 && st.daily.count === st.settings.goal };
  }

  function head(title, sub, backTo) {
    var btn = U.h("button", {
      "class": "icon-btn", type: "button", "aria-label": "Back",
      onclick: function () { U.sound("back"); if (backTo) { backTo(); } else { U.navigate("grammar"); } }
    }, [U.h("svg", {
      width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
      "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round",
      "aria-hidden": "true", focusable: "false"
    }, [U.h("path", { d: "M15 19l-7-7 7-7" })])]);
    return U.h("div", { "class": "q-head" }, [
      btn,
      U.h("span", { "class": "q-title", text: title }),
      U.h("span", { "class": "q-count", text: sub || "" })
    ]);
  }

  function wordFor(keyword) {
    if (!S.data || !S.data.byWord) { return null; }
    var key = String(keyword || "").toLowerCase().replace(/[^a-z]/g, "");
    return key && S.data.byWord[key] ? S.data.byWord[key] : null;
  }

  function wordSheet(w) {
    U.openSheet({
      title: w.word,
      body: U.h("div", {}, [
        U.h("div", { "class": "prompt-sub", text: w.pronunciation }),
        U.h("div", { "class": "prompt-hindi", text: w.meaningHindi }),
        U.h("div", { text: w.meaningEnglish }),
        U.h("div", { "class": "fc-ex", style: "text-align:left" }, [
          U.h("div", { text: w.exampleSentence }),
          U.h("div", { "class": "fc-ex-hi", text: w.exampleHindi })
        ]),
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "Hear it",
          onclick: function () { S.speech.speak(w.base || w.word); }
        })
      ]),
      actions: [{ label: "Close", value: "close", "class": "btn-secondary", primary: true }]
    });
  }

  /* ---------------- book (chapters) ---------------- */
  function chapters() {
    return (typeof GRAMMAR_CHAPTERS !== "undefined" && Array.isArray(GRAMMAR_CHAPTERS)) ? GRAMMAR_CHAPTERS : [];
  }
  function showHindi(data) {
    return !!(S.state.settings && S.state.settings.showGrammarHindi && data && data.hindiReviewed === true);
  }
  function chapterHeading(ch) {
    return "Chapter " + ch.chapter + " — " + ch.title;
  }
  function levelsView() {
    U.clearKey();
    var list = topics();
    var root = U.h("section", { "class": "screen", "aria-label": "Grammar course" });
    root.appendChild(head("Grammar", doneCount() + "/" + list.length, function () { U.back(); }));
    root.appendChild(U.h("p", {
      "class": "screen-sub",
      text: list.length + " topics across " + chapters().length + " sections. A connected story follows Ravi as he learns English."
    }));

    if (!list.length) {
      root.appendChild(U.h("div", { "class": "card" }, [
        U.h("b", { text: "Grammar data not found." }),
        U.h("p", { "class": "screen-sub", text: "data/grammar/ must sit next to index.html." })
      ]));
      U.render(root);
      return;
    }

    var chs = chapters();
    chs.forEach(function (ch) {
      var items = list.filter(function (t) { return t && t.chapter === ch.chapter; });
      if (!items.length) { return; }
      var done = items.filter(function (t) { return rec(t.id).done; }).length;
      var box = U.h("div", { "class": "card book-chapter" });
      box.appendChild(U.h("div", { "class": "level-head" }, [
        U.h("b", { text: chapterHeading(ch) }),
        U.h("span", { "class": "pill", text: done + "/" + items.length })
      ]));
      if (showHindi(ch) && ch.titleHindi) {
        box.appendChild(U.h("div", { "class": "book-ch-hi", text: ch.titleHindi }));
      }
      box.appendChild(U.h("p", { "class": "book-ch-intro", text: ch.intro }));
      if (showHindi(ch) && ch.introHindi) {
        box.appendChild(U.h("p", { "class": "book-ch-intro-hi", text: ch.introHindi }));
      }
      items.forEach(function (t, idx) {
        var r = rec(t.id), pct = Math.round(mastery(t.id) * 100);
        var label = r.done ? "done" : (r.seen ? pct + "%" : "new");
        var num = ch.chapter + "." + (idx + 1);
        var titleHi = showHindi(t) && t.titleHindi ? ", " + t.titleHindi : "";
        var row = U.h("button", {
          "class": "topic-row", type: "button",
          "aria-label": num + " " + t.title + titleHi + ". " + label
        }, [
          U.h("span", { "class": "topic-num", text: num }),
          U.h("span", { "class": "topic-main" }, [
            U.h("span", { "class": "topic-title", text: t.title }),
            showHindi(t) && t.titleHindi ? U.h("span", { "class": "topic-hi", text: t.titleHindi }) : null
          ]),
          U.h("span", { "class": "pill" + (r.done ? " pill-good" : ""), text: label })
        ]);
        row.addEventListener("click", function () {
          U.sound("tap");
          U.navigate("grammar", { view: "topic", id: t.id });
        });
        box.appendChild(row);
      });
      root.appendChild(box);
    });
    U.render(root);
  }

  /* ---------------- single topic ---------------- */
  function topicView(id) {
    U.clearKey();
    var t = topicById(id);
    var root = U.h("section", { "class": "screen", "aria-label": "Grammar topic" });
    if (!t) {
      root.appendChild(head("Grammar", "", function () { U.back(); }));
      root.appendChild(U.h("p", { "class": "screen-sub", text: "Topic not found." }));
      U.render(root);
      return;
    }
    var chNum = typeof t.chapter === "number" ? "Ch " + t.chapter : "";
    var topicSub = (showHindi(t) && t.titleHindi ? t.titleHindi + " · " : "") + chNum;
    root.appendChild(head(t.title, topicSub));

    /* Show only story scenes that have been checked against their lesson topic. */
    if (t.storyReviewed && t.storyScene && t.storyScene.length) {
      var story = U.h("div", { "class": "card gr-story" });
      story.appendChild(U.h("div", { "class": "prompt-sub", text: "Ravi's story" }));
      t.storyScene.forEach(function (line) {
        story.appendChild(U.h("div", { "class": "gr-story-line" }, [
          U.h("div", { "class": "gr-story-en", text: line.en }),
          showHindi(t) && line.hi ? U.h("div", { "class": "gr-story-hi", text: line.hi }) : null
        ]));
      });
      if (t.storyRecap) {
        story.appendChild(U.h("div", { "class": "gr-story-recap" }, [
          U.h("div", { "class": "prompt-sub", text: "What Ravi learned" }),
          U.h("div", { "class": "gr-story-en", text: t.storyRecap.en }),
          showHindi(t) && t.storyRecap.hi ? U.h("div", { "class": "gr-story-hi", text: t.storyRecap.hi }) : null
        ]));
      }
      root.appendChild(story);
    }

    if (t.rules && t.rules.pattern) {
      var ruleCard = U.h("div", { "class": "card gr-rule" });
      ruleCard.appendChild(U.h("div", { "class": "prompt-sub", text: "Rule" }));
      ruleCard.appendChild(U.h("div", { "class": "gr-formula", text: t.rules.pattern }));
      (t.rules.forms || []).forEach(function (f) {
        ruleCard.appendChild(U.h("div", { "class": "gr-form" }, [
          U.h("span", { "class": "gr-form-kind gr-kind-" + f.kind, text: f.kind }),
          U.h("span", { "class": "gr-form-body" }, [
            U.h("span", { "class": "gr-formula gr-formula-sm", text: f.formula }),
            U.h("span", { "class": "gr-form-en", text: f.en })
          ])
        ]));
      });
      if (t.rules.exceptions && t.rules.exceptions.length) {
        ruleCard.appendChild(U.h("div", { "class": "gr-rule-note", text: "Watch out: " + t.rules.exceptions.join("; ") }));
      }
      if (showHindi(t) && t.rules.hindiTip) {
        ruleCard.appendChild(U.h("p", { "class": "gr-help-hi", text: t.rules.hindiTip }));
      }
      root.appendChild(ruleCard);
    }

    /* why this rule — the history behind the rule */
    if (t.whyRule && t.whyReviewed) {
      var why = U.h("div", { "class": "card gr-why" });
      why.appendChild(U.h("div", { "class": "prompt-sub", text: "Why this rule?" }));
      why.appendChild(U.h("p", { "class": "gr-why-en", text: t.whyRule.en }));
      if (showHindi(t) && t.whyRule.hi) {
        why.appendChild(U.h("p", { "class": "gr-why-hi", text: t.whyRule.hi }));
      }
      root.appendChild(why);
    }

    var card = U.h("div", { "class": "card" }, [
      U.h("div", { "class": "prompt-sub", text: t.levelLabel }),
      U.h("p", { text: t.summary })
    ]);
    if (t.keywords && t.keywords.length) {
      var chips = U.h("div", { "class": "kw-row" });
      t.keywords.forEach(function (k) {
        var w = wordFor(k);
        var chip = U.h("button", {
          "class": "kw-chip" + (w ? " linked" : ""), type: "button",
          "aria-label": w ? k + " - open the word card" : k, text: k
        });
        chip.addEventListener("click", function () {
          if (w) { U.sound("tap"); wordSheet(w); }
          else { U.toast("Not one of the 850 Basic English words"); }
        });
        chips.appendChild(chip);
      });
      card.appendChild(chips);
    }
    root.appendChild(card);

    if ((showHindi(t) && t.explanationHindi) || (t.points && t.points.length)) {
      var help = U.h("div", { "class": "card gr-help" });
      if (showHindi(t) && t.explanationHindi) {
        help.appendChild(U.h("div", { "class": "prompt-sub", text: "Hindi explanation" }));
        help.appendChild(U.h("p", { "class": "gr-help-hi", text: t.explanationHindi }));
      }
      if (t.points && t.points.length) {
        help.appendChild(U.h("ul", { "class": "gr-points" }, t.points.map(function (p) {
          return U.h("li", { text: p });
        })));
      }
      root.appendChild(help);
    }

    var c = contentOf(id);
    if (c && c.examples && c.examples.length) {
      root.appendChild(U.h("h2", { "class": "section-title", text: "Examples" }));
      var ex = U.h("div", { "class": "card" });
      c.examples.forEach(function (e) {
        ex.appendChild(U.h("div", { "class": "gr-ex" }, [
          U.h("div", { "class": "gr-ex-en", text: e.en }),
          showHindi(c) && e.hi ? U.h("div", { "class": "gr-ex-hi", text: e.hi }) : null,
          e.note ? U.h("div", { "class": "gr-ex-note", text: e.note }) : null
        ]));
      });
      root.appendChild(ex);
    }

    if (t.modalGuide) {
      var guide = t.modalGuide;
      root.appendChild(U.h("h2", { "class": "section-title", text: "Modal verbs at a glance" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, guide.modals.map(function (m) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("b", { text: m.name }),
          U.h("span", { text: m.use }),
          showHindi(t) && m.hindi ? U.h("span", { "class": "gr-ex-hi", text: m.hindi }) : null,
          U.h("span", { "class": "gr-form-en", text: m.example })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Politeness levels" }));
      root.appendChild(U.h("ol", { "class": "card gr-guide-list" }, guide.politeness.map(function (line) {
        return U.h("li", { text: line });
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Common mistakes" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, guide.mistakes.map(function (m) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("span", { "class": "gr-wrong", text: m.wrong }),
          U.h("b", { "class": "gr-right", text: m.right }),
          U.h("span", { text: m.why })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Ready-to-use office sentences" }));
      root.appendChild(U.h("ol", { "class": "card gr-guide-list" }, guide.officeSentences.map(function (line) {
        return U.h("li", { text: line });
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Email phrases" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, guide.emailPhrases.map(function (line) {
        return U.h("div", { "class": "gr-reference-item", text: line });
      })));
      root.appendChild(U.h("div", { "class": "card gr-guide-list" }, guide.tips.map(function (line) {
        return U.h("p", { text: line });
      })));
    }

    if (t.verbFormGroups && t.verbFormGroups.length) {
      root.appendChild(U.h("h2", { "class": "section-title", text: "Verb form reference" }));
      t.verbFormGroups.forEach(function (group) {
        var table = U.h("table", { "class": "gr-verb-table" });
        table.appendChild(U.h("caption", { text: group.title + " — " + group.description }));
        table.appendChild(U.h("thead", {}, [U.h("tr", {}, [
          U.h("th", { scope: "col", text: "V1" }),
          U.h("th", { scope: "col", text: "V2" }),
          U.h("th", { scope: "col", text: "V3" }),
          U.h("th", { scope: "col", text: "Meaning & example" })
        ])]));
        table.appendChild(U.h("tbody", {}, group.verbs.map(function (verb) {
          return U.h("tr", {}, [
            U.h("th", { scope: "row", text: verb.v1 }),
            U.h("td", { text: verb.v2 }),
            U.h("td", { text: verb.v3 }),
            U.h("td", {}, [
              showHindi(t) && verb.hi ? U.h("span", { "class": "gr-ex-hi", text: verb.hi }) : null,
              U.h("span", { "class": "gr-form-en", text: verb.example })
            ])
          ]);
        })));
        root.appendChild(U.h("div", { "class": "card gr-verb-table-wrap" }, [table]));
      });
    }

    if (t.studyGuide) {
      var study = t.studyGuide;
      root.appendChild(U.h("h2", { "class": "section-title", text: "Common mistakes" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, study.mistakes.map(function (m) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("span", { "class": "gr-wrong", text: m.wrong }),
          U.h("b", { "class": "gr-right", text: m.right }),
          U.h("span", { text: m.why })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Memory tips" }));
      root.appendChild(U.h("ul", { "class": "card gr-guide-list" }, study.memoryTips.map(function (line) {
        return U.h("li", { text: line });
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Daily practice" }));
      root.appendChild(U.h("ol", { "class": "card gr-guide-list" }, study.practiceSentences.map(function (line) {
        return U.h("li", { text: line });
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "7-day study plan" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, study.studyPlan.map(function (day) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("b", { text: day.day }),
          U.h("span", { text: day.focus }),
          U.h("span", { "class": "gr-ex-hi", text: day.target })
        ]);
      })));
    }

    if (t.pronunciationGuide) {
      var pronunciation = t.pronunciationGuide;
      root.appendChild(U.h("h2", { "class": "section-title", text: "Syllable practice" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, pronunciation.syllables.map(function (item) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("b", { text: item.word + " · " + item.count + (item.count === 1 ? " syllable" : " syllables") }),
          U.h("span", { "class": "gr-form-en", text: item.parts }),
          U.h("span", { text: item.note })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Word stress" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, pronunciation.stressExamples.map(function (item) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("b", { text: item.word + " · " + item.stress }),
          U.h("span", { "class": "gr-form-en", text: item.parts }),
          U.h("span", { text: item.note })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Stress and suffix patterns" }));
      root.appendChild(U.h("div", { "class": "card gr-reference-list" }, pronunciation.suffixPatterns.map(function (item) {
        return U.h("div", { "class": "gr-reference-item" }, [
          U.h("b", { text: item.suffix }),
          U.h("span", { text: item.pattern }),
          U.h("span", { "class": "gr-form-en", text: item.example })
        ]);
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "A method for unfamiliar words" }));
      root.appendChild(U.h("ol", { "class": "card gr-guide-list" }, pronunciation.steps.map(function (step) {
        return U.h("li", { text: step });
      })));
      root.appendChild(U.h("h2", { "class": "section-title", text: "Revision notes" }));
      root.appendChild(U.h("ul", { "class": "card gr-guide-list" }, pronunciation.revisionNotes.map(function (note) {
        return U.h("li", { text: note });
      })));
    }

    var hasEx = !!(c && c.exercises && c.exercises.length);
    root.appendChild(U.h("div", { "class": "fc-actions" }, [
      U.h("button", {
        "class": "btn btn-lg", type: "button", text: "Practise this topic",
        disabled: hasEx ? null : "disabled",
        onclick: function () { U.sound("tap"); U.navigate("grammar", { view: "practice", id: t.id }); }
      })
    ]));
    if (!hasEx) {
      root.appendChild(U.h("p", {
        "class": "screen-sub", style: "text-align:center",
        text: "Exercises for this topic are still being written."
      }));
    }
    U.render(root);
  }

  /* ---------------- practice session ---------------- */
  function clone(e, topicId) {
    var o = {}, k;
    for (k in e) { if (Object.prototype.hasOwnProperty.call(e, k)) { o[k] = e[k]; } }
    o.topicId = topicId;
    return o;
  }
  function buildSession(t, own) {
    var mine = own ? own.map(function (e) { return clone(e, t.id); }) : [];
    var production = mine.filter(function (e) { return e.type === "produce"; });
    var regular = mine.filter(function (e) { return e.type !== "produce"; });
    var pool = [];
    topics().forEach(function (x) {
      if (!x || x.level !== t.level || x.id === t.id) { return; }
      var cc = contentOf(x.id);
      if (!cc || !cc.exercises) { return; }
      cc.exercises.forEach(function (e) { pool.push(clone(e, x.id)); });
    });
    var need = Math.max(0, 10 - mine.length);
    var picked = S.shuffle(pool).slice(0, need);
    return production.concat(S.shuffle(regular.concat(picked))).slice(0, 10);
  }
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
  }

  function practiceView(id) {
    U.clearKey();
    var t = topicById(id);
    if (!t) { levelsView(); return; }
    var c = contentOf(id);
    var items = buildSession(t, c && c.exercises);
    var root = U.h("section", { "class": "screen session-screen", "aria-label": "Grammar practice" });

    if (!items.length) {
      root.appendChild(head(t.title));
      root.appendChild(U.h("div", { "class": "card" }, [
        U.h("b", { text: "No exercises yet." }),
        U.h("p", { "class": "screen-sub", text: "This topic has no practice questions in data/grammar-exercises.js." })
      ]));
      U.render(root);
      return;
    }

    var i = 0, correct = 0, body = U.h("div", {}), bar = U.h("i", { style: "width:0%" });
    root.appendChild(U.h("div", { "class": "q-head" }, [
      U.h("button", {
        "class": "icon-btn", type: "button", "aria-label": "Leave practice",
        onclick: function () { finish(); }
      }, [U.h("svg", {
        width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round",
        "aria-hidden": "true", focusable: "false"
      }, [U.h("path", { d: "M15 19l-7-7 7-7" })])]),
      U.h("span", { "class": "q-title", text: t.title }),
      U.h("span", { "class": "q-count", text: "" })
    ]));
    root.appendChild(U.h("div", { "class": "session-bar" }, [
      U.h("div", { "class": "progress-bar", "aria-hidden": "true" }, [bar])
    ]));
    root.appendChild(body);

    function setCount() {
      var n = root.querySelector(".q-count");
      if (n) { n.textContent = Math.min(i + 1, items.length) + "/" + items.length; }
      bar.style.width = Math.round((i / items.length) * 100) + "%";
    }

    function next() {
      i += 1;
      if (i >= items.length) { finish(); return; }
      draw();
    }

    function after(it, ok, note) {
      if (ok) { correct += 1; }
      U.sound(ok ? "ok" : "bad");
      var res = score(it.topicId, ok);
      U.announce((ok ? "Correct. " : "Not quite. ") + (note || ""));
      if (res.goalHit) { U.celebrate("Daily goal reached!"); }
      window.setTimeout(next, ok ? 900 : 1900);
    }

    function draw() {
      setCount();
      body.innerHTML = "";
      var it = items[i];
      if (!it) { finish(); return; }
      if (it.type === "order") { drawOrder(it); }
      else if (it.type === "produce") { drawProduction(it); }
      else { drawChoice(it); }
    }

    function typeLabel(it) {
      if (it.type === "chooser") { return "Choose the correct sentence"; }
      if (it.type === "cloze") { return "Fill the gap"; }
      if (it.type === "spot") { return "Find the mistake"; }
      if (it.type === "produce") { return "Write it in your own words"; }
      return "Put the words in order";
    }

    function storyContext(it) {
      if (!it.storyContext) { return null; }
      return U.h("div", { "class": "gr-practice-story" }, [
        U.h("div", { "class": "prompt-sub", text: "From Ravi’s story · apply the same rule" }),
        U.h("p", { "class": "gr-practice-story-text", text: it.storyContext })
      ]);
    }

    function drawProduction(it) {
      var input = U.h("textarea", {
        "class": "gr-production-input", rows: 3, placeholder: "Write your sentence here…",
        "aria-label": "Your sentence"
      });
      input.value = "";
      var sample = U.h("div", {
        "class": "gr-sentence gr-sentence-2"
      }, [U.h("b", { text: "Example: " }), U.h("span", { text: it.sample })]);
      sample.style.display = "none";
      var reveal = U.h("button", {
        "class": "btn btn-secondary", type: "button", text: "Show an example"
      });
      reveal.addEventListener("click", function () {
        sample.style.display = sample.style.display === "none" ? "block" : "none";
        reveal.textContent = sample.style.display === "none" ? "Show an example" : "Hide example";
      });
      var prompt = U.h("div", { "class": "prompt-card card" }, [
        U.h("div", { "class": "prompt-sub", text: typeLabel(it) }),
        U.h("div", { "class": "gr-sentence", text: it.prompt }),
        U.h("p", { "class": "screen-sub", text: it.instruction })
      ]);
      var actions = U.h("div", { "class": "fc-actions" }, [
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "I can do this"
        }),
        U.h("button", {
          "class": "btn btn-secondary", type: "button", text: "I need more practice"
        })
      ]);
      var context = storyContext(it);
      if (context) { body.appendChild(context); }
      body.appendChild(prompt);
      body.appendChild(input);
      body.appendChild(reveal);
      body.appendChild(sample);
      body.appendChild(actions);

      var rated = false;
      actions.children[0].addEventListener("click", function () {
        if (rated) { return; }
        if (!input.value.trim()) {
          U.toast("Write your own sentence before rating it.");
          input.focus();
          return;
        }
        rated = true;
        after(it, true, "Good work — you made your own sentence.");
      });
      actions.children[1].addEventListener("click", function () {
        if (rated) { return; }
        rated = true;
        after(it, false, "Compare your sentence with the example and try again.");
      });
    }

    function drawChoice(it) {
      var opts = (it.options || []).map(function (o, k) { return U.makeOption(k, o, {}); });
      var promptCard = U.h("div", { "class": "prompt-card card" }, [
        U.h("div", { "class": "prompt-sub", text: typeLabel(it) }),
        U.h("div", { "class": "gr-sentence", text: it.prompt }),
        (it.type === "spot" && it.sentence) ? U.h("div", { "class": "gr-sentence gr-sentence-2", text: it.sentence }) : null
      ]);
      var context = storyContext(it);
      if (context) { body.appendChild(context); }
      var shell = U.questionShell({ prompt: promptCard, options: opts, countText: "" });
      body.appendChild(shell);
      var answered = false;
      function choose(k) {
        if (answered) { return; }
        answered = true;
        U.clearKey();
        var ok = k === it.answer;
        U.markOptions(shell, it.answer, k);
        U.setFeedback(shell, ok, ok ? it.note : (it.options[it.answer] + " - " + it.note));
        after(it, ok, it.note);
      }
      opts.forEach(function (btn, k) { btn.addEventListener("click", function () { choose(k); }); });
      U.registerKey(function (e) {
        if (e.key === "Escape") { e.preventDefault(); finish(); return; }
        var n = parseInt(e.key, 10);
        if (n >= 1 && n <= opts.length) { e.preventDefault(); choose(n - 1); }
      });
    }

    function drawOrder(it) {
      var src = (it.words && it.words.length) ? it.words : String(it.answer || "").split(/\s+/);
      var tiles = S.shuffle(src.map(function (w) { return String(w); })).map(function (w) {
        return { w: w, used: false };
      });
      var placed = [];
      var slotRow = U.h("div", { "class": "gr-slots" });
      var tray = U.h("div", { "class": "gr-tray" });
      var check = U.h("button", { "class": "btn btn-lg", type: "button", text: "Check", disabled: "disabled" });
      var fb = U.h("div", { "class": "feedback", "aria-live": "polite" });
      var promptCard = U.h("div", { "class": "prompt-card card" }, [
        U.h("div", { "class": "prompt-sub", text: typeLabel(it) }),
        U.h("div", { "class": "gr-sentence", text: it.prompt || "Put the words in the right order." })
      ]);
      var context = storyContext(it);
      if (context) { body.appendChild(context); }
      body.appendChild(promptCard);
      body.appendChild(slotRow);
      body.appendChild(tray);
      body.appendChild(U.h("div", { style: "margin-top:12px" }, [check]));
      body.appendChild(fb);

      function paint() {
        slotRow.innerHTML = "";
        if (!placed.length) {
          slotRow.appendChild(U.h("span", { "class": "gr-slots-label", text: "Tap the words below" }));
        }
        placed.forEach(function (tileIdx, pos) {
          var word = tiles[tileIdx].w;
          var b = U.h("button", { "class": "gr-word in-slot", type: "button", text: word, "aria-label": word + ", tap to remove" });
          b.addEventListener("click", function () {
            tiles[tileIdx].used = false;
            placed.splice(pos, 1);
            paint();
          });
          slotRow.appendChild(b);
        });
        tray.innerHTML = "";
        tiles.forEach(function (tile, idx) {
          var b = U.h("button", {
            "class": "gr-word" + (tile.used ? " used" : ""), type: "button", text: tile.w,
            "aria-label": "Add " + tile.w
          });
          b.addEventListener("click", function () {
            if (tile.used) { return; }
            tile.used = true;
            placed.push(idx);
            paint();
          });
          tray.appendChild(b);
        });
        check.disabled = placed.length === tiles.length ? null : "disabled";
      }
      paint();

      var answered = false;
      check.addEventListener("click", function () {
        if (answered || placed.length !== tiles.length) { return; }
        answered = true;
        U.clearKey();
        var attempt = placed.map(function (ix) { return tiles[ix].w; }).join(" ");
        var ok = norm(attempt) === norm(it.answer);
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.innerHTML = "";
        fb.appendChild(U.h("span", { text: ok ? "Correct. " : "Not quite. " }));
        fb.appendChild(U.h("span", { "class": "fb-detail", text: ok ? it.note : it.answer + " - " + it.note }));
        after(it, ok, it.note);
      });
      U.registerKey(function (e) {
        if (e.key === "Escape") { e.preventDefault(); finish(); return; }
        if (e.key === "Backspace") {
          e.preventDefault();
          var last = placed.pop();
          if (typeof last === "number") { tiles[last].used = false; }
          paint();
        }
      });
    }

    function finish() {
      U.clearKey();
      U.stopAudio();
      body.innerHTML = "";
      var pct = items.length ? Math.round((correct / items.length) * 100) : 0;
      var r = rec(t.id);
      body.appendChild(U.h("div", { "class": "card session-summary" }, [
        U.h("div", { "class": "big-score", text: pct + "%" }),
        U.h("p", { "class": "screen-sub", style: "margin:0", text: correct + " of " + items.length + " correct" }),
        U.h("div", { "class": "score-line" }, [
          U.h("span", { "class": "pill pill-good", text: "correct " + correct }),
          U.h("span", { "class": "pill pill-bad", text: "wrong " + (items.length - correct) })
        ]),
        U.h("p", { "class": "screen-sub", text: r.done ? "Topic mastered." : "Mastered at 6 correct answers." })
      ]));
      body.appendChild(U.h("div", { "class": "fc-actions" }, [
        U.h("button", {
          "class": "btn btn-secondary btn-lg", type: "button", text: "Back to topic",
          onclick: function () { U.navigate("grammar", { view: "topic", id: t.id }); }
        }),
        U.h("button", {
          "class": "btn btn-lg", type: "button", text: "One more round",
          onclick: function () { practiceView(t.id); }
        })
      ]));
    }

    U.render(root);
    draw();
  }

  B850.screens = B850.screens || {};
  B850.screens.grammar = {
    render: function (params) {
      params = params || {};
      if (params.view === "practice" && params.id) { practiceView(params.id); return; }
      if (params.view === "topic" && params.id) { topicView(params.id); return; }
      levelsView();
    }
  };
}();
