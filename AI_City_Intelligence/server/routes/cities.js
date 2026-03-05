// server/routes/cities.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/cityController');

router.get('/search', ctrl.search);   // GET /api/cities/search?q=tokyo
router.get('/',       ctrl.getAll);   // GET /api/cities  or  ?continent=Asia
router.get('/:id',    ctrl.getOne);   // GET /api/cities/tokyo

module.exports = router;
