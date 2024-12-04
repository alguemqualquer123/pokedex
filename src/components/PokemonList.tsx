import React, { useEffect, useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonListItem } from '../types/pokemon';
import { fetchPokemonList } from '../services/pokemonApi';
import { Search } from 'lucide-react';

export function PokemonList() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    loadPokemon();
  }, [offset]);

  const loadPokemon = async () => {
    setLoading(true);
    const data = await fetchPokemonList(offset, limit);
    const pokemonDetails = await Promise.all(
      data.results.map(async (p: any) => {
        const response = await fetch(p.url);
        const details = await response.json();
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((t: any) => t.type.name),
          sprite: details.sprites.other['official-artwork'].front_default,
        };
      })
    );
    setPokemon((prev) => [...prev, ...pokemonDetails]);
    setLoading(false);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {!loading && !searchTerm && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setOffset((prev) => prev + limit)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center mt-8">Loading more Pokémon...</div>
      )}
    </div>
  );
}