const categories = [
  { name: "All Posts", count: 248, active: true },
  { name: "Study Stress", count: 87 },
  { name: "Anxiety", count: 64 },
  { name: "Relationships", count: 41 },
  { name: "Self-Care", count: 56 },
];

const trending = ["#Exams", "#Anxiety", "#Mindfulness", "#StudyTips", "#SelfCare", "#Sleep"];

const posts = [
  {
    pinned: true,
    title: "Welcome to the Well-being Community",
    author: "Moderator", initials: "MO", time: "Pinned",
    excerpt: "A safe, anonymous space to share, support, and grow. Please read our community guidelines before posting.",
    tags: ["#Announcement", "#Guidelines"], replies: 24, likes: 132,
  },
  {
    title: "Anyone else burnt out before exams?",
    author: "Anonymous Koala", initials: "AK", time: "2h ago",
    excerpt: "I've been studying 10+ hours a day and I just hit a wall. How do you all stay motivated when nothing seems to work anymore?",
    tags: ["#StudyBurnout", "#Exams"], replies: 18, likes: 47,
  },
  {
    title: "Mindfulness practice that actually helped me",
    author: "Quiet River", initials: "QR", time: "5h ago",
    excerpt: "Sharing a 5-minute breathing exercise that genuinely reduced my anxiety before a big presentation last week.",
    tags: ["#Mindfulness", "#Anxiety"], replies: 32, likes: 89,
  },
  {
    title: "Finding it hard to make friends in second year",
    author: "Anonymous Wombat", initials: "AW", time: "1d ago",
    excerpt: "Everyone seems to already have their groups. Any advice on putting yourself out there without it feeling forced?",
    tags: ["#Relationships", "#Loneliness"], replies: 41, likes: 73,
  },
];

function renderPosts() {
  document.getElementById("posts").innerHTML = posts.map(p => `
    <article class="post">
      <div class="avatar-circle">${p.initials}</div>
      <div style="flex:1;min-width:0">
        <div class="post-meta">
          ${p.pinned ? '<i class="icon icon-pin pin"></i>' : ''}
          <span class="author">${p.author}</span><span>&bull;</span><span>${p.time}</span>
        </div>
        <h3>${p.title}</h3>
        <p class="post-excerpt">${p.excerpt}</p>
        <div class="post-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="post-actions">
          <span><i class="icon icon-message-square"></i> ${p.replies} replies</span>
          <span><i class="icon icon-heart"></i> ${p.likes} likes</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCategories() {
  document.getElementById("categories").innerHTML = categories.map(c => `
    <li><button class="cat-btn ${c.active ? 'active' : ''}">
      <span>${c.name}</span><span class="cat-count">${c.count}</span>
    </button></li>
  `).join("");
}

function renderTrending() {
  document.getElementById("trending").innerHTML =
    trending.map(t => `<span class="tag tag-accent">${t}</span>`).join("");
}

renderPosts();
renderCategories();
renderTrending();

document.querySelector(".btn-quick-exit")?.addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});
