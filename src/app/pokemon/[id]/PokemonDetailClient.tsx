'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PokemonDetail } from '@/types/pokemon';
import {
  getTypeColor,
  getStatColor,
  getStatName,
  formatPokemonName,
  padId,
  TYPE_EMOJI,
  MAX_STAT,
} from '@/utils/pokemon';

interface Props {
  pokemon: PokemonDetail;
  species: Record<string, unknown> | null;
}

function StatBar({ name, value, delay = 0 }: { name: string; value: number; delay?: number }) {
  const [animated, setAnimated] = useState(false);
  const color = getStatColor(name);
  const pct = Math.min((value / MAX_STAT) * 100, 100);
  const label = getStatName(name);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay + 200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <span
        style={{
          color: color,
          fontSize: '11px',
          fontWeight: 700,
          width: '60px',
          textAlign: 'right',
          flexShrink: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: '#f0f0f8',
          fontSize: '14px',
          fontWeight: 700,
          width: '36px',
          flexShrink: 0,
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        {value}
      </span>
      <div
        style={{
          flex: 1,
          height: '8px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: animated ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            borderRadius: '999px',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

export default function PokemonDetailClient({ pokemon, species }: Props) {
  const [shiny, setShiny] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'moves' | 'abilities'>('stats');

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getTypeColor(primaryType);

  const flavorText = (species as { flavor_text_entries?: { flavor_text: string; language: { name: string } }[] } | null)
    ?.flavor_text_entries
    ?.find((e) => e.language.name === 'en')
    ?.flavor_text
    ?.replace(/\f/g, ' ')
    ?.replace(/\n/g, ' ') || '';

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  const officialArt = shiny
    ? pokemon.sprites.other['official-artwork'].front_shiny
    : pokemon.sprites.other['official-artwork'].front_default;
  const fallbackSprite = shiny
    ? pokemon.sprites.front_shiny
    : pokemon.sprites.front_default;
  const imageUrl = officialArt || fallbackSprite || '';

  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  const moves = pokemon.moves.slice(0, 30);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60vh',
          background: `radial-gradient(ellipse at 50% 0%, ${typeColor.glow} 0%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '32px 24px 80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Back button */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '32px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          ← Back to Pokédex
        </Link>

        {/* Main content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 420px) 1fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="detail-grid"
        >
          {/* LEFT: Pokemon image card */}
          <div
            className="animate-scale-in"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${typeColor.border}33`,
              borderRadius: '28px',
              padding: '32px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 0 60px ${typeColor.glow}`,
            }}
          >
            {/* Type gradient bg */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: typeColor.gradient,
                opacity: 0.07,
              }}
            />

            {/* Decorative pokeball bg */}
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                right: '-40px',
                width: '200px',
                height: '200px',
                opacity: 0.04,
              }}
            >
              <svg viewBox="0 0 100 100" width="200" height="200">
                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="4" />
                <path d="M2 50 A48 48 0 0 1 98 50" fill="white" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="#0a0a0f" strokeWidth="4" />
                <circle cx="50" cy="50" r="14" fill="#0a0a0f" stroke="white" strokeWidth="4" />
                <circle cx="50" cy="50" r="8" fill="white" />
              </svg>
            </div>

            {/* Number */}
            <div
              style={{
                position: 'relative',
                fontSize: '13px',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                color: typeColor.bg,
                opacity: 0.8,
                letterSpacing: '0.12em',
                marginBottom: '8px',
              }}
            >
              #{padId(pokemon.id)}
            </div>

            {/* Image */}
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '16px',
              }}
              className="animate-float"
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '160px',
                  height: '40px',
                  background: typeColor.gradient,
                  filter: 'blur(24px)',
                  opacity: 0.5,
                  borderRadius: '50%',
                }}
              />
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  width={240}
                  height={240}
                  style={{ objectFit: 'contain', position: 'relative' }}
                  loading="eager"
                />
              )}
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                fontFamily: "'Rajdhani', 'Inter', sans-serif",
                color: '#f0f0f8',
                letterSpacing: '0.02em',
                marginBottom: '12px',
                position: 'relative',
              }}
            >
              {formatPokemonName(pokemon.name)}
            </h1>

            {/* Types */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '24px',
                position: 'relative',
              }}
            >
              {pokemon.types.map(({ type }) => {
                const tc = getTypeColor(type.name);
                return (
                  <span
                    key={type.name}
                    style={{
                      background: tc.bg,
                      color: tc.text,
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '5px 16px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      boxShadow: `0 2px 12px ${tc.glow}`,
                    }}
                  >
                    {TYPE_EMOJI[type.name] || ''} {type.name}
                  </span>
                );
              })}
            </div>

            {/* Shiny toggle */}
            <button
              onClick={() => setShiny(s => !s)}
              style={{
                position: 'relative',
                padding: '10px 24px',
                background: shiny ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
                border: shiny ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: shiny ? '#fbbf24' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {shiny ? '✨ Shiny' : '⭐ View Shiny'}
            </button>

            {/* Quick info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginTop: '24px',
                position: 'relative',
              }}
            >
              {[
                { label: 'Height', value: `${(pokemon.height / 10).toFixed(1)} m` },
                { label: 'Weight', value: `${(pokemon.weight / 10).toFixed(1)} kg` },
                { label: 'Base EXP', value: pokemon.base_experience || '—' },
                { label: 'Species', value: formatPokemonName(pokemon.species.name) },
              ].map(info => (
                <div
                  key={info.label}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                >
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {info.label}
                  </div>
                  <div style={{ color: '#f0f0f8', fontSize: '16px', fontWeight: 700, marginTop: '4px', fontFamily: "'Rajdhani', sans-serif" }}>
                    {info.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginTop: '24px',
                position: 'relative',
              }}
            >
              {prevId && (
                <Link
                  href={`/pokemon/${prevId}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  ← #{prevId}
                </Link>
              )}
              {nextId && (
                <Link
                  href={`/pokemon/${nextId}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  #{nextId} →
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="animate-fade-in-up">
            {/* Flavor text */}
            {flavorText && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${typeColor.border}22`,
                  borderRadius: '16px',
                  padding: '20px 24px',
                  marginBottom: '24px',
                  borderLeft: `3px solid ${typeColor.bg}`,
                }}
              >
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{flavorText}&rdquo;
                </p>
              </div>
            )}

            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '24px',
                background: 'rgba(255,255,255,0.04)',
                padding: '4px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {(['stats', 'abilities', 'moves'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: activeTab === tab ? typeColor.bg + '22' : 'transparent',
                    border: activeTab === tab ? `1px solid ${typeColor.bg}44` : '1px solid transparent',
                    borderRadius: '10px',
                    color: activeTab === tab ? typeColor.bg : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'capitalize',
                    letterSpacing: '0.03em',
                  }}
                >
                  {tab === 'stats' ? '📊 Stats' : tab === 'abilities' ? '✨ Abilities' : '⚔️ Moves'}
                </button>
              ))}
            </div>

            {/* Stats tab */}
            {activeTab === 'stats' && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '28px',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f0f8', marginBottom: '24px' }}>
                  Base Stats
                </h2>
                {pokemon.stats.map((s, i) => (
                  <StatBar
                    key={s.stat.name}
                    name={s.stat.name}
                    value={s.base_stat}
                    delay={i * 80}
                  />
                ))}
                {/* Total */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '16px',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      background: typeColor.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {totalStats}
                  </span>
                </div>
              </div>
            )}

            {/* Abilities tab */}
            {activeTab === 'abilities' && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '28px',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f0f8', marginBottom: '20px' }}>
                  Abilities
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <div
                      key={ability.name}
                      style={{
                        background: is_hidden ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.04)',
                        border: is_hidden ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '14px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: '#f0f0f8',
                            fontWeight: 700,
                            fontSize: '15px',
                            textTransform: 'capitalize',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {formatPokemonName(ability.name)}
                        </p>
                      </div>
                      {is_hidden && (
                        <span
                          style={{
                            background: 'rgba(99,102,241,0.2)',
                            border: '1px solid rgba(99,102,241,0.4)',
                            color: '#a78bfa',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '999px',
                            letterSpacing: '0.06em',
                          }}
                        >
                          HIDDEN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Moves tab */}
            {activeTab === 'moves' && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '28px',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f0f8', marginBottom: '8px' }}>
                  Moves
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginBottom: '20px' }}>
                  Showing first 30 of {pokemon.moves.length} moves
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '8px',
                  }}
                >
                  {moves.map(({ move }) => (
                    <div
                      key={move.name}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '13px',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
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
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
