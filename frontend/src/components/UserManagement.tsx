import { useState, useEffect } from "react";
import { request } from "../api";
import { Search, Edit, CheckCircle, XCircle } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  plan: string;
  status: string;
  is_verified: boolean;
  joined_at: string | null;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPlan, setEditPlan] = useState("");
  const [editVerified, setEditVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await request("/api/admin/users?limit=100");
      setUsers(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditStatus(user.status);
    setEditPlan(user.plan);
    setEditVerified(user.is_verified);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      const updated = await request(`/api/admin/users/${editingUser.id}?role=${editRole}&status=${editStatus}&plan=${editPlan}&is_verified=${editVerified}`, {
        method: "PATCH"
      });
      setUsers(users.map(u => u.id === updated.id ? { ...u, ...updated } : u));
      setEditingUser(null);
    } catch (err: any) {
      alert(err.message || "Failed to update user");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? u.role === filterRole : true;
    const matchesPlan = filterPlan ? u.plan === filterPlan : true;
    return matchesSearch && matchesRole && matchesPlan;
  });

  return (
    <div className="animate-fade">
      <div className="page-title-section">
        <h2 className="page-title">User Management</h2>
        <p className="page-subtitle">Search, Filter and manage all platform users</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <div className="table-card">
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <div className="search-bar" style={{ width: "auto", display: "flex", gap: "10px" }}>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="search-bar" style={{ width: "auto", display: "flex", gap: "10px" }}>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }}
              >
                <option value="">All Plans</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <button className="btn btn-secondary" onClick={fetchUsers}>
              Refresh
            </button>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Role</th>
                <th>Verified</th>
                <th>Joined</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    Loading user records...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    No matching users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="user-name-cell">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`pill pill-${user.plan}`}>
                        {user.plan.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`pill pill-${user.status}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem", textTransform: "capitalize", fontWeight: 500 }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.is_verified ? (
                        <CheckCircle size={16} className="text-success" style={{ color: "var(--success)" }} />
                      ) : (
                        <XCircle size={16} className="text-light" style={{ color: "var(--text-light)" }} />
                      )}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {user.joined_at ? new Date(user.joined_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" title="Edit User" onClick={() => handleOpenEdit(user)}>
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile: {editingUser.name}</h3>
              <button className="btn-icon" onClick={() => setEditingUser(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>System Role</label>
                <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>User Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subscription Tier</label>
                <select value={editPlan} onChange={(e) => setEditPlan(e.target.value)}>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
                <input
                  type="checkbox"
                  id="verified-checkbox"
                  checked={editVerified}
                  onChange={(e) => setEditVerified(e.target.checked)}
                  style={{ width: "auto" }}
                />
                <label htmlFor="verified-checkbox" style={{ marginBottom: 0, cursor: "pointer" }}>
                  Verified Identity Status (Gold Badge)
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
