'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TYPE_COLORS } from '@/utils/pokemon';

interface Props {
  onSearch: (query: string) => void;
  onTypeFilter: (types: string[]) => void;
  onGenerationFilter: (gen: string) => void;
  totalCount: number;
  filteredCount: number;
}

const ALL_TYPES = Object.keys(TYPE_COLORS);

const GENERATIONS = [
  { label: 'All', value: 'all' },
  { label: 'Gen I', value: '1', range: [1, 151] },
  { label: 'Gen II', value: '2', range: [152, 251] },
  { label: 'Gen III', value: '3', range: [252, 386] },
  { label: 'Gen IV', value: '4', range: [387, 493] },
  { label: 'Gen V', value: '5', range: [494, 649] },
  { label: 'Gen VI', value: '6', range: [650, 721] },
  { label: 'Gen VII', value: '7', range: [722, 809] },
  { label: 'Gen VIII', value: '8', range: [810, 905] },
  { label: 'Gen IX', value: '9', range: [906, 1025] },
];

export default function SearchBar({
  onSearch,
  onTypeFilter,
  onGenerationFilter,
  totalCount,
  filteredCount,
}: Props) {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGen, setSelectedGen] = useState('all');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(val.trim().toLowerCase());
    }, 300);
  }, [onSearch]);

  const toggleType = useCallback((type: string) => {
    setSelectedTypes(prev => {
      const next = prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type];
      onTypeFilter(next);
      return next;
    });
  }, [onTypeFilter]);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedTypes([]);
    setSelectedGen('all');
    onSearch('');
    onTypeFilter([]);
    onGenerationFilter('all');
  }, [onSearch, onTypeFilter, onGenerationFilter]);

  const hasFilters = query || selectedTypes.length > 0 || selectedGen !== 'all';

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Main search row */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Search input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
              fontSize: '18px',
            }}
          >
            🔍
          </div>
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search Pokémon by name or number..."
            className="search-input"
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              color: '#f0f0f8',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: "'Inter', sans-serif",
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(99,102,241,0.6)';
              e.target.style.background = 'rgba(255,255,255,0.08)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.background = 'rgba(255,255,255,0.05)';
            }}
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Type filter toggle */}
        <button
          onClick={() => setShowTypeFilter(p => !p)}
          style={{
            padding: '14px 20px',
            background: showTypeFilter ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
            border: showTypeFilter ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            color: showTypeFilter ? '#a78bfa' : 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          🏷️ Types
          {selectedTypes.length > 0 && (
            <span
              style={{
                background: '#6366f1',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '999px',
              }}
            >
              {selectedTypes.length}
            </span>
          )}
        </button>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '14px 20px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '14px',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Generation filter */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: showTypeFilter ? '16px' : '0',
        }}
      >
        {GENERATIONS.map(gen => (
          <button
            key={gen.value}
            onClick={() => {
              setSelectedGen(gen.value);
              onGenerationFilter(gen.value);
            }}
            style={{
              padding: '6px 14px',
              background: selectedGen === gen.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)',
              border: selectedGen === gen.value ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              color: selectedGen === gen.value ? '#a78bfa' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {gen.label}
          </button>
        ))}
      </div>

      {/* Type filter panel */}
      {showTypeFilter && (
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {ALL_TYPES.map(type => {
            const tc = TYPE_COLORS[type];
            const active = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                style={{
                  padding: '6px 14px',
                  background: active ? tc.bg + '33' : 'rgba(255,255,255,0.04)',
                  border: active ? `1px solid ${tc.bg}88` : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: active ? tc.bg : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'capitalize',
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
          Showing{' '}
          <span style={{ color: '#a78bfa', fontWeight: 600 }}>{filteredCount.toLocaleString()}</span>
          {' '}of{' '}
          <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{totalCount.toLocaleString()}</span>
          {' '}Pokémon
        </p>
        {hasFilters && (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
            Filters active
          </p>
        )}
      </div>
    </div>
  );
}
