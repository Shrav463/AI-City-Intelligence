// client/src/components/cards/CityCard.jsx
import { Link } from 'react-router-dom';
import ScoreBar from '../charts/ScoreBar';
import { getGradeColor } from '../../utils/grading';
import styles from './CityCard.module.css';

const DIM_ORDER = ['safety','afford','job','lifestyle','transit','food','nature','expat'];
const DIM_COLORS = {
  safety:'#5ccfee', afford:'#f9c846', job:'#c8f04a', lifestyle:'#f47fff',
  transit:'#7d9bff', food:'#ff8c5a', nature:'#55e09d', expat:'#e0c4ff',
};

export default function CityCard({ city }) {
  const { id, name, country, region, overall, overallGrade, scores } = city;

  return (
    <Link to={`/city/${id}`} className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.meta}>{country} · {region}</div>
        </div>
        <div className={styles.grade} style={{ color: getGradeColor(overallGrade) }}>
          {overallGrade}
        </div>
      </div>

      {scores && (
        <div className={styles.bars}>
          {DIM_ORDER.map((key, i) => (
            scores[key] && (
              <div key={key} className={styles.barRow}>
                <span className={styles.barLabel}>{key.slice(0,6)}</span>
                <ScoreBar score={scores[key].score} color={DIM_COLORS[key]} height={3} delay={i * 50} />
                <span className={styles.barScore} style={{ color: DIM_COLORS[key] }}>
                  {scores[key].score}
                </span>
              </div>
            )
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.avg}>{overall}/100 avg</span>
        <span className={styles.arrow}>View →</span>
      </div>
    </Link>
  );
}
