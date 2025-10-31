import { test } from 'node:test';
import assert from 'assert';

test('doctors endpoint returns JSON array', async () => {
  // use running backend if available, else skip
  const base = process.env.API_BASE || 'http://127.0.0.1:5000';
  const res = await fetch(`${base}/api/doctors`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
});
