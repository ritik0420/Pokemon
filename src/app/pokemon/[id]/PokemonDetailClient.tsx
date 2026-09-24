'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PokemonDetail } from '@/types/pokemon';
import {
  getTypeColor, getStatColor, getStatName,
  formatPokemonName, padId, MAX_STAT,
} from '@/utils/pokemon';
import {
  IconArrowLeft, IconArrowRight, IconBarChart, IconStar, IconZap,
  IconSword, IconRuler, IconWeight, IconFlask, IconDna, IconShield,
} from '@/components/Icons';

interface Props {
  pokemon: PokemonDetail;
  species: Record<string, unknown> | null;
}

/* ── animated count-up number ── */
function CountUp({ to, duration = 1200, delay = 0 }: { to: number; duration?: number; delay?: number }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * to));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, delay]);

  return <>{value}</>;
}

/* ── stat bar with animated fill + count-up ── */
function StatBar({ name, value, delay = 0 }: { name: string; value: number; delay?: number }) {
  const [animated, setAnimated] = useState(false);
  const color = getStatColor(name);
  const pct = Math.min((value / MAX_STAT) * 100, 100);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay + 200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
      <span style={{
        color, fontSize: '11px', fontWeight: 700,
        width: '60px', textAlign: 'right', flexShrink: 0,
        textTransform: 'uppercase', letterSpacing: '0.07em',
      }}>
        {getStatName(name)}
      </span>
      <span style={{
        color: '#f0f0f8', fontSize: '14px', fontWeight: 700,
        width: '36px', flexShrink: 0,
        fontFamily: "'Rajdhani', sans-serif",
        transition: 'opacity 0.3s ease',
        opacity: animated ? 1 : 0,
      }}>
        {animated ? <CountUp to={value} duration={900} delay={0} /> : 0}
      </span>
      <div style={{
        flex: 1, height: '7px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '4px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: animated ? `${pct}%` : '0%',
          background: color, borderRadius: '4px',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </div>
  );
}

const TABS = [
  { id: 'stats'     as const, label: 'Base Stats', Icon: IconBarChart },
  { id: 'abilities' as const, label: 'Abilities',  Icon: IconShield   },
  { id: 'moves'     as const, label: 'Moves',      Icon: IconSword    },
];

const INFO_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Height:    IconRuler,
  Weight:    IconWeight,
  'Base EXP': IconFlask,
  Species:   IconDna,
};

export default function PokemonDetailClient({ pokemon, species }: Props) {
  const [shiny, setShiny] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'abilities' | 'moves'>('stats');

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getTypeColor(primaryType);

  const flavorText = (species as { flavor_text_entries?: { flavor_text: string; language: { name: string } }[] } | null)
    ?.flavor_text_entries
    ?.find(e => e.language.name === 'en')
    ?.flavor_text
    ?.replace(/\f/g, ' ')
    ?.replace(/\n/g, ' ') || '';

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  const officialArt = shiny
    ? pokemon.sprites.other['official-artwork'].front_shiny
    : pokemon.sprites.other['official-artwork'].front_default;
  const imageUrl = officialArt || (shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default) || '';

  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);
  const moves = pokemon.moves.slice(0, 30);

  const infoItems = [
    { label: 'Height',    value: `${(pokemon.height / 10).toFixed(1)} m`  },
    { label: 'Weight',    value: `${(pokemon.weight / 10).toFixed(1)} kg` },
    { label: 'Base EXP',  value: pokemon.base_experience || '—'           },
    { label: 'Species',   value: formatPokemonName(pokemon.species.name)  },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Type accent bar at top */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', background: typeColor.bg, zIndex: 60,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* Back */}
        <Link
          href="/"
          className="icon-btn animate-slide-in-left"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
            fontSize: '13px', fontWeight: 500, marginBottom: '32px',
            padding: '7px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          }}
        >
          <IconArrowLeft size={14} />
          Pokédex
        </Link>

        {/* Main grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '28px', alignItems: 'start' }}
          className="detail-grid"
        >
          {/* ── LEFT panel ── */}
          <div
            className="animate-scale-in"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${typeColor.border}44`,
              borderRadius: '20px', padding: '28px 20px',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Solid type tint */}
            <div style={{ position: 'absolute', inset: 0, background: typeColor.bg, opacity: 0.05 }} />

            {/* Pokeball watermark */}
            <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '180px', height: '180px', opacity: 0.03 }}>
              <svg viewBox="0 0 100 100" width="180" height="180">
                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="5" />
                <path d="M2 50 A48 48 0 0 1 98 50" fill="white" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="#0a0a0f" strokeWidth="5" />
                <circle cx="50" cy="50" r="14" fill="#0a0a0f" stroke="white" strokeWidth="5" />
                <circle cx="50" cy="50" r="8" fill="white" />
              </svg>
            </div>

            {/* Dex number */}
            <div style={{
              position: 'relative', fontSize: '12px',
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              color: typeColor.bg, letterSpacing: '0.14em', marginBottom: '6px',
            }}>
              #{padId(pokemon.id)}
            </div>

            {/* Sprite */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }} className="animate-float">
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl} alt={pokemon.name}
                  width={220} height={220}
                  style={{ objectFit: 'contain', position: 'relative' }}
                  loading="eager"
                />
              )}
            </div>

            {/* Name — animated slide-in */}
            <h1
              className="animate-slide-in-left"
              style={{
                fontSize: '30px', fontWeight: 800,
                fontFamily: "'Rajdhani', 'Inter', sans-serif",
                color: '#f0f0f8', letterSpacing: '0.02em',
                marginBottom: '12px', position: 'relative',
              }}
            >
              {formatPokemonName(pokemon.name)}
            </h1>

            {/* Type badges */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '22px', position: 'relative' }}>
              {pokemon.types.map(({ type }) => {
                const tc = getTypeColor(type.name);
                return (
                  <span
                    key={type.name}
                    style={{
                      background: tc.bg, color: tc.text,
                      fontSize: '11px', fontWeight: 700,
                      padding: '4px 14px', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}
                  >
                    {type.name}
                  </span>
                );
              })}
            </div>

            {/* Shiny toggle — with star icon */}
            <button
              onClick={() => setShiny(s => !s)}
              style={{
                position: 'relative', padding: '9px 18px',
                background: shiny ? 'rgba(212,160,23,0.18)' : 'rgba(255,255,255,0.05)',
                border: shiny ? '1px solid rgba(212,160,23,0.55)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: shiny ? '#d4a017' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
                display: 'inline-flex', alignItems: 'center', gap: '7px',
              }}
            >
              <IconStar size={13} color={shiny ? '#d4a017' : 'rgba(255,255,255,0.4)'} />
              {shiny ? 'Shiny' : 'View Shiny'}
            </button>

            {/* Info grid with icons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '22px', position: 'relative' }}>
              {infoItems.map(({ label, value }) => {
                const Icon = INFO_ICONS[label];
                return (
                  <div
                    key={label}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '10px', padding: '11px 12px',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                      {Icon && <Icon size={11} color="rgba(255,255,255,0.28)" />}
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                        {label}
                      </div>
                    </div>
                    <div style={{ color: '#f0f0f8', fontSize: '15px', fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
              {prevId && (
                <Link
                  href={`/pokemon/${prevId}`}
                  className="icon-btn"
                  style={{
                    flex: 1, padding: '9px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', fontSize: '12px', fontWeight: 600,
                    textAlign: 'center', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <IconArrowLeft size={12} />
                  #{prevId}
                </Link>
              )}
              {nextId && (
                <Link
                  href={`/pokemon/${nextId}`}
                  className="icon-btn icon-btn-right"
                  style={{
                    flex: 1, padding: '9px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', fontSize: '12px', fontWeight: 600,
                    textAlign: 'center', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  #{nextId}
                  <IconArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>

          {/* ── RIGHT panel ── */}
          <div className="animate-fade-in-up">

            {/* Flavor text */}
            {flavorText && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: `3px solid ${typeColor.bg}`,
                borderRadius: '12px', padding: '18px 20px', marginBottom: '22px',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.75, fontStyle: 'italic' }}>
                  &ldquo;{flavorText}&rdquo;
                </p>
              </div>
            )}

            {/* Tabs — with SVG icons */}
            <div style={{
              display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '22px', gap: '2px',
            }}>
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    padding: '10px 18px',
                    background: 'transparent', border: 'none',
                    borderBottom: activeTab === id ? `2px solid ${typeColor.bg}` : '2px solid transparent',
                    color: activeTab === id ? '#f0f0f8' : 'rgba(255,255,255,0.35)',
                    cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                    transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
                    marginBottom: '-1px',
                    display: 'flex', alignItems: 'center', gap: '7px',
                  }}
                >
                  <Icon size={13} color={activeTab === id ? typeColor.bg : 'rgba(255,255,255,0.3)'} />
                  {label}
                </button>
              ))}
            </div>

            {/* Stats */}
            {activeTab === 'stats' && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px',
              }}>
                {pokemon.stats.map((s, i) => (
                  <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} delay={i * 80} />
                ))}
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '14px', marginTop: '8px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Total
                  </span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '30px', fontWeight: 700, color: typeColor.bg }} className="animate-number">
                    <CountUp to={totalStats} duration={1000} delay={400} />
                  </span>
                </div>
              </div>
            )}

            {/* Abilities */}
            {activeTab === 'abilities' && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <div
                      key={ability.name}
                      className="animate-slide-in-left"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '10px', padding: '14px 18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconShield size={14} color="rgba(255,255,255,0.2)" />
                        <p style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '14px', textTransform: 'capitalize' }}>
                          {formatPokemonName(ability.name)}
                        </p>
                      </div>
                      {is_hidden && (
                        <span style={{
                          background: 'rgba(84,89,193,0.18)',
                          border: '1px solid rgba(84,89,193,0.4)',
                          color: '#9fa4f0', fontSize: '10px', fontWeight: 700,
                          padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.07em',
                        }}>
                          HIDDEN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Moves */}
            {activeTab === 'moves' && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', marginBottom: '16px' }}>
                  Showing first 30 of {pokemon.moves.length} moves
                </p>
                <div
                  className="moves-grid"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(138px, 1fr))', gap: '7px' }}
                >
                  {moves.map(({ move }) => (
                    <div
                      key={move.name}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '8px', padding: '8px 12px',
                        color: 'rgba(255,255,255,0.65)',
                        fontSize: '12px', fontWeight: 500, textTransform: 'capitalize',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      <IconZap size={10} color={typeColor.bg} />
                      {formatPokemonName(move.name)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
