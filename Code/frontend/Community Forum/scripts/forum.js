const COMMUNITY_REPLIES_STORAGE_KEY = "communityForumReplies";

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
    id: "welcome-guidelines",
    pinned: true,
    title: "Welcome to the Well-being Community",
    author: "Moderator", initials: "MO", time: "Pinned",
    excerpt: "A safe, anonymous space to share, support, and grow. Please read our community guidelines before posting.",
    tags: ["#Announcement", "#Guidelines"], likes: 132,
    replies: [
      {
        author: "Peer Support Team",
        initials: "PS",
        time: "Pinned",
        text: "Thanks for helping keep this space supportive. Reports and urgent safety concerns are reviewed by the team."
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

const postsEl = document.getElementById("posts");
const expandedPostIds = new Set();
let savedRepliesByPost = loadSavedReplies();

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
    // The reply still appears for the current render even if storage is unavailable.
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
        <span>Replying as Anonymous Student</span>
      </div>
      <div class="reply-list">
        ${replies.map(reply => `
          <article class="reply-item">
            <div class="reply-avatar">${escapeHtml(reply.initials)}</div>
            <div class="reply-content">
              <div class="reply-meta">
                <span>${escapeHtml(reply.author)}</span>
                <span>${escapeHtml(reply.time)}</span>
              </div>
              <p>${escapeHtml(reply.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
      <form class="reply-form" data-post-id="${escapeHtml(post.id)}">
        <label class="sr-only" for="replyInput-${escapeHtml(post.id)}">Reply anonymously</label>
        <textarea
          class="reply-input"
          id="replyInput-${escapeHtml(post.id)}"
          name="reply"
          rows="2"
          maxlength="220"
          placeholder="Reply anonymously..."
        ></textarea>
        <button class="reply-submit" type="submit">Post</button>
      </form>
    </section>
  `;
}

function renderPosts() {
  postsEl.innerHTML = posts.map(post => {
    const replies = getReplies(post);

    return `
      <article class="post ${post.image ? "post-with-media" : ""}">
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
            <span><i class="icon icon-heart"></i> ${post.likes} likes</span>
          </div>
          ${renderReplyThread(post, replies)}
        </div>
        ${post.image ? `
          <figure class="post-media">
            <img src="${post.image.src}" alt="${escapeHtml(post.image.alt)}" loading="lazy">
          </figure>
        ` : ""}
      </article>
    `;
  }).join("");
}

function renderCategories() {
  document.getElementById("categories").innerHTML = categories.map(category => `
    <li><button class="cat-btn ${category.active ? "active" : ""}">
      <span>${escapeHtml(category.name)}</span><span class="cat-count">${category.count}</span>
    </button></li>
  `).join("");
}

function renderTrending() {
  document.getElementById("trending").innerHTML =
    trending.map(tag => `<span class="tag tag-accent">${escapeHtml(tag)}</span>`).join("");
}

postsEl.addEventListener("click", event => {
  const toggleButton = event.target instanceof Element ? event.target.closest(".reply-toggle") : null;
  if (!toggleButton) {
    return;
  }

  const postId = toggleButton.dataset.postId;
  if (expandedPostIds.has(postId)) {
    expandedPostIds.delete(postId);
  } else {
    expandedPostIds.add(postId);
  }

  renderPosts();
});

postsEl.addEventListener("submit", event => {
  const form = event.target.closest(".reply-form");
  if (!form) {
    return;
  }

  event.preventDefault();

  const postId = form.dataset.postId;
  const input = form.elements.reply;
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  savedRepliesByPost = {
    ...savedRepliesByPost,
    [postId]: [
      ...getSavedReplies(postId),
      {
        author: "Anonymous Student",
        initials: "AS",
        time: "Just now",
        text
      }
    ]
  };

  saveReplies();
  expandedPostIds.add(postId);
  renderPosts();
  document.getElementById(`replyInput-${postId}`)?.focus();
});

renderPosts();
renderCategories();
renderTrending();
