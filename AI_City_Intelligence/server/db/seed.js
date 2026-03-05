// server/db/seed.js
// Run: node db/seed.js  (from the /server directory)
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const { getDB, initDB } = require('../config/database');

const DIMENSIONS = [
  { key: 'safety',    label: 'Safety',         icon: '🛡',  color: '#5ccfee', sort_order: 0 },
  { key: 'afford',    label: 'Affordability',  icon: '💰',  color: '#f9c846', sort_order: 1 },
  { key: 'job',       label: 'Job Market',     icon: '📈',  color: '#c8f04a', sort_order: 2 },
  { key: 'lifestyle', label: 'Lifestyle',      icon: '🌆',  color: '#f47fff', sort_order: 3 },
  { key: 'transit',   label: 'Transit',        icon: '🚇',  color: '#7d9bff', sort_order: 4 },
  { key: 'food',      label: 'Food & Culture', icon: '🍜',  color: '#ff8c5a', sort_order: 5 },
  { key: 'nature',    label: 'Nature',         icon: '🌿',  color: '#55e09d', sort_order: 6 },
  { key: 'expat',     label: 'Expat Friendly', icon: '🌍',  color: '#e0c4ff', sort_order: 7 },
];

const CITIES = [
  {
    id: 'new-york', name: 'New York City', country: 'United States', region: 'New York', continent: 'Northeast',
    population: '8.34M', founded: '1624', timezone: 'UTC-5', currency: 'USD', language: 'English',
    summary: "The city that never sleeps and never stops hustling. Dense, loud, impossibly expensive, and still worth it for the right person.",
    description: "New York is the benchmark against which every other American city is measured, and mostly found wanting. The subway is a masterpiece of dysfunction that still somehow moves millions daily. The food scene is unmatched in the Western hemisphere. The cost of living will hollow you out. Career density across finance, media, tech, and the arts is unparalleled — if you can stomach the expense and the pace, NYC rewards ambition at a rate no other city can match.",
    pros: ['Unrivaled career density across every industry', 'Best food scene in the Western Hemisphere', 'World-class arts, culture, and nightlife', 'No need for a car — ever'],
    cons: ['Cost of living is staggeringly high', 'Subway is aging and frequently unreliable', 'Noise, pace, and crowds wear people down', 'Tiny apartments at enormous cost'],
    scores: { safety: 66, afford: 28, job: 97, lifestyle: 94, transit: 91, food: 98, nature: 55, expat: 88 },
  },
  {
    id: 'san-francisco', name: 'San Francisco', country: 'United States', region: 'California', continent: 'West',
    population: '874K', founded: '1776', timezone: 'UTC-8', currency: 'USD', language: 'English',
    summary: "Tech capital of the world, with world-class nature on its doorstep and a housing market that has become a cautionary tale.",
    description: "San Francisco is small enough to walk across but large enough to contain multitudes. The fog, the hills, the Bay — the city is genuinely beautiful in a way that catches you off guard. The tech industry has flooded it with capital and drained it of character in equal measure. The homeless crisis is visible and unresolved. For engineers at top companies, the compensation is extraordinary. For everyone else, the cost-to-quality ratio is increasingly hard to justify.",
    pros: ['Global epicenter of technology and venture capital', 'Stunning natural setting with easy access to outdoors', 'Mild year-round climate with zero humidity', 'Incredible diversity of food and culture'],
    cons: ['Most expensive housing market in the US', 'Visible homelessness crisis remains unresolved', 'Property crime is notably high', 'Small city geography limits certain experiences'],
    scores: { safety: 54, afford: 22, job: 94, lifestyle: 83, transit: 74, food: 90, nature: 91, expat: 82 },
  },
  {
    id: 'austin', name: 'Austin', country: 'United States', region: 'Texas', continent: 'South',
    population: '978K', founded: '1839', timezone: 'UTC-6', currency: 'USD', language: 'English',
    summary: "Texas's tech boomtown. No state income tax, live music on every corner, and summers that will genuinely test your limits.",
    description: "Austin has absorbed a decade of migration from coastal cities and is still figuring out what it wants to be. The tech sector is enormous and growing — Tesla, Apple, Dell, and dozens of major companies have significant presences. The live music scene is the best in America. Keep Austin Weird is a bumper sticker that loses a little ground every year as the city scales. The heat is serious, the traffic is worsening, and housing costs have followed the tech money upward.",
    pros: ['No state income tax — significant financial upside', 'Fastest-growing major tech job market in the US', 'Legendary live music scene', 'Relatively affordable compared to coastal peers (for now)'],
    cons: ['Summers are brutally hot and long', 'Traffic has become a genuine daily burden', 'Housing costs have surged dramatically', 'Power grid reliability is a documented concern'],
    scores: { safety: 72, afford: 56, job: 88, lifestyle: 86, transit: 38, food: 80, nature: 71, expat: 74 },
  },
  {
    id: 'chicago', name: 'Chicago', country: 'United States', region: 'Illinois', continent: 'Midwest',
    population: '2.7M', founded: '1833', timezone: 'UTC-6', currency: 'USD', language: 'English',
    summary: "America's most underrated major city. World-class architecture, a ferocious food scene, and winters that separate the committed from the curious.",
    description: "Chicago doesn't need your validation and that's part of what makes it great. The architecture is genuinely the best in the world — this is not hyperbole. The food scene runs from Michelin-starred tasting menus to the best deep dish and Italian beef you'll ever eat. The lakefront is a civic masterpiece. The winters are brutal and non-negotiable. The South and West Side violence is real and concentrated in ways that the city hasn't solved. But for the right person, Chicago at its best is the best American city.",
    pros: ['World-class architecture and lakefront', 'Exceptional and diverse food scene', 'Significantly more affordable than coastal cities', 'Strong job market across finance, tech, and healthcare'],
    cons: ['Winters are genuinely severe and long', 'Gun violence concentrated in certain neighborhoods', 'High property taxes and city fiscal challenges', 'Brain drain to coasts is a real dynamic'],
    scores: { safety: 61, afford: 63, job: 82, lifestyle: 88, transit: 79, food: 93, nature: 67, expat: 76 },
  },
  {
    id: 'miami', name: 'Miami', country: 'United States', region: 'Florida', continent: 'South',
    population: '454K', founded: '1896', timezone: 'UTC-5', currency: 'USD', language: 'English / Spanish',
    summary: "Latin American gateway city with no state income tax, year-round sun, and a finance scene that arrived and decided to stay.",
    description: "Miami has reinvented itself from retirement destination to international business hub with surprising speed. The finance and crypto money that relocated from New York has permanently altered the Brickell skyline. The Latin cultural foundation gives Miami a vibrancy and warmth that most American cities lack. The heat and humidity from June through October is not for everyone. Traffic is terrible. Flooding risk is real and increasing. But the energy, the beaches, and the no-income-tax calculus keep drawing people.",
    pros: ['No state income tax and growing finance sector', 'Year-round outdoor lifestyle and beach access', 'Rich Latin American culture and food scene', 'Gateway city for Latin American business'],
    cons: ['Heat and humidity June–October are punishing', 'Traffic is consistently terrible', 'Climate and flooding risk is a serious long-term concern', 'Cost of living has surged in recent years'],
    scores: { safety: 63, afford: 48, job: 79, lifestyle: 87, transit: 41, food: 84, nature: 78, expat: 86 },
  },
  {
    id: 'seattle', name: 'Seattle', country: 'United States', region: 'Washington', continent: 'West',
    population: '749K', founded: '1851', timezone: 'UTC-8', currency: 'USD', language: 'English',
    summary: "Pacific Northwest tech haven. Amazon's backyard, surrounded by mountains and water, under a lot of grey sky.",
    description: "Seattle is a city for people who like their coffee strong, their nature accessible, and their tech salaries high. Amazon's presence has fundamentally shaped the city — for better in terms of economic dynamism, for worse in terms of housing costs and character. The outdoors access is extraordinary: mountains, islands, and old-growth forests within an hour. The rain is real but mild. The grey skies from November through March affect people more than they expect. The tech compensation is among the highest in the country.",
    pros: ['No state income tax with top-tier tech salaries', 'Extraordinary outdoor access — mountains, water, forests', 'Strong and growing tech sector beyond Amazon', 'Mild winters despite the reputation for rain'],
    cons: ['Housing costs have exploded in the tech boom', 'Grey skies and drizzle dominate 6+ months', 'Visible homelessness crisis in the city center', 'Traffic and transit are persistent frustrations'],
    scores: { safety: 62, afford: 44, job: 91, lifestyle: 82, transit: 68, food: 83, nature: 95, expat: 78 },
  },
  {
    id: 'denver', name: 'Denver', country: 'United States', region: 'Colorado', continent: 'West',
    population: '715K', founded: '1858', timezone: 'UTC-7', currency: 'USD', language: 'English',
    summary: "Mile-high city at the foot of the Rockies. Outdoor lifestyle capital of America with a rapidly maturing job market.",
    description: "Denver's pitch is simple: world-class mountain access from a real city. Skiing, hiking, climbing, and cycling are not just activities here — they're the organizing principle of the culture. The job market has grown substantially in tech, aerospace, and energy. The food and beer scene punches above its weight. Housing has gotten expensive as the secret got out. The altitude is real — give yourself a week to acclimate. The 300 days of sunshine is not marketing; it's accurate.",
    pros: ['300 days of sunshine annually — genuinely', 'World-class Rocky Mountain access from city limits', 'Growing tech and aerospace job market', 'Strong outdoor culture and active lifestyle infrastructure'],
    cons: ['Housing costs have risen sharply over the past decade', 'Altitude (5,280 ft) requires real acclimation', 'Traffic has worsened considerably as population grew', 'Downtown has struggled with safety and vacancy post-pandemic'],
    scores: { safety: 67, afford: 52, job: 79, lifestyle: 89, transit: 55, food: 78, nature: 97, expat: 72 },
  },
  {
    id: 'boston', name: 'Boston', country: 'United States', region: 'Massachusetts', continent: 'Northeast',
    population: '675K', founded: '1630', timezone: 'UTC-5', currency: 'USD', language: 'English',
    summary: "America's college town at city scale. Elite universities, world-class biotech, and some of the oldest neighborhoods in the country.",
    description: "Boston is dense with institutional prestige — MIT, Harvard, and dozens of other universities give it an intellectual energy that few American cities can match. The biotech and life sciences cluster is the strongest in the world outside San Francisco. The neighborhoods are walkable, historic, and genuinely distinct from one another. The winters are serious. The drivers are famously aggressive. The provincialism is real but softening. For anyone in medicine, biotech, education, or finance, Boston is a top-tier choice.",
    pros: ['World-leading biotech and life sciences cluster', 'Dense concentration of elite universities and research', 'Walkable, historic neighborhoods with distinct character', 'Strong transit system by US standards'],
    cons: ['Cost of living is extremely high', 'Winters are cold, snowy, and long', 'Housing market is very competitive', 'Can feel insular and difficult to crack socially'],
    scores: { safety: 74, afford: 35, job: 90, lifestyle: 82, transit: 82, food: 84, nature: 66, expat: 79 },
  },
  {
    id: 'nashville', name: 'Nashville', country: 'United States', region: 'Tennessee', continent: 'South',
    population: '715K', founded: '1779', timezone: 'UTC-6', currency: 'USD', language: 'English',
    summary: "Music City is the fastest-growing major city in the South. Hot, affordable (for now), and drawing migration from everywhere.",
    description: "Nashville's growth over the past decade has been extraordinary and is starting to show its seams. The no-income-tax calculus, central location, and genuine music culture drew waves of migrants, which has pushed housing costs up fast. The healthcare sector — centered on HCA Healthcare — is enormous and often overlooked. The food scene has improved dramatically. The bachelorette party tourism on Broadway is its own phenomenon, loved by some and resented by most residents. The summers are hot and humid.",
    pros: ['No state income tax with rapidly growing economy', 'Booming healthcare and music industry sectors', 'Central US location with major airport hub', 'Still more affordable than coastal alternatives'],
    cons: ['Summers are hot and oppressively humid', 'Traffic has become significantly worse with growth', 'Housing costs rising fast as migration continues', 'Tourism culture can overwhelm downtown areas'],
    scores: { safety: 69, afford: 62, job: 77, lifestyle: 81, transit: 32, food: 77, nature: 68, expat: 65 },
  },
  {
    id: 'portland', name: 'Portland', country: 'United States', region: 'Oregon', continent: 'West',
    population: '652K', founded: '1845', timezone: 'UTC-8', currency: 'USD', language: 'English',
    summary: "Weird, creative, coffee-obsessed, and navigating a difficult few years. Still one of the most livable cities in America for the right temperament.",
    description: "Portland's brand is effortful quirkiness elevated into civic identity, and somehow it works. The food cart culture is world-class. The outdoor access is superb. The cost of living, while rising, remains significantly lower than Seattle or the Bay. The city has had a visible and well-documented public safety and homelessness challenge since 2020, and the recovery has been uneven. For people who prioritize quality of life, nature access, and a genuine arts scene over career maximalism, Portland has a compelling case.",
    pros: ['No state sales tax with lower cost of living than Seattle', 'Extraordinary food cart scene and culinary culture', 'Strong arts, music, and creative communities', 'Superb outdoor access to coast, mountains, and gorge'],
    cons: ['Downtown safety and homelessness challenges are real', 'Job market thinner than major coastal peers', 'Grey, rainy winters rival Seattle in length', 'Political volatility has affected city governance'],
    scores: { safety: 55, afford: 58, job: 70, lifestyle: 84, transit: 66, food: 86, nature: 93, expat: 73 },
  },
];

function seed() {
  initDB();
  const db = getDB();

  console.log('\n  Seeding database...\n');

  // Dimensions
  const insertDim = db.prepare(`
    INSERT OR REPLACE INTO dimensions (key, label, icon, color, sort_order)
    VALUES (@key, @label, @icon, @color, @sort_order)
  `);
  DIMENSIONS.forEach(d => insertDim.run(d));
  console.log(`  ✓ ${DIMENSIONS.length} dimensions`);

  // Cities
  const insertCity = db.prepare(`
    INSERT OR REPLACE INTO cities (id, name, country, region, continent, population, founded, timezone, currency, language, summary, description)
    VALUES (@id, @name, @country, @region, @continent, @population, @founded, @timezone, @currency, @language, @summary, @description)
  `);
  const insertPro = db.prepare(`INSERT INTO city_pros (city_id, text, sort_order) VALUES (?, ?, ?)`);
  const insertCon = db.prepare(`INSERT INTO city_cons (city_id, text, sort_order) VALUES (?, ?, ?)`);
  const insertScore = db.prepare(`
    INSERT OR REPLACE INTO city_scores (city_id, dimension_key, score)
    VALUES (?, ?, ?)
  `);

  // Clear existing pros/cons (cities use INSERT OR REPLACE so they're fine)
  const clearPros = db.prepare(`DELETE FROM city_pros WHERE city_id = ?`);
  const clearCons = db.prepare(`DELETE FROM city_cons WHERE city_id = ?`);

  const seedAll = db.transaction(() => {
    CITIES.forEach(city => {
      const { pros, cons, scores, ...cityData } = city;
      insertCity.run(cityData);

      clearPros.run(city.id);
      clearCons.run(city.id);
      pros.forEach((text, i) => insertPro.run(city.id, text, i));
      cons.forEach((text, i) => insertCon.run(city.id, text, i));
      Object.entries(scores).forEach(([dim, score]) => insertScore.run(city.id, dim, score));
    });
  });

  seedAll();
  console.log(`  ✓ ${CITIES.length} cities seeded`);
  console.log('  ✓ All scores inserted');
  console.log('\n  Database ready.\n');
}

seed();
