import PokemonGrid from '@/components/PokemonGrid';

export const metadata = {
  title: 'PokéExplorer — Discover Every Pokémon',
  description: 'Browse and search the complete Pokédex. Filter by type, generation and find detailed info on all 1025+ Pokémon.',
};

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '96px 24px 48px',
      }}
    >
      {/* Hero section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '56px',
          paddingTop: '16px',
        }}
        className="animate-fade-in-up"
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '999px',
            padding: '6px 18px',
            marginBottom: '24px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#a78bfa',
            letterSpacing: '0.05em',
          }}
        >
          <span>✨</span>
          <span>Powered by PokéAPI</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '20px',
            fontFamily: "'Rajdhani', 'Inter', sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #f0f0f8 0%, rgba(240,240,248,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Explore the{' '}
          </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Pokédex
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '560px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Discover all 1025+ Pokémon with detailed stats, abilities, moves, and stunning artwork. Filter by type or generation.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Pokémon', value: '1,025+', icon: '🎮' },
            { label: 'Generations', value: '9', icon: '🌍' },
            { label: 'Types', value: '18', icon: '🏷️' },
            { label: 'Moves', value: '900+', icon: '⚡' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '16px 28px',
                minWidth: '100px',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#f0f0f8',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pokemon Grid (Client Component with search/filter) */}
      <PokemonGrid />
    </div>
  );
}
