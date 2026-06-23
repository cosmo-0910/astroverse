import React, { useState, useEffect } from "react";
import { getAuthToken, setAuthToken, request } from "./api";
import HomeOverview from "./components/HomeOverview";
import UserManagement from "./components/UserManagement";
import Subscriptions from "./components/Subscriptions";
import AIAstrologer from "./components/AIAstrologer";
import ForumManagement from "./components/ForumManagement";
import ModerationCenter from "./components/ModerationCenter";
import MatchmakingCenter from "./components/MatchmakingCenter";
import NotificationsComposer from "./components/NotificationsComposer";
import ContentManagement from "./components/ContentManagement";
import AnalyticsReporting from "./components/AnalyticsReporting";
import SettingsConsole from "./components/SettingsConsole";
import "./dashboard.css";
import {
  Home,
  Users,
  CreditCard,
  Sparkles,
  MessageSquare,
  ShieldAlert,
  Heart,
  Bell,
  FileText,
  BarChart,
  Settings,
  Search,
  LogOut,
  Compass,
} from "lucide-react";

export default function App() {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const data = await request("/api/admin/dashboard/stats");
      setStats(data);
    } catch (err: any) {
      if (err.message.includes("401") || err.message.includes("403")) {
        handleLogout();
      }
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoadingLogin(true);

    try {
      // Fastapi expects urlencoded form data for OAuth2
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Authentication failed");
      }

      const data = await response.json();
      setAuthToken(data.access_token);
      setToken(data.access_token);
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setStats(null);
  };

  if (!token) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card animate-scale">
          <div className="auth-header">
            <div className="auth-logo">
              <Compass size={24} />
            </div>
            <h2 className="auth-title">Astroverse Admin</h2>
            <p className="auth-subtitle">Platform Control Center</p>
          </div>

          {loginError && <div className="auth-error">{loginError}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@astroverse.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "10px", padding: "12px" }}
              disabled={loadingLogin}
            >
              {loadingLogin ? "Signing in..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderActiveView = () => {
    if (statsLoading && !stats) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", color: "var(--text-secondary)" }}>
          Loading dashboard metrics...
        </div>
      );
    }

    const currentStats = stats || {
      total_users: 42318,
      active_users_24h: 9041,
      premium_subscribers: 2740,
      new_registrations_24h: 318,
      ai_conversations_today: 12402,
      daily_revenue: 8214.0,
      compatibility_reports_purchased: 486,
      forum_activity: 1902,
      reported_content_count: 37,
      pending_reviews_count: 14,
      total_matches: 486,
      trends: {
        user_growth: [1100, 900, 1500, 1100, 1400, 1000, 1100],
        revenue: [600, 400, 1500, 1200, 300, 1400, 1100],
        engagement: {
          days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          active_users: [1100, 600, 1200, 900, 1100, 900, 1600],
          chats: [500, 700, 550, 600, 500, 450, 400],
        },
      },
    };

    switch (activeTab) {
      case "home":
        return <HomeOverview stats={currentStats} setActiveTab={setActiveTab} />;
      case "users":
        return <UserManagement />;
      case "subscriptions":
        return <Subscriptions stats={currentStats} />;
      case "ai":
        return <AIAstrologer />;
      case "forum":
        return <ForumManagement />;
      case "moderation":
        return <ModerationCenter />;
      case "matchmaking":
        return <MatchmakingCenter />;
      case "notifications":
        return <NotificationsComposer />;
      case "content":
        return <ContentManagement />;
      case "analytics":
        return <AnalyticsReporting />;
      case "settings":
        return <SettingsConsole />;
      default:
        return (
          <div className="animate-fade" style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", backgroundColor: "white", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
            <Settings size={40} style={{ marginBottom: "12px", color: "var(--text-light)" }} />
            <h4>Console Under Construction</h4>
            <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>The Admin system dashboard operations for tab "{activeTab.toUpperCase()}" are currently mocked.</p>
          </div>
        );
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "subscriptions", label: "Subscriptions", icon: <CreditCard size={18} /> },
    { id: "ai", label: "AI Astrologer", icon: <Sparkles size={18} /> },
    { id: "forum", label: "Forum", icon: <MessageSquare size={18} /> },
    { id: "moderation", label: "Moderation", icon: <ShieldAlert size={18} /> },
    { id: "matchmaking", label: "Matchmaking", icon: <Heart size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "content", label: "Content", icon: <FileText size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">⭐</div>
          <div className="logo-text">
            <h1>ASTROVERSE</h1>
            <span>Admin Panel</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
          <button
            onClick={handleLogout}
            className="menu-item"
            style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
          >
            <LogOut size={18} style={{ color: "var(--danger)" }} />
            <span style={{ color: "var(--danger)" }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="main-wrapper">
        <header className="main-header">
          <div className="search-bar">
            <Search size={18} className="text-secondary" style={{ color: "var(--text-light)" }} />
            <input type="text" placeholder="Search operations..." />
          </div>

          <div className="header-actions">
            <div className="notification-bell">
              <Bell size={18} />
              <div className="notification-badge" />
            </div>

            <div className="profile-dropdown">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                WP
              </div>
              <div className="profile-info">
                <span className="profile-name">Wolf Pixel</span>
                <span className="profile-email">admin@astroverse.com</span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-container">{renderActiveView()}</main>
      </div>
    </div>
  );
}
