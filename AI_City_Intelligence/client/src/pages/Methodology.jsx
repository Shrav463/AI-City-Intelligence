// client/src/pages/Methodology.jsx
import styles from './Methodology.module.css';

const DIMS = [
  { label:'Safety',         color:'#5ccfee', body:'Composite of Numbeo crime indices, OSAC safety reports, night-time personal safety perception, and police responsiveness data.' },
  { label:'Affordability',  color:'#f9c846', body:'Rent index, cost of living index, purchasing power parity, and a representative basket of goods weighted toward a mid-salary remote worker.' },
  { label:'Job Market',     color:'#c8f04a', body:'Job portal activity, average tech-sector salary levels, startup ecosystem density, and openness to remote and contract workers.' },
  { label:'Lifestyle',      color:'#f47fff', body:'Social scene, nightlife, recreational options, cultural event density, and qualitative work-life balance surveys.' },
  { label:'Transit',        color:'#7d9bff', body:'Public transport network coverage (GTFS data), reliability scores, Walk Score, and cycling infrastructure quality.' },
  { label:'Food & Culture', color:'#ff8c5a', body:'Restaurant density, Michelin star count, cuisine variety, street food quality, and arts venue density.' },
  { label:'Nature',         color:'#55e09d', body:'Percentage of city area as green space, proximity to wilderness, annual PM2.5 air quality, park access.' },
  { label:'Expat Friendly', color:'#e0c4ff', body:'EF English Proficiency Index, visa ease for common nationalities, expat community size, and Internations Expat Insider survey data.' },
];

const GRADES = [
  { range:'93–100', grade:'A+', color:'var(--green)',  meaning:'World-leading. Top 5% globally.' },
  { range:'87–92',  grade:'A',  color:'var(--green)',  meaning:'Excellent. Clear strength, minor caveats.' },
  { range:'80–86',  grade:'A−', color:'var(--green)',  meaning:'Very good. Noticeable strengths, one or two gaps.' },
  { range:'73–79',  grade:'B+/B', color:'var(--accent)', meaning:'Solid. Above average with some friction.' },
  { range:'60–72',  grade:'C',  color:'var(--yellow)', meaning:'Mixed. Some genuine problems in this area.' },
  { range:'50–59',  grade:'D',  color:'var(--red)',    meaning:'Poor. Real challenges worth factoring in.' },
  { range:'0–49',   grade:'F',  color:'var(--red)',    meaning:'Serious deficiency. A meaningful drawback.' },
];

export default function Methodology() {
  return (
    <div className="page-wrap">
      <header className={styles.header}>
        <p className={`mono ${styles.eyebrow}`}>// how we score cities</p>
        <h1 className={styles.title}>Methodology</h1>
        <p className={styles.sub}>
          A plain-language explanation of how scores are derived, what they mean, and where they fall short.
          Transparency over false confidence.
        </p>
      </header>

      <div className={styles.content}>

        <section className={styles.section}>
          <h2>Overview</h2>
          <p>AI City Intelligence generates scores by synthesising publicly available data, qualitative research, and model-assisted interpretation across 8 urban dimensions. Each city receives a score from 0–100 per dimension, a letter grade, and a one-line verdict. The overall city grade is a simple arithmetic average of the 8 dimension scores — no dimension is weighted above another by default.</p>
          <div className={styles.callout}>
            <strong>Prototype caveat:</strong> In this version, scores are model-generated illustrative values, not live API pulls. They are calibrated against available public indices but have not been formally validated. This is academic/prototype work, not a commercial product.
          </div>
        </section>

        <section className={styles.section}>
          <h2>The 8 Dimensions</h2>
          <p>Each dimension captures a distinct aspect of urban liveability, selected based on what featured most consistently in relocation decision frameworks across expat forums, subreddits, and academic liveability indices.</p>
          <div className={styles.dimList}>
            {DIMS.map(d => (
              <div key={d.label} className={styles.dimRow}>
                <div className={styles.dimName} style={{ color: d.color }}>{d.label}</div>
                <div className={styles.dimBody}>{d.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Grading Scale</h2>
          <p>Scores translate to letter grades using standard academic thresholds. The grading is intentionally hard — a score of 73 is only a B, not an A.</p>
          <table className={styles.gradeTable}>
            <thead><tr><th>Score</th><th>Grade</th><th>What it means</th></tr></thead>
            <tbody>
              {GRADES.map(g => (
                <tr key={g.grade}>
                  <td className="mono" style={{fontSize:'.8rem',color:'var(--ink-dim)'}}>{g.range}</td>
                  <td className={styles.gradeCell} style={{color:g.color}}>{g.grade}</td>
                  <td style={{fontSize:'.83rem',color:'var(--ink-dim)'}}>{g.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2>Data Sources</h2>
          <p><strong>Primary:</strong> Numbeo Cost of Living &amp; Crime Index · EIU Global Liveability Index · Mercer Quality of Living Survey · EF English Proficiency Index · Walk Score · OpenAQ Air Quality · GTFS transit feeds · World Bank Open Data</p>
          <p><strong>Secondary/qualitative:</strong> r/digitalnomad &amp; r/expats surveys · Internations Expat Insider · Teleport City Rankings · OSAC Crime &amp; Safety Reports · Google Maps venue density · Lonely Planet editorial</p>
        </section>

        <section className={styles.section}>
          <h2>Limitations</h2>
          <p><strong>Subjective dimensions.</strong> Lifestyle, food, and expat friendliness involve qualitative judgement. Two researchers could reach meaningfully different scores for the same city.</p>
          <p><strong>Point-in-time snapshots.</strong> Cities change. Scores reflect conditions at data collection time and may not capture recent events.</p>
          <p><strong>Whose perspective?</strong> These scores implicitly reflect an English-speaking, tech-adjacent professional. A factory worker, retiree, or local resident would weight dimensions very differently.</p>
          <p><strong>Within-city variance.</strong> A city-level safety score of 85 means nothing if you're in the 10% that's dangerous. Scores describe averages, not neighbourhoods.</p>
        </section>

      </div>
    </div>
  );
}
