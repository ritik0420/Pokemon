import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      {/* Sad Pokeball */}
      <div style={{ marginBottom: '32px', opacity: 0.5 }}>
        <svg viewBox="0 0 100 100" width="120" height="120">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <path d="M2 50 A48 48 0 0 1 98 50" fill="rgba(239,68,68,0.3)" />
          <path d="M2 50 A48 48 0 0 0 98 50" fill="rgba(255,255,255,0.05)" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="50" cy="50" r="14" fill="#0a0a0f" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="50" cy="50" r="8" fill="rgba(239,68,68,0.4)" />
        </svg>
      </div>

      <h1
        style={{
          fontFamily: "'Rajdhani', 'Inter', sans-serif",
          fontSize: '80px',
          fontWeight: 900,
          background: 'linear-gradient(135deg, rgba(240,240,248,0.5), rgba(240,240,248,0.2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#f0f0f8',
          marginBottom: '12px',
        }}
      >
        Pokémon Not Found!
      </h2>

      <p
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '15px',
          marginBottom: '40px',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}
      >
        This Pokémon fled into tall grass and couldn&apos;t be found. It may not exist in the Pokédex.
      </p>

      <Link
        href="/"
        style={{
          padding: '14px 36px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: '14px',
          color: '#a78bfa',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
      >
        ← Back to Pokédex
      </Link>
    </div>
  );
}
