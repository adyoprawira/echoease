const overlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const publishBtn = document.getElementById("publishBtn");

const titleInput = document.getElementById("postTitle");
const contentInput = document.getElementById("postContent");
const topicsWrap = document.getElementById("topics");
const anonSwitch = document.getElementById("anonSwitch");

let selectedTopic = "Academic Pressure";
let isAnonymous = true;

// Topic chips (single select)
topicsWrap.addEventListener("click", (e) => {
  const btn = e.target.closest(".topic-btn");
  if (!btn) return;

  document.querySelectorAll(".topic-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  selectedTopic = btn.dataset.topic || "Other";
});

// Anonymous switch
anonSwitch.addEventListener("click", () => {
  isAnonymous = !isAnonymous;
  anonSwitch.classList.toggle("off", !isAnonymous);
  anonSwitch.setAttribute("aria-pressed", String(isAnonymous));
});

// Close modal helper
function closeModal() {
  overlay.style.display = "none";
}

// Close actions
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Click outside modal closes
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Publish action (MVP)
publishBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    alert("Please add a post title.");
    titleInput.focus();
    return;
  }

  if (!content) {
    alert("Please add post content.");
    contentInput.focus();
    return;
  }

  const payload = {
    title,
    topic: selectedTopic,
    content,
    anonymous: isAnonymous,
    createdAt: new Date().toISOString()
  };

  // For now: log + success
  console.log("Post payload:", payload);
  alert("Post published successfully.");
  closeModal();
});

// ESC key closes modal
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.style.display !== "none") {
    closeModal();
  }
});
