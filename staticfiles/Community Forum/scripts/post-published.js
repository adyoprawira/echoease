document.addEventListener("DOMContentLoaded", () => {
  const viewPostButton = document.getElementById("viewPostBtn");
  const toast = document.getElementById("publishToast");
  const toastCloseButton = document.getElementById("toastCloseBtn");

  viewPostButton?.addEventListener("click", () => {
    const postId = getLatestPostId();
    const target = postId
      ? `view-post.html?post=${encodeURIComponent(postId)}`
      : "community.html";
    window.location.href = target;
  });

  toast?.classList.add("show");

  toastCloseButton?.addEventListener("click", () => {
    toast?.classList.remove("show");
  });
});
