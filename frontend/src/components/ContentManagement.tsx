import { useState, useEffect } from "react";
import { Edit2, Plus, Sparkles, BookOpen, HelpCircle, MessageSquare } from "lucide-react";
import { request } from "../api";

interface HoroscopeItem {
  sign: string;
  prediction: string;
  date?: string;
  time?: string;
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("horoscopes");
  const [horoscopes, setHoroscopes] = useState<HoroscopeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingHoroscope, setEditingHoroscope] = useState<HoroscopeItem | null>(null);
  const [editVal, setEditVal] = useState("");

  const fetchHoroscopes = async () => {
    setLoading(true);
    try {
      const data = await request("/api/content/horoscopes");
      setHoroscopes(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load horoscopes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "horoscopes") {
      fetchHoroscopes();
    }
  }, [activeTab]);

  const handleOpenEdit = (h: HoroscopeItem) => {
    setEditingHoroscope(h);
    setEditVal(h.prediction);
  };

  const handleSaveHoroscope = async () => {
    if (!editingHoroscope) return;
    try {
      const todayStr = editingHoroscope.date || new Date().toISOString().split("T")[0];
      const updated = await request(`/api/content/horoscopes/${editingHoroscope.sign}`, {
        method: "PATCH",
        body: JSON.stringify({
          prediction: editVal,
          date: todayStr
        })
      });
      setHoroscopes(horoscopes.map(h => h.sign === editingHoroscope.sign ? { ...h, prediction: updated.prediction } : h));
      setEditingHoroscope(null);
    } catch (err: any) {
      alert(err.message || "Failed to save horoscope changes");
    }
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="page-title">Content Management</h2>
          <p className="page-subtitle">Horoscopes, articles, help centre and FAQ</p>
        </div>
        <button
          className="btn btn-primary"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}
        >
          <Plus size={16} /> New Content
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "24px", gap: "24px" }}>
        <button
          onClick={() => setActiveTab("horoscopes")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "horoscopes" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "horoscopes" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={16} /> Horoscopes
          </span>
        </button>
        <button
          onClick={() => setActiveTab("articles")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "articles" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "articles" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={16} /> Articles
          </span>
        </button>
        <button
          onClick={() => setActiveTab("help")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "help" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "help" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HelpCircle size={16} /> Help Center
          </span>
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "faq" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "faq" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquare size={16} /> FAQ
          </span>
        </button>
      </div>

      {/* Horoscopes Grid */}
      {activeTab === "horoscopes" && (
        loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Generating/Fetching daily horoscopes...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--danger)" }}>
            {error}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {horoscopes.map((h) => (
              <div
                key={h.sign}
                className="stat-card animate-fade"
                style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "160px" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{h.sign}</span>
                    <button className="btn-icon" onClick={() => handleOpenEdit(h)}>
                      <Edit2 size={14} />
                    </button>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    {h.prediction}
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "12px" }}>
                  Updated {h.time || h.date || "today"}
                </span>
              </div>
            ))}
          </div>
        )
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "horoscopes" && (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", backgroundColor: "white", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
          <BookOpen size={40} style={{ marginBottom: "12px", color: "var(--text-light)" }} />
          <h4 style={{ textTransform: "capitalize" }}>{activeTab} Management</h4>
          <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Configure static text and resources for {activeTab}.</p>
        </div>
      )}

      {/* Edit Horoscope Modal */}
      {editingHoroscope && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit {editingHoroscope.sign} Horoscope</h3>
              <button className="btn-icon" onClick={() => setEditingHoroscope(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Daily Prediction Summary</label>
                <textarea
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  style={{ minHeight: "120px", resize: "vertical" }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditingHoroscope(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveHoroscope}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
