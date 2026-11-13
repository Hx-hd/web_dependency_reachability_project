'use strict';
const info = require('../caseInfo');
const demoService = require('../services/demoService');

function health(req, res) {
  res.json({ ok: true, caseId: info.id });
}
function run(req, res) {
  // Avoid forwarding arbitrary attacker-controlled objects into the dependency.
  const name = (typeof req.query.name === 'string' ? req.query.name : 'Student')
    .replace(/[^a-zA-Z0-9 _.-]/g, '').slice(0, 40) || 'Student';
  const result = demoService.runDemo(name);
  res.json({
    caseId: info.id,
    expectedClassification: info.label,
    output: result.message,
    selectedDependencyCalled: result.selectedDependencyCalled,
    routeTrace: `GET /api/demo -> routes/demoRoutes.js -> controllers/demoController.js -> services/demoService.js -> ${result.sink}`,
    explanation: 'This is benign reachability evidence, not proof that a vulnerability can be exploited.'
  });
}
module.exports = { health, run };
