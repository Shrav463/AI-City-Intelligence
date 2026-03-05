// client/src/components/ui/SearchBar.jsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { getGradeColor } from '../../utils/grading';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = 'Search cities…', autoFocus = false }) {
  const { query, setQuery, results, loading } = useSearch();
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  useEffect(() => {
    setOpen(query.length > 0 && results.length > 0);
    setHi(-1);
  }, [results, query]);

  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function selectCity(city) {
    setQuery('');
    setOpen(false);
    navigate(`/city/${city.id}`);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => Math.min(h + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHi(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); if (hi >= 0 && results[hi]) selectCity(results[hi]); else if (results[0]) selectCity(results[0]); }
    if (e.key === 'Escape')    { setOpen(false); }
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => query && results.length && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
      />
      {loading && <span className={styles.spinner} />}

      {open && (
        <div className={styles.dropdown}>
          {results.map((city, i) => (
            <button
              key={city.id}
              className={`${styles.item} ${hi === i ? styles.itemHi : ''}`}
              onMouseEnter={() => setHi(i)}
              onClick={() => selectCity(city)}
            >
              <span className={styles.itemName}>{city.name}</span>
              <span className={styles.itemMeta}>
                {city.country}
                <span className={styles.itemGrade} style={{ color: getGradeColor(city.overallGrade) }}>
                  {city.overallGrade}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
