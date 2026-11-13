'use strict';
const router = require('express').Router();
const { index } = require('../controllers/homeController');
const { run, health } = require('../controllers/demoController');
router.get('/', index);
router.get('/health', health);
router.get('/api/demo', run);
module.exports = router;
