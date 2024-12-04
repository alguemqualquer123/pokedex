import React from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import { PokemonCard } from './PokemonCard';

export function Collection() {
  const { collection } = usePokemonStore();

  if (collection.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your collection is empty</h2>
        <p className="text-gray-600">
          Start collecting Pokémon by clicking the plus icon on any Pokémon card!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={{
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types,
              sprite: pokemon.sprite,
            }}
          />
        ))}
      </div>
    </div>
  );
}