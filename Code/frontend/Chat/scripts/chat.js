(function () {
  const MAX_MESSAGE_LENGTH = 500;
  const RESOURCE_PAGE_PATH = "../../Resources/pages/resources.html";

  const SESSION_STATUS = {
    ACTIVE: "Active",
    ESCALATED: "Escalated",
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
  const continueAfterSummaryBtn = document.getElementById("continueAfterSummaryBtn");
  const returnToSelectionBtn = document.getElementById("returnToSelectionBtn");

  if (!messagesEl || !inputEl || !sendBtn || !charCounterEl || !statusEl) {
    return;
  }

  const professionals = {
    sarah: {
      name: "Dr. Sarah Jenkins",
      role: "Peer Support Officer",
      status: "Available now",
      specialties: "academic stress, anxiety, study burnout",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      placeholder: "Message Dr. Sarah Jenkins..."
    },
    marcus: {
      name: "Marcus Thompson",
      role: "Mental Health Counsellor",
      status: "Available now",
      specialties: "relationship issues, mindfulness, emotional wellbeing",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop",
      placeholder: "Message Marcus Thompson..."
    }
  };

  const referralResources = {
    financial: {
      title: "Financial Aid",
      description: "Support for fees, rent pressure, and living cost concerns.",
      urgency: "Medium",
      concernLabel: "Financial stress",
      defaultConfidence: "Medium",
      details: {
        helpsWith: "Fee pressure, rent stress, and short-term financial hardship.",
        whenToUse: "Use when money concerns are affecting your study and day-to-day stability.",
        nextStep: "Review funding options and ask student services about payment plans and grants."
      },
      acknowledgement:
        "Thanks for sharing that financial pressure is affecting you. I can suggest a financial support pathway while we keep chatting."
    },
    crisis: {
      title: "After-hours Care / Crisis Support",
      description: "Immediate safety pathways and urgent phone support.",
      urgency: "High",
      concernLabel: "Immediate safety concern",
      defaultConfidence: "High",
      details: {
        helpsWith: "Urgent support when you feel unsafe or at risk of harm.",
        whenToUse: "Use immediately if safety is at risk, including self-harm or suicide concerns.",
        nextStep: "Contact emergency services first, then continue with crisis and university support."
      },
      acknowledgement:
        "Thank you for telling me this. Your safety comes first, and I am showing urgent crisis support now."
    },
    disability: {
      title: "Disability Support",
      description: "Accessibility planning and accommodation support.",
      urgency: "Medium",
      concernLabel: "Accessibility and accommodations",
      defaultConfidence: "Medium",
      details: {
        helpsWith: "Learning adjustments, accessibility needs, and formal accommodation planning.",
        whenToUse: "Use when disability or accessibility barriers are impacting your study progress.",
        nextStep: "Request disability support advice and discuss available academic adjustments."
      },
      acknowledgement:
        "I hear that accessibility needs are important for you right now. I can direct you to disability support options."
    },
    health: {
      title: "Health Clinic",
      description: "Medical support and health appointment pathways.",
      urgency: "Medium",
      concernLabel: "Health and medical support",
      defaultConfidence: "Medium",
      details: {
        helpsWith: "General health concerns, illness, and advice from clinical services.",
        whenToUse: "Use when physical or medical symptoms are affecting wellbeing or study capacity.",
        nextStep: "Book clinic support and discuss immediate care needs with a health professional."
      },
      acknowledgement:
        "Thanks for sharing your health concern. I can suggest clinic support options you can use now."
    },
    study: {
      title: "Study Support and Burnout Care",
      description: "Support for exam pressure, burnout, and study overload.",
      urgency: "Medium",
      concernLabel: "Study burnout and exam pressure",
      defaultConfidence: "Medium",
      details: {
        helpsWith: "Exam stress, burnout recovery, and practical study planning.",
        whenToUse: "Use when study demands feel overwhelming and are affecting your mental wellbeing.",
        nextStep: "Connect to study wellbeing support and build a manageable short-term plan."
      },
      acknowledgement:
        "It sounds like study pressure is heavy right now. I can suggest targeted study and burnout support."
    },
    counselling: {
      title: "Counselling / UQ Professional Support",
      description: "One-to-one wellbeing support and guided mental health care.",
      urgency: "Low",
      concernLabel: "Emotional wellbeing support",
      defaultConfidence: "Low",
      details: {
        helpsWith: "Loneliness, emotional load, and ongoing wellbeing support conversations.",
        whenToUse: "Use when you need someone to talk to or want structured professional support.",
        nextStep: "Continue chat support and consider a counselling referral for deeper follow-up."
      },
      acknowledgement:
        "I hear that you need someone to talk to. I can recommend counselling support while we continue this chat."
    }
  };

  const concernKeywordMap = {
    financial: ["financial", "money", "rent", "fee", "afford", "cost"],
    crisis: ["crisis", "unsafe", "danger", "emergency", "harm", "suicide", "self-harm", "self harm"],
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
    "Thanks for sharing that. You are not alone in this, and we can take it one step at a time.",
    "That sounds heavy right now. Would it help if we break this down into one practical next step?",
    "I hear you. We can build a short plan for today so it feels more manageable.",
    "You did the right thing by reaching out. We can work through this together."
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
    const previousStatus = sessionStorage.getItem(STORAGE_KEYS.chatSessionStatus);

    if (!sessionId || previousStatus === SESSION_STATUS.ENDED) {
      sessionId = createSessionId();
      sessionStorage.setItem(STORAGE_KEYS.chatSessionId, sessionId);
      sessionStorage.setItem(STORAGE_KEYS.chatSessionStatus, SESSION_STATUS.ACTIVE);
    }

    state.sessionId = sessionId;
    state.sessionStatus = sessionStorage.getItem(STORAGE_KEYS.chatSessionStatus) || SESSION_STATUS.ACTIVE;

    const shown = parseStoredArray(sessionStorage.getItem(getShownReferralsStorageKey()));
    const dismissed = parseStoredArray(sessionStorage.getItem(getDismissedReferralsStorageKey()));
    state.shownReferrals = new Set(shown);
    state.dismissedReferrals = new Set(dismissed);
    state.suggestedResources = shown.slice();
    state.referralCount = shown.length;

    updateSessionStatusLabel();
    updateReferralCountLabel();
  }

  function persistShownReferrals() {
    sessionStorage.setItem(
      getShownReferralsStorageKey(),
      JSON.stringify(Array.from(state.shownReferrals))
    );
  }

  function persistDismissedReferrals() {
    sessionStorage.setItem(
      getDismissedReferralsStorageKey(),
      JSON.stringify(Array.from(state.dismissedReferrals))
    );
  }

  function setSessionStatus(nextStatus) {
    state.sessionStatus = nextStatus;
    sessionStorage.setItem(STORAGE_KEYS.chatSessionStatus, nextStatus);
    updateSessionStatusLabel();
  }

  function updateSessionStatusLabel() {
    if (!chatSessionStatusLabelEl) {
      return;
    }

    chatSessionStatusLabelEl.textContent = "Session: " + state.sessionStatus;
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
    timeEl.textContent = timestamp + " - Sent";

    window.setTimeout(function () {
      timeEl.textContent = timestamp + " - Seen";
    }, 800);

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

  function persistReferralSummary() {
    const summary = {
      professional: activeProfessional.name,
      concerns_detected: state.detectedConcerns.map(getConcernLabel),
      resources_suggested: state.suggestedResources.map(getResourceTitle),
      timestamp: new Date().toISOString()
    };

    sessionStorage.setItem(STORAGE_KEYS.referralSummary, JSON.stringify(summary));
  }

  function trackDetectedConcern(category) {
    if (state.detectedConcerns.indexOf(category) < 0) {
      state.detectedConcerns.push(category);
    }

    if (!state.mainConcernKey) {
      state.mainConcernKey = category;
    }

    persistReferralSummary();
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
    persistReferralSummary();
    return true;
  }

  function showTyping() {
    if (state.typingRow || state.chatEnded) {
      return;
    }

    setStatus("Typing...");

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

  function getConfidenceLabel(category, matchCount) {
    if (category === "crisis") {
      return "High";
    }

    if (matchCount >= 2) {
      return "High";
    }

    if (category === "counselling" && matchCount === 1) {
      return "Low";
    }

    return "Medium";
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
        confidence: getConfidenceLabel(category, matches.length),
        reasonLine: "Suggested because you mentioned " + buildReasonPhrase(category, firstKeyword) + "."
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
    const handoff = {
      handoffReason: reason,
      recommendedResource: resource.title,
      sourceProfessional: activeProfessional.name,
      sourceChatSessionId: state.sessionId,
      timestamp: new Date().toISOString()
    };

    sessionStorage.setItem(STORAGE_KEYS.handoffReason, handoff.handoffReason);
    sessionStorage.setItem(STORAGE_KEYS.recommendedResource, handoff.recommendedResource);
    sessionStorage.setItem(STORAGE_KEYS.sourceProfessional, handoff.sourceProfessional);
    sessionStorage.setItem(STORAGE_KEYS.sourceChatSessionId, handoff.sourceChatSessionId);
    sessionStorage.setItem(STORAGE_KEYS.handoffTimestamp, handoff.timestamp);
    sessionStorage.setItem(STORAGE_KEYS.handoffContext, JSON.stringify(handoff));

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

    const confidenceBadge = document.createElement("span");
    confidenceBadge.className = "resource-confidence " + detection.confidence.toLowerCase();
    confidenceBadge.textContent = detection.confidence + " confidence";

    badgeWrap.appendChild(urgencyBadge);
    badgeWrap.appendChild(confidenceBadge);

    const concernMeta = document.createElement("div");
    concernMeta.className = "resource-concern";
    concernMeta.textContent = "Detected concern: " + resource.concernLabel;

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
    saveResourceBtn.textContent = "Save Resource";

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
      resourceDetailsNoteEl.textContent = "Suggested based on concerns around " + concern + ".";
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
      showToast("Resource already saved.");
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
    showToast("Resource saved.");
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
      return "I am here with you. If you want, we can unpack what has felt hardest this week.";
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
      nextStep = "Review suggested resources and continue with professional support follow-up.";
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
    const summary = buildSummaryPayload();
    const saved = parseStoredArray(localStorage.getItem(STORAGE_KEYS.savedSummaries));
    saved.push(summary);
    localStorage.setItem(STORAGE_KEYS.savedSummaries, JSON.stringify(saved));
    showToast("Chat summary saved.");
  }

  function returnToProfessionalSelection() {
    const summary = buildSummaryPayload();
    sessionStorage.setItem(STORAGE_KEYS.lastChatSummary, JSON.stringify(summary));
    persistReferralSummary();
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
    persistReferralSummary();
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
    addTextBlock("Chat ended. Review your triage summary before leaving.", "system-note");
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
      window.location.href = "tel:000";
      return;
    }

    if (action === "copy-lifeline") {
      copyText("131114")
        .then(function () {
          showToast("Lifeline number copied.");
        })
        .catch(function () {
          showToast("Could not copy automatically. Please copy: 131114");
        });
      return;
    }

    if (action === "quick-exit") {
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
        "Suggested based on current chat referral."
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
  persistReferralSummary();
  hideHandoffBanner();
})();
