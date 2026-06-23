import { Line } from "react-chartjs-2";
import { Check, Edit, CreditCard, ArrowUpRight, TrendingUp, DollarSign, RefreshCw } from "lucide-react";

interface Stats {
  total_users: number;
  premium_subscribers: number;
  daily_revenue: number;
  trends: {
    revenue: number[];
  };
}

export default function Subscriptions({ stats }: { stats: Stats }) {
  const revenueTrendData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Revenue Trend",
        data: stats.trends.revenue,
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E2E2F0" } },
    },
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Subscriptions & Monetisation</h2>
        <p className="page-subtitle">Plans, revenue, payments and promotion</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-header">
            <span>Daily Revenue</span>
            <DollarSign size={16} />
          </div>
          <div>
            <div className="stat-value">${stats.daily_revenue.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> +4.2%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Monthly Revenue</span>
            <TrendingUp size={16} />
          </div>
          <div>
            <div className="stat-value">${(stats.daily_revenue * 30).toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> +12.5%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Active Subscribers</span>
            <CreditCard size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.premium_subscribers.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> +8.1%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Failed Payments</span>
            <RefreshCw size={16} style={{ color: "var(--danger)" }} />
          </div>
          <div>
            <div className="stat-value">12</div>
            <div className="stat-change down" style={{ color: "var(--success)" }}>
              -25% improvement
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Revenue Trend</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={revenueTrendData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Plans</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Configured Tiers</span>
          </div>

          <div className="plans-grid">
            {/* Free tier */}
            <div className="plan-card">
              <div className="plan-card-header">
                <div>
                  <h4 className="plan-title">FREE</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary)" }}>Cosmic Voyager</span>
                </div>
                <span className="plan-badge">Free</span>
              </div>
              <div className="plan-price">
                $0<span>/mo</span>
              </div>
              <ul className="plan-features">
                <li className="plan-feature-item">
                  <Check size={14} /> Basic Horoscope
                </li>
                <li className="plan-feature-item">
                  <Check size={14} /> Limited AI Chats (3/day)
                </li>
                <li className="plan-feature-item">
                  <Check size={14} /> Forum Access
                </li>
              </ul>
              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                <Edit size={14} /> Edit Features
              </button>
            </div>

            {/* Premium tier */}
            <div className="plan-card" style={{ marginTop: "16px" }}>
              <div className="plan-card-header">
                <div>
                  <h4 className="plan-title">PREMIUM</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)" }}>Celestial Master</span>
                </div>
                <span className="plan-badge" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
                  Popular
                </span>
              </div>
              <div className="plan-price">
                $9<span>/mo</span>
              </div>
              <ul className="plan-features">
                <li className="plan-feature-item">
                  <Check size={14} /> Unlimited AI Chat
                </li>
                <li className="plan-feature-item">
                  <Check size={14} /> Deep Synastry Reports
                </li>
                <li className="plan-feature-item">
                  <Check size={14} /> Advanced Compatibility Filters
                </li>
                <li className="plan-feature-item">
                  <Check size={14} /> Audio & Video AI Astrologer Session
                </li>
              </ul>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <Edit size={14} /> Edit Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
