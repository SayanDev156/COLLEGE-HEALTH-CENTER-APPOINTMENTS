import React, { useState } from 'react';
import './AuthSection.css';
import { login, register } from '../utils/api';

export default function AuthSection() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [role, setRole] = useState('user');
  const [adminKey, setAdminKey] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(() => {
    try { const t = localStorage.getItem('chca_token'); return t ? { email: 'You' } : null; } catch { return null; }
  });

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      if (mode === 'register') {
        await register({ name: form.name, email: form.email, password: form.password, role, adminKey });
        setMsg('Registered — you can now login');
        setMode('login');
        setForm({ name: '', email: '', password: '' });
        setAdminKey('');
      } else {
        const res = await login({ email: form.email, password: form.password, role });
        if (res && res.token) {
          localStorage.setItem('chca_token', res.token);
          setMsg('Welcome back!');
          setUser({ email: form.email });
        } else {
          setMsg(res.message || 'Login failed');
        }
      }
    } catch (err) {
      setMsg(err.message || 'Unexpected error');
    }
  }

  return (
    <section id="auth" className={`auth-section auth-${mode}`} aria-labelledby="auth-heading">
      <div className="auth-card">
        <div className="auth-visual" aria-hidden>
          <div className="glow" />
          <h3 className="brand">College Health</h3>
          <p className="tag">Care. Convenience. Community.</p>
        </div>

        <div className="auth-body">
          <div className="auth-header">
            <h2 id="auth-heading">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="sub">{mode === 'login' ? 'Log in to manage appointments and messages.' : 'Sign up to start booking and getting health tips.'}</p>
          </div>

          <div className="auth-toggle">
            <button type="button" onClick={() => setMode('login')} className={mode==='login'?'active':''}>Login</button>
            <button type="button" onClick={() => setMode('register')} className={mode==='register'?'active':''}>Register</button>
          </div>

          <div className="auth-role" role="tablist" aria-label="Account role">
            <button type="button" onClick={() => setRole('user')} className={role==='user'?'active':''}>User</button>
            <button type="button" onClick={() => setRole('admin')} className={role==='admin'?'active':''}>Admin</button>
            <div className="role-note">{role==='admin' ? 'Admin: choose this for admin accounts.' : 'Standard user account'}</div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" aria-live="polite">
            {mode === 'register' && (
              <label className="field">
                <span className="label">Full name</span>
                <input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </label>
            )}
            <label className="field">
              <span className="label">Email</span>
              <input name="email" placeholder={mode==='login' && role==='admin' ? 'admin@college.edu' : 'you@college.edu'} value={form.email} onChange={handleChange} required />
            </label>
            <label className="field">
              <span className="label">Password</span>
              <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
            </label>

            <div className="actions">
              <button className="primary" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
              <button type="button" className="ghost" onClick={() => { setMode(mode==='login'?'register':'login'); setMsg(''); }}>
                {mode === 'login' ? 'Need an account?' : 'Have an account?'}
              </button>
            </div>

            {mode === 'register' && role === 'admin' && (
              <label className="field">
                <span className="label">Admin creation key</span>
                <input name="adminKey" placeholder="Enter admin key" value={adminKey} onChange={e => setAdminKey(e.target.value)} />
              </label>
            )}
          </form>

          {msg && <div className="auth-msg" role="status">{msg}</div>}

          {user && <div className="auth-logged">Logged in as {user.email} <button onClick={() => { localStorage.removeItem('chca_token'); setUser(null); setMsg('Logged out'); }}>Logout</button></div>}
        </div>
      </div>
    </section>
  );
}
