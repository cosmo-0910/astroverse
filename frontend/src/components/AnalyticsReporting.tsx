import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { RefreshCw, Users, ShieldAlert, TrendingUp, Cpu } from "lucide-react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function AnalyticsReporting() {
  const retentionData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Tus", "Fri", "Sat"],
    datasets: [
      {
        label: "User Retention",
        data: [1100, 600, 1200, 900, 1100, 900, 1600],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const acquisitionData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Tus", "Fri", "Sat"],
    datasets: [
      {
        label: "Acquisition",
        data: [800, 500, 1500, 1250, 400, 1400, 1100],
        backgroundColor: "#EC4899",
        borderRadius: 4,
      },
    ],
  };

  const communityData = {
    labels: ["Birth Chart", "Relationship", "Daily", "Career", "Spiritual"],
    datasets: [
      {
        label: "Engagement Intensity",
        data: [85, 72, 90, 60, 78],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366F1",
        borderWidth: 2,
        pointBackgroundColor: "#6366F1",
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

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Analytics & Reporting</h2>
        <p className="page-subtitle">Platform, AI and community performance</p>
      </div>

      {/* Stats row */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-header">
            <span>User Retention (30D)</span>
            <Users size={16} />
          </div>
          <div>
            <div className="stat-value">62%</div>
            <div className="stat-change up">+1.2% this month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Churn Rate</span>
            <ShieldAlert size={16} style={{ color: "var(--danger)" }} />
          </div>
          <div>
            <div className="stat-value">4.8%</div>
            <div className="stat-change down">-0.5% decrease</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Premium Conversion</span>
            <TrendingUp size={16} style={{ color: "var(--success)" }} />
          </div>
          <div>
            <div className="stat-value">8.2%</div>
            <div className="stat-change up">+0.8% increase</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>AI Usage / User</span>
            <Cpu size={16} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <div className="stat-value">14 /d</div>
            <div className="stat-change up">+2.4 chats/session</div>
          </div>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="charts-grid-three">
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Retention Curve</span>
            <select className="chart-select">
              <option>Week by Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={retentionData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Acquisition</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Bar data={acquisitionData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Community engagement by Category</span>
            <button className="btn-icon">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="chart-wrapper">
            <Radar data={communityData} options={radarOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
