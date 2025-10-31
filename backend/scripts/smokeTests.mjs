async function run() {
  const base = process.env.API_BASE || 'http://localhost:5000';
  try {
    const h = await fetch(`${base}/`);
    if (h.status !== 200) throw new Error('Health check failed');
    const d = await fetch(`${base}/api/doctors`);
    if (d.status !== 200) throw new Error('Doctors endpoint failed');
    const doctors = await d.json();
    if (!Array.isArray(doctors)) throw new Error('Doctors not array');
    console.log('Smoke tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Smoke tests failed:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(2);
  }
}

run();
