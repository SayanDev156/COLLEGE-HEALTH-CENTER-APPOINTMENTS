#!/usr/bin/env node
import { exec } from 'child_process';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;
const ROOT = process.cwd();
const LOG = path.resolve(ROOT, 'auto-start.log');

function log(...args) {
  const line = `[autoStart ${new Date().toISOString()}] ` + args.join(' ');
  console.log(line);
  try { fs.appendFileSync(LOG, line + '\n'); } catch (_) {}
}

function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { windowsHide: true }, (err, stdout, stderr) => {
      if (err) return reject({ err, stdout, stderr });
      resolve({ stdout, stderr });
    });
  });
}

async function findPidListening(port) {
  try {
    const { stdout } = await execPromise('netstat -ano');
    const lines = stdout.split(/\r?\n/);
    for (const l of lines) {
      if (l.includes(':' + port) && /LISTENING/i.test(l)) {
        const parts = l.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        return pid;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function killPid(pid) {
  try {
    await execPromise(`taskkill /PID ${pid} /F`);
    log('Killed PID', pid);
    return true;
  } catch (e) {
    log('Failed to kill PID', pid, e.err ? e.err.message : e);
    return false;
  }
}

function spawnBackend() {
  return new Promise((resolve, reject) => {
    // Use `node index.js` instead of `npm run dev` to avoid interactive prompts from nodemon
    log('Spawning backend: node index.js');
    const out = fs.openSync(path.resolve(ROOT, 'auto-start-out.log'), 'a');
    const err = fs.openSync(path.resolve(ROOT, 'auto-start-err.log'), 'a');
    const child = spawn('node', ['index.js'], {
      cwd: ROOT,
      shell: false,
      detached: true,
      stdio: ['ignore', out, err]
    });
    child.unref();
    // give it a moment
    setTimeout(() => resolve(child.pid), 800);
  });
}

function checkHttpRoot(timeout = 3000) {
  return new Promise((resolve) => {
    const req = http.get({ hostname: '127.0.0.1', port: PORT, path: '/', timeout }, (res) => {
      // success if we get any response code
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

async function waitForBackend(timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ok = await checkHttpRoot(2000);
    if (ok) return true;
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  log('autoStart starting');
  const pid = await findPidListening(PORT);
  if (pid) {
    log('Port', PORT, 'already listening by PID', pid, '— attempting to kill');
    await killPid(pid);
  }

  // spawn backend
  const childPid = await spawnBackend();
  log('Spawned backend process PID', childPid);

  log('Waiting for backend to respond on http://127.0.0.1:' + PORT + '/ ...');
  const ok = await waitForBackend(30000);
  if (ok) {
    log('Backend is reachable — success');
    process.exit(0);
  }
  log('Backend did not respond within timeout');
  process.exit(2);
}

main().catch(err => { log('autoStart error', err && err.stack ? err.stack : err); process.exit(3); });
