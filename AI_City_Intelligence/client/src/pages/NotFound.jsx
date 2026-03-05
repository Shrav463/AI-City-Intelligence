// client/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-wrap" style={{ textAlign:'center', paddingTop:'6rem', paddingBottom:'6rem' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'.7rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem' }}>
        // 404
      </div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'3rem', marginBottom:'.75rem' }}>
        Page not found
      </h1>
      <p style={{ color:'var(--ink-dim)', marginBottom:'2.5rem', maxWidth:'40ch', margin:'0 auto 2.5rem' }}>
        The page you're looking for doesn't exist. Maybe a city does though.
      </p>
      <Link
        to="/"
        style={{ display:'inline-flex', padding:'.75rem 1.5rem', background:'var(--accent)', color:'#0d0d0f', borderRadius:'var(--radius-md)', fontWeight:700, fontSize:'.85rem' }}
      >
        Back to Home
      </Link>
    </div>
  );
}
