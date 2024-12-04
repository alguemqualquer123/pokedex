import { create } from 'zustand';
import { Pokemon } from '../types/pokemon';

interface PokemonStore {
  collection: Pokemon[];
  addToCollection: (pokemon: Pokemon) => void;
  removeFromCollection: (pokemonId: number) => void;
  isInCollection: (pokemonId: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  collection: [],
  addToCollection: (pokemon) => {
    set((state) => ({
      collection: [...state.collection, pokemon],
    }));
  },
  removeFromCollection: (pokemonId) => {
    set((state) => ({
      collection: state.collection.filter((p) => p.id !== pokemonId),
    }));
  },
  isInCollection: (pokemonId) => {
    return get().collection.some((p) => p.id === pokemonId);
  },
}));