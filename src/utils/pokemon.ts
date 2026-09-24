// Pokemon type solid colors (no gradients)
export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  normal:   { bg: '#9098a1', text: '#fff', border: '#9098a1', glow: 'rgba(144, 152, 161, 0.25)' },
  fire:     { bg: '#e8622a', text: '#fff', border: '#e8622a', glow: 'rgba(232, 98, 42, 0.25)'   },
  water:    { bg: '#3a7bd5', text: '#fff', border: '#3a7bd5', glow: 'rgba(58, 123, 213, 0.25)'  },
  electric: { bg: '#d4a017', text: '#111', border: '#d4a017', glow: 'rgba(212, 160, 23, 0.25)'  },
  grass:    { bg: '#0f9d6e', text: '#fff', border: '#0f9d6e', glow: 'rgba(15, 157, 110, 0.25)'  },
  ice:      { bg: '#52c4d8', text: '#111', border: '#52c4d8', glow: 'rgba(82, 196, 216, 0.25)'  },
  fighting: { bg: '#cc3333', text: '#fff', border: '#cc3333', glow: 'rgba(204, 51, 51, 0.25)'   },
  poison:   { bg: '#9b59b6', text: '#fff', border: '#9b59b6', glow: 'rgba(155, 89, 182, 0.25)'  },
  ground:   { bg: '#c87d2a', text: '#fff', border: '#c87d2a', glow: 'rgba(200, 125, 42, 0.25)'  },
  flying:   { bg: '#6c7fe0', text: '#fff', border: '#6c7fe0', glow: 'rgba(108, 127, 224, 0.25)' },
  psychic:  { bg: '#e0395a', text: '#fff', border: '#e0395a', glow: 'rgba(224, 57, 90, 0.25)'   },
  bug:      { bg: '#5a9216', text: '#fff', border: '#5a9216', glow: 'rgba(90, 146, 22, 0.25)'   },
  rock:     { bg: '#6b645c', text: '#fff', border: '#6b645c', glow: 'rgba(107, 100, 92, 0.25)'  },
  ghost:    { bg: '#5459c1', text: '#fff', border: '#5459c1', glow: 'rgba(84, 89, 193, 0.25)'   },
  dragon:   { bg: '#6432d4', text: '#fff', border: '#6432d4', glow: 'rgba(100, 50, 212, 0.25)'  },
  dark:     { bg: '#3d4a5c', text: '#fff', border: '#3d4a5c', glow: 'rgba(61, 74, 92, 0.25)'    },
  steel:    { bg: '#7d8fa6', text: '#fff', border: '#7d8fa6', glow: 'rgba(125, 143, 166, 0.25)' },
  fairy:    { bg: '#d4528a', text: '#fff', border: '#d4528a', glow: 'rgba(212, 82, 138, 0.25)'  },
};

export const DEFAULT_TYPE = { bg: '#6b7280', text: '#fff', border: '#6b7280', glow: 'rgba(107, 114, 128, 0.25)' };

export function getTypeColor(type: string) {
  return TYPE_COLORS[type.toLowerCase()] || DEFAULT_TYPE;
}

// Stat colors
export const STAT_COLORS: Record<string, string> = {
  hp:               '#e05252',
  attack:           '#e07a35',
  defense:          '#c9a820',
  'special-attack': '#3a7bd5',
  'special-defense':'#0f9d6e',
  speed:            '#9b59b6',
};

export function getStatColor(stat: string): string {
  return STAT_COLORS[stat] || '#5459c1';
}

// Stat display names
export const STAT_NAMES: Record<string, string> = {
  hp:               'HP',
  attack:           'ATK',
  defense:          'DEF',
  'special-attack': 'Sp.ATK',
  'special-defense':'Sp.DEF',
  speed:            'SPD',
};

export function getStatName(stat: string): string {
  return STAT_NAMES[stat] || stat;
}

// Format pokemon name
export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

// Pad pokemon ID
export function padId(id: number): string {
  return String(id).padStart(4, '0');
}

// Extract ID from URL
export function extractIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

// Max stat value for bar calculation
export const MAX_STAT = 255;
