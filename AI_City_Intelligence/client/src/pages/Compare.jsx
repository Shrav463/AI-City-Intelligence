// client/src/pages/Compare.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCompare } from '../hooks/useCities';
import SearchBar from '../components/ui/SearchBar';
import ScoreBar from '../components/charts/ScoreBar';
import { getGradeColor } from '../utils/grading';
import { api } from '../utils/api';
import styles from './Compare.module.css';

function CityPicker({ label, value, onChange }) {
  const [allCities, setAllCities] = useState([]);
  useEffect(() => { api.getCities().then(r => setAllCities(r.data)).catch(() => {}); }, []);

  return (
    <div className={styles.pickerWrap}>
      <p className={`mono ${styles.pickerLabel}`}>{label}</p>
      <select
        className={styles.select}
        value={value || ''}
        onChange={e => onChange(e.target.value || null)}
      >
        <option value="">— select a city —</option>
        {allCities.map(c => (
          <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
        ))}
      </select>
    </div>
  );
}

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [idA, setIdA] = useState(searchParams.get('a') || null);
  const [idB, setIdB] = useState(searchParams.get('b') || null);

  const { data, cityA, cityB, loading, error } = useCompare(idA, idB);

  function setCity(side, id) {
    if (side === 'a') { setIdA(id); setSearchParams(p => { id ? p.set('a',id) : p.delete('a'); return p; }); }
    else              { setIdB(id); setSearchParams(p => { id ? p.set('b',id) : p.delete('b'); return p; }); }
  }

  const winsA = data?.filter(r => r.winner === 'a') || [];
  const winsB = data?.filter(r => r.winner === 'b') || [];

  return (
    <div className="page-wrap">
      <header className={styles.header}>
        <p className={`mono ${styles.eyebrow}`}>// side-by-side analysis</p>
        <h1 className={styles.title}>Compare Cities</h1>
        <p className={styles.sub}>Pick two cities and compare them dimension-by-dimension.</p>
      </header>

      <div className={styles.pickers}>
        <CityPicker label="City A" value={idA} onChange={id => setCity('a', id)} />
        <div className={styles.vsBadge}>VS</div>
        <CityPicker label="City B" value={idB} onChange={id => setCity('b', id)} />
      </div>

      {!idA && !idB && (
        <div className={styles.empty}>
          <p>Select two cities above to see a comparison.</p>
        </div>
      )}

      {loading && (
        <div className={styles.loadingRow}>
          {Array.from({length:8}).map((_,i)=><div key={i} className={`skeleton ${styles.skRow}`}/>)}
        </div>
      )}

      {error && <p className={styles.error}>Failed to load comparison: {error}</p>}

      {data && cityA && cityB && (
        <>
          {/* City headers */}
          <div className={styles.compareHeader}>
            <div className={styles.chCity}>
              <div>
                <div className={styles.chName}>{cityA.name}</div>
                <div className={`mono ${styles.chMeta}`}>{cityA.country} · {cityA.region}</div>
              </div>
              <div className={styles.chGrade} style={{color:getGradeColor(cityA.overallGrade)}}>{cityA.overallGrade}</div>
            </div>
            <div className={`mono ${styles.chVs}`}>VS</div>
            <div className={`${styles.chCity} ${styles.chCityRight}`}>
              <div className={styles.chGrade} style={{color:getGradeColor(cityB.overallGrade)}}>{cityB.overallGrade}</div>
              <div style={{textAlign:'right'}}>
                <div className={styles.chName}>{cityB.name}</div>
                <div className={`mono ${styles.chMeta}`}>{cityB.country} · {cityB.region}</div>
              </div>
            </div>
          </div>

          {/* Dimension rows */}
          <div className={styles.dimTable}>
            {data.map((row, i) => (
              <div key={row.key} className={styles.dimRow}>
                <div className={styles.drSide} style={{textAlign:'right'}}>
                  <div className={styles.drScore} style={{color:row.color}}>{row.score_a}<span className={styles.drOf}>/100</span></div>
                  <div className={styles.drGrade} style={{color:row.color}}>{row.grade_a}</div>
                  <ScoreBar score={row.score_a} color={row.color} height={4} delay={i*60} />
                </div>
                <div className={styles.drCenter}>
                  <div className={styles.drIcon}>{row.icon}</div>
                  <div className={`mono ${styles.drLabel}`}>{row.label}</div>
                  <div className={`mono ${styles.winTag} ${styles[`win_${row.winner}`]}`}>
                    {row.winner === 'tie' ? 'TIE' : row.winner === 'a' ? cityA.name : cityB.name}
                  </div>
                </div>
                <div className={styles.drSide}>
                  <div className={styles.drScore} style={{color:row.color}}>{row.score_b}<span className={styles.drOf}>/100</span></div>
                  <div className={styles.drGrade} style={{color:row.color}}>{row.grade_b}</div>
                  <ScoreBar score={row.score_b} color={row.color} height={4} delay={i*60} />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.winSummary}>
            <div className={styles.wsCell}>
              <p className={`mono ${styles.wsLabel}`}>{cityA.name} wins on</p>
              {winsA.length ? winsA.map(r=>(
                <div key={r.key} className={styles.wsItem}><span className={styles.wsBadge}>+</span> {r.label}</div>
              )) : <p className={styles.wsNone}>No clear wins this match-up</p>}
            </div>
            <div className={styles.wsCell}>
              <p className={`mono ${styles.wsLabel}`}>{cityB.name} wins on</p>
              {winsB.length ? winsB.map(r=>(
                <div key={r.key} className={styles.wsItem}><span className={styles.wsBadge}>+</span> {r.label}</div>
              )) : <p className={styles.wsNone}>No clear wins this match-up</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
