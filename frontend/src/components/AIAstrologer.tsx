import { useState, useEffect } from "react";
import { request } from "../api";
import { Save, Sparkles, RefreshCw, Cpu, Sliders, MessageSquare } from "lucide-react";

export default function AIAstrologer() {
  const [, setSettings] = useState<Record<string, any>>({});
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gemini-1.5-flash");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await request("/api/admin/settings");
      setSettings(data);
      if (data.ai_astrologer_prompt) {
        setPrompt(data.ai_astrologer_prompt.prompt || "");
        setModel(data.ai_astrologer_prompt.model || "gemini-1.5-flash");
        setTemperature(data.ai_astrologer_prompt.temperature ?? 0.7);
        setMaxTokens(data.ai_astrologer_prompt.max_tokens ?? 1024);
      }
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load AI settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      const payload = {
        key: "ai_astrologer_prompt",
        value: {
          prompt,
          model,
          temperature,
          max_tokens: maxTokens,
        },
      };
      await request("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setSuccess("AI Astrologer configuration saved successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save AI settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">AI Astrologer Settings</h2>
        <p className="page-subtitle">Configure artificial intelligence behavior, prompts and parameters</p>
      </div>

      {error && <div className="auth-error">{error}</div>}
      {success && (
        <div className="pill pill-active" style={{ width: "100%", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>
          {success}
        </div>
      )}

      <div className="charts-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
        {/* Prompt configuration */}
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} style={{ color: "var(--primary)" }} /> System Prompt Instructions
            </span>
            <button className="btn btn-secondary" onClick={fetchSettings} disabled={loading}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Reload
            </button>
          </div>

          <div className="form-group" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label>System Persona & Context Instructions</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. You are a professional Vedic and Western Astrologer. Explain Synastry compatibility insights to users in a cosmic, helpful tone."
              style={{ flex: 1, minHeight: "340px", resize: "vertical", fontFamily: "var(--font-primary)", lineHeight: "1.6" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              <Save size={16} /> {saving ? "Saving settings..." : "Save AI Profile"}
            </button>
          </div>
        </div>

        {/* Model parameters */}
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sliders size={18} style={{ color: "var(--accent)" }} /> Hyperparameters
            </span>
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Cpu size={14} /> Model Type
            </label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Recommended)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Experimental</option>
            </select>
          </div>

          <div className="form-group">
            <label>Temperature ({temperature})</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              <span>Deterministic</span>
              <span>Creative</span>
            </div>
          </div>

          <div className="form-group">
            <label>Max Output Tokens</label>
            <select value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))}>
              <option value="512">512 tokens</option>
              <option value="1024">1024 tokens</option>
              <option value="2048">2048 tokens</option>
              <option value="4096">4096 tokens</option>
            </select>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px", marginTop: "16px" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <MessageSquare size={16} style={{ marginTop: "3px", flexShrink: 0 }} />
              <div>
                <strong>Active Integration:</strong> These prompts dynamically override the system instructions on the backend AI chat endpoint (`/api/chat/astrologer`).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
