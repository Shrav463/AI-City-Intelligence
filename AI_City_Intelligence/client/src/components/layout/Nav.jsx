// client/src/components/layout/Nav.jsx
import { NavLink, Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.dot} />
        AI City Intelligence
      </Link>
      <ul className={styles.links}>
        <li><NavLink to="/"            end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
        <li><NavLink to="/explore"         className={({ isActive }) => isActive ? styles.active : ''}>Explore</NavLink></li>
        <li><NavLink to="/compare"         className={({ isActive }) => isActive ? styles.active : ''}>Compare</NavLink></li>
        <li><NavLink to="/methodology"     className={({ isActive }) => isActive ? styles.active : ''}>Methodology</NavLink></li>
        <li className={styles.cta}><Link to="/explore">Get Report →</Link></li>
      </ul>
    </nav>
  );
}
