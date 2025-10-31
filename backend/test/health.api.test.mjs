import { test, before, after } from 'node:test';
import { strict as assert } from 'assert';
import http from 'http';
import app from '../index.js';

let server;

before(async () => {
  server = http.createServer(app);
  await new Promise((res) => server.listen(0, res));
});

after(() => {
  server.close();
});

test('GET / returns health string', async () => {
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/`);
  const text = await res.text();
  assert.strictEqual(res.status, 200);
  assert.ok(text.includes('College Health Center Backend Running'));
});

test('GET /api/doctors returns array', async () => {
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/doctors`);
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(body));
});
