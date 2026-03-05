// client/src/components/charts/ScoreBar.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './ScoreBar.module.css';

export default function ScoreBar({ score = 0, color = 'var(--accent)', height = 6, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(score), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [score, delay]);

  return (
    <div className={styles.track} style={{ height }} ref={ref}>
      <div
        className={styles.fill}
        style={{ width: `${width}%`, background: color, transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
      />
    </div>
  );
}
