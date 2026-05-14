(function () {
  const WELLBEING_NOTIFICATIONS_KEY = "wellbeingNotifications";
  const VALID_NOTIFICATION_TYPES = ["queue", "schedule", "chat", "system"];
  const NOTIFICATION_REFRESH_INTERVAL_MS = 2000;

  const DEFAULT_NOTIFICATIONS = [
    {
      id: "default-queue-updates",
      message: "Your queue position updates will appear here.",
      type: "system",
      unread: false,
      timestamp: null
    },
    {
      id: "default-session-reminders",
      message: "Scheduled session reminders will appear here.",
      type: "system",
      unread: false,
      timestamp: null
    },
    {
      id: "default-emergency-alerts",
      message: "Emergency alerts will appear here.",
      type: "system",
      unread: false,
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

  const quickExitButtons = [
    document.getElementById("quickExitTop"),
    document.getElementById("quickExitInline"),
    document.getElementById("emergencyExitBtn")
  ].filter(Boolean);

  let toastStack = document.getElementById("toastStack");
  let panelTrigger = null;
  let modalTrigger = null;

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
    profileModal.hidden = false;
    modalTrigger = triggerEl || profileButton;

    if (closeProfileModalBtn) {
      closeProfileModalBtn.focus();
    }
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

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (notificationPanel && !notificationPanel.hidden) {
      closeNotificationPanel(true);
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
      window.location.href = "https://www.google.com";
    });
  });

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
