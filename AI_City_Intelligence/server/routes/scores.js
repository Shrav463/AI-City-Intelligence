// server/routes/scores.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/scoreController');

router.get('/dimensions', ctrl.getDimensions);  // GET /api/scores/dimensions
router.get('/top',        ctrl.topByDimension); // GET /api/scores/top?dim=safety
router.get('/compare',    ctrl.compare);        // GET /api/scores/compare?a=tokyo&b=lisbon

module.exports = router;
