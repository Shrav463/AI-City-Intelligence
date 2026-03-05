// shared/constants.js
// Dimension definitions used by both client and server

const DIMENSIONS = [
  { key: 'safety',    label: 'Safety',         icon: '🛡',  color: '#5ccfee' },
  { key: 'afford',    label: 'Affordability',  icon: '💰',  color: '#f9c846' },
  { key: 'job',       label: 'Job Market',     icon: '📈',  color: '#c8f04a' },
  { key: 'lifestyle', label: 'Lifestyle',      icon: '🌆',  color: '#f47fff' },
  { key: 'transit',   label: 'Transit',        icon: '🚇',  color: '#7d9bff' },
  { key: 'food',      label: 'Food & Culture', icon: '🍜',  color: '#ff8c5a' },
  { key: 'nature',    label: 'Nature',         icon: '🌿',  color: '#55e09d' },
  { key: 'expat',     label: 'Expat Friendly', icon: '🌍',  color: '#e0c4ff' },
];

const CONTINENTS = ['Northeast', 'South', 'Midwest', 'West'];

module.exports = { DIMENSIONS, CONTINENTS };
