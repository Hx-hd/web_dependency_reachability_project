'use strict';
const _ = require('lodash');
function runDemo(name) {
  // Hard-coded template: we DO NOT allow HTTP data to become template source/options.
  console.log('[REACHABILITY] %s GET /api/demo -> lodash.template()', require('../caseInfo').id);
  const greeting = _.template('Hello, <%- name %>!');
  return { message: greeting({ name }), selectedDependencyCalled: true, sink: 'lodash.template()' };
}
module.exports = { runDemo };
