// server/controllers/scoreController.js
const Score = require('../models/Score');

const scoreController = {
  topByDimension(req, res, next) {
    try {
      const { dim, limit } = req.query;
      if (!dim) return res.status(400).json({ success: false, error: 'dim param required' });
      const results = Score.topByDimension(dim, parseInt(limit) || 10);
      res.json({ success: true, dimension: dim, data: results });
    } catch (err) {
      next(err);
    }
  },

  compare(req, res, next) {
    try {
      const { a, b } = req.query;
      if (!a || !b) return res.status(400).json({ success: false, error: 'a and b city IDs required' });
      const data = Score.compare(a, b);
      res.json({ success: true, cities: { a, b }, data });
    } catch (err) {
      next(err);
    }
  },

  getDimensions(req, res, next) {
    try {
      const dims = Score.getDimensions();
      res.json({ success: true, data: dims });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = scoreController;
