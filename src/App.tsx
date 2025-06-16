import { useState, useEffect } from 'react';
import type { PokeData } from './types';
import Card from './components/Card';
import './styles.css';



function App() {
  // const [score, setScore] = useState<number>(0);
  const [pokeArr, setPokeArr] = useState<PokeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPokemonData = async (id: number): Promise<PokeData> => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { mode: 'cors' });
      const json = await res.json();
      return {
        sprites: { front_default: json.sprites.front_default },
        species: { name: json.species.name, url: json.species.url },
      };
    };

    const fillPokeArr = async (): Promise<void> => {
      setLoading(true);
      try {
        const promises = Array.from({ length: 10 }, (_, i) => getPokemonData(i + 1));
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

  const getRandomPoke = (): number => {
    return Math.floor(Math.random() * pokeArr.length);
  };

  const randomPoke: number = getRandomPoke();

  return (
    <main className="w-max-4xl min-h-screen">
      <div className="flex min-h-fit flex-col gap-4 bg-teal-300">
        {loading && 'Catching Pokémon...'}
        {!loading && !error && pokeArr[randomPoke] && (
          <Card pokemon={pokeArr[randomPoke]} />
        )}
      </div>
    </main>
  );
}

export default App;
