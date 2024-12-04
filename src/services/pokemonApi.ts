const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(offset: number = 0, limit: number = 20) {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data;
}

export async function fetchPokemonDetails(id: number) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => a.ability.name),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
    sprite: data.sprites.other['official-artwork'].front_default,
  };
}