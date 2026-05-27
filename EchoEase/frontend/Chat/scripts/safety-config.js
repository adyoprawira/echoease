(function () {
  "use strict";

  // Verified on 2026-05-27 against official UQ and Lifeline support information.
  const contacts = Object.freeze({
    emergency: Object.freeze({
      name: "Emergency services",
      number: "000",
      dial: "000"
    }),
    lifeline: Object.freeze({
      name: "Lifeline",
      number: "13 11 14",
      dial: "131114"
    }),
    uqCrisis: Object.freeze({
      name: "UQ Counselling and Crisis Line",
      number: "1300 851 998",
      dial: "1300851998"
    })
  });

  const scriptUrl = document.currentScript && document.currentScript.src;
  const quickExitUrl = scriptUrl
    ? new URL("../../Landing%20Page/blackboard.html", scriptUrl).href
    : "../../Landing%20Page/blackboard.html";

  function populateContacts() {
    document.querySelectorAll("[data-safety-number]").forEach(function (element) {
      const entry = contacts[element.dataset.safetyNumber];

      if (entry) {
        element.textContent = entry.number;
      }
    });

    document.querySelectorAll("[data-safety-call]").forEach(function (element) {
      const entry = contacts[element.dataset.safetyCall];

      if (!entry) {
        return;
      }

      element.setAttribute("href", "tel:" + entry.dial);

      if (element.dataset.safetyCallLabel === "true") {
        element.textContent = "Call " + entry.name + ": " + entry.number;
      }
    });
  }

  function quickExit() {
    window.location.href = quickExitUrl;
  }

  window.EchoEaseSafety = Object.freeze({
    contacts: contacts,
    populateContacts: populateContacts,
    quickExit: quickExit
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", populateContacts);
  } else {
    populateContacts();
  }
})();
