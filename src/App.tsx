import { useState, useEffect } from 'react';
import type { PokeData } from './types';
import Card from './components/Card';
import './styles.css';

function App() {
  // const [score, setScore] = useState<number>(0);
  const [pokeArr, setPokeArr] = useState<PokeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const NUM_CARDS: number = 16;

  useEffect(() => {
    const getPokemonData = async (id: number): Promise<PokeData> => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { mode: 'cors' });
      const json = await res.json();
      return {
        sprites: { front_default: json.sprites.front_default },
        species: { name: json.species.name, url: json.species.url },
        active: false
      };
    };

    const fillPokeArr = async (): Promise<void> => {
      setLoading(true);
      try {
        const promises = Array.from({ length: NUM_CARDS }, (_, i) => getPokemonData(i + 1));
        const results = await Promise.all(promises);
        setPokeArr(results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fillPokeArr();
  }, []);

  const handlePokemonUpdate = (updatedPokemon: PokeData): void => {
    setPokeArr((prev) => 
    prev.map((pokemon) =>
    pokemon.species.name === updatedPokemon.species.name ? updatedPokemon : pokemon));
  };

  return (
    <main className="w-max-4xl min-h-screen">
      <div id="poke-grid" className="grid h-full grid-cols-4 gap-4">
        {loading && 'Catching Pokémon...'}
        {!loading &&
          !error &&
          pokeArr[0] &&
          pokeArr.map((pokemon) => <Card key={pokemon.species.name} pokemon={pokemon} onChange={handlePokemonUpdate} />)}
      </div>
    </main>
  );
}

export default App;
