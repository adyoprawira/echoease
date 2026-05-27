(function () {

  const quickExitTop = document.getElementById("quickExitTop");

  if (quickExitTop) {
    quickExitTop.addEventListener("click", function () {
      if (window.EchoEaseSafety && typeof window.EchoEaseSafety.quickExit === "function") {
        window.EchoEaseSafety.quickExit();
        return;
      }

      window.location.href = "../../Landing%20Page/blackboard.html";
    });
  }

})();
