(function () {
  const scheduleLaterBtn = document.getElementById("scheduleLaterBtn");
  const scheduleModal = document.getElementById("scheduleModal");
  const closeScheduleModalBtn = document.getElementById("closeScheduleModalBtn");
  const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");
  const bookSessionBtn = document.getElementById("bookSessionBtn");

  const callCrisisSupportBtn = document.getElementById("callCrisisSupportBtn");
  const crisisSupportModal = document.getElementById("crisisSupportModal");
  const closeCrisisModalBtn = document.getElementById("closeCrisisModalBtn");
  const closeCrisisSupportBtn = document.getElementById("closeCrisisSupportBtn");
  const copyLifelineBtn = document.getElementById("copyLifelineBtn");
  const openSelectionEmergencyPanelBtn = document.getElementById("openSelectionEmergencyPanelBtn");

  const selectionEmergencyPanel = document.getElementById("selectionEmergencyPanel");
  const closeSelectionEmergencyPanelBtn = document.getElementById("closeSelectionEmergencyPanelBtn");

  if (
    !scheduleLaterBtn ||
    !scheduleModal ||
    !callCrisisSupportBtn ||
    !crisisSupportModal ||
    !selectionEmergencyPanel
  ) {
    return;
  }

  let activeModal = null;
  let modalTrigger = null;

  function showToast(message) {
    if (window.mvpApp && typeof window.mvpApp.showToast === "function") {
      window.mvpApp.showToast(message);
      return;
    }
  }

  function copyText(text) {
    if (window.mvpApp && typeof window.mvpApp.copyText === "function") {
      return window.mvpApp.copyText(text);
    }

    return Promise.reject(new Error("Clipboard helper unavailable"));
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

  function openEmergencyPanel() {
    selectionEmergencyPanel.hidden = false;
  }

  function closeEmergencyPanel() {
    selectionEmergencyPanel.hidden = true;
  }

  scheduleLaterBtn.addEventListener("click", function () {
    openModal(scheduleModal, scheduleLaterBtn);
  });

  closeScheduleModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  cancelScheduleBtn.addEventListener("click", function () {
    closeModal(true);
  });

  bookSessionBtn.addEventListener("click", function () {
    const selectedSlot = document.querySelector('input[name="scheduleSlot"]:checked');
    if (!selectedSlot) {
      showToast("Please select a time slot.");
      return;
    }

    const bookingMessage =
      "Demo session slot selected for Dr. Elena Rodriguez: " + selectedSlot.value + ".";

    closeModal(true);
    if (window.mvpApp && typeof window.mvpApp.addNotification === "function") {
      window.mvpApp.addNotification(bookingMessage, "schedule");
      return;
    }

    showToast(bookingMessage);
  });

  callCrisisSupportBtn.addEventListener("click", function () {
    openModal(crisisSupportModal, callCrisisSupportBtn);
  });

  closeCrisisModalBtn.addEventListener("click", function () {
    closeModal(true);
  });

  closeCrisisSupportBtn.addEventListener("click", function () {
    closeModal(true);
  });

  copyLifelineBtn.addEventListener("click", function () {
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
  });

  openSelectionEmergencyPanelBtn.addEventListener("click", function () {
    openEmergencyPanel();
    closeModal(true);
  });

  closeSelectionEmergencyPanelBtn.addEventListener("click", function () {
    closeEmergencyPanel();
  });

  [scheduleModal, crisisSupportModal].forEach(function (modalEl) {
    modalEl.addEventListener("click", function (event) {
      if (event.target === modalEl) {
        closeModal(true);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (activeModal) {
      closeModal(true);
      return;
    }

    if (!selectionEmergencyPanel.hidden) {
      closeEmergencyPanel();
    }
  });
})();
