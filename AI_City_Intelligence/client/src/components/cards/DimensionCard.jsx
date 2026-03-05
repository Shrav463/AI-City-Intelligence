// client/src/components/cards/DimensionCard.jsx
import { useEffect, useRef, useState } from 'react';
import ScoreBar from '../charts/ScoreBar';
import { getVerdict } from '../../utils/grading';
import styles from './DimensionCard.module.css';

export default function DimensionCard({ dimKey, label, icon, color, score, grade, index = 0 }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setRevealed(true), index * 90); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref} className={`${styles.card} ${revealed ? styles.revealed : ''}`} style={{ '--dim-color': color }}>
      <div className={styles.header}>
        <div className={styles.iconName}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.name}>{label}</span>
        </div>
        <span className={styles.grade}>{grade}</span>
      </div>
      <ScoreBar score={score} color={color} delay={index * 90 + 100} />
      <div className={styles.bottom}>
        <span className={styles.scoreNum} style={{ color }}>{score}/100</span>
        <span className={styles.verdict}>{getVerdict(dimKey, score)}</span>
      </div>
    </div>
  );
}
