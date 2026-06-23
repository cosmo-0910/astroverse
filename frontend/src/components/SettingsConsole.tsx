import { useState } from "react";
import { Key, CreditCard, Shield, FileText } from "lucide-react";

export default function SettingsConsole() {
  const [activeTab, setActiveTab] = useState("keys");
  const [keys] = useState({
    openai_1: "SJHJHD987..............JKH889",
    gemini_1: "SJHJHD987..............JKH889",
    fcm_1: "SJHJHD987..............JKH889",
    openai_2: "SJHJHD987..............JKH889",
    gemini_2: "SJHJHD987..............JKH889",
    fcm_2: "SJHJHD987..............JKH889",
  });

  const handleSave = (service: string) => {
    alert(`${service} key saved successfully!`);
  };

  const handleRotate = (service: string) => {
    alert(`Rotated key for ${service}. Remember to update your environments.`);
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Settings & Configurations</h2>
        <p className="page-subtitle">Integrations, security and platform configurations</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "24px", gap: "24px" }}>
        <button
          onClick={() => setActiveTab("keys")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "keys" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "keys" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Key size={16} /> API Keys
          </span>
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "payments" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "payments" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CreditCard size={16} /> Payments
          </span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "security" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "security" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Shield size={16} /> Security
          </span>
        </button>
        <button
          onClick={() => setActiveTab("legal")}
          style={{
            background: "none",
            border: "none",
            padding: "12px 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            color: activeTab === "legal" ? "var(--primary)" : "var(--text-secondary)",
            borderBottom: activeTab === "legal" ? "2px solid var(--primary)" : "none"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={16} /> Legal
          </span>
        </button>
      </div>

      {activeTab === "keys" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {/* Row 1 */}
          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>OpenAI</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.openai_1} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("OpenAI-1")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("OpenAI-1")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>

          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Gemini</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.gemini_1} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("Gemini-1")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("Gemini-1")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>

          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Push (FCM)</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.fcm_1} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("FCM-1")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("FCM-1")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>OpenAI</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.openai_2} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("OpenAI-2")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("OpenAI-2")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>

          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Gemini</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.gemini_2} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("Gemini-2")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("Gemini-2")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>

          <div className="stat-card" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Push (FCM)</h4>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>API Keys</label>
              <input type="text" value={keys.fcm_2} readOnly style={{ backgroundColor: "#F8F8FD" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => handleRotate("FCM-2")} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>Rotate</button>
              <button className="btn btn-primary" onClick={() => handleSave("FCM-2")} style={{ fontSize: "0.8rem", padding: "6px 12px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "none" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "keys" && (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", backgroundColor: "white", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
          <FileText size={40} style={{ marginBottom: "12px", color: "var(--text-light)" }} />
          <h4 style={{ textTransform: "capitalize" }}>{activeTab} Settings</h4>
          <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Configure server environments and properties for {activeTab}.</p>
        </div>
      )}
    </div>
  );
}
