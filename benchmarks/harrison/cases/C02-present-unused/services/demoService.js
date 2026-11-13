'use strict';
// This HTTP path deliberately does NOT import lodash or minimist.
function runDemo(name) {
  return { message: `Hello, ${name}!`, selectedDependencyCalled: false, sink: 'plain JavaScript (no selected dependency)' };
}
module.exports = { runDemo };
