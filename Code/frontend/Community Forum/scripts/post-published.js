document.addEventListener("DOMContentLoaded", () => {
  const viewPostButton = document.getElementById("viewPostBtn");
  const toast = document.getElementById("publishToast");
  const toastCloseButton = document.getElementById("toastCloseBtn");

  viewPostButton?.addEventListener("click", () => {
    window.location.href = "community.html";
  });

  toast?.classList.add("show");

  toastCloseButton?.addEventListener("click", () => {
    toast?.classList.remove("show");
  });
});
