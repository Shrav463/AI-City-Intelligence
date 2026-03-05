// client/src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page-wrap ${styles.inner}`}>
        <span className={styles.logo}>AI City Intelligence — thesis prototype v0.9.2</span>
        <ul className={styles.links}>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/compare">Compare</Link></li>
          <li><Link to="/methodology">Methodology</Link></li>
        </ul>
        <span className={styles.note}>Scores are model-generated. Not official data.</span>
      </div>
    </footer>
  );
}
