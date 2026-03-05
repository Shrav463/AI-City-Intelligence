// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import CityCard from '../components/cards/CityCard';
import { api } from '../utils/api';
import styles from './Home.module.css';

const FEATURED_IDS = ['new-york', 'san-francisco', 'austin', 'chicago', 'miami', 'seattle'];
const QUICK_CHIPS  = ['New York City', 'Austin', 'Chicago', 'Miami', 'Denver', 'Boston'];

const DIMS = [
  { label:'Safety',        color:'#5ccfee', icon:'🛡' },
  { label:'Affordability', color:'#f9c846', icon:'💰' },
  { label:'Job Market',    color:'#c8f04a', icon:'📈' },
  { label:'Lifestyle',     color:'#f47fff', icon:'🌆' },
  { label:'Transit',       color:'#7d9bff', icon:'🚇' },
  { label:'Food & Culture',color:'#ff8c5a', icon:'🍜' },
  { label:'Nature',        color:'#55e09d', icon:'🌿' },
  { label:'Expat Friendly',color:'#e0c4ff', icon:'🌍' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(FEATURED_IDS.map(id => api.getCity(id).then(r => r.data).catch(() => null)))
      .then(cities => { setFeatured(cities.filter(Boolean)); setLoading(false); });
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`page-wrap ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>// city analysis engine v0.9.2</p>
            <h1 className={styles.title}>
              Know your next city <em>before</em> you commit.
            </h1>
            <p className={styles.body}>
              Data-driven report cards across 8 urban dimensions.
              Safety, affordability, transit, food, nature, and more.
              Pick a US city. See the truth.
            </p>
            <SearchBar placeholder="Search a city — New York, Austin, Chicago…" autoFocus />
            <div className={styles.quickRow}>
              <span className={`mono ${styles.quickLabel}`}>Try:</span>
              {QUICK_CHIPS.map(name => (
                <Link
                  key={name}
                  to={`/city/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={styles.chip}
                >{name}</Link>
              ))}
            </div>
          </div>

          <div className={styles.stats}>
            {[
              { num: '10',  label: 'Cities Profiled',     color: 'var(--accent)' },
              { num: '8',   label: 'Dimensions Scored',   color: 'var(--accent)' },
              { num: '80',  label: 'Data Points / City',  color: 'var(--accent)' },
              { num: 'A–F', label: 'Letter Grades',       color: 'var(--c-life)'  },
            ].map(s => (
              <div key={s.label} className={styles.statCard}>
                <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
                <div className={`${styles.statLabel} mono`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIMENSIONS STRIP */}
      <section className={styles.dimStrip}>
        <div className="page-wrap">
          <p className={`${styles.sectionLabel} mono`}>8 Scored Dimensions</p>
          <div className={styles.dimRow}>
            {DIMS.map(d => (
              <span
                key={d.label}
                className={styles.dimPill}
                style={{ color: d.color, borderColor: `${d.color}40` }}
              >
                {d.icon} {d.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CITIES */}
      <section className={styles.featuredSection}>
        <div className="page-wrap">
          <p className={`${styles.sectionLabel} mono`}>Featured Cities</p>
          {loading ? (
            <div className={styles.skeletonGrid}>
              {FEATURED_IDS.map(id => <div key={id} className={`skeleton ${styles.skeletonCard}`} />)}
            </div>
          ) : (
            <div className={styles.cityGrid}>
              {featured.map(city => <CityCard key={city.id} city={city} />)}
            </div>
          )}
          <div className={styles.viewAll}>
            <Link to="/explore" className={styles.ghostBtn}>View All 10 US Cities →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className="page-wrap">
          <p className={`${styles.sectionLabel} mono`}>How It Works</p>
          <div className={styles.howGrid}>
            {[
              { n:'01', title:'Search a city',     body:'Type any of our 10 profiled US cities. Use the search bar or browse the Explore page.' },
              { n:'02', title:'Read the report',   body:'Each city gets scored 0–100 across 8 dimensions, with letter grades and verdicts.' },
              { n:'03', title:'Compare cities',    body:'Head to the Compare page to put two cities side-by-side and see exactly where they differ.' },
              { n:'04', title:'Decide with data',  body:'Use the scores — and the methodology notes — to make a more informed decision.' },
            ].map(s => (
              <div key={s.n} className={styles.howCard}>
                <div className={`${styles.howNum} mono`}>{s.n}</div>
                <div className={styles.howTitle}>{s.title}</div>
                <div className={styles.howBody}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
