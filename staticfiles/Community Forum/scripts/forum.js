const COMMUNITY_REPLIES_STORAGE_KEY = "communityForumReplies";

const categories = [
  { name: "All Posts", key: "all" },
  { name: "Study Stress", key: "study" },
  { name: "Anxiety", key: "anxiety" },
  { name: "Relationships", key: "relationships" },
  { name: "Self-Care", key: "self-care" },
];

const trending = ["#Exams", "#Anxiety", "#Mindfulness", "#StudyTips", "#SelfCare", "#Sleep"];

const basePosts = [
  {
    id: "welcome-guidelines",
    pinned: true,
    title: "Welcome to the Well-being Community",
    author: "Moderator", initials: "MO", time: "Pinned",
    excerpt: "This prototype feed demonstrates sharing and support. Posts created here remain in this browser.",
    tags: ["#Announcement", "#Guidelines"], likes: 132,
    replies: [
      {
        author: "Peer Support Team",
        initials: "PS",
        time: "Pinned",
        text: "This is example content. Moderation and urgent-safety review are not active in this prototype."
      },
      {
        author: "Anonymous Student",
        initials: "AS",
        time: "1d ago",
        text: "This makes it easier to know what is okay to post. Appreciate the clear reminder."
      }
    ],
  },
  {
    id: "exam-burnout",
    title: "Anyone else burnt out before exams?",
    author: "Anonymous Koala", initials: "AK", time: "2h ago",
    excerpt: "I've been studying 10+ hours a day and I just hit a wall. How do you all stay motivated when nothing seems to work anymore?",
    tags: ["#StudyBurnout", "#Exams"], likes: 47,
    replies: [
      {
        author: "Second Year Student",
        initials: "SY",
        time: "38m ago",
        text: "I started using 45-minute blocks and taking a proper food break. It helped more than pushing through."
      },
      {
        author: "Study Mentor",
        initials: "SM",
        time: "21m ago",
        text: "Try picking one high-impact topic for tonight and leave the rest for tomorrow. Burnout needs smaller steps."
      },
      {
        author: "Anonymous Student",
        initials: "AS",
        time: "12m ago",
        text: "I also blocked library time with a friend so I would actually stop scrolling and start with one task."
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=460&fit=crop&auto=format&q=80",
      alt: "Laptop and notes on a quiet study desk"
    },
  },
  {
    id: "mindfulness-practice",
    title: "Mindfulness practice that actually helped me",
    author: "Quiet River", initials: "QR", time: "5h ago",
    excerpt: "Sharing a 5-minute breathing exercise that genuinely reduced my anxiety before a big presentation last week.",
    tags: ["#Mindfulness", "#Anxiety"], likes: 89,
    replies: [
      {
        author: "Presentation Prep Group",
        initials: "PG",
        time: "2h ago",
        text: "Box breathing before walking into class helped me too. I saved a timer on my phone for it."
      },
      {
        author: "Anonymous Student",
        initials: "AS",
        time: "1h ago",
        text: "I tried this between lectures today and felt calmer. Thanks for sharing something practical."
      },
      {
        author: "Wellbeing Volunteer",
        initials: "WV",
        time: "44m ago",
        text: "Pairing it with a short walk can help if sitting still feels too hard on anxious days."
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=460&fit=crop&auto=format&q=80",
      alt: "Calm morning light for mindfulness practice"
    },
  },
  {
    id: "second-year-friends",
    title: "Finding it hard to make friends in second year",
    author: "Anonymous Wombat", initials: "AW", time: "1d ago",
    excerpt: "Everyone seems to already have their groups. Any advice on putting yourself out there without it feeling forced?",
    tags: ["#Relationships", "#Loneliness"], likes: 73,
    replies: [
      {
        author: "Club Volunteer",
        initials: "CV",
        time: "16h ago",
        text: "Joining a small recurring activity was less awkward for me than one-off events. People remember you after a few weeks."
      },
      {
        author: "Anonymous Student",
        initials: "AS",
        time: "12h ago",
        text: "I felt this too. Asking one person from a tutorial to grab coffee after class worked better than trying to meet a whole group."
      },
      {
        author: "Peer Mentor",
        initials: "PM",
        time: "8h ago",
        text: "Tutorial group chats can be a good low-pressure start. Asking about assignments often opens the door."
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&h=460&fit=crop&auto=format&q=80",
      alt: "Students talking together on campus"
    },
  },
];

function getAllPosts() {
  const pinned = basePosts.filter(post => post.pinned);
  const staticPosts = basePosts.filter(post => !post.pinned);
  const userPosts = typeof loadUserPosts === "function" ? loadUserPosts() : [];
  return [...pinned, ...userPosts, ...staticPosts];
}

let focusPostId = getLatestPostId();
let editingPostId = "";
let savedRepliesByPost = loadSavedReplies();

const postsEl = document.getElementById("posts");
const categoriesEl = document.getElementById("categories");
const trendingEl = document.getElementById("trending");
const searchEl = document.getElementById("forumSearch");
const filterStatusEl = document.getElementById("filterStatus");
const expandedPostIds = new Set();
const demoReports = new Set();
const filters = { query: "", category: "all", tag: "" };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function loadSavedReplies() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMUNITY_REPLIES_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function saveReplies() {
  try {
    localStorage.setItem(COMMUNITY_REPLIES_STORAGE_KEY, JSON.stringify(savedRepliesByPost));
  } catch {
    // Keep the reply visible in this page even if browser storage is unavailable.
  }
}

function getSavedReplies(postId) {
  return Array.isArray(savedRepliesByPost[postId]) ? savedRepliesByPost[postId] : [];
}

function getReplies(post) {
  return [...post.replies, ...getSavedReplies(post.id)];
}

function getReplyLabel(count) {
  return `${count} ${count === 1 ? "reply" : "replies"}`;
}

function isUserPost(post) {
  return post.userPublished === true;
}

function matchesCategory(post, category) {
  if (category === "all") {
    return true;
  }

  const searchable = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
  const terms = {
    study: ["study", "exam", "academic", "stress", "burnout"],
    anxiety: ["anxiety", "anxious"],
    relationships: ["relationship", "loneliness", "friends", "lonely"],
    "self-care": ["mindfulness", "selfcare", "sleep", "breathing"]
  };

  return (terms[category] || []).some(term => searchable.includes(term));
}

function matchesFilters(post) {
  const query = filters.query.toLowerCase();
  const searchable = [
    post.title,
    post.excerpt,
    post.author,
    post.tags.join(" "),
    getReplies(post).map(reply => reply.text).join(" ")
  ].join(" ").toLowerCase();

  return (
    (!query || searchable.includes(query)) &&
    matchesCategory(post, filters.category) &&
    (!filters.tag || post.tags.some(tag => tag.toLowerCase() === filters.tag.toLowerCase()))
  );
}

function getReportStatus(key) {
  return demoReports.has(key)
    ? '<p class="demo-report-status" role="status">Report noted for this demo only. No moderation team has been notified.</p>'
    : "";
}

function renderEditForm(post) {
  if (editingPostId !== post.id) {
    return "";
  }

  return `
    <form class="edit-post-form" data-post-id="${escapeHtml(post.id)}">
      <label class="sr-only" for="editTitle-${escapeHtml(post.id)}">Edit title</label>
      <input id="editTitle-${escapeHtml(post.id)}" name="title" maxlength="120" value="${escapeHtml(post.title)}">
      <label class="sr-only" for="editContent-${escapeHtml(post.id)}">Edit content</label>
      <textarea id="editContent-${escapeHtml(post.id)}" name="content" rows="4" maxlength="600">${escapeHtml(post.excerpt)}</textarea>
      <p class="inline-error" data-edit-error hidden></p>
      <div class="edit-actions">
        <button class="reply-submit" type="submit">Save changes</button>
        <button class="post-action-btn" type="button" data-action="cancel-edit">Cancel</button>
      </div>
    </form>
  `;
}

function renderReplyThread(post, replies) {
  const isExpanded = expandedPostIds.has(post.id);
  const replyLabel = getReplyLabel(replies.length);

  return `
    <button
      class="reply-toggle"
      type="button"
      data-post-id="${escapeHtml(post.id)}"
      aria-expanded="${isExpanded}"
      aria-controls="replyThread-${escapeHtml(post.id)}"
    >
      <span><i class="icon icon-message-square"></i> ${isExpanded ? "Hide replies" : `View ${replyLabel}`}</span>
      <i class="icon ${isExpanded ? "icon-chevron-up" : "icon-chevron-down"}" aria-hidden="true"></i>
    </button>
    <section
      class="reply-thread"
      id="replyThread-${escapeHtml(post.id)}"
      aria-label="Replies to ${escapeHtml(post.title)}"
      ${isExpanded ? "" : "hidden"}
    >
      <div class="reply-thread-head">
        <span>${replyLabel}</span>
        <span>Anonymous means display name only; entries stay in this browser.</span>
      </div>
      <div class="reply-list">
        ${replies.map((reply, index) => `
          <article class="reply-item">
            <div class="reply-avatar">${escapeHtml(reply.initials)}</div>
            <div class="reply-content">
              <div class="reply-meta">
                <span>${escapeHtml(reply.author)}</span>
                <span>${escapeHtml(reply.time)}</span>
                <button class="reply-report-btn" type="button" data-action="report-reply" data-report-key="reply-${escapeHtml(post.id)}-${index}">Report (demo)</button>
              </div>
              <p>${escapeHtml(reply.text)}</p>
              ${getReportStatus(`reply-${post.id}-${index}`)}
            </div>
          </article>
        `).join("")}
      </div>
      <form class="reply-form" data-post-id="${escapeHtml(post.id)}">
        <label class="sr-only" for="replyInput-${escapeHtml(post.id)}">Reply with display name Anonymous Student</label>
        <textarea class="reply-input" id="replyInput-${escapeHtml(post.id)}" name="reply" rows="2" maxlength="220" placeholder="Reply as Anonymous Student..."></textarea>
        <button class="reply-submit" type="submit">Post</button>
        <p class="inline-error" data-reply-error hidden>Please enter a reply before posting.</p>
      </form>
    </section>
  `;
}

function renderPosts() {
  const allPosts = getAllPosts();
  const visiblePosts = allPosts.filter(matchesFilters);
  const selectedCategory = categories.find(category => category.key === filters.category)?.name || "All Posts";
  const selectedTag = filters.tag ? ` tagged ${filters.tag}` : "";
  const queryText = filters.query ? ` matching "${filters.query}"` : "";

  filterStatusEl.textContent = `${visiblePosts.length} demo post${visiblePosts.length === 1 ? "" : "s"} shown in ${selectedCategory}${selectedTag}${queryText}.`;

  if (visiblePosts.length === 0) {
    postsEl.innerHTML = '<div class="posts-empty">No demo posts match these filters. Clear a filter or try another search.</div>';
    return;
  }

  postsEl.innerHTML = visiblePosts.map(post => {
    const replies = getReplies(post);
    const isFocused = focusPostId === post.id;

    return `
      <article class="post ${post.image ? "post-with-media" : ""} ${isFocused ? "post-highlight" : ""}" id="post-${escapeHtml(post.id)}" data-post-id="${escapeHtml(post.id)}">
        <div class="avatar-circle">${escapeHtml(post.initials)}</div>
        <div class="post-body">
          <div class="post-meta">
            ${post.pinned ? '<i class="icon icon-pin pin"></i>' : ''}
            <span class="author">${escapeHtml(post.author)}</span><span>&bull;</span><span>${escapeHtml(post.time)}</span>
          </div>
          <h3>${escapeHtml(post.title)}</h3>
          <p class="post-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="post-tags">${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
          <div class="post-actions">
            <span><i class="icon icon-message-square"></i> ${getReplyLabel(replies.length)}</span>
            <span><i class="icon icon-heart"></i> ${post.likes} demo likes</span>
          </div>
          <div class="post-management">
            <button class="post-action-btn" type="button" data-action="report-post" data-report-key="post-${escapeHtml(post.id)}">Report post (demo)</button>
            ${isUserPost(post) ? `
              <button class="post-action-btn" type="button" data-action="edit-post" data-post-id="${escapeHtml(post.id)}">Edit local post</button>
              <button class="post-action-btn" type="button" data-action="delete-post" data-post-id="${escapeHtml(post.id)}">Delete local post</button>
            ` : ""}
          </div>
          ${getReportStatus(`post-${post.id}`)}
          ${renderEditForm(post)}
          ${renderReplyThread(post, replies)}
        </div>
        ${post.image ? `<figure class="post-media"><img src="${post.image.src}" alt="${escapeHtml(post.image.alt)}" loading="lazy"></figure>` : ""}
      </article>
    `;
  }).join("");
}

function renderCategories() {
  const allPosts = getAllPosts();
  categoriesEl.innerHTML = categories.map(category => {
    const count = allPosts.filter(post => matchesCategory(post, category.key)).length;
    return `
      <li><button class="cat-btn ${filters.category === category.key ? "active" : ""}" type="button" data-category="${category.key}" aria-pressed="${filters.category === category.key}">
        <span>${escapeHtml(category.name)}</span><span class="cat-count">${count}</span>
      </button></li>
    `;
  }).join("");
}

function renderTrending() {
  trendingEl.innerHTML = trending.map(tag => `
    <button class="tag tag-accent ${filters.tag === tag ? "active" : ""}" type="button" data-tag="${escapeHtml(tag)}" aria-pressed="${filters.tag === tag}">${escapeHtml(tag)}</button>
  `).join("");
}

searchEl.addEventListener("input", () => {
  filters.query = searchEl.value.trim();
  renderPosts();
});

categoriesEl.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  filters.category = button.dataset.category;
  renderCategories();
  renderPosts();
});

trendingEl.addEventListener("click", event => {
  const button = event.target.closest("[data-tag]");
  if (!button) return;
  filters.tag = filters.tag === button.dataset.tag ? "" : button.dataset.tag;
  renderTrending();
  renderPosts();
});

postsEl.addEventListener("click", event => {
  const button = event.target.closest("[data-action], .reply-toggle");
  if (!button) return;

  if (button.classList.contains("reply-toggle")) {
    const postId = button.dataset.postId;
    expandedPostIds.has(postId) ? expandedPostIds.delete(postId) : expandedPostIds.add(postId);
    renderPosts();
    return;
  }

  const action = button.dataset.action;
  const postId = button.dataset.postId;

  if (action === "report-post" || action === "report-reply") {
    demoReports.add(button.dataset.reportKey);
    renderPosts();
    return;
  }

  if (action === "edit-post") {
    editingPostId = postId;
    renderPosts();
    document.getElementById(`editTitle-${postId}`)?.focus();
    return;
  }

  if (action === "cancel-edit") {
    editingPostId = "";
    renderPosts();
    return;
  }

  if (action === "delete-post" && window.confirm("Delete this post from this browser? This cannot be undone.")) {
    deleteUserPost(postId);
    delete savedRepliesByPost[postId];
    saveReplies();
    expandedPostIds.delete(postId);
    editingPostId = "";
    renderCategories();
    renderPosts();
  }
});

postsEl.addEventListener("submit", event => {
  const replyForm = event.target.closest(".reply-form");
  const editForm = event.target.closest(".edit-post-form");
  if (!replyForm && !editForm) return;
  event.preventDefault();

  if (editForm) {
    const title = editForm.elements.title.value.trim();
    const content = editForm.elements.content.value.trim();
    const error = editForm.querySelector("[data-edit-error]");
    if (!title || !content) {
      error.textContent = "Title and content are required before saving.";
      error.hidden = false;
      (!title ? editForm.elements.title : editForm.elements.content).focus();
      return;
    }
    if (!updateUserPost(editForm.dataset.postId, { title, excerpt: content })) {
      error.textContent = "This local post could not be saved in this browser.";
      error.hidden = false;
      return;
    }
    editingPostId = "";
    renderPosts();
    return;
  }

  const postId = replyForm.dataset.postId;
  const input = replyForm.elements.reply;
  const error = replyForm.querySelector("[data-reply-error]");
  const text = input.value.trim();
  if (!text) {
    error.hidden = false;
    input.focus();
    return;
  }

  savedRepliesByPost = {
    ...savedRepliesByPost,
    [postId]: [...getSavedReplies(postId), { author: "Anonymous Student", initials: "AS", time: "Just now", text }]
  };
  saveReplies();
  expandedPostIds.add(postId);
  renderPosts();
});

renderCategories();
renderTrending();
renderPosts();

function focusPublishedPost() {
  if (!focusPostId) return;
  const targetId = focusPostId;
  focusPostId = null;
  const postElement = document.getElementById(`post-${targetId}`);
  if (!postElement) return;
  postElement.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => postElement.classList.remove("post-highlight"), 3200);
}

requestAnimationFrame(focusPublishedPost);
