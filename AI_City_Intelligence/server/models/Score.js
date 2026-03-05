// server/models/Score.js
const { getDB } = require('../config/database');

function getGrade(s) {
  if (s>=93) return 'A+'; if (s>=87) return 'A'; if (s>=80) return 'A-';
  if (s>=77) return 'B+'; if (s>=73) return 'B'; if (s>=70) return 'B-';
  if (s>=67) return 'C+'; if (s>=63) return 'C'; if (s>=60) return 'C-';
  if (s>=57) return 'D+'; if (s>=53) return 'D'; return 'F';
}

const Score = {
  // Top N cities ranked by a given dimension
  topByDimension(dimensionKey, limit = 10) {
    const db = getDB();
    return db.prepare(`
      SELECT c.id, c.name, c.country, c.region, cs.score, d.label, d.icon, d.color
      FROM city_scores cs
      JOIN cities c ON c.id = cs.city_id
      JOIN dimensions d ON d.key = cs.dimension_key
      WHERE cs.dimension_key = ?
      ORDER BY cs.score DESC
      LIMIT ?
    `).all(dimensionKey, limit).map(r => ({ ...r, grade: getGrade(r.score) }));
  },

  // Side-by-side comparison of two cities
  compare(cityIdA, cityIdB) {
    const db = getDB();
    const rows = db.prepare(`
      SELECT
        d.key, d.label, d.icon, d.color, d.sort_order,
        a.score AS score_a,
        b.score AS score_b
      FROM dimensions d
      LEFT JOIN city_scores a ON a.dimension_key = d.key AND a.city_id = ?
      LEFT JOIN city_scores b ON b.dimension_key = d.key AND b.city_id = ?
      ORDER BY d.sort_order
    `).all(cityIdA, cityIdB);

    return rows.map(r => ({
      ...r,
      grade_a: getGrade(r.score_a || 0),
      grade_b: getGrade(r.score_b || 0),
      winner: r.score_a > r.score_b + 2 ? 'a' : r.score_b > r.score_a + 2 ? 'b' : 'tie',
    }));
  },

  getDimensions() {
    return getDB().prepare(`SELECT * FROM dimensions ORDER BY sort_order`).all();
  },
};

module.exports = Score;
