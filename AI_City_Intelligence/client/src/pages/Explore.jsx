// client/src/pages/Explore.jsx
import { useState } from 'react';
import { useCities } from '../hooks/useCities';
import CityCard from '../components/cards/CityCard';
import SearchBar from '../components/ui/SearchBar';
import styles from './Explore.module.css';

const CONTINENTS = ['All', 'Northeast', 'South', 'Midwest', 'West'];
const SORT_OPTIONS = [
  { key: 'overall',   label: 'Overall' },
  { key: 'safety',    label: 'Safety' },
  { key: 'afford',    label: 'Affordability' },
  { key: 'job',       label: 'Jobs' },
  { key: 'transit',   label: 'Transit' },
  { key: 'food',      label: 'Food' },
  { key: 'nature',    label: 'Nature' },
  { key: 'expat',     label: 'Expat' },
];

function getScore(city, key) {
  if (key === 'overall') return city.overall || 0;
  return city.scores?.[key]?.score || 0;
}

export default function Explore() {
  const [continent, setContinent] = useState(null);
  const [sortKey, setSortKey] = useState('overall');
  const { cities, loading, error } = useCities(continent);

  const sorted = [...cities].sort((a, b) => getScore(b, sortKey) - getScore(a, sortKey));

  return (
    <div className="page-wrap">
      <header className={styles.header}>
        <p className={`mono ${styles.eyebrow}`}>// {cities.length} cities profiled</p>
        <h1 className={styles.title}>Explore Cities</h1>
        <p className={styles.sub}>Browse, filter by region, sort by any dimension, or search directly.</p>
        <div className={styles.searchRow}>
          <SearchBar placeholder="Search cities…" />
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.filterBar}>
          <span className={`mono ${styles.filterLabel}`}>US Region:</span>
          {CONTINENTS.map(c => (
            <button
              key={c}
              className={`${styles.filterBtn} ${(continent === null ? 'All' : continent) === c ? styles.active : ''}`}
              onClick={() => setContinent(c === 'All' ? null : c)}
            >{c}</button>
          ))}
        </div>

        <div className={styles.sortBar}>
          <span className={`mono ${styles.sortLabel}`}>Sort:</span>
          {SORT_OPTIONS.map(o => (
            <button
              key={o.key}
              className={`${styles.sortBtn} ${sortKey === o.key ? styles.active : ''}`}
              onClick={() => setSortKey(o.key)}
            >{o.label}</button>
          ))}
        </div>
      </div>

      {error && <p className={styles.error}>Failed to load cities: {error}</p>}

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {sorted.map(city => <CityCard key={city.id} city={city} />)}
        </div>
      )}
    </div>
  );
}
