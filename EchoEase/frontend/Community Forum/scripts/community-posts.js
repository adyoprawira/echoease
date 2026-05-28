const COMMUNITY_POSTS_STORAGE_KEY = "communityForumUserPosts";
const LATEST_POST_SESSION_KEY = "communityForumLatestPostId";
const PROFILE_SETTINGS_STORAGE_KEY = "wellbeingProfileSettings";

function createPostId() {
  return `user-post-${Date.now()}`;
}

function topicToTag(topic) {
  const normalized = String(topic || "Other").replace(/\s+/g, "");
  return `#${normalized}`;
}

function loadProfilePreferences() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_SETTINGS_STORAGE_KEY) || "null");
    if (parsed && typeof parsed === "object") {
      return {
        displayName: typeof parsed.displayName === "string" && parsed.displayName.trim()
          ? parsed.displayName.trim().slice(0, 40)
          : "Darren Marcello",
        anonymousByDefault: parsed.anonymousByDefault !== false
      };
    }
  } catch {
    // Default preferences remain usable when browser storage is unavailable.
  }

  return { displayName: "Darren Marcello", anonymousByDefault: true };
}

function getInitials(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("") || "DM";
}

function getAuthorInfo(anonymous) {
  if (anonymous) {
    return { author: "Anonymous Student", initials: "AS" };
  }

  const preferences = loadProfilePreferences();
  return { author: preferences.displayName, initials: getInitials(preferences.displayName) };
}

function buildForumPost({ title, content, topic, anonymous, image }) {
  const { author, initials } = getAuthorInfo(anonymous);

  return {
    id: createPostId(),
    title,
    excerpt: content.length > 220 ? `${content.slice(0, 220)}…` : content,
    author,
    initials,
    time: "Just now",
    tags: [topicToTag(topic)],
    topic,
    likes: 0,
    replies: [],
    image: image || null,
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
    return true;
  } catch {
    return false;
  }
}

function getLatestPostId() {
  return (
    new URLSearchParams(window.location.search).get("post") ||
    sessionStorage.getItem(LATEST_POST_SESSION_KEY)
  );
}
