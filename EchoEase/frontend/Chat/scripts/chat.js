(function () {
  const MAX_MESSAGE_LENGTH = 500;
  const RESOURCE_PAGE_PATH = "../../Resources/pages/resources.html";

  const SESSION_STATUS = {
    ACTIVE: "Active",
    ESCALATED: "Urgent options shown",
    ENDED: "Ended"
  };

  const STORAGE_KEYS = {
    chatSessionId: "chatSessionId",
    chatSessionStatus: "chatSessionStatus",
    referralSummary: "chatReferralSummary",
    lastChatSummary: "lastChatSummary",
    savedResources: "savedWellbeingResources",
    savedSummaries: "savedChatSummaries",
    handoffReason: "handoffReason",
    recommendedResource: "recommendedResource",
    sourceProfessional: "sourceProfessional",
    sourceChatSessionId: "sourceChatSessionId",
    handoffTimestamp: "timestamp",
    handoffContext: "chatResourceHandoff"
  };

  const messagesEl = document.getElementById("messages");
  const inputEl = document.getElementById("chatMessageInput");
  const sendBtn = document.getElementById("sendButton");
  const charCounterEl = document.getElementById("charCounter");
  const promptButtons = Array.from(document.querySelectorAll(".prompt-btn"));
  const urgentHelpBtn = document.getElementById("urgentHelpBtn");
  const inlineFeatureButtons = Array.from(document.querySelectorAll(".inline-feature-btn"));

  const statusEl = document.getElementById("professionalStatus");
  const chatSessionStatusLabelEl = document.getElementById("chatSessionStatusLabel");
  const referralCountLabelEl = document.getElementById("referralCountLabel");
  const handoffBannerEl = document.getElementById("handoffBanner");
  const welcomeEl = document.getElementById("chatWelcome");

  const mentorNameEl = document.getElementById("mentorName");
  const mentorRoleEl = document.getElementById("mentorRole");
  const mentorPhotoEl = document.getElementById("mentorPhoto");
  const profileOfficerNameEl = document.getElementById("profileOfficerName");
  const profileOfficerRoleEl = document.getElementById("profileOfficerRole");
  const profileOfficerStatusEl = document.getElementById("profileOfficerStatus");
  const profileOfficerSpecialtiesEl = document.getElementById("profileOfficerSpecialties");

  const emergencyBtn = document.getElementById("emergencyResourcesBtn");
  const emergencyPanel = document.getElementById("emergencyPanel");
  const closeEmergencyPanelBtn = document.getElementById("closeEmergencyPanelBtn");

  const privacyBtn = document.getElementById("privacyInfoBtn");
  const privacyPanel = document.getElementById("privacyPanel");
  const closePrivacyPanelBtn = document.getElementById("closePrivacyPanelBtn");
  const clearStoredChatDataBtn = document.getElementById("clearStoredChatDataBtn");

  const mentorProfileBtn = document.getElementById("mentorProfileBtn");
  const mentorProfileModal = document.getElementById("mentorProfileModal");
  const closeMentorProfileModalBtn = document.getElementById("closeMentorProfileModalBtn");

  const endChatBtn = document.getElementById("endChatBtn");
  const endChatModal = document.getElementById("endChatModal");
  const closeEndChatModalBtn = document.getElementById("closeEndChatModalBtn");
  const cancelEndChatBtn = document.getElementById("cancelEndChatBtn");
  const confirmEndChatBtn = document.getElementById("confirmEndChatBtn");

  const resourceDetailsModal = document.getElementById("resourceDetailsModal");
  const closeResourceDetailsModalBtn = document.getElementById("closeResourceDetailsModalBtn");
  const closeResourceDetailsActionBtn = document.getElementById("closeResourceDetailsActionBtn");
  const resourceDetailsTitleEl = document.getElementById("resourceDetailsTitle");
  const resourceDetailsUrgencyEl = document.getElementById("resourceDetailsUrgency");
  const resourceDetailsDescriptionEl = document.getElementById("resourceDetailsDescription");
  const resourceDetailsWhenToUseEl = document.getElementById("resourceDetailsWhenToUse");
  const resourceDetailsNextStepEl = document.getElementById("resourceDetailsNextStep");
  const resourceDetailsNoteEl = document.getElementById("resourceDetailsNote");
  const openResourcePageBtn = document.getElementById("openResourcePageBtn");

  const openResourceConfirmModal = document.getElementById("openResourceConfirmModal");
  const closeOpenResourceConfirmModalBtn = document.getElementById("closeOpenResourceConfirmModalBtn");
  const openResourceConfirmTextEl = document.getElementById("openResourceConfirmText");
  const continueChattingBtn = document.getElementById("continueChattingBtn");
  const confirmOpenResourceBtn = document.getElementById("confirmOpenResourceBtn");

  const endChatSummaryModal = document.getElementById("endChatSummaryModal");
  const closeEndSummaryModalBtn = document.getElementById("closeEndSummaryModalBtn");
  const summaryProfessionalEl = document.getElementById("summaryProfessional");
  const summarySessionStatusEl = document.getElementById("summarySessionStatus");
  const summaryConcernEl = document.getElementById("summaryConcern");
  const summaryResourcesEl = document.getElementById("summaryResources");
  const summarySavedResourcesEl = document.getElementById("summarySavedResources");
  const summaryNextStepEl = document.getElementById("summaryNextStep");
  const saveChatSummaryBtn = document.getElementById("saveChatSummaryBtn");
  const summarySaveConsent = document.getElementById("summarySaveConsent");
  const deleteSavedSummariesBtn = document.getElementById("deleteSavedSummariesBtn");
  const continueAfterSummaryBtn = document.getElementById("continueAfterSummaryBtn");
  const returnToSelectionBtn = document.getElementById("returnToSelectionBtn");

  if (!messagesEl || !inputEl || !sendBtn || !charCounterEl || !statusEl) {
    return;
  }

  const professionals = {
    sarah: {
      name: "Simulated Support Guide",
      role: "Automated demo responses",
      status: "Prototype simulation",
      specialties: "study, financial, and wellbeing resources",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      placeholder: "Enter text to preview resource suggestions..."
    },
    marcus: {
      name: "Simulated Support Guide",
      role: "Automated demo responses",
      status: "Prototype simulation",
      specialties: "wellbeing and support resources",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop",
      placeholder: "Enter text to preview resource suggestions..."
    }
  };

  const referralResources = {
    financial: {
      title: "Financial Aid",
      description: "Support for fees, rent pressure, and living cost concerns.",
      urgency: "Medium",
      concernLabel: "Financial stress",
      details: {
        helpsWith: "Fee pressure, rent stress, and short-term financial hardship.",
        whenToUse: "Use when money concerns are affecting your study and day-to-day stability.",
        nextStep: "Review funding options and ask student services about payment plans and grants."
      },
      acknowledgement:
        "Financial support resources are available in this prototype. You can review the suggested pathway below."
    },
    crisis: {
      title: "After-hours Care / Crisis Support",
      description: "Immediate safety pathways and urgent phone support.",
      urgency: "High",
      concernLabel: "Immediate safety concern",
      details: {
        helpsWith: "Urgent support when you feel unsafe or at risk of harm.",
        whenToUse: "Use immediately if safety is at risk, including self-harm or suicide concerns.",
        nextStep: "Contact emergency services first, then continue with crisis and university support."
      },
      acknowledgement:
        "Urgent help options are shown below. If there is immediate danger, call emergency services now."
    },
    disability: {
      title: "Disability Support",
      description: "Accessibility planning and accommodation support.",
      urgency: "Medium",
      concernLabel: "Accessibility and accommodations",
      details: {
        helpsWith: "Learning adjustments, accessibility needs, and formal accommodation planning.",
        whenToUse: "Use when disability or accessibility barriers are impacting your study progress.",
        nextStep: "Request disability support advice and discuss available academic adjustments."
      },
      acknowledgement:
        "Accessibility support resources are available. You can review the suggested pathway below."
    },
    health: {
      title: "Health Clinic",
      description: "Medical support and health appointment pathways.",
      urgency: "Medium",
      concernLabel: "Health and medical support",
      details: {
        helpsWith: "General health concerns, illness, and advice from clinical services.",
        whenToUse: "Use when physical or medical symptoms are affecting wellbeing or study capacity.",
        nextStep: "Book clinic support and discuss immediate care needs with a health professional."
      },
      acknowledgement:
        "Health support resources are available. You can review the suggested pathway below."
    },
    study: {
      title: "Study Support and Burnout Care",
      description: "Support for exam pressure, burnout, and study overload.",
      urgency: "Medium",
      concernLabel: "Study burnout and exam pressure",
      details: {
        helpsWith: "Exam stress, burnout recovery, and practical study planning.",
        whenToUse: "Use when study demands feel overwhelming and are affecting your mental wellbeing.",
        nextStep: "Connect to study wellbeing support and build a manageable short-term plan."
      },
      acknowledgement:
        "Study support resources are available. You can review the suggested pathway below."
    },
    counselling: {
      title: "Counselling and Wellbeing Resources",
      description: "Contact pathways for wellbeing support conversations.",
      urgency: "Low",
      concernLabel: "Emotional wellbeing support",
      details: {
        helpsWith: "Loneliness, emotional load, and ongoing wellbeing support conversations.",
        whenToUse: "Use when you want to review contact options for wellbeing support.",
        nextStep: "Review wellbeing support and counselling contact options if useful."
      },
      acknowledgement:
        "Wellbeing support resources are available. You can review the suggested pathway below."
    }
  };

  const concernKeywordMap = {
    financial: ["financial", "money", "rent", "fee", "afford", "cost"],
    crisis: [
      "crisis",
      "unsafe",
      "danger",
      "emergency",
      "harm",
      "suicide",
      "self-harm",
      "self harm",
      "hurt myself",
      "kill myself",
      "want to die",
      "end my life",
      "can't go on"
    ],
    disability: ["disability", "accessibility", "accommodations", "accommodation", "learning plan"],
    health: ["sick", "health", "doctor", "clinic", "medical", "illness"],
    study: ["exam", "study", "burnout", "overwhelmed", "stress"],
    counselling: ["lonely", "alone", "talk", "anxiety", "depression", "sad", "support"]
  };

  const concernReasonMap = {
    financial: "financial stress",
    crisis: "feeling unsafe",
    disability: "accessibility needs",
    health: "health concerns",
    study: "study burnout",
    counselling: "needing someone to talk to"
  };

  const concernDetectionOrder = ["crisis", "financial", "disability", "health", "study", "counselling"];

  const defaultReplies = [
    "This demo can suggest support resources when you select a topic or enter related words.",
    "You can browse support resources or choose a topic above to preview an appropriate pathway.",
    "For practical next steps, select a resource topic or open the Resources page."
  ];

  const queryParams = new URLSearchParams(window.location.search);
  const requestedProfessional = (queryParams.get("professional") || "sarah").trim().toLowerCase();
  const activeProfessional = professionals[requestedProfessional] || professionals.sarah;
  const officerName = activeProfessional.name;
  const officerPhoto = activeProfessional.photo;

  const state = {
    typingRow: null,
    replyTimer: null,
    chatEnded: false,
    openPanel: null,
    panelTrigger: null,
    activeModal: null,
    modalTrigger: null,
    resourcesPageAvailable: false,
    resourcesPageCheckComplete: false,
    sessionStatus: SESSION_STATUS.ACTIVE,
    sessionId: "",
    preEndSessionStatus: SESSION_STATUS.ACTIVE,
    referralCount: 0,
    shownReferrals: new Set(),
    dismissedReferrals: new Set(),
    detectedConcerns: [],
    suggestedResources: [],
    savedResourceCategories: new Set(),
    savedResourceCount: 0,
    mainConcernKey: null,
    currentResourceKey: null,
    pendingOpenResourceKey: null,
    crisisSystemMessageShown: false
  };

  function getShownReferralsStorageKey() {
    return "chatShownReferrals:" + state.sessionId;
  }

  function getDismissedReferralsStorageKey() {
    return "chatDismissedReferrals:" + state.sessionId;
  }

  function showToast(message) {
    if (window.mvpApp && typeof window.mvpApp.showToast === "function") {
      window.mvpApp.showToast(message);
    }
  }

  function copyText(value) {
    if (window.mvpApp && typeof window.mvpApp.copyText === "function") {
      return window.mvpApp.copyText(value);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }

    return Promise.reject(new Error("Clipboard unavailable"));
  }

  function parseStoredArray(value) {
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function createSessionId() {
    return "chat-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function initializeSessionState() {
    let sessionId = sessionStorage.getItem(STORAGE_KEYS.chatSessionId);

    if (!sessionId) {
      sessionId = createSessionId();
      sessionStorage.setItem(STORAGE_KEYS.chatSessionId, sessionId);
    }

    state.sessionId = sessionId;
    state.sessionStatus = SESSION_STATUS.ACTIVE;
    sessionStorage.removeItem(STORAGE_KEYS.chatSessionStatus);

    updateSessionStatusLabel();
    updateReferralCountLabel();
  }

  function persistShownReferrals() {
    // Resource suggestions remain in page memory unless the user explicitly saves one.
  }

  function persistDismissedReferrals() {
    // Dismissed suggestions remain in page memory only.
  }

  function setSessionStatus(nextStatus) {
    state.sessionStatus = nextStatus;
    updateSessionStatusLabel();
  }

  function updateSessionStatusLabel() {
    if (!chatSessionStatusLabelEl) {
      return;
    }

    chatSessionStatusLabelEl.textContent = "Demo session: " + state.sessionStatus;
    chatSessionStatusLabelEl.classList.remove("active", "escalated", "ended");

    if (state.sessionStatus === SESSION_STATUS.ESCALATED) {
      chatSessionStatusLabelEl.classList.add("escalated");
      return;
    }

    if (state.sessionStatus === SESSION_STATUS.ENDED) {
      chatSessionStatusLabelEl.classList.add("ended");
      return;
    }

    chatSessionStatusLabelEl.classList.add("active");
  }

  function checkResourcesPageAvailability() {
    if (state.resourcesPageCheckComplete) {
      return Promise.resolve(state.resourcesPageAvailable);
    }

    return fetch(RESOURCE_PAGE_PATH, { method: "HEAD" })
      .then(function (response) {
        state.resourcesPageAvailable = Boolean(response && response.ok);
        state.resourcesPageCheckComplete = true;
        return state.resourcesPageAvailable;
      })
      .catch(function () {
        state.resourcesPageAvailable = false;
        state.resourcesPageCheckComplete = true;
        return false;
      });
  }

  function applyProfessionalProfile() {
    if (mentorNameEl) {
      mentorNameEl.textContent = activeProfessional.name;
    }

    if (mentorRoleEl) {
      mentorRoleEl.textContent = activeProfessional.role;
    }

    if (mentorPhotoEl) {
      mentorPhotoEl.src = activeProfessional.photo;
      mentorPhotoEl.alt = activeProfessional.name;
    }

    if (statusEl) {
      statusEl.textContent = activeProfessional.status;
    }

    if (profileOfficerNameEl) {
      profileOfficerNameEl.textContent = activeProfessional.name;
    }

    if (profileOfficerRoleEl) {
      profileOfficerRoleEl.textContent = activeProfessional.role;
    }

    if (profileOfficerStatusEl) {
      profileOfficerStatusEl.textContent = activeProfessional.status;
    }

    if (profileOfficerSpecialtiesEl) {
      profileOfficerSpecialtiesEl.textContent = activeProfessional.specialties;
    }

    inputEl.placeholder = activeProfessional.placeholder;
  }

  function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeWelcome() {
    if (welcomeEl && welcomeEl.parentNode) {
      welcomeEl.parentNode.removeChild(welcomeEl);
    }
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function addTextBlock(text, className) {
    const note = document.createElement("div");
    note.className = className;
    note.textContent = text;
    messagesEl.appendChild(note);
    scrollToBottom();
  }

  function createSupportTimeEl(timestamp) {
    const timeEl = document.createElement("div");
    timeEl.className = "time";
    timeEl.textContent = timestamp;
    return timeEl;
  }

  function createUserTimeEl(timestamp) {
    const timeEl = document.createElement("div");
    timeEl.className = "time me-time message-delivery";
    timeEl.textContent = timestamp + " - Added to demo";

    return timeEl;
  }

  function addMessage(sender, text, timestamp) {
    const row = document.createElement("div");
    row.className = sender === "user" ? "msg-row me" : "msg-row them";

    const contentWrap = document.createElement("div");
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    const timeText = timestamp || getTimestamp();
    const timeEl = sender === "user" ? createUserTimeEl(timeText) : createSupportTimeEl(timeText);

    contentWrap.appendChild(bubble);
    contentWrap.appendChild(timeEl);

    if (sender === "user") {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = "U";
      row.appendChild(contentWrap);
      row.appendChild(avatar);
    } else {
      const avatar = document.createElement("img");
      avatar.className = "small-photo";
      avatar.src = officerPhoto;
      avatar.alt = officerName;
      row.appendChild(avatar);
      row.appendChild(contentWrap);
    }

    messagesEl.appendChild(row);
    scrollToBottom();
  }

  function updateReferralCountLabel() {
    if (!referralCountLabelEl) {
      return;
    }

    referralCountLabelEl.textContent = "Resources suggested: " + String(state.referralCount);
  }

  function getResourceTitle(category) {
    const resource = referralResources[category];
    return resource ? resource.title : "Support Resource";
  }

  function getConcernLabel(category) {
    const resource = referralResources[category];
    return resource ? resource.concernLabel : "General wellbeing concern";
  }

  function trackDetectedConcern(category) {
    if (state.detectedConcerns.indexOf(category) < 0) {
      state.detectedConcerns.push(category);
    }

    if (!state.mainConcernKey) {
      state.mainConcernKey = category;
    }

  }

  function markResourceSuggested(category) {
    if (state.shownReferrals.has(category)) {
      return false;
    }

    if (state.dismissedReferrals.has(category)) {
      return false;
    }

    state.shownReferrals.add(category);
    if (state.suggestedResources.indexOf(category) < 0) {
      state.suggestedResources.push(category);
    }

    state.referralCount += 1;
    updateReferralCountLabel();
    persistShownReferrals();
    return true;
  }

  function showTyping() {
    if (state.typingRow || state.chatEnded) {
      return;
    }

    setStatus("Generating demo response...");

    state.typingRow = document.createElement("div");
    state.typingRow.className = "msg-row them typing-row";

    const avatar = document.createElement("img");
    avatar.className = "small-photo";
    avatar.src = officerPhoto;
    avatar.alt = officerName;

    const typing = document.createElement("div");
    typing.className = "typing";

    for (let i = 0; i < 3; i += 1) {
      typing.appendChild(document.createElement("span"));
    }

    state.typingRow.appendChild(avatar);
    state.typingRow.appendChild(typing);
    messagesEl.appendChild(state.typingRow);
    scrollToBottom();
  }

  function hideTyping() {
    if (!state.typingRow) {
      return;
    }

    state.typingRow.remove();
    state.typingRow = null;

    if (!state.chatEnded) {
      setStatus(activeProfessional.status);
    }
  }

  function buildReasonPhrase(category, keyword) {
    if (category === "crisis") {
      if (keyword === "suicide" || keyword === "self-harm" || keyword === "self harm") {
        return "an urgent safety concern";
      }
      return "feeling unsafe";
    }

    if (category === "financial" && (keyword === "rent" || keyword === "fee" || keyword === "cost")) {
      return "financial stress";
    }

    if (category === "study" && (keyword === "burnout" || keyword === "overwhelmed")) {
      return "study burnout";
    }

    return concernReasonMap[category] || keyword;
  }

  function detectConcerns(messageText) {
    const normalized = messageText.toLowerCase();
    const detected = [];

    concernDetectionOrder.forEach(function (category) {
      const keywords = concernKeywordMap[category] || [];
      const matches = keywords.filter(function (keyword) {
        return normalized.indexOf(keyword) >= 0;
      });

      if (matches.length === 0) {
        return;
      }

      const firstKeyword = matches[0];
      detected.push({
        category: category,
        keyword: firstKeyword,
        matchCount: matches.length,
        reasonLine: "Suggested from words selected or entered: " + buildReasonPhrase(category, firstKeyword) + "."
      });
    });

    return detected;
  }

  function buildContextualSupportReply(detections) {
    if (detections.length === 0) {
      return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    }

    if (detections.length === 1) {
      return referralResources[detections[0].category].acknowledgement;
    }

    const firstCategory = detections[0].category;
    const extraLabels = detections
      .slice(1)
      .map(function (item) {
        return getConcernLabel(item.category).toLowerCase();
      })
      .join(", ");

    return (
      referralResources[firstCategory].acknowledgement +
      " I can also suggest support for " +
      extraLabels +
      "."
    );
  }

  function showHandoffBanner() {
    if (!handoffBannerEl) {
      return;
    }

    handoffBannerEl.hidden = false;
  }

  function hideHandoffBanner() {
    if (!handoffBannerEl) {
      return;
    }

    handoffBannerEl.hidden = true;
  }

  function prepareHandoffContext(resource, reason) {
    void resource;
    void reason;
    showHandoffBanner();
  }

  function createResourceCard(detection) {
    const resource = referralResources[detection.category];
    if (!resource) {
      return;
    }

    const row = document.createElement("div");
    row.className = "msg-row them resource-row";
    row.dataset.category = detection.category;

    const avatar = document.createElement("img");
    avatar.className = "small-photo";
    avatar.src = officerPhoto;
    avatar.alt = officerName;

    const card = document.createElement("div");
    card.className = "resource-card" + (detection.category === "crisis" ? " crisis" : "");

    const head = document.createElement("div");
    head.className = "resource-card-head";

    const title = document.createElement("div");
    title.className = "resource-card-title";
    title.textContent = resource.title;

    const badgeWrap = document.createElement("div");
    badgeWrap.className = "resource-badge-wrap";

    const urgencyBadge = document.createElement("span");
    urgencyBadge.className = "resource-urgency " + resource.urgency.toLowerCase();
    urgencyBadge.textContent = resource.urgency;

    const suggestionBadge = document.createElement("span");
    suggestionBadge.className = "resource-suggestion-label";
    suggestionBadge.textContent = "Words selected or entered";

    badgeWrap.appendChild(urgencyBadge);
    badgeWrap.appendChild(suggestionBadge);

    const concernMeta = document.createElement("div");
    concernMeta.className = "resource-concern";
    concernMeta.textContent = "Suggested topic: " + resource.concernLabel;

    const reason = document.createElement("p");
    reason.className = "resource-reason";
    reason.textContent = detection.reasonLine;

    const description = document.createElement("p");
    description.className = "resource-card-description";
    description.textContent = resource.description;

    const actions = document.createElement("div");
    actions.className = "resource-card-actions";

    const viewDetailsBtn = document.createElement("button");
    viewDetailsBtn.type = "button";
    viewDetailsBtn.className = "resource-card-btn";
    viewDetailsBtn.dataset.resourceAction = "view-details";
    viewDetailsBtn.dataset.category = detection.category;
    viewDetailsBtn.textContent = "View Details";

    const saveResourceBtn = document.createElement("button");
    saveResourceBtn.type = "button";
    saveResourceBtn.className = "resource-card-btn";
    saveResourceBtn.dataset.resourceAction = "save-resource";
    saveResourceBtn.dataset.category = detection.category;
    saveResourceBtn.textContent = "Save on This Device";

    const notRelevantBtn = document.createElement("button");
    notRelevantBtn.type = "button";
    notRelevantBtn.className = "resource-card-btn";
    notRelevantBtn.dataset.resourceAction = "dismiss-resource";
    notRelevantBtn.dataset.category = detection.category;
    notRelevantBtn.textContent = "Not Relevant";

    const openResourceBtn = document.createElement("button");
    openResourceBtn.type = "button";
    openResourceBtn.className = "resource-card-btn primary";
    openResourceBtn.dataset.resourceAction = "open-resource";
    openResourceBtn.dataset.category = detection.category;
    openResourceBtn.dataset.reasonLine = detection.reasonLine;
    openResourceBtn.textContent = "Open Resource Page";

    actions.appendChild(viewDetailsBtn);
    actions.appendChild(saveResourceBtn);
    actions.appendChild(notRelevantBtn);
    actions.appendChild(openResourceBtn);

    head.appendChild(title);
    head.appendChild(badgeWrap);
    card.appendChild(head);
    card.appendChild(concernMeta);
    card.appendChild(reason);
    card.appendChild(description);
    card.appendChild(actions);

    if (detection.category === "crisis") {
      const crisisActions = document.createElement("div");
      crisisActions.className = "resource-card-actions resource-card-actions-crisis";

      const callBtn = document.createElement("button");
      callBtn.type = "button";
      callBtn.className = "resource-card-btn danger";
      callBtn.dataset.resourceAction = "call-000";
      callBtn.textContent = "Call 000";

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "resource-card-btn";
      copyBtn.dataset.resourceAction = "copy-lifeline";
      copyBtn.textContent = "Copy Lifeline Number";

      const quickExitBtn = document.createElement("button");
      quickExitBtn.type = "button";
      quickExitBtn.className = "resource-card-btn quick";
      quickExitBtn.dataset.resourceAction = "quick-exit";
      quickExitBtn.textContent = "Quick Exit";

      crisisActions.appendChild(callBtn);
      crisisActions.appendChild(copyBtn);
      crisisActions.appendChild(quickExitBtn);
      card.appendChild(crisisActions);
    }

    row.appendChild(avatar);
    row.appendChild(card);
    messagesEl.appendChild(row);
    scrollToBottom();
  }

  function openResourceDetails(category, triggerEl) {
    const resource = referralResources[category];
    if (!resource || !resourceDetailsModal) {
      return;
    }

    state.currentResourceKey = category;

    if (resourceDetailsTitleEl) {
      resourceDetailsTitleEl.textContent = resource.title;
    }

    if (resourceDetailsUrgencyEl) {
      resourceDetailsUrgencyEl.textContent = resource.urgency;
      resourceDetailsUrgencyEl.className = "resource-details-urgency " + resource.urgency.toLowerCase();
    }

    if (resourceDetailsDescriptionEl) {
      resourceDetailsDescriptionEl.textContent = "What it helps with: " + resource.details.helpsWith;
    }

    if (resourceDetailsWhenToUseEl) {
      resourceDetailsWhenToUseEl.textContent = resource.details.whenToUse;
    }

    if (resourceDetailsNextStepEl) {
      resourceDetailsNextStepEl.textContent = resource.details.nextStep;
    }

    if (resourceDetailsNoteEl) {
      const concern = getConcernLabel(category).toLowerCase();
      resourceDetailsNoteEl.textContent = "Suggested from words selected or entered about " + concern + ".";
    }

    openModal(resourceDetailsModal, triggerEl);
  }

  function requestOpenResourcePage(category, triggerEl, reason) {
    const resource = referralResources[category];
    if (!resource || !openResourceConfirmModal) {
      return;
    }

    state.pendingOpenResourceKey = category;

    prepareHandoffContext(resource, reason || ("Suggested support for " + resource.concernLabel + "."));

    if (openResourceConfirmTextEl) {
      openResourceConfirmTextEl.textContent = "Open " + resource.title + " resource?";
    }

    openModal(openResourceConfirmModal, triggerEl);
  }

  function confirmOpenResourcePage() {
    const category = state.pendingOpenResourceKey;
    if (!category) {
      closeModal(true);
      return;
    }

    const resource = referralResources[category];
    if (!resource) {
      closeModal(true);
      return;
    }

    prepareHandoffContext(resource, "Suggested support for " + resource.concernLabel + ".");
    closeModal(false);

    window.location.href = RESOURCE_PAGE_PATH;
  }

  function removeResourceCard(buttonEl) {
    const row = buttonEl.closest(".resource-row");
    if (!row) {
      return;
    }

    row.remove();
  }

  function saveResource(category) {
    const resource = referralResources[category];
    if (!resource) {
      return;
    }

    if (state.savedResourceCategories.has(category)) {
      showToast("This resource is already saved on this device.");
      return;
    }

    const saved = parseStoredArray(localStorage.getItem(STORAGE_KEYS.savedResources));
    saved.push({
      title: resource.title,
      category: category,
      timestamp: new Date().toISOString(),
      sourceProfessional: activeProfessional.name
    });

    localStorage.setItem(STORAGE_KEYS.savedResources, JSON.stringify(saved));
    state.savedResourceCategories.add(category);
    state.savedResourceCount += 1;
    showToast("Resource saved on this device. Use Delete saved chat data to remove it.");
  }

  function dismissResource(buttonEl, category) {
    state.dismissedReferrals.add(category);
    persistDismissedReferrals();
    removeResourceCard(buttonEl);
    showToast("Recommendation dismissed.");
  }

  function revealEmergencyPanelImmediate() {
    if (!emergencyPanel || !emergencyBtn) {
      return;
    }

    closePanel(false);
    emergencyPanel.hidden = false;
    state.openPanel = emergencyPanel;
    state.panelTrigger = emergencyBtn;
    emergencyBtn.setAttribute("aria-expanded", "true");
  }

  function escalateSessionForCrisis() {
    if (state.sessionStatus !== SESSION_STATUS.ESCALATED) {
      setSessionStatus(SESSION_STATUS.ESCALATED);
    }

    revealEmergencyPanelImmediate();

    if (!state.crisisSystemMessageShown) {
      addTextBlock("For immediate danger, please contact emergency support first.", "system-note");
      state.crisisSystemMessageShown = true;
    }
  }

  function suggestResourcesFromDetections(detections) {
    detections.forEach(function (detection) {
      trackDetectedConcern(detection.category);

      if (!markResourceSuggested(detection.category)) {
        return;
      }

      createResourceCard(detection);
    });
  }

  function buildReplyForMessage(detections, userText) {
    if (detections.length > 0) {
      return buildContextualSupportReply(detections);
    }

    const lowered = userText.toLowerCase();
    if (lowered.includes("talk") || lowered.includes("alone") || lowered.includes("lonely")) {
      return "Wellbeing contact resources can be reviewed below if talking with someone would help.";
    }

    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  function queueSupportReply(userText, detections) {
    showTyping();

    const delay = 1200 + Math.floor(Math.random() * 1000);
    state.replyTimer = window.setTimeout(function () {
      hideTyping();
      addMessage("support", buildReplyForMessage(detections, userText));

      if (detections.length > 0) {
        suggestResourcesFromDetections(detections);
      }

      state.replyTimer = null;
    }, delay);
  }

  function updateCharacterCounter() {
    const currentLength = inputEl.value.length;
    charCounterEl.textContent = currentLength + "/" + MAX_MESSAGE_LENGTH;
    charCounterEl.classList.toggle("limit", currentLength >= MAX_MESSAGE_LENGTH);
  }

  function sendMessage(overrideText) {
    if (state.chatEnded) {
      return;
    }

    const text = (overrideText || inputEl.value).trim();
    if (!text) {
      return;
    }

    if (state.replyTimer) {
      window.clearTimeout(state.replyTimer);
      state.replyTimer = null;
      hideTyping();
    }

    hideHandoffBanner();

    removeWelcome();
    addMessage("user", text);
    inputEl.value = "";
    updateCharacterCounter();
    inputEl.focus();

    const detections = detectConcerns(text);
    const crisisDetection = detections.find(function (item) {
      return item.category === "crisis";
    });

    if (crisisDetection) {
      escalateSessionForCrisis();
      trackDetectedConcern("crisis");

      if (markResourceSuggested("crisis")) {
        createResourceCard(crisisDetection);
      }

      addTextBlock("No simulated reply is generated for urgent safety text. Use the verified contact options shown now.", "system-note");
      return;
    }

    queueSupportReply(text, detections);
  }

  function closePanel(returnFocus) {
    if (!state.openPanel) {
      return;
    }

    state.openPanel.hidden = true;

    if (state.panelTrigger) {
      state.panelTrigger.setAttribute("aria-expanded", "false");
      if (returnFocus) {
        state.panelTrigger.focus();
      }
    }

    state.openPanel = null;
    state.panelTrigger = null;
  }

  function openPanel(panelEl, triggerEl) {
    if (!panelEl || !triggerEl) {
      return;
    }

    if (state.openPanel === panelEl) {
      closePanel(true);
      return;
    }

    closePanel(false);
    panelEl.hidden = false;
    state.openPanel = panelEl;
    state.panelTrigger = triggerEl;
    triggerEl.setAttribute("aria-expanded", "true");

    const closeButton = panelEl.querySelector(".panel-close");
    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModal(returnFocus) {
    if (!state.activeModal) {
      return;
    }

    const modalToClose = state.activeModal;
    const triggerEl = state.modalTrigger;

    modalToClose.hidden = true;
    state.activeModal = null;
    state.modalTrigger = null;

    if (returnFocus && triggerEl) {
      triggerEl.focus();
    }
  }

  function openModal(modalEl, triggerEl) {
    if (!modalEl) {
      return;
    }

    closePanel(false);

    if (state.activeModal && state.activeModal !== modalEl) {
      closeModal(false);
    }

    state.activeModal = modalEl;
    state.modalTrigger = triggerEl || null;
    modalEl.hidden = false;

    const focusTarget = modalEl.querySelector(".modal-close");
    if (focusTarget) {
      focusTarget.focus();
    }
  }

  function showInlineFeatureNote(noteText) {
    removeWelcome();
    addTextBlock(noteText || "This feature is outside the chat-only MVP scope.", "system-note");
  }

  function disableChatInputs() {
    inputEl.value = "";
    inputEl.disabled = true;
    inputEl.placeholder = "Chat ended";
    sendBtn.disabled = true;

    promptButtons.forEach(function (button) {
      button.disabled = true;
    });

    updateCharacterCounter();
  }

  function enableChatInputs() {
    inputEl.disabled = false;
    sendBtn.disabled = false;
    inputEl.placeholder = activeProfessional.placeholder;

    promptButtons.forEach(function (button) {
      button.disabled = false;
    });

    updateCharacterCounter();
  }

  function buildSummaryPayload() {
    const concerns = state.detectedConcerns.map(getConcernLabel);
    const resources = state.suggestedResources.map(getResourceTitle);

    let nextStep = "Continue with university support pathways as needed.";
    if (state.sessionStatus === SESSION_STATUS.ESCALATED || concerns.indexOf(getConcernLabel("crisis")) >= 0) {
      nextStep = "Prioritise urgent safety support and crisis pathways first.";
    } else if (resources.length > 0) {
      nextStep = "Review suggested resources and choose an appropriate support pathway.";
    }

    return {
      chatSessionId: state.sessionId,
      professional: activeProfessional.name,
      sessionStatus: state.sessionStatus,
      concernsDetected: concerns,
      resourcesSuggested: resources,
      savedResourcesCount: state.savedResourceCount,
      nextStep: nextStep,
      timestamp: new Date().toISOString()
    };
  }

  function populateSummaryModal() {
    const summary = buildSummaryPayload();

    if (summaryProfessionalEl) {
      summaryProfessionalEl.textContent = summary.professional;
    }

    if (summarySessionStatusEl) {
      summarySessionStatusEl.textContent = summary.sessionStatus;
    }

    if (summaryConcernEl) {
      summaryConcernEl.textContent =
        summary.concernsDetected.length > 0
          ? summary.concernsDetected.join(", ")
          : "No specific concern detected.";
    }

    if (summaryResourcesEl) {
      summaryResourcesEl.textContent =
        summary.resourcesSuggested.length > 0
          ? summary.resourcesSuggested.join(", ")
          : "No referrals suggested.";
    }

    if (summarySavedResourcesEl) {
      summarySavedResourcesEl.textContent = String(summary.savedResourcesCount);
    }

    if (summaryNextStepEl) {
      summaryNextStepEl.textContent = summary.nextStep;
    }
  }

  function saveChatSummaryToLocal() {
    if (!summarySaveConsent || !summarySaveConsent.checked) {
      showToast("Select consent before saving a summary on this device.");
      return;
    }

    const summary = buildSummaryPayload();
    const saved = parseStoredArray(localStorage.getItem(STORAGE_KEYS.savedSummaries));
    saved.push(summary);
    localStorage.setItem(STORAGE_KEYS.savedSummaries, JSON.stringify(saved));
    showToast("Chat summary saved on this device. You can delete saved chat data here.");
  }

  function deleteSavedChatData() {
    localStorage.removeItem(STORAGE_KEYS.savedSummaries);
    localStorage.removeItem(STORAGE_KEYS.savedResources);
    [
      STORAGE_KEYS.referralSummary,
      STORAGE_KEYS.lastChatSummary,
      STORAGE_KEYS.handoffReason,
      STORAGE_KEYS.recommendedResource,
      STORAGE_KEYS.sourceProfessional,
      STORAGE_KEYS.sourceChatSessionId,
      STORAGE_KEYS.handoffTimestamp,
      STORAGE_KEYS.handoffContext
    ].forEach(function (key) {
      sessionStorage.removeItem(key);
    });

    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const key = sessionStorage.key(index);
      if (key && (key.indexOf("chatShownReferrals:") === 0 || key.indexOf("chatDismissedReferrals:") === 0)) {
        sessionStorage.removeItem(key);
      }
    }

    state.savedResourceCategories.clear();
    state.savedResourceCount = 0;
    if (summarySavedResourcesEl) {
      summarySavedResourcesEl.textContent = "0";
    }
    showToast("Saved chat summaries and resources were deleted from this device.");
  }

  function returnToProfessionalSelection() {
    window.location.href = "professional-selection.html";
  }

  function continueAfterSummary() {
    state.chatEnded = false;
    closeModal(true);
    enableChatInputs();

    const resumeStatus =
      state.preEndSessionStatus === SESSION_STATUS.ESCALATED
        ? SESSION_STATUS.ESCALATED
        : SESSION_STATUS.ACTIVE;

    setSessionStatus(resumeStatus);
    addTextBlock("Chat resumed. You can continue sharing what you need.", "system-note");
    inputEl.focus();
  }

  function showEndChatSummaryModal() {
    populateSummaryModal();
    if (summarySaveConsent) {
      summarySaveConsent.checked = false;
    }
    if (saveChatSummaryBtn) {
      saveChatSummaryBtn.disabled = true;
    }
    openModal(endChatSummaryModal, endChatBtn);
  }

  function endChatSession() {
    if (state.chatEnded) {
      return;
    }

    state.chatEnded = true;
    state.preEndSessionStatus = state.sessionStatus;

    if (state.replyTimer) {
      window.clearTimeout(state.replyTimer);
      state.replyTimer = null;
    }

    hideTyping();
    closePanel(false);
    setSessionStatus(SESSION_STATUS.ENDED);
    disableChatInputs();
    removeWelcome();
    addTextBlock("Demo chat ended. Review the resource summary before leaving.", "system-note");
    showEndChatSummaryModal();
  }

  function handleResourceAction(event) {
    const actionButton = event.target.closest("[data-resource-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.resourceAction;
    const category = actionButton.dataset.category;
    const reasonLine = actionButton.dataset.reasonLine;

    if (action === "view-details") {
      openResourceDetails(category, actionButton);
      return;
    }

    if (action === "save-resource") {
      saveResource(category);
      return;
    }

    if (action === "dismiss-resource") {
      dismissResource(actionButton, category);
      return;
    }

    if (action === "open-resource") {
      requestOpenResourcePage(category, actionButton, reasonLine || "Resource suggested from chat triage.");
      return;
    }

    if (action === "call-000") {
      const emergencyNumber =
        window.EchoEaseSafety && window.EchoEaseSafety.contacts
          ? window.EchoEaseSafety.contacts.emergency.dial
          : "000";
      window.location.href = "tel:" + emergencyNumber;
      return;
    }

    if (action === "copy-lifeline") {
      const lifelineNumber =
        window.EchoEaseSafety && window.EchoEaseSafety.contacts
          ? window.EchoEaseSafety.contacts.lifeline.dial
          : "131114";

      copyText(lifelineNumber)
        .then(function () {
          showToast("Lifeline number copied.");
        })
        .catch(function () {
          showToast("Could not copy automatically. Please copy: " + lifelineNumber);
        });
      return;
    }

    if (action === "quick-exit") {
      if (window.EchoEaseSafety && typeof window.EchoEaseSafety.quickExit === "function") {
        window.EchoEaseSafety.quickExit();
        return;
      }

      window.location.href = "../../Landing%20Page/blackboard.html";
    }
  }

  sendBtn.addEventListener("click", function () {
    sendMessage();
  });

  inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  inputEl.addEventListener("input", updateCharacterCounter);

  promptButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      inputEl.value = button.dataset.prompt || "";
      updateCharacterCounter();
      inputEl.focus();
    });
  });

  if (urgentHelpBtn) {
    urgentHelpBtn.addEventListener("click", function () {
      openPanel(emergencyPanel, urgentHelpBtn);
    });
  }

  inlineFeatureButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showInlineFeatureNote(button.dataset.featureNote);
    });
  });

  messagesEl.addEventListener("click", handleResourceAction);

  emergencyBtn.addEventListener("click", function () {
    openPanel(emergencyPanel, emergencyBtn);
  });

  privacyBtn.addEventListener("click", function () {
    openPanel(privacyPanel, privacyBtn);
  });

  closeEmergencyPanelBtn.addEventListener("click", function () {
    closePanel(true);
  });

  closePrivacyPanelBtn.addEventListener("click", function () {
    closePanel(true);
  });

  if (clearStoredChatDataBtn) {
    clearStoredChatDataBtn.addEventListener("click", deleteSavedChatData);
  }

  mentorProfileBtn.addEventListener("click", function () {
    openModal(mentorProfileModal, mentorProfileBtn);
  });

  closeMentorProfileModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  endChatBtn.addEventListener("click", function () {
    openModal(endChatModal, endChatBtn);
  });

  closeEndChatModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  cancelEndChatBtn.addEventListener("click", function () {
    closeModal(true);
  });

  confirmEndChatBtn.addEventListener("click", function () {
    closeModal(true);
    endChatSession();
  });

  if (closeResourceDetailsModalBtn) {
    closeResourceDetailsModalBtn.addEventListener("click", function () {
      closeModal(true);
    });
  }

  if (closeResourceDetailsActionBtn) {
    closeResourceDetailsActionBtn.addEventListener("click", function () {
      closeModal(true);
    });
  }

  if (openResourcePageBtn) {
    openResourcePageBtn.addEventListener("click", function () {
      if (!state.currentResourceKey) {
        closeModal(true);
        return;
      }

      requestOpenResourcePage(
        state.currentResourceKey,
        openResourcePageBtn,
        "Suggested from words selected or entered."
      );
    });
  }

  if (closeOpenResourceConfirmModalBtn) {
    closeOpenResourceConfirmModalBtn.addEventListener("click", function () {
      closeModal(true);
      inputEl.focus();
    });
  }

  if (continueChattingBtn) {
    continueChattingBtn.addEventListener("click", function () {
      closeModal(true);
      inputEl.focus();
    });
  }

  if (confirmOpenResourceBtn) {
    confirmOpenResourceBtn.addEventListener("click", function () {
      confirmOpenResourcePage();
    });
  }

  if (closeEndSummaryModalBtn) {
    closeEndSummaryModalBtn.addEventListener("click", function () {
      continueAfterSummary();
    });
  }

  if (saveChatSummaryBtn) {
    saveChatSummaryBtn.addEventListener("click", function () {
      saveChatSummaryToLocal();
    });
  }

  if (summarySaveConsent && saveChatSummaryBtn) {
    summarySaveConsent.addEventListener("change", function () {
      saveChatSummaryBtn.disabled = !summarySaveConsent.checked;
    });
  }

  if (deleteSavedSummariesBtn) {
    deleteSavedSummariesBtn.addEventListener("click", deleteSavedChatData);
  }

  if (continueAfterSummaryBtn) {
    continueAfterSummaryBtn.addEventListener("click", function () {
      continueAfterSummary();
    });
  }

  if (returnToSelectionBtn) {
    returnToSelectionBtn.addEventListener("click", function () {
      returnToProfessionalSelection();
    });
  }

  [endChatModal, mentorProfileModal, resourceDetailsModal, openResourceConfirmModal, endChatSummaryModal].forEach(
    function (modalEl) {
      if (!modalEl) {
        return;
      }

      modalEl.addEventListener("click", function (event) {
        if (event.target !== modalEl) {
          return;
        }

        if (modalEl === endChatSummaryModal) {
          continueAfterSummary();
          return;
        }

        closeModal(true);
      });
    }
  );

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (state.activeModal) {
      event.preventDefault();

      if (state.activeModal === endChatSummaryModal) {
        continueAfterSummary();
        return;
      }

      closeModal(true);
      return;
    }

    if (state.openPanel) {
      event.preventDefault();
      closePanel(true);
    }
  });

  initializeSessionState();
  applyProfessionalProfile();
  updateCharacterCounter();
  hideHandoffBanner();

  /*
    Manual chat safety checklist:
    - Select Urgent help options: verified emergency links appear without sending a simulated message.
    - Enter text containing "unsafe" or "suicide": emergency options and crisis card appear immediately, with no delayed demo reply.
    - Select a non-crisis prompt and send it: a clearly simulated resource suggestion appears without clinical assessment phrasing.
    - End chat: saving remains disabled until local-storage consent is selected; Delete saved chat data clears stored summaries/resources.
  */
})();
