import { test } from 'node:test';
import { strict as assert } from 'assert';

const base = process.env.API_BASE || 'http://127.0.0.1:5000';

test('backend root health check returns 200', async (t) => {
  const res = await fetch(`${base}/`);
  const text = await res.text();
  assert.strictEqual(res.status, 200, `expected 200, got ${res.status} - ${text}`);
});
