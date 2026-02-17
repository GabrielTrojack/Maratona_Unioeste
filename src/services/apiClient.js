const API_BASE = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

function logoutAndRedirect() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export async function apiFetch(endpoint, options = {}) {

  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    logoutAndRedirect();
    return;
  }

  return response;
}
