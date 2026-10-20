!function () {
  "use strict";
  var S = B850.store, U = B850.ui;
  B850.screens.settings = {
    render: function render() {
      U.clearKey();
      var st = S.state, set = st.settings;
      var root = U.h("section", { "class": "screen", "aria-label": "Settings" });
      root.appendChild(U.h("h1", { "class": "screen-title", text: "Settings" }));
      root.appendChild(U.h("p", {
        "class": "screen-sub",
        text: "Everything is saved on this device — no account, no network."
      }));

      var card = U.h("div", { "class": "card" });
      card.appendChild(U.h("div", { "class": "set-row" }, [
        U.h("div", {}, [
          U.h("div", { "class": "set-label", text: "Prompt language" }),
          U.h("div", { "class": "set-sub", text: "Which language leads flashcards, quizzes and listening." })
        ]),
        U.h("div", { "class": "seg", role: "group", "aria-label": "Prompt language" }, [
          U.segButton("Hindi", set.langFirst === "hindi", function () {
            set.langFirst = "hindi"; S.save(st); render();
          }),
          U.segButton("English", set.langFirst === "english", function () {
            set.langFirst = "english"; S.save(st); render();
          })
        ])
      ]));

      var hindiSwitch = U.h("button", {
        "class": "switch", type: "button", role: "switch",
        "aria-checked": set.showGrammarHindi ? "true" : "false",
        "aria-label": "Show reviewed Hindi grammar help"
      });
      hindiSwitch.addEventListener("click", function () {
        set.showGrammarHindi = !set.showGrammarHindi;
        S.save(st);
        render();
      });
      card.appendChild(U.h("div", { "class": "set-row" }, [
        U.h("div", {}, [
          U.h("div", { "class": "set-label", text: "Hindi grammar help" }),
          U.h("div", {
            "class": "set-sub",
            text: "Show reviewed Hindi explanations and translations in grammar lessons. Hidden by default."
          })
        ]),
        hindiSwitch
      ]));

      var voiceRow = U.h("div", { "class": "set-row" });
      var voiceWrap = U.h("div", {}, [
        U.h("div", { "class": "set-label", text: "Voice" }),
        U.h("div", { "class": "set-sub", id: "voiceSub", text: "" })
      ]);
      voiceRow.appendChild(voiceWrap);
      var voices = S.speech.supported() ? S.speech.availableVoices() : [];
      if (S.speech.supported()) {
        if (voices.length) {
          var sel = U.h("select", { "class": "select", "aria-label": "Speech voice" });
          sel.appendChild(U.h("option", { value: "", text: "Automatic (en-US)" }));
          voices.forEach(function (v) {
            sel.appendChild(U.h("option", { value: v.voiceURI, text: v.name + " (" + v.lang + ")" }));
          });
          sel.value = set.voiceURI || "";
          sel.addEventListener("change", function () {
            S.speech.pickVoiceURI(sel.value);
            S.save(st);
            U.toast("Voice saved");
            S.speech.supported() && S.speech.speak("Hello");
          });
          voiceWrap.appendChild(sel);
        } else {
          voiceWrap.appendChild(U.h("p", {
            "class": "screen-sub", style: "margin:6px 0 0", text: "Loading voices…"
          }));
        }
      } else {
        voiceWrap.appendChild(U.h("p", {
          "class": "pill pill-warn", style: "margin:6px 0 0",
          text: "🔇 No English voice available — audio modes are hidden."
        }));
      }
      card.appendChild(voiceRow);
      card.appendChild(U.h("div", { "class": "set-row" }, [
        U.h("div", {}, [
          U.h("div", { "class": "set-label", text: "Speech rate" }),
          U.h("div", { "class": "set-sub", text: set.rate.toFixed(1) + "×" })
        ]),
        U.h("div", { "class": "seg", role: "group", "aria-label": "Speech rate" }, [
          U.segButton("Slow", set.rate < .85, function () { set.rate = .75; S.save(st); render(); }),
          U.segButton("Normal", set.rate >= .85 && set.rate <= .95, function () {
            set.rate = .9; S.save(st); render();
          }),
          U.segButton("Fast", set.rate > .95, function () { set.rate = 1.05; S.save(st); render(); })
        ])
      ]));
      var soundSwitch = U.h("button", {
        "class": "switch", type: "button", role: "switch",
        "aria-checked": set.sound ? "true" : "false", "aria-label": "Sound effects"
      });
      soundSwitch.addEventListener("click", function () {
        set.sound = !set.sound;
        soundSwitch.setAttribute("aria-checked", set.sound ? "true" : "false");
        S.save(st);
        set.sound && U.sound("ok");
      });
      card.appendChild(U.h("div", { "class": "set-row" }, [
        U.h("div", {}, [
          U.h("div", { "class": "set-label", text: "Sound effects" }),
          U.h("div", { "class": "set-sub", text: "Short tones for right and wrong answers." })
        ]),
        soundSwitch
      ]));
      card.appendChild(U.h("div", { "class": "set-row" }, [
        U.h("div", {}, [
          U.h("div", { "class": "set-label", text: "Daily goal" }),
          U.h("div", {
            "class": "set-sub", text: st.daily.count + " answered today · goal: " + set.goal
          })
        ]),
        U.h("div", { "class": "seg", role: "group", "aria-label": "Daily goal size" }, [
          U.segButton("10", set.goal === 10, function () { set.goal = 10; S.save(st); render(); }),
          U.segButton("20", set.goal === 20, function () { set.goal = 20; S.save(st); render(); }),
          U.segButton("30", set.goal === 30, function () { set.goal = 30; S.save(st); render(); }),
          U.segButton("50", set.goal === 50, function () { set.goal = 50; S.save(st); render(); })
        ])
      ]));
      root.appendChild(card);
      root.appendChild(U.h("h2", { "class": "section-title", text: "Danger zone" }));
      root.appendChild(U.h("button", {
        "class": "btn btn-bad btn-lg", type: "button", "aria-label": "Reset all progress",
        onclick: function () {
          U.confirmSheet(
            "Reset all progress?",
            "This deletes your XP, streak, learned words, the spaced-repetition schedule and stats on this device. Settings are kept. The word list itself is not changed.",
            "Yes, reset everything",
            function () {
              var keep = st.settings;
              S.state = S.reset();
              S.state.settings = keep;
              S.save(S.state);
              U.refreshChrome();
              render();
            }
          );
        }
      }, ["🗑 Reset progress"]));
      U.render(root);
    }
  };
}();
