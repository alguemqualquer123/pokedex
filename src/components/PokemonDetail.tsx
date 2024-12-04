import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import { fetchPokemonDetails } from '../services/pokemonApi';
import { usePokemonStore } from '../store/pokemonStore';
import { PlusCircle, MinusCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { isInCollection, addToCollection, removeFromCollection } = usePokemonStore();

  useEffect(() => {
    const loadPokemon = async () => {
      if (id) {
        const data = await fetchPokemonDetails(parseInt(id));
        setPokemon(data);
      }
    };
    loadPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const collected = isInCollection(pokemon.id);

  const handleCollectionToggle = () => {
    if (collected) {
      removeFromCollection(pokemon.id);
    } else {
      addToCollection(pokemon);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="flex items-center gap-2 text-blue-500 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Pokédex
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-full h-auto"
            />
          </div>
          
          <div className="md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
              <button
                onClick={handleCollectionToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white"
              >
                {collected ? (
                  <>
                    <MinusCircle className="w-5 h-5" />
                    Remove
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    Collect
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-2 mb-6">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-sm text-white bg-blue-500"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Height</p>
                <p className="text-xl">{pokemon.height / 10}m</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="text-xl">{pokemon.weight / 10}kg</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="px-3 py-1 rounded-full bg-gray-100"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Stats</h2>
              <div className="space-y-2">
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <div key={stat}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.replace(/([A-Z])/g, ' $1')}</span>
                      <span>{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${(value / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}