// server/models/City.js
const { getDB } = require('../config/database');

function getGrade(score) {
  if (score >= 93) return 'A+';
  if (score >= 87) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 77) return 'B+';
  if (score >= 73) return 'B';
  if (score >= 70) return 'B-';
  if (score >= 67) return 'C+';
  if (score >= 63) return 'C';
  if (score >= 60) return 'C-';
  if (score >= 57) return 'D+';
  if (score >= 53) return 'D';
  return 'F';
}

// Attach scores, pros, cons to a city row
function hydrate(city) {
  if (!city) return null;
  const db = getDB();

  const scores = db.prepare(`
    SELECT cs.dimension_key, cs.score, d.label, d.icon, d.color
    FROM city_scores cs
    JOIN dimensions d ON d.key = cs.dimension_key
    WHERE cs.city_id = ?
    ORDER BY d.sort_order
  `).all(city.id);

  const pros = db.prepare(`SELECT text FROM city_pros WHERE city_id = ? ORDER BY sort_order`).all(city.id).map(r => r.text);
  const cons = db.prepare(`SELECT text FROM city_cons WHERE city_id = ? ORDER BY sort_order`).all(city.id).map(r => r.text);

  const scoreMap = {};
  scores.forEach(s => {
    scoreMap[s.dimension_key] = {
      score: s.score,
      grade: getGrade(s.score),
      label: s.label,
      icon: s.icon,
      color: s.color,
    };
  });

  const avg = scores.length
    ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
    : 0;

  return { ...city, scores: scoreMap, pros, cons, overall: avg, overallGrade: getGrade(avg) };
}

const City = {
  findAll() {
    const db = getDB();
    const cities = db.prepare(`SELECT * FROM cities ORDER BY name`).all();
    return cities.map(c => {
      const scores = db.prepare(`
        SELECT cs.dimension_key, cs.score FROM city_scores cs WHERE cs.city_id = ?
      `).all(c.id);
      const avg = scores.length
        ? Math.round(scores.reduce((s, r) => s + r.score, 0) / scores.length)
        : 0;
      return { ...c, overall: avg, overallGrade: getGrade(avg) };
    });
  },

  findById(id) {
    const db = getDB();
    const city = db.prepare(`SELECT * FROM cities WHERE id = ?`).get(id);
    return hydrate(city);
  },

  search(query) {
    const db = getDB();
    const q = `%${query.toLowerCase()}%`;
    const cities = db.prepare(`
      SELECT * FROM cities
      WHERE LOWER(name) LIKE ?
         OR LOWER(country) LIKE ?
         OR LOWER(region) LIKE ?
         OR LOWER(continent) LIKE ?
      ORDER BY name
    `).all(q, q, q, q);
    return cities.map(c => {
      const scores = db.prepare(`SELECT score FROM city_scores WHERE city_id = ?`).all(c.id);
      const avg = scores.length ? Math.round(scores.reduce((s, r) => s + r.score, 0) / scores.length) : 0;
      return { ...c, overall: avg, overallGrade: getGrade(avg) };
    });
  },

  findByContinent(continent) {
    const db = getDB();
    const cities = db.prepare(`SELECT * FROM cities WHERE continent = ? ORDER BY name`).all(continent);
    return cities.map(c => {
      const scores = db.prepare(`SELECT score FROM city_scores WHERE city_id = ?`).all(c.id);
      const avg = scores.length ? Math.round(scores.reduce((s, r) => s + r.score, 0) / scores.length) : 0;
      return { ...c, overall: avg, overallGrade: getGrade(avg) };
    });
  },
};

module.exports = City;
