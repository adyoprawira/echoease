document.addEventListener("DOMContentLoaded", () => {
  const quickExitButton = document.querySelector(".btn-quick-exit");
  const viewPostButton = document.getElementById("viewPostBtn");
  const toast = document.getElementById("publishToast");
  const toastCloseButton = document.getElementById("toastCloseBtn");

  quickExitButton?.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });

  viewPostButton?.addEventListener("click", () => {
    window.location.href = "community.html";
  });

  toast?.classList.add("show");

  toastCloseButton?.addEventListener("click", () => {
    toast?.classList.remove("show");
  });
});
