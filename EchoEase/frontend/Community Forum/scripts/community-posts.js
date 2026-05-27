const COMMUNITY_POSTS_STORAGE_KEY = "communityForumUserPosts";
const LATEST_POST_SESSION_KEY = "communityForumLatestPostId";

function createPostId() {
  return `user-post-${Date.now()}`;
}

function topicToTag(topic) {
  const normalized = String(topic || "Other").replace(/\s+/g, "");
  return `#${normalized}`;
}

function getAuthorInfo(anonymous) {
  if (anonymous) {
    return { author: "Anonymous Student", initials: "AS" };
  }

  return { author: "Darren Marcello", initials: "DM" };
}

function buildForumPost({ title, content, topic, anonymous }) {
  const { author, initials } = getAuthorInfo(anonymous);

  return {
    id: createPostId(),
    title,
    excerpt: content.length > 220 ? `${content.slice(0, 220)}…` : content,
    author,
    initials,
    time: "Just now",
    tags: [topicToTag(topic)],
    likes: 0,
    replies: [],
    userPublished: true,
  };
}

function loadUserPosts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMUNITY_POSTS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserPost(post) {
  const posts = loadUserPosts();
  posts.unshift(post);

  try {
    localStorage.setItem(COMMUNITY_POSTS_STORAGE_KEY, JSON.stringify(posts));
    sessionStorage.setItem(LATEST_POST_SESSION_KEY, post.id);
  } catch {
    sessionStorage.setItem(LATEST_POST_SESSION_KEY, post.id);
  }

  return post.id;
}

function getLatestPostId() {
  return (
    new URLSearchParams(window.location.search).get("post") ||
    sessionStorage.getItem(LATEST_POST_SESSION_KEY)
  );
}