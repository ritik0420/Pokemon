import { PokemonListResponse, PokemonDetail } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 151, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch pokemon list');
  return res.json();
}

export async function fetchAllPokemon(limit = 1025): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch all pokemon');
  return res.json();
}

export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch pokemon: ${nameOrId}`);
  return res.json();
}

export async function fetchPokemonSpecies(nameOrId: string | number) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}
