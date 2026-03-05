// client/src/hooks/useCities.js
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export function useCities(continent = null) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.getCities(continent)
      .then(res => { if (!cancelled) { setCities(res.data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [continent]);

  return { cities, loading, error };
}

export function useCity(id) {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setCity(null);
    setError(null);
    api.getCity(id)
      .then(res => { if (!cancelled) { setCity(res.data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id]);

  return { city, loading, error };
}

export function useCompare(idA, idB) {
  const [data, setData] = useState(null);
  const [cityA, setCityA] = useState(null);
  const [cityB, setCityB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idA || !idB) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([api.getCity(idA), api.getCity(idB), api.compare(idA, idB)])
      .then(([resA, resB, cmp]) => {
        if (!cancelled) {
          setCityA(resA.data);
          setCityB(resB.data);
          setData(cmp.data);
          setLoading(false);
        }
      })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [idA, idB]);

  return { data, cityA, cityB, loading, error };
}
