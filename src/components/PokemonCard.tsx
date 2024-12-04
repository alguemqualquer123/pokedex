import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonListItem } from '../types/pokemon';
import { usePokemonStore } from '../store/pokemonStore';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface Props {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: Props) {
  const { isInCollection, addToCollection, removeFromCollection } =
    usePokemonStore();
  const collected = isInCollection(pokemon.id);

  const handleCollectionToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (collected) {
      removeFromCollection(pokemon.id);
    } else {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      );
      const fullPokemon = await response.json();
      addToCollection(fullPokemon);
    }
  };

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className={`block ${collected ? "bg-gradient-to-tr to-white from-slate-500" : "bg-white"} rounded-lg shadow-md hover:shadow-lg transition-shadow`}
    >
      <div className="relative p-4">
        <button
          onClick={handleCollectionToggle}
          className="absolute top-2 right-2 z-10"
        >
          {/* {collected ? (
            <MinusCircle className="w-6 h-6 text-red-500" />
          ) : (
            <PlusCircle className="w-6 h-6 text-green-500" />
          )} */}
        </button>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-xl font-semibold capitalize mb-2">
          {pokemon.name}
        </h2>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 rounded text-sm text-white bg-blue-500"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
