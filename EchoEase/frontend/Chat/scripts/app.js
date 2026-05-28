(function () {
  const WELLBEING_NOTIFICATIONS_KEY = "wellbeingNotifications";
  const VALID_NOTIFICATION_TYPES = ["queue", "schedule", "chat", "community", "wellbeing", "system"];
  const NOTIFICATION_REFRESH_INTERVAL_MS = 2000;
  const PROFILE_SETTINGS_KEY = "wellbeingProfileSettings";

  const DEFAULT_NOTIFICATIONS = [
    {
      id: "demo-community-reply",
      message: "Someone responded to your support post.",
      type: "community",
      unread: true,
      timestamp: null
    },
    {
      id: "demo-mindfulness-reminder",
      message: "Take a 3 minute breathing break today.",
      type: "wellbeing",
      unread: true,
      timestamp: null
    },
    {
      id: "demo-workshop-reminder",
      message: "Stress Management Workshop starts tomorrow at 2:00 PM.",
      type: "schedule",
      unread: true,
      timestamp: null
    }
  ];

  const notificationButton = document.getElementById("notificationButton");
  const notificationBadge = document.getElementById("notificationBadge");
  const notificationPanel = document.getElementById("notificationPanel");
  const notificationList = document.getElementById("notificationList");
  const closeNotificationPanelBtn = document.getElementById("closeNotificationPanelBtn");
  const clearNotificationsBtn = document.getElementById("clearNotificationsBtn");

  const profileButton = document.getElementById("profileButton");
  const profileModal = document.getElementById("profileModal");
  const closeProfileModalBtn = document.getElementById("closeProfileModalBtn");
  const profileCloseActionBtn = document.getElementById("profileCloseActionBtn");
  const copyProfileEmailBtn = document.getElementById("copyProfileEmailBtn");
  const copyStudentIdBtn = document.getElementById("copyStudentIdBtn");
  const bottomActionButtons = Array.from(document.querySelectorAll(".bottom-item"));
  const settingsButtons = bottomActionButtons.filter(function (button) {
    return button.textContent.trim() === "Settings";
  });
  const helpButtons = bottomActionButtons.filter(function (button) {
    return button.textContent.trim() === "Help";
  });

  const quickExitButtons = [
    document.getElementById("quickExitTop"),
    document.getElementById("quickExitInline"),
    document.getElementById("emergencyExitBtn")
  ].filter(Boolean);

  let toastStack = document.getElementById("toastStack");
  let panelTrigger = null;
  let modalTrigger = null;
  let utilityTrigger = null;
  let utilityModal = null;

  let knownUnreadIds = new Set();

  function ensureToastStack() {
    if (toastStack) {
      return;
    }

    toastStack = document.createElement("div");
    toastStack.id = "toastStack";
    toastStack.className = "mvp-toast-stack";
    toastStack.setAttribute("aria-live", "polite");
    toastStack.setAttribute("aria-atomic", "true");
    document.body.appendChild(toastStack);
  }

  function showToast(message) {
    if (!message) {
      return;
    }

    ensureToastStack();

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

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      try {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.setAttribute("readonly", "");
        helper.style.position = "absolute";
        helper.style.left = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function sanitizeNotificationType(type) {
    if (VALID_NOTIFICATION_TYPES.indexOf(type) >= 0) {
      return type;
    }

    return "system";
  }

  function normalizeNotification(item, index) {
    const fallbackId = "notification-" + index + "-" + Date.now();

    return {
      id: (item && item.id ? String(item.id) : fallbackId),
      message: (item && typeof item.message === "string" ? item.message.trim() : ""),
      type: sanitizeNotificationType(item && item.type),
      unread: Boolean(item && item.unread),
      timestamp: item && typeof item.timestamp === "string" ? item.timestamp : null
    };
  }

  function sortNotificationsNewestFirst(items) {
    return items.slice().sort(function (a, b) {
      const timeA = a.timestamp ? Date.parse(a.timestamp) : 0;
      const timeB = b.timestamp ? Date.parse(b.timestamp) : 0;

      if (Number.isFinite(timeA) && Number.isFinite(timeB) && timeA !== timeB) {
        return timeB - timeA;
      }

      return String(b.id).localeCompare(String(a.id));
    });
  }

  function readStoredNotifications() {
    try {
      const raw = localStorage.getItem(WELLBEING_NOTIFICATIONS_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      const normalized = parsed
        .map(function (item, index) {
          return normalizeNotification(item, index);
        })
        .filter(function (item) {
          return item.message.length > 0;
        });

      return sortNotificationsNewestFirst(normalized);
    } catch (error) {
      return [];
    }
  }

  function writeStoredNotifications(items) {
    try {
      if (!Array.isArray(items) || items.length === 0) {
        localStorage.setItem(WELLBEING_NOTIFICATIONS_KEY, JSON.stringify([]));
        return;
      }

      localStorage.setItem(WELLBEING_NOTIFICATIONS_KEY, JSON.stringify(items));
    } catch (error) {
      // Ignore storage write failures in MVP.
    }
  }

  function initializeNotifications() {
    try {
      if (localStorage.getItem(WELLBEING_NOTIFICATIONS_KEY) === null) {
        writeStoredNotifications(DEFAULT_NOTIFICATIONS);
      }
    } catch (error) {
      // Fall through to display defaults if storage is unavailable.
    }
  }

  function getNotifications() {
    return readStoredNotifications();
  }

  function getDisplayNotifications() {
    const notifications = getNotifications();
    if (notifications.length > 0) {
      return notifications;
    }

    if (localStorage.getItem(WELLBEING_NOTIFICATIONS_KEY) !== null) {
      return [];
    }

    return DEFAULT_NOTIFICATIONS.slice();
  }

  function getUnreadCount() {
    return getNotifications().filter(function (item) {
      return item.unread;
    }).length;
  }

  function getTypeLabel(type) {
    const map = {
      queue: "Queue",
      schedule: "Schedule",
      chat: "Chat",
      community: "Community",
      wellbeing: "Well-being",
      system: "System"
    };

    return map[type] || "System";
  }

  function getTimeLabel(timestamp) {
    if (!timestamp) {
      return "";
    }

    const parsed = new Date(timestamp);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    const diffSeconds = Math.floor((Date.now() - parsed.getTime()) / 1000);
    if (diffSeconds <= 45) {
      return "Just now";
    }

    return parsed.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function updateNotificationBadge() {
    if (!notificationBadge) {
      return;
    }

    const unreadCount = getUnreadCount();
    if (unreadCount > 0) {
      notificationBadge.hidden = false;
      notificationBadge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
      return;
    }

    notificationBadge.hidden = true;
    notificationBadge.textContent = "";
  }

  function renderNotifications() {
    if (!notificationList) {
      return;
    }

    const notifications = getDisplayNotifications();
    notificationList.innerHTML = "";

    if (notifications.length === 0) {
      const empty = document.createElement("li");
      empty.className = "notification-item empty";
      empty.textContent = "No notifications yet.";
      notificationList.appendChild(empty);
      return;
    }

    notifications.forEach(function (item) {
      const row = document.createElement("li");
      row.className = "notification-item" + (item.unread ? " unread" : "");

      const head = document.createElement("div");
      head.className = "notification-head";

      const type = document.createElement("span");
      type.className = "notification-type";
      type.textContent = getTypeLabel(item.type);

      const time = document.createElement("span");
      time.className = "notification-time";
      time.textContent = getTimeLabel(item.timestamp);

      const message = document.createElement("p");
      message.className = "notification-message";
      message.textContent = item.message;

      head.appendChild(type);
      head.appendChild(time);
      row.appendChild(head);
      row.appendChild(message);

      notificationList.appendChild(row);
    });
  }

  function markNotificationsRead() {
    const notifications = getNotifications();
    if (notifications.length === 0) {
      return;
    }

    const updated = notifications.map(function (item) {
      return Object.assign({}, item, { unread: false });
    });

    writeStoredNotifications(updated);
    knownUnreadIds = new Set();
    renderNotifications();
    updateNotificationBadge();
  }

  function clearNotifications() {
    localStorage.setItem(WELLBEING_NOTIFICATIONS_KEY, JSON.stringify([]));
    knownUnreadIds = new Set();
    renderNotifications();
    updateNotificationBadge();
  }

  function addNotification(message, type) {
    if (typeof message !== "string" || !message.trim()) {
      return null;
    }

    const notification = {
      id: "n-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      message: message.trim(),
      type: sanitizeNotificationType(type),
      unread: true,
      timestamp: new Date().toISOString()
    };

    const notifications = getNotifications();
    notifications.push(notification);
    writeStoredNotifications(sortNotificationsNewestFirst(notifications));

    knownUnreadIds.add(notification.id);
    showToast(notification.message);
    renderNotifications();
    updateNotificationBadge();

    return notification;
  }

  function closeNotificationPanel(returnFocus) {
    if (!notificationPanel || notificationPanel.hidden) {
      return;
    }

    const lastTrigger = panelTrigger;
    notificationPanel.hidden = true;
    panelTrigger = null;

    if (notificationButton) {
      notificationButton.setAttribute("aria-expanded", "false");
    }

    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }
  }

  function openNotificationPanel(triggerEl) {
    if (!notificationPanel) {
      return;
    }

    closeProfileModal(false);
    closeUtilityModal(false);
    notificationPanel.hidden = false;
    panelTrigger = triggerEl || notificationButton;

    if (notificationButton) {
      notificationButton.setAttribute("aria-expanded", "true");
    }

    markNotificationsRead();

    if (closeNotificationPanelBtn) {
      closeNotificationPanelBtn.focus();
    }
  }

  function closeProfileModal(returnFocus) {
    if (!profileModal || profileModal.hidden) {
      return;
    }

    const lastTrigger = modalTrigger;
    profileModal.hidden = true;
    modalTrigger = null;

    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }
  }

  function openProfileModal(triggerEl) {
    if (!profileModal) {
      return;
    }

    closeNotificationPanel(false);
    closeUtilityModal(false);
    profileModal.hidden = false;
    modalTrigger = triggerEl || profileButton;

    if (closeProfileModalBtn) {
      closeProfileModalBtn.focus();
    }
  }

  function readProfileSettings() {
    const fallback = {
      displayName: "Darren Marcello",
      anonymousByDefault: true
    };

    try {
      const parsed = JSON.parse(localStorage.getItem(PROFILE_SETTINGS_KEY) || "null");
      if (!parsed || typeof parsed !== "object") {
        return fallback;
      }

      return {
        displayName: typeof parsed.displayName === "string" && parsed.displayName.trim()
          ? parsed.displayName.trim().slice(0, 40)
          : fallback.displayName,
        anonymousByDefault: parsed.anonymousByDefault !== false
      };
    } catch (error) {
      return fallback;
    }
  }

  function ensureUtilityModals() {
    if (document.getElementById("settingsModal") && document.getElementById("helpModal")) {
      return;
    }

    const container = document.createElement("div");
    container.innerHTML = `
      <div class="mvp-modal-backdrop" id="settingsModal" hidden>
        <div class="mvp-modal-card utility-modal-card" role="dialog" aria-modal="true" aria-labelledby="settingsModalTitle">
          <button class="mvp-modal-close" type="button" data-close-utility aria-label="Close profile settings">Close</button>
          <h2 id="settingsModalTitle">Profile Settings</h2>
          <p class="utility-intro">Set preferences used when you create a community post in this prototype.</p>
          <form class="settings-form" id="profileSettingsForm">
            <label for="settingsDisplayName">Forum display name when posting publicly</label>
            <input id="settingsDisplayName" name="displayName" type="text" maxlength="40" required>
            <label class="setting-check">
              <input id="settingsAnonymousDefault" name="anonymousByDefault" type="checkbox">
              <span>Post anonymously by default</span>
            </label>
            <div class="mvp-modal-actions">
              <button class="mvp-modal-btn" type="button" data-close-utility>Cancel</button>
              <button class="mvp-modal-btn primary" type="submit">Save Settings</button>
            </div>
          </form>
        </div>
      </div>
      <div class="mvp-modal-backdrop" id="helpModal" hidden>
        <div class="mvp-modal-card utility-modal-card" role="dialog" aria-modal="true" aria-labelledby="helpModalTitle">
          <button class="mvp-modal-close" type="button" data-close-utility aria-label="Close help">Close</button>
          <h2 id="helpModalTitle">Help &amp; FAQ</h2>
          <p class="utility-intro">How to use the UQ Student Well-being prototype.</p>
          <ol class="help-steps">
            <li>Browse <strong>Community</strong> to read posts, filter topics, or share a post anonymously.</li>
            <li>Choose <strong>Chat</strong> to connect with an available support option.</li>
            <li>Open <strong>Resources</strong> for university services and urgent support details.</li>
          </ol>
          <div class="faq-list" aria-label="Frequently asked questions">
            <details>
              <summary>Is my community post anonymous?</summary>
              <p>Keep the anonymous toggle enabled before publishing. Your name is then hidden from the forum feed.</p>
            </details>
            <details>
              <summary>Where can I find immediate help?</summary>
              <p>Use Resources or the crisis panel. In immediate danger in Australia, call 000.</p>
            </details>
            <details>
              <summary>Can I attach a photo to a post?</summary>
              <p>Yes. Select an image in Create New Post and add a short description before publishing.</p>
            </details>
          </div>
        </div>
      </div>
    `;

    while (container.firstElementChild) {
      document.body.appendChild(container.firstElementChild);
    }

    const settingsForm = document.getElementById("profileSettingsForm");
    settingsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const settings = {
        displayName: settingsForm.elements.displayName.value.trim() || "Darren Marcello",
        anonymousByDefault: settingsForm.elements.anonymousByDefault.checked
      };

      try {
        localStorage.setItem(PROFILE_SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        showToast("Settings could not be saved in this browser.");
        return;
      }

      window.dispatchEvent(new CustomEvent("profile-settings-saved", { detail: settings }));
      closeUtilityModal(true);
      showToast("Profile settings saved.");
    });

    document.querySelectorAll("[data-close-utility]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeUtilityModal(true);
      });
    });

    ["settingsModal", "helpModal"].forEach(function (id) {
      const modal = document.getElementById(id);
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          closeUtilityModal(true);
        }
      });
    });
  }

  function closeUtilityModal(returnFocus) {
    if (!utilityModal || utilityModal.hidden) {
      return;
    }

    const lastTrigger = utilityTrigger;
    utilityModal.hidden = true;
    utilityModal = null;
    utilityTrigger = null;

    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }
  }

  function openUtilityModal(id, triggerEl) {
    ensureUtilityModals();
    closeNotificationPanel(false);
    closeProfileModal(false);
    closeUtilityModal(false);

    utilityModal = document.getElementById(id);
    utilityTrigger = triggerEl;
    utilityModal.hidden = false;

    if (id === "settingsModal") {
      const settings = readProfileSettings();
      document.getElementById("settingsDisplayName").value = settings.displayName;
      document.getElementById("settingsAnonymousDefault").checked = settings.anonymousByDefault;
    }

    utilityModal.querySelector(".mvp-modal-close").focus();
  }

  function syncNotifications(showNewUnreadToasts) {
    const notifications = getNotifications();

    if (showNewUnreadToasts) {
      notifications.forEach(function (item) {
        if (item.unread && !knownUnreadIds.has(item.id)) {
          showToast(item.message);
        }
      });
    }

    knownUnreadIds = new Set(
      notifications
        .filter(function (item) {
          return item.unread;
        })
        .map(function (item) {
          return item.id;
        })
    );

    renderNotifications();
    updateNotificationBadge();
  }

  if (notificationButton && notificationPanel && notificationList) {
    notificationButton.addEventListener("click", function () {
      if (notificationPanel.hidden) {
        openNotificationPanel(notificationButton);
        return;
      }

      closeNotificationPanel(true);
    });

    if (closeNotificationPanelBtn) {
      closeNotificationPanelBtn.addEventListener("click", function () {
        closeNotificationPanel(true);
      });
    }

    if (clearNotificationsBtn) {
      clearNotificationsBtn.addEventListener("click", function () {
        clearNotifications();
        showToast("Notifications cleared.");
      });
    }

    document.addEventListener("click", function (event) {
      if (notificationPanel.hidden) {
        return;
      }

      const target = event.target;
      const clickedPanel = notificationPanel.contains(target);
      const clickedButton = notificationButton.contains(target);

      if (!clickedPanel && !clickedButton) {
        closeNotificationPanel(false);
      }
    });
  }

  if (profileButton && profileModal) {
    profileButton.addEventListener("click", function () {
      openProfileModal(profileButton);
    });

    if (closeProfileModalBtn) {
      closeProfileModalBtn.addEventListener("click", function () {
        closeProfileModal(true);
      });
    }

    if (profileCloseActionBtn) {
      profileCloseActionBtn.addEventListener("click", function () {
        closeProfileModal(true);
      });
    }

    profileModal.addEventListener("click", function (event) {
      if (event.target === profileModal) {
        closeProfileModal(true);
      }
    });
  }

  if (copyProfileEmailBtn) {
    copyProfileEmailBtn.addEventListener("click", function () {
      copyText("darrenms7120@gmail.com")
        .then(function () {
          showToast("Email copied.");
        })
        .catch(function () {
          showToast("Could not copy automatically.");
        });
    });
  }

  if (copyStudentIdBtn) {
    copyStudentIdBtn.addEventListener("click", function () {
      copyText("s4980052")
        .then(function () {
          showToast("Student ID copied.");
        })
        .catch(function () {
          showToast("Could not copy automatically.");
        });
    });
  }

  settingsButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openUtilityModal("settingsModal", button);
    });
  });

  helpButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openUtilityModal("helpModal", button);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (notificationPanel && !notificationPanel.hidden) {
      closeNotificationPanel(true);
      return;
    }

    if (utilityModal && !utilityModal.hidden) {
      closeUtilityModal(true);
      return;
    }

    if (profileModal && !profileModal.hidden) {
      closeProfileModal(true);
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key && event.key !== WELLBEING_NOTIFICATIONS_KEY) {
      return;
    }

    syncNotifications(true);
  });

  window.setInterval(function () {
    syncNotifications(true);
  }, NOTIFICATION_REFRESH_INTERVAL_MS);

  quickExitButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = button.dataset.quickExitUrl || "../../Landing%20Page/blackboard.html";
    });
  });

  initializeNotifications();
  syncNotifications(false);

  window.mvpApp = {
    showToast: showToast,
    copyText: copyText,
    addNotification: addNotification,
    getNotifications: getNotifications,
    markNotificationsRead: markNotificationsRead,
    clearNotifications: clearNotifications,
    renderNotifications: renderNotifications,
    updateNotificationBadge: updateNotificationBadge,
    refreshNotifications: function () {
      syncNotifications(false);
    }
  };
})();
