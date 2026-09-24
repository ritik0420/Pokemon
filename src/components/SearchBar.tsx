'use client';

import { useState, useCallback, useRef } from 'react';
import { TYPE_COLORS } from '@/utils/pokemon';
import { IconSearch, IconTag, IconX } from '@/components/Icons';

interface Props {
  onSearch: (query: string) => void;
  onTypeFilter: (types: string[]) => void;
  onGenerationFilter: (gen: string) => void;
  totalCount: number;
  filteredCount: number;
}

const ALL_TYPES = Object.keys(TYPE_COLORS);

const GENERATIONS = [
  { label: 'All',      value: 'all' },
  { label: 'Gen I',    value: '1'   },
  { label: 'Gen II',   value: '2'   },
  { label: 'Gen III',  value: '3'   },
  { label: 'Gen IV',   value: '4'   },
  { label: 'Gen V',    value: '5'   },
  { label: 'Gen VI',   value: '6'   },
  { label: 'Gen VII',  value: '7'   },
  { label: 'Gen VIII', value: '8'   },
  { label: 'Gen IX',   value: '9'   },
];

export default function SearchBar({
  onSearch, onTypeFilter, onGenerationFilter, totalCount, filteredCount,
}: Props) {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGen, setSelectedGen] = useState('all');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(val.trim().toLowerCase()), 300);
  }, [onSearch]);

  const toggleType = useCallback((type: string) => {
    setSelectedTypes(prev => {
      const next = prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type];
      onTypeFilter(next);
      return next;
    });
  }, [onTypeFilter]);

  const clearFilters = useCallback(() => {
    setQuery(''); setSelectedTypes([]); setSelectedGen('all');
    onSearch(''); onTypeFilter([]); onGenerationFilter('all');
  }, [onSearch, onTypeFilter, onGenerationFilter]);

  const hasFilters = query || selectedTypes.length > 0 || selectedGen !== 'all';

  return (
    <div style={{ marginBottom: '32px' }}>

      {/* Search row */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>

        {/* Search input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <div
            style={{
              position: 'absolute', left: '14px', top: '50%',
              transform: 'translateY(-50%)', pointerEvents: 'none',
              color: 'rgba(255,255,255,0.28)',
            }}
          >
            <IconSearch size={15} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search by name or number..."
            className="search-input"
            style={{
              width: '100%',
              padding: '13px 16px 13px 42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#f0f0f8',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
              fontFamily: "'Inter', sans-serif",
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(84,89,193,0.7)';
              e.target.style.background = 'rgba(255,255,255,0.07)';
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
                position: 'absolute', right: '10px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: '22px', height: '22px',
                cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <IconX size={11} />
            </button>
          )}
        </div>

        {/* Type filter toggle */}
        <button
          onClick={() => setShowTypeFilter(p => !p)}
          style={{
            padding: '13px 16px',
            background: showTypeFilter ? 'rgba(84,89,193,0.2)' : 'rgba(255,255,255,0.05)',
            border: showTypeFilter ? '1px solid rgba(84,89,193,0.5)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            color: showTypeFilter ? '#9fa4f0' : 'rgba(255,255,255,0.55)',
            cursor: 'pointer', fontSize: '13px', fontWeight: 600,
            transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
            display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap',
          }}
        >
          <IconTag size={14} />
          Types
          {selectedTypes.length > 0 && (
            <span style={{
              background: '#5459c1', color: '#fff',
              fontSize: '11px', fontWeight: 700,
              padding: '1px 7px', borderRadius: '4px',
            }}>
              {selectedTypes.length}
            </span>
          )}
        </button>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '13px 16px',
              background: 'rgba(204,51,51,0.1)',
              border: '1px solid rgba(204,51,51,0.25)',
              borderRadius: '10px', color: '#cc6666',
              cursor: 'pointer', fontSize: '13px', fontWeight: 600,
              transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
              display: 'flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap',
            }}
          >
            <IconX size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Generation pills */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: showTypeFilter ? '14px' : '0' }}>
        {GENERATIONS.map(gen => (
          <button
            key={gen.value}
            onClick={() => { setSelectedGen(gen.value); onGenerationFilter(gen.value); }}
            style={{
              padding: '5px 13px',
              background: selectedGen === gen.value ? 'rgba(84,89,193,0.22)' : 'rgba(255,255,255,0.04)',
              border: selectedGen === gen.value ? '1px solid rgba(84,89,193,0.5)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              color: selectedGen === gen.value ? '#9fa4f0' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontSize: '12px', fontWeight: 600,
              transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
            }}
          >
            {gen.label}
          </button>
        ))}
      </div>

      {/* Type filter panel */}
      {showTypeFilter && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px', padding: '14px',
          display: 'flex', flexWrap: 'wrap', gap: '7px',
        }}>
          {ALL_TYPES.map(type => {
            const tc = TYPE_COLORS[type];
            const active = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                style={{
                  padding: '5px 13px',
                  background: active ? tc.bg + '28' : 'rgba(255,255,255,0.04)',
                  border: active ? `1px solid ${tc.bg}` : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  color: active ? tc.bg : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                  transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
                  textTransform: 'capitalize',
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {/* Results count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
          Showing{' '}
          <span style={{ color: '#9fa4f0', fontWeight: 600 }}>{filteredCount.toLocaleString()}</span>
          {' '}of{' '}
          <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{totalCount.toLocaleString()}</span>
          {' '}Pokémon
        </p>
        {hasFilters && <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>Filters active</p>}
      </div>
    </div>
  );
}
