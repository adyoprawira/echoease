(function () {
  const STORAGE_KEYS = {
    start: "queueStartTime",
    wait: "queueWaitMinutes",
    position: "queueInitialPosition",
    professional: "queueProfessional",
    readyNotice: "queueReadyNotified",
    stageDurations: "queueStageDurations",
    joinNotice: "queueJoinNotified",
    lastPositionNotice: "queueLastPositionNotified"
  };

  const WELLBEING_NOTIFICATIONS_KEY = "wellbeingNotifications";

  const DEFAULT_WAIT_MINUTES = 4;
  const DEFAULT_POSITION = 3;
  const DEMO_STAGE_MIN_SECONDS = 8;
  const DEMO_STAGE_MAX_SECONDS = 12;
  const ACTIVE_POSITION_NOTE =
    "This is a simulated queue position for the prototype preview.";
  const DEMO_WAIT_NOTE =
    "Accelerated demo countdown, not real wait time.";

  const JOURNAL_KEY = "uq_queue_journal_entry";
  const BREATH_PHASES = ["Breathe in", "Hold", "Breathe out", "Hold"];
  const BREATH_PHASE_KEYS = ["in", "hold-in", "out", "hold-out"];
  const PHASE_DURATION = 4;

  const AUDIO_LIBRARY = {
    lofi: [
      {
        title: "Lofi Focus",
        src: "../audio/lofi1.mp3"
      }
    ],
    piano: [
      {
        title: "Piano Relax",
        src: "../audio/piano-relax.mp3"
      },
      {
        title: "Piano Study",
        src: "../audio/piano-study.mp3"
      }
    ],
    nature: [
      {
        title: "Nature Calm",
        src: "../audio/nature1.mp3"
      },
      {
        title: "Nature Rain",
        src: "../audio/nature2.mp3"
      }
    ]
  };

  const queueTitle = document.getElementById("queueTitle");
  const queueProfessionalLabel = document.getElementById("queueProfessionalLabel");
  const queuePosition = document.getElementById("queuePosition");
  const queuePositionNote = document.getElementById("queuePositionNote");
  const queueWaitTime = document.getElementById("queueWaitTime");
  const queueWaitMeta = document.getElementById("queueWaitMeta");
  const startChatWhenReady = document.getElementById("startChatWhenReady");
  const leaveQueueButton = document.getElementById("leaveQueueButton");

  const toastStack = document.getElementById("toastStack");

  const breathingModal = document.getElementById("breathingModal");
  const startExerciseBtn = document.getElementById("startExerciseBtn");
  const closeBreathingModalBtn = document.getElementById("closeBreathingModalBtn");
  const breathingStartBtn = document.getElementById("breathingStartBtn");
  const breathingPauseBtn = document.getElementById("breathingPauseBtn");
  const breathingResetBtn = document.getElementById("breathingResetBtn");
  const breathingCloseBtn = document.getElementById("breathingCloseBtn");
  const breathingCircle = document.getElementById("breathingCircle");
  const breathingPhaseText = document.getElementById("breathingPhaseText");
  const breathingTimerText = document.getElementById("breathingTimerText");

  const journalModal = document.getElementById("journalModal");
  const openJournalBtn = document.getElementById("openJournalBtn");
  const closeJournalModalBtn = document.getElementById("closeJournalModalBtn");
  const cancelJournalBtn = document.getElementById("cancelJournalBtn");
  const saveJournalBtn = document.getElementById("saveJournalBtn");
  const journalInput = document.getElementById("journalInput");
  const journalStorageStatus = document.getElementById("journalStorageStatus");
  const journalSaveConsent = document.getElementById("journalSaveConsent");
  const loadJournalBtn = document.getElementById("loadJournalBtn");
  const clearJournalBtn = document.getElementById("clearJournalBtn");

  const leaveQueueModal = document.getElementById("leaveQueueModal");
  const closeLeaveQueueModalBtn = document.getElementById("closeLeaveQueueModalBtn");
  const cancelLeaveQueueBtn = document.getElementById("cancelLeaveQueueBtn");
  const confirmLeaveQueueBtn = document.getElementById("confirmLeaveQueueBtn");

  const focusAudioCard = document.getElementById("focusAudioCard");
  const focusAudioToggleBtn = document.getElementById("focusAudioToggleBtn");
  const audioTrackTitle = document.getElementById("audioTrackTitle");
  const audioCategoryLabel = document.getElementById("audioCategoryLabel");
  const audioBackBtn = document.getElementById("audioBackBtn");
  const audioNextBtn = document.getElementById("audioNextBtn");
  const audioCurrentTime = document.getElementById("audioCurrentTime");
  const audioDuration = document.getElementById("audioDuration");
  const audioSeekBar = document.getElementById("audioSeekBar");
  const audioVolume = document.getElementById("audioVolume");
  const audioCategoryButtons = Array.from(document.querySelectorAll(".audio-category-btn"));

  if (
    !queueTitle ||
    !queueProfessionalLabel ||
    !queuePosition ||
    !queueWaitTime ||
    !startChatWhenReady ||
    !leaveQueueButton
  ) {
    return;
  }

  const audioPlayer = new Audio();
  audioPlayer.preload = "metadata";

  let activeModal = null;
  let modalTrigger = null;

  let breathPhaseIndex = 0;
  let breathRemaining = PHASE_DURATION;
  let breathInterval = null;
  let breathRunning = false;

  let queueTimer = null;
  let lastPositionDisplay = null;

  let currentAudioCategory = "lofi";
  let currentTrackIndex = 0;
  let isAudioPlaying = false;

  function parsePositiveInt(value, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return fallback;
    }

    return Math.floor(parsed);
  }

  function parseWaitMinutes(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return DEFAULT_WAIT_MINUTES;
    }

    return Math.floor(parsed);
  }

  function getProfessionalName(key) {
    const map = {
      marcus: "Simulated Support Guide B",
      sarah: "Simulated Support Guide A"
    };

    return map[key] || "Simulated Support Guide";
  }

  function getProfessionalLabel(key) {
    if (!key) {
      return "Previewing a simulated support wait";
    }

    const map = {
      marcus: "Previewing a simulated wait for Support Guide B",
      sarah: "Previewing a simulated wait for Support Guide A"
    };

    return map[key] || "Previewing a simulated support wait";
  }

  function getReadyNotificationMessage(key) {
    if (key === "marcus") {
      return "The simulated chat with Support Guide B is ready to preview.";
    }

    const name = getProfessionalName(key);
    if (name !== "a support officer") {
      return "The simulated chat with " + name + " is ready to preview.";
    }

    return "The simulated support chat is ready to preview.";
  }

  function getChatHref(key) {
    if (key === "marcus") {
      return "chat.html?professional=marcus";
    }

    return "chat.html";
  }

  function showToast(message) {
    if (window.mvpApp && typeof window.mvpApp.showToast === "function") {
      window.mvpApp.showToast(message);
      return;
    }

    if (!toastStack) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "mvp-toast";
    toast.textContent = message;
    toastStack.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("show");
    });

    window.setTimeout(function () {
      toast.classList.remove("show");
      window.setTimeout(function () {
        toast.remove();
      }, 220);
    }, 2600);
  }

  function fallbackAddNotification(message, type) {
    try {
      const raw = localStorage.getItem(WELLBEING_NOTIFICATIONS_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(existing) ? existing : [];

      list.push({
        id: "n-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        message: message,
        type: type,
        unread: true,
        timestamp: new Date().toISOString()
      });

      localStorage.setItem(WELLBEING_NOTIFICATIONS_KEY, JSON.stringify(list));
    } catch (error) {
      // Ignore fallback storage failure.
    }
  }

  function addNotification(message, type) {
    if (!message) {
      return;
    }

    if (window.mvpApp && typeof window.mvpApp.addNotification === "function") {
      window.mvpApp.addNotification(message, type);
      return;
    }

    fallbackAddNotification(message, type);
    showToast(message);
  }

  function openModal(modalEl, triggerEl) {
    if (!modalEl) {
      return;
    }

    if (activeModal && activeModal !== modalEl) {
      closeModal(false);
    }

    activeModal = modalEl;
    modalTrigger = triggerEl || null;
    modalEl.hidden = false;

    const focusTarget = modalEl.querySelector(".mvp-modal-close");
    if (focusTarget) {
      focusTarget.focus();
    }
  }

  function closeModal(returnFocus) {
    if (!activeModal) {
      return;
    }

    const lastTrigger = modalTrigger;
    activeModal.hidden = true;
    activeModal = null;
    modalTrigger = null;

    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }
  }

  function updateBreathingUI() {
    breathingPhaseText.textContent = BREATH_PHASES[breathPhaseIndex];
    breathingTimerText.textContent = breathRemaining + "s";
    breathingCircle.dataset.phase = BREATH_PHASE_KEYS[breathPhaseIndex];
  }

  function startBreathing() {
    if (breathRunning) {
      return;
    }

    breathRunning = true;
    breathInterval = window.setInterval(function () {
      breathRemaining -= 1;

      if (breathRemaining <= 0) {
        breathPhaseIndex = (breathPhaseIndex + 1) % BREATH_PHASES.length;
        breathRemaining = PHASE_DURATION;
      }

      updateBreathingUI();
    }, 1000);
  }

  function pauseBreathing() {
    breathRunning = false;
    if (breathInterval) {
      window.clearInterval(breathInterval);
      breathInterval = null;
    }
  }

  function resetBreathing() {
    pauseBreathing();
    breathPhaseIndex = 0;
    breathRemaining = PHASE_DURATION;
    updateBreathingUI();
  }

  function applyPositionUpdate(value) {
    const formatted = value === "Ready" ? "Ready" : String(value).padStart(2, "0");

    if (formatted !== lastPositionDisplay) {
      queuePosition.classList.remove("queue-value-bump");
      void queuePosition.offsetWidth;
      queuePosition.classList.add("queue-value-bump");
      lastPositionDisplay = formatted;
    }

    queuePosition.textContent = formatted;
  }

  function clearQueueStorage() {
    sessionStorage.removeItem(STORAGE_KEYS.start);
    sessionStorage.removeItem(STORAGE_KEYS.wait);
    sessionStorage.removeItem(STORAGE_KEYS.position);
    sessionStorage.removeItem(STORAGE_KEYS.professional);
    sessionStorage.removeItem(STORAGE_KEYS.readyNotice);
    sessionStorage.removeItem(STORAGE_KEYS.stageDurations);
    sessionStorage.removeItem(STORAGE_KEYS.joinNotice);
    sessionStorage.removeItem(STORAGE_KEYS.lastPositionNotice);
    sessionStorage.removeItem("queueWaitSeconds");
  }

  function getQueueStateFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return {
      professional: (params.get("professional") || "").trim().toLowerCase(),
      waitMinutes: parseWaitMinutes(params.get("wait")),
      initialPosition: parsePositiveInt(params.get("position"), DEFAULT_POSITION)
    };
  }

  function randomStageDurationSeconds() {
    return (
      DEMO_STAGE_MIN_SECONDS +
      Math.floor(Math.random() * (DEMO_STAGE_MAX_SECONDS - DEMO_STAGE_MIN_SECONDS + 1))
    );
  }

  function createStageDurations() {
    return [
      randomStageDurationSeconds(),
      randomStageDurationSeconds(),
      randomStageDurationSeconds(),
      randomStageDurationSeconds()
    ];
  }

  function parseStageDurations(raw) {
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length !== 4) {
        return null;
      }

      const normalized = parsed.map(function (value) {
        return Math.floor(Number(value));
      });

      const valid = normalized.every(function (value) {
        return Number.isFinite(value) && value > 0;
      });

      return valid ? normalized : null;
    } catch (error) {
      return null;
    }
  }

  function loadOrCreateQueueState(urlState) {
    const storedStart = Number(sessionStorage.getItem(STORAGE_KEYS.start));
    const storedWait = Number(sessionStorage.getItem(STORAGE_KEYS.wait));
    const storedPosition = Number(sessionStorage.getItem(STORAGE_KEYS.position));
    const storedProfessional = (sessionStorage.getItem(STORAGE_KEYS.professional) || "")
      .trim()
      .toLowerCase();
    const storedDurations = parseStageDurations(sessionStorage.getItem(STORAGE_KEYS.stageDurations));

    const hasStoredState =
      Number.isFinite(storedStart) &&
      storedStart > 0 &&
      Number.isFinite(storedWait) &&
      storedWait > 0 &&
      Number.isFinite(storedPosition) &&
      storedPosition > 0 &&
      Array.isArray(storedDurations);

    const sameQueue =
      hasStoredState &&
      storedWait === urlState.waitMinutes &&
      storedPosition === urlState.initialPosition &&
      storedProfessional === urlState.professional;

    if (sameQueue) {
      if (!sessionStorage.getItem(STORAGE_KEYS.joinNotice)) {
        sessionStorage.setItem(STORAGE_KEYS.joinNotice, "1");
      }
      if (!sessionStorage.getItem(STORAGE_KEYS.lastPositionNotice)) {
        sessionStorage.setItem(STORAGE_KEYS.lastPositionNotice, String(storedPosition));
      }

      return {
        startTime: storedStart,
        waitMinutes: storedWait,
        initialPosition: storedPosition,
        professional: storedProfessional,
        stageDurations: storedDurations,
        isFreshQueue: false
      };
    }

    const freshState = {
      startTime: Date.now(),
      waitMinutes: urlState.waitMinutes,
      initialPosition: urlState.initialPosition,
      professional: urlState.professional,
      stageDurations: createStageDurations(),
      isFreshQueue: true
    };

    sessionStorage.setItem(STORAGE_KEYS.start, String(freshState.startTime));
    sessionStorage.setItem(STORAGE_KEYS.wait, String(freshState.waitMinutes));
    sessionStorage.setItem(STORAGE_KEYS.position, String(freshState.initialPosition));
    sessionStorage.setItem(STORAGE_KEYS.professional, freshState.professional);
    sessionStorage.setItem(STORAGE_KEYS.readyNotice, "0");
    sessionStorage.setItem(STORAGE_KEYS.stageDurations, JSON.stringify(freshState.stageDurations));
    sessionStorage.setItem(STORAGE_KEYS.joinNotice, "0");
    sessionStorage.setItem(STORAGE_KEYS.lastPositionNotice, String(freshState.initialPosition));

    return freshState;
  }

  function formatMinuteEstimate(minutes) {
    return "~" + minutes + " minute" + (minutes === 1 ? "" : "s");
  }

  function buildEstimateLabels(waitMinutes) {
    const first = Math.max(waitMinutes, 1);
    let second = Math.max(1, Math.round(first * 0.7));
    let third = Math.max(1, Math.round(first * 0.4));

    if (second >= first) {
      second = Math.max(1, first - 1);
    }

    if (third >= second) {
      third = Math.max(1, second - 1);
    }

    return [
      formatMinuteEstimate(first),
      formatMinuteEstimate(second),
      formatMinuteEstimate(third),
      "Almost ready",
      "Ready"
    ];
  }

  function getStageIndex(elapsedSeconds, stageDurations) {
    const elapsed = Math.max(0, elapsedSeconds);
    const boundary0 = stageDurations[0];
    const boundary1 = boundary0 + stageDurations[1];
    const boundary2 = boundary1 + stageDurations[2];
    const boundary3 = boundary2 + stageDurations[3];

    if (elapsed < boundary0) {
      return 0;
    }

    if (elapsed < boundary1) {
      return 1;
    }

    if (elapsed < boundary2) {
      return 2;
    }

    if (elapsed < boundary3) {
      return 3;
    }

    return 4;
  }

  function getPositionForStage(stageIndex, initialPosition) {
    if (stageIndex >= 4) {
      return "Ready";
    }

    if (stageIndex === 0) {
      return initialPosition;
    }

    if (stageIndex === 1 || stageIndex === 2) {
      return Math.max(initialPosition - 1, 1);
    }

    return 1;
  }

  function notifyQueueJoin(queueState) {
    if (sessionStorage.getItem(STORAGE_KEYS.joinNotice) === "1") {
      return;
    }

    const professionalName = getProfessionalName(queueState.professional);
    addNotification("You started the simulated queue preview for " + professionalName + ".", "queue");
    sessionStorage.setItem(STORAGE_KEYS.joinNotice, "1");
  }

  function notifyPositionChange(newPosition) {
    const previousNotified = parsePositiveInt(
      sessionStorage.getItem(STORAGE_KEYS.lastPositionNotice),
      DEFAULT_POSITION
    );

    if (newPosition < previousNotified) {
      addNotification("Your simulated queue position changed to " + newPosition + ".", "queue");
    }

    sessionStorage.setItem(STORAGE_KEYS.lastPositionNotice, String(newPosition));
  }

  function startQueueProgress(queueState) {
    queueProfessionalLabel.textContent = getProfessionalLabel(queueState.professional);
    queuePositionNote.textContent = ACTIVE_POSITION_NOTE;
    queueWaitMeta.textContent = DEMO_WAIT_NOTE;
    startChatWhenReady.href = getChatHref(queueState.professional);

    notifyQueueJoin(queueState);

    const estimateLabels = buildEstimateLabels(queueState.waitMinutes);
    let lastStage = -1;

    function applyStage(stageIndex) {
      if (stageIndex === lastStage) {
        return;
      }

      lastStage = stageIndex;
      const positionValue = getPositionForStage(stageIndex, queueState.initialPosition);
      applyPositionUpdate(positionValue);

      if (typeof positionValue === "number") {
        notifyPositionChange(positionValue);
      }

      if (stageIndex >= 4) {
        queueTitle.textContent = "Your demo chat is ready";
        queueWaitTime.textContent = "Ready";
        queueWaitMeta.textContent = DEMO_WAIT_NOTE;
        queuePositionNote.textContent = "Simulated support chat is ready";
        startChatWhenReady.hidden = false;

        if (sessionStorage.getItem(STORAGE_KEYS.readyNotice) !== "1") {
          const readyMessage = getReadyNotificationMessage(queueState.professional);
          addNotification(readyMessage, "queue");
          if (window.mvpApp && typeof window.mvpApp.refreshNotifications === "function") {
            window.mvpApp.refreshNotifications();
          }
          sessionStorage.setItem(STORAGE_KEYS.readyNotice, "1");
        }

        return;
      }

      queueTitle.textContent = "You're in the demo queue";
      queueWaitTime.textContent = estimateLabels[stageIndex];
      queueWaitMeta.textContent = DEMO_WAIT_NOTE;
      queuePositionNote.textContent = ACTIVE_POSITION_NOTE;
      startChatWhenReady.hidden = true;
    }

    function tick() {
      const elapsed = Math.floor((Date.now() - queueState.startTime) / 1000);
      const stageIndex = getStageIndex(elapsed, queueState.stageDurations);

      applyStage(stageIndex);

      if (stageIndex >= 4 && queueTimer) {
        window.clearInterval(queueTimer);
        queueTimer = null;
      }
    }

    tick();
    queueTimer = window.setInterval(tick, 600);
  }

  function formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const safe = Math.floor(seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return mins + ":" + String(secs).padStart(2, "0");
  }

  function getCategoryLabel(category) {
    const map = {
      lofi: "Lofi",
      piano: "Piano",
      nature: "Nature"
    };

    return map[category] || "Focus";
  }

  function getTracksForCategory(category) {
    return AUDIO_LIBRARY[category] || [];
  }

  function getCurrentTrack() {
    const tracks = getTracksForCategory(currentAudioCategory);
    if (tracks.length === 0) {
      return null;
    }

    if (currentTrackIndex >= tracks.length) {
      currentTrackIndex = 0;
    }

    return tracks[currentTrackIndex];
  }

  function updateAudioCategoryButtons() {
    audioCategoryButtons.forEach(function (button) {
      const category = button.dataset.audioCategory;
      const hasTracks = getTracksForCategory(category).length > 0;
      const isActive = category === currentAudioCategory;

      button.disabled = !hasTracks;
      button.classList.toggle("active", isActive);
      button.classList.toggle("disabled", !hasTracks);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function setSeekProgress(percent) {
    if (!audioSeekBar) {
      return;
    }

    const clamped = Math.max(0, Math.min(100, percent));
    audioSeekBar.style.setProperty("--seek-progress", clamped + "%");
  }

  function updateAudioTrackNavState() {
    const tracks = getTracksForCategory(currentAudioCategory);
    const hasTracks = tracks.length > 0;

    if (audioBackBtn) {
      audioBackBtn.disabled = !hasTracks;
    }

    if (audioNextBtn) {
      audioNextBtn.disabled = !hasTracks;
    }
  }

  function updateAudioTimeLabel() {
    const current = formatDuration(audioPlayer.currentTime || 0);
    const total = formatDuration(audioPlayer.duration || 0);

    if (audioCurrentTime) {
      audioCurrentTime.textContent = current;
    }

    if (audioDuration) {
      audioDuration.textContent = total;
    }
  }

  function updateAudioProgress() {
    if (!audioSeekBar) {
      return;
    }

    if (!Number.isFinite(audioPlayer.duration) || audioPlayer.duration <= 0) {
      audioSeekBar.value = "0";
      setSeekProgress(0);
      return;
    }

    const ratio = audioPlayer.currentTime / audioPlayer.duration;
    audioSeekBar.value = String(Math.round(ratio * 1000));
    setSeekProgress(ratio * 100);
  }

  function seekAudio() {
    if (!audioSeekBar || !Number.isFinite(audioPlayer.duration) || audioPlayer.duration <= 0) {
      return;
    }

    const max = Number(audioSeekBar.max) || 1000;
    const nextRatio = Number(audioSeekBar.value) / max;
    const clampedRatio = Math.max(0, Math.min(1, nextRatio));
    audioPlayer.currentTime = clampedRatio * audioPlayer.duration;
    setSeekProgress(clampedRatio * 100);
    updateAudioTimeLabel();
  }

  function isLoadedTrackSource(trackSrc) {
    if (!audioPlayer.src) {
      return false;
    }

    try {
      const currentPath = new URL(audioPlayer.src, window.location.href).pathname;
      const nextPath = new URL(trackSrc, window.location.href).pathname;
      return currentPath === nextPath;
    } catch (error) {
      return false;
    }
  }

  function pauseFocusAudio() {
    audioPlayer.pause();
    isAudioPlaying = false;
    if (focusAudioCard) {
      focusAudioCard.classList.remove("is-playing");
    }

    if (focusAudioToggleBtn) {
      focusAudioToggleBtn.textContent = "Play";
    }
  }

  function playFocusAudio() {
    const track = getCurrentTrack();
    if (!track) {
      showToast("No tracks available for this category.");
      return;
    }

    if (!isLoadedTrackSource(track.src)) {
      audioPlayer.src = track.src;
      audioPlayer.load();
    }

    audioPlayer
      .play()
      .then(function () {
        isAudioPlaying = true;
        if (focusAudioCard) {
          focusAudioCard.classList.add("is-playing");
        }
        if (focusAudioToggleBtn) {
          focusAudioToggleBtn.textContent = "Pause";
        }
      })
      .catch(function () {
        isAudioPlaying = false;
        if (focusAudioCard) {
          focusAudioCard.classList.remove("is-playing");
        }
        if (focusAudioToggleBtn) {
          focusAudioToggleBtn.textContent = "Play";
        }
        showToast("Unable to play this track right now.");
      });
  }

  function loadCurrentTrack(autoplay) {
    const track = getCurrentTrack();
    updateAudioTrackNavState();

    if (!track) {
      if (audioTrackTitle) {
        audioTrackTitle.textContent = "No track available";
      }
      if (audioCategoryLabel) {
        audioCategoryLabel.textContent = getCategoryLabel(currentAudioCategory);
      }
      if (audioSeekBar) {
        audioSeekBar.value = "0";
        setSeekProgress(0);
      }
      if (audioCurrentTime) {
        audioCurrentTime.textContent = "0:00";
      }
      if (audioDuration) {
        audioDuration.textContent = "0:00";
      }
      pauseFocusAudio();
      return;
    }

    if (audioTrackTitle) {
      audioTrackTitle.textContent = track.title;
    }
    if (audioCategoryLabel) {
      audioCategoryLabel.textContent = getCategoryLabel(currentAudioCategory);
    }

    audioPlayer.src = track.src;
    audioPlayer.load();

    if (audioSeekBar) {
      audioSeekBar.value = "0";
      setSeekProgress(0);
    }
    if (audioCurrentTime) {
      audioCurrentTime.textContent = "0:00";
    }
    if (audioDuration) {
      audioDuration.textContent = "0:00";
    }

    if (autoplay) {
      playFocusAudio();
    } else {
      pauseFocusAudio();
    }
  }

  function changeTrack(step) {
    const tracks = getTracksForCategory(currentAudioCategory);
    if (tracks.length === 0) {
      return;
    }

    currentTrackIndex = (currentTrackIndex + step + tracks.length) % tracks.length;
    loadCurrentTrack(isAudioPlaying);
  }

  function setAudioCategory(category) {
    const tracks = getTracksForCategory(category);
    if (tracks.length === 0) {
      showToast("No tracks in this category yet.");
      return;
    }

    const keepPlaying = isAudioPlaying;
    currentAudioCategory = category;
    currentTrackIndex = 0;

    updateAudioCategoryButtons();
    loadCurrentTrack(keepPlaying);
  }

  startExerciseBtn.addEventListener("click", function () {
    openModal(breathingModal, startExerciseBtn);
    resetBreathing();
  });

  closeBreathingModalBtn.addEventListener("click", function () {
    pauseBreathing();
    closeModal(true);
  });

  breathingCloseBtn.addEventListener("click", function () {
    pauseBreathing();
    closeModal(true);
  });

  breathingStartBtn.addEventListener("click", startBreathing);
  breathingPauseBtn.addEventListener("click", pauseBreathing);
  breathingResetBtn.addEventListener("click", resetBreathing);

  openJournalBtn.addEventListener("click", function () {
    journalSaveConsent.checked = false;
    saveJournalBtn.disabled = true;
    journalStorageStatus.textContent = localStorage.getItem(JOURNAL_KEY)
      ? "A saved entry exists on this device. Select Load Saved Entry to view it."
      : "Not saved on this device.";
    openModal(journalModal, openJournalBtn);
  });

  closeJournalModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  cancelJournalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  journalSaveConsent.addEventListener("change", function () {
    saveJournalBtn.disabled = !journalSaveConsent.checked;
  });

  loadJournalBtn.addEventListener("click", function () {
    const savedEntry = localStorage.getItem(JOURNAL_KEY);
    if (!savedEntry) {
      journalStorageStatus.textContent = "No saved entry exists on this device.";
      return;
    }

    journalInput.value = savedEntry;
    journalStorageStatus.textContent = "Saved entry loaded from this device. Delete it when no longer needed.";
  });

  clearJournalBtn.addEventListener("click", function () {
    localStorage.removeItem(JOURNAL_KEY);
    journalInput.value = "";
    journalSaveConsent.checked = false;
    saveJournalBtn.disabled = true;
    journalStorageStatus.textContent = "Saved entry deleted from this device.";
    showToast("Saved journal entry deleted from this device.");
  });

  saveJournalBtn.addEventListener("click", function () {
    if (!journalSaveConsent.checked) {
      journalStorageStatus.textContent = "Select consent before saving an entry on this device.";
      return;
    }

    localStorage.setItem(JOURNAL_KEY, journalInput.value);
    journalStorageStatus.textContent = "Entry saved in this browser on this device.";
    showToast("Journal entry saved on this device. You can delete it from this window.");
  });

  leaveQueueButton.addEventListener("click", function () {
    openModal(leaveQueueModal, leaveQueueButton);
  });

  closeLeaveQueueModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  cancelLeaveQueueBtn.addEventListener("click", function () {
    closeModal(true);
  });

  confirmLeaveQueueBtn.addEventListener("click", function () {
    clearQueueStorage();
    window.location.href = "professional-selection.html";
  });

  if (focusAudioToggleBtn) {
    focusAudioToggleBtn.addEventListener("click", function () {
      if (isAudioPlaying) {
        pauseFocusAudio();
        return;
      }

      playFocusAudio();
    });
  }

  if (audioBackBtn) {
    audioBackBtn.addEventListener("click", function () {
      changeTrack(-1);
    });
  }

  if (audioNextBtn) {
    audioNextBtn.addEventListener("click", function () {
      changeTrack(1);
    });
  }

  if (audioVolume) {
    audioPlayer.volume = Number(audioVolume.value) || 0.6;

    audioVolume.addEventListener("input", function () {
      audioPlayer.volume = Number(audioVolume.value) || 0.6;
    });
  } else {
    audioPlayer.volume = 0.6;
  }

  audioCategoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.audioCategory;
      if (!category) {
        return;
      }

      setAudioCategory(category);
    });
  });

  if (audioSeekBar) {
    setSeekProgress(0);
    audioSeekBar.addEventListener("input", seekAudio);
    audioSeekBar.addEventListener("change", seekAudio);
  }

  audioPlayer.addEventListener("loadedmetadata", function () {
    updateAudioTimeLabel();
    updateAudioProgress();
  });
  audioPlayer.addEventListener("timeupdate", function () {
    updateAudioProgress();
    updateAudioTimeLabel();
  });
  audioPlayer.addEventListener("ended", function () {
    changeTrack(1);
  });

  [breathingModal, journalModal, leaveQueueModal].forEach(function (modalEl) {
    modalEl.addEventListener("click", function (event) {
      if (event.target === modalEl) {
        if (modalEl === breathingModal) {
          pauseBreathing();
        }

        closeModal(true);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (activeModal) {
      if (activeModal === breathingModal) {
        pauseBreathing();
      }

      closeModal(true);
    }
  });

  window.addEventListener("beforeunload", function () {
    pauseBreathing();
    pauseFocusAudio();
  });

  updateBreathingUI();
  updateAudioCategoryButtons();
  setAudioCategory("lofi");

  const queueState = loadOrCreateQueueState(getQueueStateFromUrl());
  startQueueProgress(queueState);
})();
