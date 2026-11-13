'use strict';
const info = require('../caseInfo');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}
function index(req, res) {
  const tag = info.label === 'SAFE' ? 'safe' : (info.label === 'WEB_REACHABLE' ? 'reachable' : 'vulnerable');
  res.type('html').send(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(info.id)} · Dependency Reachability Lab</title>
<style>
:root{color-scheme:dark;font-family:system-ui,-apple-system,Segoe UI,sans-serif}*{box-sizing:border-box}
body{margin:0;background:#0b1220;color:#e7eefc;line-height:1.5}
main{max-width:900px;margin:40px auto;padding:0 22px}h1{font-size:2.3rem;letter-spacing:-.035em;margin:8px 0 12px}
.eyebrow{color:#7fc5ff;font-weight:700;letter-spacing:.13em;text-transform:uppercase;font-size:.85rem}
.card{border:1px solid #324159;border-radius:14px;background:#141f30;padding:24px;margin:20px 0}
.badge{font-family:ui-monospace,monospace;display:inline-block;border-radius:6px;padding:5px 10px;font-size:.86rem;font-weight:700}
.safe{background:#173d2f;color:#94ecc1}.vulnerable{background:#4d341b;color:#ffd68d}.reachable{background:#512537;color:#ffaac6}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.label{color:#9cacc2;font-size:.86rem;margin-bottom:5px}strong{color:white}
code,pre{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}pre{background:#0a1525;border-radius:9px;padding:16px;white-space:pre-wrap;overflow-wrap:anywhere}
input{background:#0d1828;color:white;border:1px solid #52627a;padding:11px;border-radius:8px;min-width:160px}
button{background:#3e9bec;border:0;color:#041523;font-weight:800;padding:12px 18px;border-radius:8px;cursor:pointer}
button:hover{background:#72bbfa}button:disabled{opacity:.65;cursor:wait}
.form-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px}
label{display:block;color:#b8c8dc;font-size:.9rem;font-weight:600}
#demo-results{margin-top:20px;padding:14px;background:#0c1a2d;border-radius:10px;border:1px solid #324159}
#demo-results h3{margin:0;font-size:1rem}#demo-output{font-weight:700;font-size:1.1rem;margin-bottom:0}
#demo-error{color:#ffb9b9}a{color:#80c4ff}.muted{color:#a8b7cc}footer{padding:15px 0 30px;font-size:.88rem;color:#a8b7cc}
@media(max-width:600px){.grid{grid-template-columns:1fr}h1{font-size:1.8rem}}
</style></head><body><main>
<div class="eyebrow">Controlled local security benchmark · ${escapeHtml(info.id)}</div>
<h1>${escapeHtml(info.title)}</h1>
<p class="muted">A deliberately simple Node.js + Express application used to study whether an npm advisory corresponds to an HTTP-reachable code path.</p>
<section class="card"><span class="badge ${tag}">Expected: ${escapeHtml(info.label)}</span>
<p>${escapeHtml(info.description)}</p><div class="grid">
<div><div class="label">Selected package</div><strong>${escapeHtml(info.packageName)} @ ${escapeHtml(info.packageVersion)}</strong></div>
<div><div class="label">Relevant advisory</div><strong>${escapeHtml(info.advisory)}</strong></div>
</div></section>
<section class="card"><h2>Try a request</h2>
<p class="muted">Enter a name and send a harmless request to the app. The response appears here without showing the underlying route or code path.</p>
<form id="demo-form" action="/api/demo" method="GET">
<label for="demo-name">Name</label>
<div class="form-row"><input type="text" id="demo-name" name="name" maxlength="40" value="Student" autocomplete="off" required>
<button type="submit" id="demo-button">Send request</button></div>
</form>
<div id="demo-results" hidden aria-live="polite"><h3>Response</h3><p id="demo-output"></p>
<p class="muted" id="demo-dependency"></p></div>
<p id="demo-error" role="alert" hidden></p>
</section>
<script>
(function () {
  const form = document.getElementById('demo-form');
  const button = document.getElementById('demo-button');
  const results = document.getElementById('demo-results');
  const output = document.getElementById('demo-output');
  const dependency = document.getElementById('demo-dependency');
  const error = document.getElementById('demo-error');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    button.disabled = true;
    button.textContent = 'Sending...';
    error.hidden = true;
    results.hidden = true;
    try {
      const data = new FormData(form);
      const name = String(data.get('name') || 'Student').trim();
      const response = await fetch('/api/demo?name=' + encodeURIComponent(name), { cache: 'no-store' });
      if (!response.ok) throw new Error('Request failed (HTTP ' + response.status + ')');
      const payload = await response.json();
      output.textContent = String(payload.output || '(No message returned)');
      dependency.textContent = 'Selected dependency called: ' + (payload.selectedDependencyCalled ? 'Yes' : 'No');
      results.hidden = false;
    } catch (err) {
      error.textContent = err.message || 'Could not reach the application.';
      error.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Send request';
    }
  });
}());
</script><footer>Local teaching sample only · Bind host ports to 127.0.0.1 · Never publish these deliberately outdated dependencies</footer></main></body></html>`);
}
module.exports = { index };
