// client/src/pages/CityReport.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCity } from '../hooks/useCities';
import DimensionCard from '../components/cards/DimensionCard';
import { getGradeColor } from '../utils/grading';
import styles from './CityReport.module.css';

const DIM_ORDER = ['safety','afford','job','lifestyle','transit','food','nature','expat'];

function Typewriter({ text, speed = 22 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = () => { if (i < text.length) { setDisplayed(text.slice(0, ++i)); setTimeout(t, speed); } };
    const id = setTimeout(t, 300);
    return () => clearTimeout(id);
  }, [text, speed]);
  return <span>{displayed}</span>;
}

export default function CityReport() {
  const { id } = useParams();
  const { city, loading, error } = useCity(id);

  if (loading) return (
    <div className="page-wrap">
      <div className={styles.skeletonHeader}>
        <div className={`skeleton ${styles.skH1}`} />
        <div className={`skeleton ${styles.skH2}`} />
      </div>
      <div className={styles.dimGrid}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`skeleton ${styles.skCard}`} />)}
      </div>
    </div>
  );

  if (error || !city) return (
    <div className="page-wrap" style={{ paddingTop: '5rem', textAlign: 'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🗺</div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'.75rem' }}>City not found</h2>
      <p style={{ color:'var(--ink-dim)', marginBottom:'2rem' }}>We don't have a profile for "{id}" yet.</p>
      <Link to="/explore" className={styles.btnPrimary}>Browse all cities</Link>
    </div>
  );

  const dimList = DIM_ORDER.map(key => ({ key, ...city.scores?.[key] })).filter(d => d.score != null);
  const sorted  = [...dimList].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const weakest   = sorted[sorted.length - 1];

  return (
    <div className="page-wrap">
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> / <Link to="/explore">Explore</Link> / {city.name}
      </div>

      {/* Hero header */}
      <header className={styles.reportHeader}>
        <div>
          <h1 className={styles.cityName}>{city.name}</h1>
          <div className={`mono ${styles.cityMeta}`}>
            {city.country} · {city.region} · Pop. {city.population}<br />
            Founded {city.founded} · {city.timezone} · {city.currency} · {city.language}
          </div>
        </div>
        <div className={styles.gradeBlock}>
          <p className={`mono ${styles.gradeLabel}`}>Overall Grade</p>
          <div className={styles.grade} style={{ color: getGradeColor(city.overallGrade) }}>
            {city.overallGrade}
          </div>
          <p className={`mono ${styles.gradeScore}`}>{city.overall} / 100 avg</p>
        </div>
      </header>

      {/* TL;DR bar */}
      <div className={styles.tldr}>
        <span className={styles.tldrIcon}>✦</span>
        <p className={styles.tldrText}><Typewriter text={city.summary} /></p>
      </div>

      {/* Summary strip */}
      <div className={styles.summaryStrip}>
        <div className={styles.ssCell}>
          <p className={`mono ${styles.ssLabel}`}>↑ Top Strength</p>
          <p className={styles.ssVal} style={{ color:'var(--green)' }}>{strongest?.label} — {strongest?.score}/100</p>
        </div>
        <div className={styles.ssCell}>
          <p className={`mono ${styles.ssLabel}`}>↓ Biggest Gap</p>
          <p className={styles.ssVal} style={{ color:'var(--yellow)' }}>{weakest?.label} — {weakest?.score}/100</p>
        </div>
        <div className={styles.ssCell}>
          <p className={`mono ${styles.ssLabel}`}>✦ Best For</p>
          <p className={styles.ssVal}>{city.pros?.[0]}</p>
        </div>
      </div>

      {/* Dimension grid */}
      <p className={`mono ${styles.sectionLabel}`}>Report Card — 8 Dimensions</p>
      <div className={styles.dimGrid}>
        {dimList.map((dim, i) => (
          <DimensionCard
            key={dim.key}
            dimKey={dim.key}
            label={dim.label}
            icon={dim.icon}
            color={dim.color}
            score={dim.score}
            grade={dim.grade}
            index={i}
          />
        ))}
      </div>

      {/* Description */}
      <p className={`mono ${styles.sectionLabel}`}>City Overview</p>
      <div className={styles.description}>{city.description}</div>

      {/* Pros / Cons */}
      <div className={styles.prosCons}>
        <div className={styles.pcCell}>
          <p className={`mono ${styles.pcHeader}`} style={{ color:'var(--green)' }}>✓ Pros</p>
          {city.pros?.map((p, i) => (
            <div key={i} className={styles.pcItem}><span style={{ color:'var(--green)' }}>—</span> {p}</div>
          ))}
        </div>
        <div className={styles.pcCell}>
          <p className={`mono ${styles.pcHeader}`} style={{ color:'var(--red)' }}>✗ Cons</p>
          {city.cons?.map((c, i) => (
            <div key={i} className={styles.pcItem}><span style={{ color:'var(--red)' }}>—</span> {c}</div>
          ))}
        </div>
      </div>

      {/* Compare CTA */}
      <div className={styles.compareCta}>
        <p>How does {city.name} stack up against another city?</p>
        <Link to={`/compare?a=${city.id}`} className={styles.btnPrimary}>Compare {city.name} →</Link>
      </div>
    </div>
  );
}
