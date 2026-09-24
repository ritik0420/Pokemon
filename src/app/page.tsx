import PokemonGrid from '@/components/PokemonGrid';
import { IconGrid, IconGlobe, IconLayers, IconZap } from '@/components/Icons';

export const metadata = {
  title: 'PokéExplorer — Discover Every Pokémon',
  description: 'Browse and search the complete Pokédex. Filter by type, generation and find detailed info on all 1025+ Pokémon.',
};

const STATS = [
  { label: 'Pokémon',     value: '1,025+', icon: IconGrid,   delay: '0.1s' },
  { label: 'Generations', value: '9',      icon: IconGlobe,  delay: '0.2s' },
  { label: 'Types',       value: '18',     icon: IconLayers, delay: '0.3s' },
  { label: 'Moves',       value: '900+',   icon: IconZap,    delay: '0.4s' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '96px 24px 48px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '56px', paddingTop: '16px' }} className="animate-fade-in-up">

        {/* Label badge */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(84,89,193,0.12)',
            border: '1px solid rgba(84,89,193,0.28)',
            borderRadius: '6px', padding: '5px 16px',
            marginBottom: '28px', fontSize: '12px', fontWeight: 600,
            color: '#9fa4f0', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          Powered by PokéAPI
        </div>

        {/* Animated title */}
        <h1
          style={{
            fontSize: 'clamp(34px, 5.5vw, 68px)',
            fontWeight: 800, lineHeight: 1.05, marginBottom: '18px',
            fontFamily: "'Rajdhani', 'Inter', sans-serif",
            letterSpacing: '-0.01em', color: '#f0f0f8',
          }}
        >
          Explore the{' '}
          <span
            style={{ color: '#9fa4f0' }}
            className="cursor-blink"
          >
            Pokédex
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'rgba(255,255,255,0.38)',
            maxWidth: '520px', margin: '0 auto 44px',
            lineHeight: 1.75, fontWeight: 400,
          }}
        >
          Discover all 1025+ Pokémon with detailed stats, abilities, moves, and artwork. Filter by type or generation.
        </p>

        {/* Stat cards with stagger pop-in */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {STATS.map(({ label, value, icon: Icon, delay }) => (
            <div
              key={label}
              className="animate-pop-in"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', padding: '18px 24px',
                minWidth: '110px', animationDelay: delay,
                opacity: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: '#9fa4f0', opacity: 0.7 }}>
                <Icon size={18} />
              </div>
              <div
                className="animate-number"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '28px', fontWeight: 700,
                  color: '#f0f0f8', lineHeight: 1,
                  animationDelay: delay, opacity: 0,
                }}
              >
                {value}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.3)', fontSize: '11px',
                marginTop: '5px', letterSpacing: '0.07em', textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PokemonGrid />
    </div>
  );
}
