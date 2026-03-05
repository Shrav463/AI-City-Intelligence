// client/src/hooks/useSearch.js
import { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await api.searchCities(query);
        setResults(res.data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(timer.current);
  }, [query]);

  return { query, setQuery, results, loading };
}
