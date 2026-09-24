export default function LoadingSpinner({ message = 'Loading Pokémon...' }: { message?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: '24px',
      }}
    >
      {/* Pokeball spinner */}
      <div className="pokeball-spinner" style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg viewBox="0 0 100 100" width="80" height="80">
          {/* Outer ring */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          {/* Top half */}
          <path d="M4 50 A46 46 0 0 1 96 50" fill="#ef4444" />
          {/* Bottom half */}
          <path d="M4 50 A46 46 0 0 0 96 50" fill="rgba(255,255,255,0.08)" />
          {/* Divider line */}
          <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
          {/* Center button - outer */}
          <circle cx="50" cy="50" r="16" fill="#0a0a0f" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
          {/* Center button - inner glow */}
          <circle cx="50" cy="50" r="9" fill="rgba(99,102,241,0.4)" />
          <circle cx="50" cy="50" r="5" fill="rgba(167,139,250,0.8)" />
        </svg>
      </div>

      {/* Message */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {message}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginTop: '6px' }}>
          Fetching from PokéAPI...
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#6366f1',
              animation: `pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
