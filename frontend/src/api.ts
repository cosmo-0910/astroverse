const API_BASE = "http://127.0.0.1:8000";

export function getAuthToken(): string | null {
  return localStorage.getItem("astro_admin_token");
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem("astro_admin_token", token);
  } else {
    localStorage.removeItem("astro_admin_token");
  }
}

export function getAuthHeaders() {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}
