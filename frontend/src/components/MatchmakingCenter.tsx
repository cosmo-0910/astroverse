import { Line, Bar } from "react-chartjs-2";
import { Heart, Activity, CheckCircle, RefreshCw } from "lucide-react";

export default function MatchmakingCenter() {
  const matchesTrendData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Tus", "Fri", "Sat"],
    datasets: [
      {
        label: "Matches Over Time",
        data: [1100, 600, 1500, 900, 1200, 950, 1600],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const topPairsData = {
    labels: ["Aries x Leo", "Aries x Leo", "Aries x Leo", "Aries x Leo", "Aries x Leo", "Aries x Leo"],
    datasets: [
      {
        label: "Pair Compatibility Match %",
        data: [92, 88, 85, 78, 72, 65],
        backgroundColor: "#6366F1",
        borderRadius: 4,
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

  const barOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { color: "#E2E2F0" } },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">Moderation Center</h2>
        <p className="page-subtitle">AI-assistance + Human queue</p>
      </div>

      {/* Stats cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-header">
            <span>Total Matches</span>
            <Heart size={16} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <div className="stat-value">345,909</div>
            <div className="stat-change up">+1,204 new matches today</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Active Connections</span>
            <Activity size={16} style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <div className="stat-value">22,890</div>
            <div className="stat-change up">+4% active chatters</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Acceptance Rate</span>
            <CheckCircle size={16} style={{ color: "var(--success)" }} />
          </div>
          <div>
            <div className="stat-value">45%</div>
            <div className="stat-change up">+1.5% swipe approvals</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Matches Over Time</span>
            <select className="chart-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={matchesTrendData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-title">Top Compatibility Pairs</span>
            <button className="btn-icon">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="chart-wrapper">
            <Bar data={topPairsData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
