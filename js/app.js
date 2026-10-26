!function () {
  "use strict";
  var S = B850.store, U = B850.ui, currentScreen = null;

  function boot() {
    var data = S.normalise();
    if (data && data.total) {
      B850.data = data;
      B850.state = S.load();
      S.save(B850.state);
      U.init();
      var btnHome = document.getElementById("btnHome");
      if (btnHome) { btnHome.addEventListener("click", function () { B850.ui.navigate("home"); }); }
      var btnSettings = document.getElementById("btnSettings");
      if (btnSettings) { btnSettings.addEventListener("click", function () { B850.ui.navigate("settings"); }); }
      document.querySelectorAll(".tab-btn").forEach(function (tab) {
        tab.addEventListener("click", function () { B850.ui.navigate(tab.getAttribute("data-tab")); });
      });
      B850.ui.navigate("home");
      try {
        if ("serviceWorker" in navigator && "file:" !== location.protocol) {
          window.addEventListener("load", function () {
            navigator.serviceWorker.register("sw.js").catch(function () {});
          });
        }
      } catch (error) {}
    } else {
      var main = document.getElementById("main");
      if (main) {
        main.innerHTML = "";
        var message = document.createElement("div");
        message.className = "card";
        message.style.margin = "20px 12px";
        message.textContent = "The word dataset could not be loaded. Make sure data/words.js sits next to index.html.";
        main.appendChild(message);
      }
    }
  }

  var BRAND = {
    home: "Home", learn: "Learn", quiz: "Quiz", listen: "Listening",
    typing: "Typing", spelling: "Spelling", review: "Review", stats: "Stats",
    settings: "Settings", grammar: "Grammar", reading: "Reading"
  };

  B850.ui.navigate = function (name, params) {
    var screen = B850.screens[name];
    if (!screen || typeof screen.render !== "function") {
      name = "home";
      screen = B850.screens.home;
    }
    if (B850.screens.reading && typeof B850.screens.reading.stopSpeechRecognition === "function") {
      B850.screens.reading.stopSpeechRecognition();
    }
    currentScreen = name;
    var sub = document.getElementById("brandSub");
    if (sub) { sub.textContent = BRAND[name] || "Home"; }
    try {
      screen.render(params);
    } catch (error) {
      var main = document.getElementById("main");
      if (main) {
        main.innerHTML = '<div class="card" style="margin:16px"><b>Something went wrong in this screen.</b><p style="color:var(--text-2);margin:8px 0 12px">' +
          String(error.message) + '</p><button class="btn" type="button" onclick="B850.ui.navigate(\'home\')">Go home</button></div>';
      }
      window.console && console.error && console.error("screen render error:", error);
    }
  };

  if ("loading" === document.readyState) { document.addEventListener("DOMContentLoaded", boot); }
  else { boot(); }
}();
