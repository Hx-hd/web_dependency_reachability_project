'use strict';
const express = require('express');
const app = express();
const demoRoutes = require('./routes/demoRoutes');

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use('/', demoRoutes);

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`[LAB] ${require('./caseInfo').id} listening on port ${port}`);
});
