'use strict';
// Executed only by `npm run offline` / `docker compose exec c03 npm run offline`.
// No Express route, controller, or service imports this script.
const minimist = require('minimist');
const options = minimist(['--format', 'json', '--limit', '3']);
console.log('[INTERNAL EVIDENCE] minimist@1.2.5 was invoked by scripts/offline-report.js');
console.log(JSON.stringify(options, null, 2));
