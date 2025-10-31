const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
const API_ROOT = API_BASE.replace(/\/api\/?$/, '');

function authHeader() {
  try {
    const token = localStorage.getItem('chca_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (e) {
    return {};
  }
}

export async function getDoctors() {
  const res = await fetch(`${API_BASE}/doctors`);
  return res.json();
}

export async function getAppointments() {
  const res = await fetch(`${API_BASE}/appointments`, { headers: { ...authHeader() } });
  return res.json();
}

export async function getFeedbacks() {
  try {
    const res = await fetch(`${API_BASE}/feedback`);
    return res.json();
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      throw new Error('NetworkError: Could not reach the backend. Please ensure the server is running.');
    }
    throw err;
  }
}

export async function postFeedback(data) {
  try {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || 'Failed to submit feedback');
    }
    return res.json();
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      throw new Error('NetworkError: Could not reach the backend. Please ensure the server is running.');
    }
    throw err;
  }
}

export async function pingBackend() {
  try {
    const res = await fetch(`${API_ROOT}/`);
    if (!res.ok) throw new Error('Backend not healthy');
    return true;
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      throw new Error('NetworkError: Could not reach the backend. Please ensure the server is running.');
    }
    throw err;
  }
}

export async function bookAppointment(data) {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || 'Booking failed');
    }
    return res.json();
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      throw new Error('NetworkError: Could not reach the backend. Please ensure the server is running.');
    }
    throw err;
  }
}

export async function register(user) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return res.json();
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      return { message: 'NetworkError: Could not reach the backend. Please ensure the server is running.' };
    }
    throw err;
  }
}

export async function login(credentials) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  } catch (err) {
    if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(err.message)) {
      return { message: 'NetworkError: Could not reach the backend. Please ensure the server is running.' };
    }
    throw err;
  }
}
