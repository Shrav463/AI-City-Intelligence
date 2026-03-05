// server/controllers/cityController.js
const City = require('../models/City');

const cityController = {
  getAll(req, res, next) {
    try {
      const { continent } = req.query;
      const cities = continent ? City.findByContinent(continent) : City.findAll();
      res.json({ success: true, count: cities.length, data: cities });
    } catch (err) {
      next(err);
    }
  },

  getOne(req, res, next) {
    try {
      const city = City.findById(req.params.id);
      if (!city) return res.status(404).json({ success: false, error: 'City not found' });
      res.json({ success: true, data: city });
    } catch (err) {
      next(err);
    }
  },

  search(req, res, next) {
    try {
      const { q } = req.query;
      if (!q || q.trim().length < 1) {
        return res.json({ success: true, count: 0, data: [] });
      }
      const results = City.search(q.trim());
      res.json({ success: true, count: results.length, data: results });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cityController;
