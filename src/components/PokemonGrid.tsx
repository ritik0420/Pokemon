'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PokemonCard } from '@/types/pokemon';
import { extractIdFromUrl } from '@/utils/pokemon';
import PokemonCardComponent from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';

const GEN_RANGES: Record<string, [number, number]> = {
  '1': [1, 151],
  '2': [152, 251],
  '3': [252, 386],
  '4': [387, 493],
  '5': [494, 649],
  '6': [650, 721],
  '7': [722, 809],
  '8': [810, 905],
  '9': [906, 1025],
};

const PAGE_SIZE = 48;

export default function PokemonGrid() {
  const [allPokemon, setAllPokemon] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGen, setSelectedGen] = useState('all');
  const [page, setPage] = useState(1);

  // Fetch all pokemon names/ids first (lightweight)
  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
        const data = await res.json();
        
        // Build basic cards with ID extracted from URL
        const basicCards: PokemonCard[] = data.results.map((p: { name: string; url: string }) => {
          const id = extractIdFromUrl(p.url);
          return {
            id,
            name: p.name,
            types: [],
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            officialArt: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
        
        setAllPokemon(basicCards);
        setLoading(false);

        // Now batch-fetch types for visible pokemon in chunks
        loadTypesInBatches(basicCards);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again.');
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const loadTypesInBatches = useCallback(async (cards: PokemonCard[]) => {
    // Fetch types for first 48 immediately, then rest lazily
    const CHUNK = 24;
    for (let i = 0; i < Math.min(cards.length, 200); i += CHUNK) {
      const chunk = cards.slice(i, i + CHUNK);
      await Promise.allSettled(
        chunk.map(async (card) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${card.id}`);
            const data = await res.json();
            const types = data.types.map((t: { type: { name: string } }) => t.type.name);
            setAllPokemon(prev =>
              prev.map(p => p.id === card.id ? { ...p, types } : p)
            );
          } catch { /* silently skip */ }
        })
      );
      await new Promise(r => setTimeout(r, 50));
    }
  }, []);

  // Filtered pokemon
  const filtered = useMemo(() => {
    let result = allPokemon;

    // Gen filter
    if (selectedGen !== 'all') {
      const [min, max] = GEN_RANGES[selectedGen] || [1, 1025];
      result = result.filter(p => p.id >= min && p.id <= max);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        String(p.id).includes(q) ||
        String(p.id).padStart(4, '0').includes(q)
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter(p =>
        selectedTypes.every(t => p.types.includes(t))
      );
    }

    return result;
  }, [allPokemon, searchQuery, selectedTypes, selectedGen]);

  const visiblePokemon = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = visiblePokemon.length < filtered.length;

  const loadMore = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedTypes, selectedGen]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</p>
        <p style={{ color: '#ef4444', fontSize: '18px', fontWeight: 600 }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '24px',
            padding: '12px 28px',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            color: '#ef4444',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        onSearch={setSearchQuery}
        onTypeFilter={setSelectedTypes}
        onGenerationFilter={setSelectedGen}
        totalCount={allPokemon.length}
        filteredCount={filtered.length}
      />

      {/* No results */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 600 }}>
            No Pokémon found
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', marginTop: '8px' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {visiblePokemon.map((pokemon, idx) => (
          <PokemonCardComponent key={pokemon.id} pokemon={pokemon} index={idx} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={loadMore}
            style={{
              padding: '14px 40px',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '14px',
              color: '#a78bfa',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(99,102,241,0.25)';
              (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'rgba(99,102,241,0.15)';
              (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)';
            }}
          >
            Load More ({filtered.length - visiblePokemon.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
