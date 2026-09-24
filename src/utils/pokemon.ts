// Pokemon type colors and gradients
export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; glow: string }> = {
  normal:   { bg: '#9098a1', text: '#fff', border: '#9098a1', gradient: 'linear-gradient(135deg, #9098a1, #6b7280)', glow: 'rgba(144, 152, 161, 0.4)' },
  fire:     { bg: '#ff6b35', text: '#fff', border: '#ff6b35', gradient: 'linear-gradient(135deg, #ff6b35, #f59e0b)', glow: 'rgba(255, 107, 53, 0.4)' },
  water:    { bg: '#3b82f6', text: '#fff', border: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', glow: 'rgba(59, 130, 246, 0.4)' },
  electric: { bg: '#f59e0b', text: '#111', border: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fcd34d)', glow: 'rgba(245, 158, 11, 0.4)' },
  grass:    { bg: '#10b981', text: '#fff', border: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #84cc16)', glow: 'rgba(16, 185, 129, 0.4)' },
  ice:      { bg: '#67e8f9', text: '#111', border: '#67e8f9', gradient: 'linear-gradient(135deg, #67e8f9, #a5f3fc)', glow: 'rgba(103, 232, 249, 0.4)' },
  fighting: { bg: '#ef4444', text: '#fff', border: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f97316)', glow: 'rgba(239, 68, 68, 0.4)' },
  poison:   { bg: '#a855f7', text: '#fff', border: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', glow: 'rgba(168, 85, 247, 0.4)' },
  ground:   { bg: '#d97706', text: '#fff', border: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #b45309)', glow: 'rgba(217, 119, 6, 0.4)' },
  flying:   { bg: '#818cf8', text: '#fff', border: '#818cf8', gradient: 'linear-gradient(135deg, #818cf8, #a5b4fc)', glow: 'rgba(129, 140, 248, 0.4)' },
  psychic:  { bg: '#f43f5e', text: '#fff', border: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)', glow: 'rgba(244, 63, 94, 0.4)' },
  bug:      { bg: '#65a30d', text: '#fff', border: '#65a30d', gradient: 'linear-gradient(135deg, #65a30d, #84cc16)', glow: 'rgba(101, 163, 13, 0.4)' },
  rock:     { bg: '#78716c', text: '#fff', border: '#78716c', gradient: 'linear-gradient(135deg, #78716c, #a8a29e)', glow: 'rgba(120, 113, 108, 0.4)' },
  ghost:    { bg: '#6366f1', text: '#fff', border: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', glow: 'rgba(99, 102, 241, 0.4)' },
  dragon:   { bg: '#7c3aed', text: '#fff', border: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)', glow: 'rgba(124, 58, 237, 0.4)' },
  dark:     { bg: '#374151', text: '#fff', border: '#374151', gradient: 'linear-gradient(135deg, #374151, #1f2937)', glow: 'rgba(55, 65, 81, 0.4)' },
  steel:    { bg: '#94a3b8', text: '#111', border: '#94a3b8', gradient: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', glow: 'rgba(148, 163, 184, 0.4)' },
  fairy:    { bg: '#ec4899', text: '#fff', border: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f9a8d4)', glow: 'rgba(236, 72, 153, 0.4)' },
};

export const DEFAULT_TYPE = { bg: '#6b7280', text: '#fff', border: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)', glow: 'rgba(107, 114, 128, 0.4)' };

export function getTypeColor(type: string) {
  return TYPE_COLORS[type.toLowerCase()] || DEFAULT_TYPE;
}

// Stat colors
export const STAT_COLORS: Record<string, string> = {
  hp:              '#ef4444',
  attack:          '#f97316',
  defense:         '#eab308',
  'special-attack': '#3b82f6',
  'special-defense': '#10b981',
  speed:           '#a855f7',
};

export function getStatColor(stat: string): string {
  return STAT_COLORS[stat] || '#6366f1';
}

// Stat display names
export const STAT_NAMES: Record<string, string> = {
  hp:              'HP',
  attack:          'ATK',
  defense:         'DEF',
  'special-attack': 'Sp.ATK',
  'special-defense': 'Sp.DEF',
  speed:           'SPD',
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

// Get type emoji
export const TYPE_EMOJI: Record<string, string> = {
  normal:   '⬜',
  fire:     '🔥',
  water:    '💧',
  electric: '⚡',
  grass:    '🌿',
  ice:      '❄️',
  fighting: '🥊',
  poison:   '☠️',
  ground:   '🌍',
  flying:   '🦅',
  psychic:  '🔮',
  bug:      '🐛',
  rock:     '🪨',
  ghost:    '👻',
  dragon:   '🐉',
  dark:     '🌑',
  steel:    '⚙️',
  fairy:    '✨',
};

// Max stat value for bar calculation
export const MAX_STAT = 255;
