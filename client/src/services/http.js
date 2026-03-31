const API = "http://localhost:3001/api";

async function get(path) {
  const res = await fetch(`${API}${path}`, { credentials: "include" });
  return handle(res);
}

async function post(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handle(res);
}

async function patch(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handle(res);
}

async function remove(path) {
  const res = await fetch(`${API}${path}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handle(res);
}

async function handle(res) {
  const data = await res.json();
  if (res.status === 404) { window.dispatchEvent(new Event("api-not-found")); throw new Error("Not found"); }
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// Authentication

export const register = (username, email, password) =>
  post("/auth/register", { username, email, password });

export const login = (email, password) =>
  post("/auth/login", { email, password });

export const logout = () => post("/auth/logout");

export const getMe = () => get("/auth/me");

// Homepage

export const fetchLakes = () => get("/waterbodies/lakes");

// Lake info

export const submitComment = (waterbodyId, commentText) =>
  post("/comments", { waterbodyId, commentText });

export const saveLake = (waterbodyId) =>
  post("/users/me/savedLakes", { waterbodyId });

// Admin page

export const fetchComments = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return get(`/comments?${qs}`);
};

export const reviewComment = (id, reviewStatus) =>
  patch(`/comments/${id}/review`, { reviewStatus });

export const deleteComment = (id) => remove(`/comments/${id}`);

// User profile

export const fetchSavedLakes = () => get("/users/me/savedLakes");

export const removeSavedLake = (waterbodyId) =>
  remove(`/users/me/savedLakes/${waterbodyId}`);
