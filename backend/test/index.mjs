// Test index - import individual test modules so the runner executes them
import './health.test.mjs';
import './health.api.test.mjs';
// Test index: import individual test modules so node --test runs them
import './health.test.mjs';
import './health.api.test.mjs';
import './doctors.api.test.mjs';

console.log('Loaded test index');
