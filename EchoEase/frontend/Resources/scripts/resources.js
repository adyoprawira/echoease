(function () {
  const recommendedResourceKeys = {
    "Financial Aid": "financial",
    "After-hours Care / Crisis Support": "crisis",
    "Disability Support": "disability",
    "Health Clinic": "health",
    "Study Support and Burnout Care": "study",
    "Counselling / UQ Professional Support": "counselling"
  };

  const quickExitTop = document.getElementById("quickExitTop");
  const resourceHandoff = document.getElementById("resourceHandoff");
  const resourceHandoffText = document.getElementById("resourceHandoffText");

  if (quickExitTop) {
    quickExitTop.addEventListener("click", function () {
      window.location.href = "../../Landing%20Page/blackboard.html";
    });
  }

  function readHandoffContext() {
    try {
      return JSON.parse(window.sessionStorage.getItem("chatResourceHandoff") || "null");
    } catch (error) {
      return null;
    }
  }

  function highlightChatRecommendation() {
    const handoffContext = readHandoffContext();
    const recommendation = (handoffContext && handoffContext.recommendedResource) ||
      window.sessionStorage.getItem("recommendedResource");
    const resourceKey = recommendedResourceKeys[recommendation];
    const matchingCard = resourceKey ?
      document.querySelector('[data-resource-key="' + resourceKey + '"]') :
      null;

    if (!matchingCard || !resourceHandoff || !resourceHandoffText) {
      return;
    }

    resourceHandoffText.textContent = recommendation +
      " was suggested during your conversation. Review the highlighted option below.";
    resourceHandoff.hidden = false;
    matchingCard.classList.add("resource-match");
  }

  highlightChatRecommendation();

})();
