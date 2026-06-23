import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  UserCheck,
  TrendingUp,
  DollarSign,
  MessageSquare,
  FileText,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Stats {
  total_users: number;
  active_users_24h: number;
  premium_subscribers: number;
  new_registrations_24h: number;
  ai_conversations_today: number;
  daily_revenue: number;
  compatibility_reports_purchased: number;
  forum_activity: number;
  reported_content_count: number;
  pending_reviews_count: number;
  total_matches: number;
  system_health: string;
  trends: {
    user_growth: number[];
    revenue: number[];
    engagement: {
      days: string[];
      active_users: number[];
      chats: number[];
    };
  };
}

export default function HomeOverview({ stats, setActiveTab }: { stats: Stats, setActiveTab?: (tab: string) => void }) {
  const userGrowthData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "User Growth",
        data: stats.trends.user_growth.slice(0, 7),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const subscriptionData = {
    labels: ["Free", "Premium"],
    datasets: [
      {
        data: [
          stats.total_users - stats.premium_subscribers,
          stats.premium_subscribers,
        ],
        backgroundColor: ["#6366F1", "#EC4899"],
        borderWidth: 0,
      },
    ],
  };

  const revenueData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Revenue",
        data: stats.trends.revenue,
        backgroundColor: "#EC4899",
        borderRadius: 6,
      },
    ],
  };

  const engagementData = {
    labels: stats.trends.engagement.days,
    datasets: [
      {
        label: "Active Users",
        data: stats.trends.engagement.active_users,
        borderColor: "#6366F1",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "Chats Started",
        data: stats.trends.engagement.chats,
        borderColor: "#EC4899",
        backgroundColor: "transparent",
        tension: 0.4,
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
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">Operational overview of Astroverse</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab?.("users")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Total Users</span>
            <Users size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.total_users.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 12%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("users")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Active Users (24h)</span>
            <UserCheck size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.active_users_24h.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 5%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("subscriptions")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Premium Subscribers</span>
            <TrendingUp size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.premium_subscribers.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 8%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("users")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>New Registrations</span>
            <Users size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.new_registrations_24h.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 15%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("ai")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>AI Conversations Today</span>
            <MessageSquare size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.ai_conversations_today.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 22%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("subscriptions")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Daily Revenue</span>
            <DollarSign size={16} />
          </div>
          <div>
            <div className="stat-value">${stats.daily_revenue.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 4.2%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("matchmaking")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Compatibility Reports</span>
            <FileText size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.compatibility_reports_purchased.toLocaleString()}</div>
            <div className="stat-change up">
              <ArrowUpRight size={14} /> 9.1%
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab?.("forum")} style={{ cursor: "pointer" }}>
          <div className="stat-header">
            <span>Forum Activity</span>
            <MessageSquare size={16} />
          </div>
          <div>
            <div className="stat-value">{stats.forum_activity.toLocaleString()}</div>
            <div className="stat-change down">
              <ArrowDownRight size={14} /> 2.1%
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">User Growth</span>
            <select className="chart-select">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={userGrowthData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Subscriptions</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "180px", width: "180px" }}>
              <Doughnut data={subscriptionData} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
            </div>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Total User</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
                {stats.total_users}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "0.8rem", marginTop: "16px" }}>
            <span>● Free {(((stats.total_users - stats.premium_subscribers) / stats.total_users) * 100 || 0).toFixed(0)}%</span>
            <span>● Pro {((stats.premium_subscribers / stats.total_users) * 100 || 0).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Revenue</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Engagement</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={engagementData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
