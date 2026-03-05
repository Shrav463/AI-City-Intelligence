// client/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Nav      from './components/layout/Nav';
import Footer   from './components/layout/Footer';
import Home         from './pages/Home';
import Explore      from './pages/Explore';
import CityReport   from './pages/CityReport';
import Compare      from './pages/Compare';
import Methodology  from './pages/Methodology';
import NotFound     from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/explore"     element={<Explore />} />
            <Route path="/city/:id"    element={<CityReport />} />
            <Route path="/compare"     element={<Compare />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="*"            element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}
