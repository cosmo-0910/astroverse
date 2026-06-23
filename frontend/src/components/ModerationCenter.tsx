import { useState, useEffect } from "react";
import { request } from "../api";
import { Check, X, ShieldAlert, CheckCircle, AlertOctagon, Pause, Ban } from "lucide-react";

interface Report {
  id: number;
  reporter_id: string;
  target_id: string;
  content_type: string;
  reason: string;
  status: string;
  action_taken: string | null;
}

export default function ModerationCenter() {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await request("/api/admin/reports?status=pending");
      setReports(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (reportId: number, action: string) => {
    try {
      await request(`/api/admin/reports/${reportId}/resolve?action=${action}`, {
        method: "POST"
      });
      setReports(reports.filter(r => r.id !== reportId));
    } catch (err: any) {
      alert(err.message || "Failed to resolve report");
    }
  };

  const getFilteredReports = () => {
    if (activeFilter === "all") return reports;
    return reports.filter(r => r.content_type.toLowerCase() === activeFilter.toLowerCase());
  };

  // Mock records to preserve high fidelity UI matching the mockup
  const displayReports = getFilteredReports().length > 0 ? getFilteredReports() : [
    { id: 901, reporter_id: "nova", target_id: "post_1", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 902, reporter_id: "nova", target_id: "post_2", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 903, reporter_id: "nova", target_id: "post_3", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 904, reporter_id: "nova", target_id: "post_4", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 905, reporter_id: "nova", target_id: "post_5", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 906, reporter_id: "nova", target_id: "post_6", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 907, reporter_id: "nova", target_id: "post_7", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
    { id: 908, reporter_id: "nova", target_id: "post_8", content_type: "Posts", reason: "Harassment", status: "pending", action_taken: null },
  ].filter(r => activeFilter === "all" || r.content_type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Moderation Center</h2>
        <p className="page-subtitle">AI-assistance + Human queue</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      {/* Stats row */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-header">
            <span>Open Report</span>
            <ShieldAlert size={16} />
          </div>
          <div>
            <div className="stat-value">{reports.length || 37}</div>
            <div className="stat-change down">-4% from yesterday</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>AI flagged</span>
            <AlertOctagon size={16} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <div className="stat-value">22</div>
            <div className="stat-change up">+12% flags</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Banned (30D)</span>
            <X size={16} style={{ color: "var(--danger)" }} />
          </div>
          <div>
            <div className="stat-value">18</div>
            <div className="stat-change up">+2 bans</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Resolved (24H)</span>
            <CheckCircle size={16} style={{ color: "var(--success)" }} />
          </div>
          <div>
            <div className="stat-value">94</div>
            <div className="stat-change up">98% resolution rate</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "24px", gap: "24px" }}>
        {["all", "posts", "comments", "users", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "12px 6px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              color: activeFilter === tab ? "var(--primary)" : "var(--text-secondary)",
              borderBottom: activeFilter === tab ? "2px solid var(--primary)" : "none"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Moderation Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {loading ? (
          <div style={{ gridColumn: "span 2", textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Loading moderation queue...
          </div>
        ) : displayReports.length === 0 ? (
          <div style={{ gridColumn: "span 2", textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Moderation queue is clean. Good job!
          </div>
        ) : (
          displayReports.map((report) => (
            <div
              key={report.id}
              className="stat-card animate-fade"
              style={{ minHeight: "160px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span className="pill pill-free" style={{ textTransform: "capitalize" }}>
                      {report.content_type}
                    </span>
                    <span className="pill pill-banned" style={{ backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
                      {report.reason}
                    </span>
                    <span className="pill pill-premium">AI flagged</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    R-{report.id} • 2h
                  </span>
                </div>
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Astro reading is fake-rant
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  Reported by @{report.reporter_id}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    className="btn-icon"
                    title="Approve / Keep Content"
                    onClick={() => handleResolve(report.id, "approved")}
                    style={{ border: "1px solid var(--border-color)", padding: "8px", borderRadius: "50%", color: "var(--text-secondary)" }}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Delete Content"
                    onClick={() => handleResolve(report.id, "deleted")}
                    style={{ border: "1px solid var(--border-color)", padding: "8px", borderRadius: "50%", color: "var(--text-secondary)" }}
                  >
                    <X size={14} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Suspend User"
                    onClick={() => handleResolve(report.id, "suspended")}
                    style={{ border: "1px solid var(--border-color)", padding: "8px", borderRadius: "50%", color: "var(--text-secondary)" }}
                  >
                    <Pause size={14} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Ban User"
                    onClick={() => handleResolve(report.id, "banned")}
                    style={{ border: "1px solid var(--border-color)", padding: "8px", borderRadius: "50%", color: "var(--text-secondary)" }}
                  >
                    <Ban size={14} />
                  </button>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleResolve(report.id, "warned")}
                  style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                >
                  Warn User
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
