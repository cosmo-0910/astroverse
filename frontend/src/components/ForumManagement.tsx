import { useState, useEffect } from "react";
import { request } from "../api";
import { Search, Pin, Lock, Unlock, Plus, MessageSquare, Tag, BarChart, Edit, Trash } from "lucide-react";

interface Post {
  id: number;
  title: string;
  author_name: string;
  category: string;
  is_pinned: boolean;
  is_locked: boolean;
}

export default function ForumManagement() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Fetch posts from backend forums endpoint
      const data = await request("/api/forums/posts?limit=50");
      setPosts(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts();
    }
  }, [activeTab]);

  const togglePin = async (post: Post) => {
    try {
      const updated = await request(`/api/admin/forums/posts/${post.id}?is_pinned=${!post.is_pinned}`, {
        method: "PATCH"
      });
      setPosts(posts.map(p => p.id === post.id ? { ...p, is_pinned: updated.is_pinned } : p));
    } catch (err: any) {
      alert(err.message || "Failed to toggle pin state");
    }
  };

  const toggleLock = async (post: Post) => {
    try {
      const updated = await request(`/api/admin/forums/posts/${post.id}?is_locked=${!post.is_locked}`, {
        method: "PATCH"
      });
      setPosts(posts.map(p => p.id === post.id ? { ...p, is_locked: updated.is_locked } : p));
    } catch (err: any) {
      alert(err.message || "Failed to toggle lock state");
    }
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.author_name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade">
      <div className="page-title-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="page-title">User Management</h2>
          <p className="page-subtitle">Search, Filter and manage all platform user</p>
        </div>
        {(activeTab === "categories" || activeTab === "polls") && (
          <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>
            <Plus size={16} /> New Category
          </button>
        )}
      </div>

      {error && <div className="auth-error">{error}</div>}

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "24px", gap: "24px" }}>
        <button
          onClick={() => setActiveTab("posts")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "posts" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "posts" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquare size={16} /> Posts
          </span>
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "categories" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "categories" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Tag size={16} /> Categories
          </span>
        </button>
        <button
          onClick={() => setActiveTab("polls")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "polls" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "polls" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart size={16} /> Polls
          </span>
        </button>
      </div>

      {activeTab === "posts" && (
        <div className="table-card">
          <div className="table-toolbar">
            <div className="toolbar-search">
              <Search size={16} className="text-secondary" />
              <input
                type="text"
                placeholder="Search threads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary" onClick={fetchPosts}>
              Refresh
            </button>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                      Loading forum threads...
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                      No threads found.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="user-name-cell">
                        {post.is_pinned && <span style={{ marginRight: "6px", color: "var(--primary)" }}>[Pinned]</span>}
                        {post.title}
                      </td>
                      <td>@{post.author_name}</td>
                      <td>{post.category}</td>
                      <td>
                        <span className={`pill ${post.is_locked ? "pill-banned" : "pill-active"}`}>
                          {post.is_locked ? "Locked" : "Open"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="btn-icon"
                          onClick={() => togglePin(post)}
                          title={post.is_pinned ? "Unpin Post" : "Pin Post"}
                          style={{ color: post.is_pinned ? "var(--primary)" : "inherit" }}
                        >
                          <Pin size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => toggleLock(post)}
                          title={post.is_locked ? "Unlock Thread" : "Lock Thread"}
                          style={{ color: post.is_locked ? "var(--warning)" : "inherit" }}
                        >
                          {post.is_locked ? <Unlock size={16} /> : <Lock size={16} />}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {Array(6).fill("Birth Charts").map((cat, idx) => (
            <div
              key={idx}
              className="stat-card animate-fade"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{cat}</span>
              <div style={{ display: "flex", gap: "12px", color: "var(--text-light)" }}>
                <Edit size={16} style={{ cursor: "pointer" }} onClick={() => alert("Edit category coming soon")} />
                <Trash size={16} style={{ cursor: "pointer" }} onClick={() => alert("Delete category coming soon")} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "polls" && (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-primary)", backgroundColor: "white", borderRadius: "14px", border: "1px solid var(--border-color)", fontWeight: 700, fontSize: "0.9rem" }}>
          3 active polls • 12 closed polls. Detailed poll management coming soon.
        </div>
      )}
    </div>
  );
}
