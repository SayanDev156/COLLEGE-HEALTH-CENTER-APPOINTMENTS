import React, { useEffect, useState } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('unknown');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const base = (import.meta.env.VITE_API_BASE || 'http://localhost:5000/api').replace(/\/api$/, '');
        const res = await fetch(`${base}/`, { cache: 'no-store' });
        if (!mounted) return;
        if (res.ok) {
          setStatus('ok');
        } else {
          setStatus('down');
        }
      } catch (err) {
        if (!mounted) return;
        setStatus('down');
      } finally {
        setLastChecked(new Date());
      }
    }
    check();
    const id = setInterval(check, 15000);
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
