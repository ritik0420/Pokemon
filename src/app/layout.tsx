import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'PokéExplorer — Discover Every Pokémon',
  description: 'Explore the complete Pokédex with detailed stats, abilities, moves, and beautiful artwork for every Pokémon from Gen I to Gen IX.',
  keywords: ['pokemon', 'pokedex', 'pokémon explorer', 'pokeapi', 'pokemon stats'],
  openGraph: {
    title: 'PokéExplorer — Discover Every Pokémon',
    description: 'Explore the complete Pokédex with detailed stats, abilities, moves, and beautiful artwork.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-grid">
        {/* Ambient glow blobs */}
        <div
          style={{
            position: 'fixed',
            top: '-20vh',
            left: '-10vw',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'fixed',
            bottom: '-20vh',
            right: '-10vw',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
