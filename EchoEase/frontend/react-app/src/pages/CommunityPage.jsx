import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const DEMO_POSTS = [
  {
    id: "study",
    title: "Small study reset ideas",
    author: "Anonymous Student",
    category: "Study",
    tags: ["Exams", "SelfCare"],
    text: "Example post: breaking one assignment into short blocks helped make the first step manageable."
  },
  {
    id: "mindfulness",
    title: "A short breathing pause",
    author: "Anonymous Student",
    category: "Wellbeing",
    tags: ["Mindfulness"],
    text: "Example post: a timed breathing pause can be one option before a presentation."
  }
];

function CommunityPage() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const searchValue = `${post.title} ${post.text} ${post.tags.join(" ")}`.toLowerCase();
    return (category === "All" || post.category === category) &&
      (!query || searchValue.includes(query.toLowerCase()));
  }), [posts, query, category]);

  function publishPost(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Add both a title and post text before saving.");
      return;
    }
    if (/\b[^@\s]+@[^@\s]+\.[^@\s]+\b/.test(content) || /(?:\+?\d[\d\s().-]{7,}\d)/.test(content)) {
      setError("Remove email addresses and phone numbers before saving a public demo post.");
      return;
    }
    setPosts((current) => [{
      id: `local-${Date.now()}`,
      title: title.trim(),
      author: "Anonymous Student",
      category: "Wellbeing",
      tags: ["LocalDemo"],
      text: content.trim(),
      local: true
    }, ...current]);
    setTitle("");
    setContent("");
    setError("");
    setStatus("Post saved in this page session only. It was not sent to a backend or moderation team.");
  }

  function removeLocalPost(postId) {
    setPosts((current) => current.filter((post) => post.id !== postId));
    setStatus("Local demo post deleted from this page session.");
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 pb-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Community prototype</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">Community Stories</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Posts shown here are demo content. New posts stay in memory only until this page is refreshed;
          anonymous means the display name shown here, not guaranteed anonymity.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-line sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-lg border border-line px-3">
              <Search size={16} className="text-slate-500" />
              <span className="sr-only">Search demo community posts</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full py-2 outline-none"
                placeholder="Search demo posts"
              />
            </label>
            <label className="sr-only" htmlFor="community-category">Filter by category</label>
            <select
              id="community-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-line bg-white px-3 py-2"
            >
              <option>All</option>
              <option>Study</option>
              <option>Wellbeing</option>
            </select>
          </div>
          <p aria-live="polite" className="text-sm font-semibold text-slate-600">
            Showing {filteredPosts.length} demo post{filteredPosts.length === 1 ? "" : "s"}.
          </p>
          {filteredPosts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-slate-600">
              No demo posts match your filters.
            </div>
          )}
          {filteredPosts.map((post) => (
            <article key={post.id} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-brand">{post.author}</p>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                  {post.local ? "Saved in this page session" : "Demo content"}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-ink">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{post.text}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => <span key={tag} className="text-xs font-semibold text-slate-500">#{tag}</span>)}
                {post.local && (
                  <button
                    type="button"
                    onClick={() => removeLocalPost(post.id)}
                    className="ml-auto text-sm font-bold text-red-700 underline"
                  >
                    Delete local post
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <form onSubmit={publishPost} className="h-fit rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
          <h2 className="text-xl font-bold text-ink">Add a demo post</h2>
          <p className="mt-2 text-sm text-slate-600">
            This form uses the display name Anonymous Student and does not submit to the backend.
            Do not include names or contact details.
          </p>
          <label className="mt-4 block text-sm font-bold text-ink" htmlFor="community-title">Title</label>
          <input
            id="community-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
          />
          <label className="mt-3 block text-sm font-bold text-ink" htmlFor="community-content">Post text</label>
          <textarea
            id="community-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={500}
            rows={4}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
          />
          {error && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{error}</p>}
          <button type="submit" className="mt-4 w-full rounded-full bg-brand px-4 py-2 font-bold text-white">
            Save demo post
          </button>
        </form>
      </div>
      {status && <p role="status" className="rounded-lg bg-brand-soft p-3 text-sm font-semibold text-brand">{status}</p>}
      <p className="text-sm text-slate-600">
        Need direct support instead? <Link to="/resources#emergency" className="font-bold text-brand underline">View urgent help options</Link>.
      </p>
    </section>
  );
}

export default CommunityPage;
