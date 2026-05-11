// Topic filter chips
const chips = document.querySelectorAll("#topicFilters .chip");
const cards = document.querySelectorAll("#feedGrid .card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.topic === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

// Sidebar active nav behavior
const navLinks = document.querySelectorAll("#leftNav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// FAB label hover/focus
const fab = document.getElementById("fab");
const fabLabel = document.getElementById("fabLabel");

function showFabLabel() {
  fabLabel.classList.add("show");
}

function hideFabLabel() {
  fabLabel.classList.remove("show");
}

fab.addEventListener("mouseenter", showFabLabel);
fab.addEventListener("mouseleave", hideFabLabel);
fab.addEventListener("focus", showFabLabel);
fab.addEventListener("blur", hideFabLabel);

fab.addEventListener("click", () => {
  alert("Open create post dialog (read-only mock)");
});