'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PokemonCard } from '@/types/pokemon';
import { getTypeColor, formatPokemonName, padId } from '@/utils/pokemon';

interface Props {
  pokemon: PokemonCard;
  index?: number;
}

export default function PokemonCardComponent({ pokemon, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryType = pokemon.types[0] || 'normal';
  const secondaryType = pokemon.types[1];
  const typeColor = getTypeColor(primaryType);
  const delay = `${(index % 12) * 0.05}s`;

  const imageUrl = !imgError && pokemon.officialArt
    ? pokemon.officialArt
    : pokemon.sprite || '/pokeball-fallback.svg';

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          background: hovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`
            : `rgba(255,255,255,0.04)`,
          border: hovered
            ? `1px solid ${typeColor.border}55`
            : '1px solid rgba(255,255,255,0.08)',
          transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${typeColor.border}33, 0 0 40px ${typeColor.glow}`
            : '0 4px 16px rgba(0,0,0,0.2)',
          animationDelay: delay,
        }}
        className="animate-fade-in-up"
      >
        {/* Type gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: typeColor.gradient,
            opacity: hovered ? 0.12 : 0.06,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: typeColor.gradient,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: typeColor.gradient,
            opacity: 0.05,
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', padding: '20px', zIndex: 1 }}>
          {/* Number */}
          <div
            style={{
              fontSize: '11px',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              color: typeColor.bg,
              opacity: 0.8,
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}
          >
            #{padId(pokemon.id)}
          </div>

          {/* Image */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '12px',
              height: '120px',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Glow behind image */}
            <div
              style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: typeColor.gradient,
                filter: 'blur(20px)',
                opacity: hovered ? 0.5 : 0.2,
                transition: 'opacity 0.35s ease',
              }}
            />
            <div
              style={{
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={pokemon.name}
                width={110}
                height={110}
                style={{ objectFit: 'contain' }}
                onError={() => setImgError(true)}
                loading={index < 12 ? 'eager' : 'lazy'}
              />
            </div>
          </div>

          {/* Name */}
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#f0f0f8',
              textAlign: 'center',
              marginBottom: '10px',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            {formatPokemonName(pokemon.name)}
          </h3>

          {/* Types */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {pokemon.types.map(type => {
              const tc = getTypeColor(type);
              return (
                <span
                  key={type}
                  style={{
                    background: tc.bg + '22',
                    border: `1px solid ${tc.bg}55`,
                    color: tc.bg,
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
