'use client';

import Link from 'next/link';
import { IconPokeball, IconExternalLink, IconGrid } from '@/components/Icons';

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 15, 0.92)',
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
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '11px' }}>
          <div className="animate-icon-entrance" style={{ animationDelay: '0s' }}>
            <IconPokeball size={34} />
          </div>
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '21px',
              fontWeight: 700,
              color: '#f0f0f8',
              letterSpacing: '0.03em',
            }}
          >
            PokéExplorer
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link
            href="/"
            style={{
              color: 'rgba(240,240,248,0.55)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              padding: '7px 14px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,248,0.55)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <IconGrid size={14} />
            Pokédex
          </Link>

          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(240,240,248,0.55)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              padding: '7px 14px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#f0f0f8';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,248,0.55)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            API Docs
            <IconExternalLink size={12} />
          </a>

          <div
            style={{
              background: 'rgba(84,89,193,0.18)',
              border: '1px solid rgba(84,89,193,0.35)',
              color: '#9fa4f0',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 13px',
              borderRadius: '6px',
              letterSpacing: '0.04em',
            }}
          >
            1025+ Pokémon
          </div>
        </div>
      </div>
    </nav>
  );
}
