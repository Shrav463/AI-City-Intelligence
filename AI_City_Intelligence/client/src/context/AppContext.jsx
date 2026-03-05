// client/src/context/AppContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../utils/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dimensions, setDimensions] = useState([]);
  const [dimsLoaded, setDimsLoaded] = useState(false);

  const loadDimensions = useCallback(async () => {
    if (dimsLoaded) return;
    try {
      const res = await api.getDimensions();
      setDimensions(res.data);
      setDimsLoaded(true);
    } catch (e) {
      console.error('Failed to load dimensions', e);
    }
  }, [dimsLoaded]);

  return (
    <AppContext.Provider value={{ dimensions, loadDimensions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
