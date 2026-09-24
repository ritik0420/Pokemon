'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Pokeball icon */}
          <div style={{ position: 'relative', width: '36px', height: '36px' }}>
            <svg viewBox="0 0 100 100" width="36" height="36">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <path d="M2 50 A48 48 0 0 1 98 50" fill="#ef4444" />
              <path d="M2 50 A48 48 0 0 0 98 50" fill="rgba(255,255,255,0.08)" />
              <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle cx="50" cy="50" r="14" fill="#0a0a0f" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.2)" />
            </svg>
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '22px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.02em',
              }}
            >
              PokéExplorer
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            href="/"
            style={{
              color: 'rgba(240,240,248,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.color = '#f0f0f8';
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.color = 'rgba(240,240,248,0.7)';
              (e.target as HTMLElement).style.background = 'transparent';
            }}
          >
            Pokédex
          </Link>

          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(240,240,248,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.color = '#f0f0f8';
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.color = 'rgba(240,240,248,0.7)';
              (e.target as HTMLElement).style.background = 'transparent';
            }}
          >
            API Docs ↗
          </a>

          {/* Badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(96,165,250,0.15))',
              border: '1px solid rgba(167,139,250,0.25)',
              color: '#a78bfa',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.05em',
            }}
          >
            1025+ Pokémon
          </div>
        </div>
      </div>
    </nav>
  );
}
