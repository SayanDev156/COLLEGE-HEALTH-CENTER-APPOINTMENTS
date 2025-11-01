import React, { useEffect, useState } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('unknown');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const base = (import.meta.env.VITE_API_BASE || 'https://college-health-center-appointments.onrender.com/api').replace(/\/api$/, '');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);
        
        const res = await fetch(`${base}/`, { 
          cache: 'no-store',
          signal: controller.signal,
          mode: 'cors'
        });
        clearTimeout(timeoutId);
        
        if (!mounted) return;
        if (res.ok) {
          setStatus('ok');
        } else {
          setStatus('down');
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Backend check failed:', err.message);
        setStatus('down');
      } finally {
        if (mounted) setLastChecked(new Date());
      }
    }
    check();
    const id = setInterval(check, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  if (status === 'ok') return null;

  return (
    <div style={{ width: '100%', background: '#ffecec', color: '#9b1c1c', padding: '8px 12px', textAlign: 'center', fontWeight: 600 }}>
      Backend unreachable — some features may not work. Last checked: {lastChecked ? lastChecked.toLocaleTimeString() : 'just now'}
    </div>
  );
};

export default BackendStatus;
