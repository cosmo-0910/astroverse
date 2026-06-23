import { useState } from "react";
import { Send, Bell, User, Layers, CheckCircle2 } from "lucide-react";

interface NotificationHistory {
  id: number;
  title: string;
  audience: string;
  time: string;
  status: string;
}

export default function NotificationsComposer() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Users");
  const [channel, setChannel] = useState("Push Notification");
  const [history, setHistory] = useState<NotificationHistory[]>([
    { id: 1, title: "New feature: Vedic compatibility", audience: "All users", time: "2h ago", status: "Sent" },
    { id: 2, title: "Premium 50% off this weekend", audience: "All users", time: "5h ago", status: "Sent" },
    { id: 3, title: "Full moon ritual livestream", audience: "All users", time: "1d ago", status: "Sent" },
    { id: 4, title: "Welcome to Astroverse!", audience: "All users", time: "4d ago", status: "Sent" },
  ]);
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    setSending(true);

    setTimeout(() => {
      const newNotification: NotificationHistory = {
        id: Date.now(),
        title,
        audience,
        time: "Just now",
        status: "Sent"
      };
      setHistory([newNotification, ...history]);
      setTitle("");
      setMessage("");
      setSending(false);
      alert("Notification sent successfully!");
    }, 800);
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Notifications</h2>
        <p className="page-subtitle">Push, In-app and promotional messages</p>
      </div>

      <div className="charts-grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Compose Form */}
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bell size={18} style={{ color: "var(--primary)" }} /> Compose Notification
            </span>
          </div>

          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mercury is out of retrograde!"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose your notification body here..."
                style={{ minHeight: "120px", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <User size={14} /> Audience Target
                </label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                  <option value="All Users">All Users</option>
                  <option value="Premium Only">Premium Only</option>
                  <option value="Free Tier Only">Free Tier Only</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Layers size={14} /> Delivery Channel
                </label>
                <select value={channel} onChange={(e) => setChannel(e.target.value)}>
                  <option value="Push Notification">Push Notification</option>
                  <option value="In-App Announcement">In-App Announcement</option>
                  <option value="Email Broadcast">Email Broadcast</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "12px",
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                border: "none",
                fontWeight: 700,
                color: "white"
              }}
              disabled={sending}
            >
              <Send size={16} /> {sending ? "Distributing message..." : "Send Notification"}
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Recent Notifications</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: "400px" }}>
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <h5 style={{ fontSize: "0.925rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {item.title}
                  </h5>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {item.audience} • {item.time}
                  </span>
                </div>
                <span
                  className="pill"
                  style={{
                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <CheckCircle2 size={12} /> {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
