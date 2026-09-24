import { fetchPokemonDetail, fetchPokemonSpecies } from '@/lib/api';
import { notFound } from 'next/navigation';
import PokemonDetailClient from './PokemonDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const pokemon = await fetchPokemonDetail(id);
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return {
      title: `${name} — PokéExplorer`,
      description: `View ${name}'s stats, abilities, types, and moves. Pokémon #${pokemon.id} in the National Pokédex.`,
    };
  } catch {
    return { title: 'Pokémon Not Found — PokéExplorer' };
  }
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let pokemon, species;
  try {
    [pokemon, species] = await Promise.all([
      fetchPokemonDetail(id),
      fetchPokemonSpecies(id).catch(() => null),
    ]);
  } catch {
    notFound();
  }

  return <PokemonDetailClient pokemon={pokemon} species={species} />;
}
