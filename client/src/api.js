const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(SERVER + path, { ...options, headers });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}
export default SERVER;
