import { useState, useEffect } from 'react';
import type { PokeData } from './types';
import Card from './components/Card';
import './styles.css';

function App() {
  const [score, setScore] = useState<number>(0);
  const [hiScore, setHiScore] = useState<number>(0);
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
        active: false,
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

  // Shuffle on mount
  useEffect(() => {
    if (pokeArr.length > 0) {
      const shuffled = shuffle(pokeArr);
      setPokeArr(shuffled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeArr.length]);

  const handlePokemonUpdate = (updatedPokemon: PokeData): void => {
    setPokeArr((prev) => {
      const updated = prev.map((pokemon) =>
        pokemon.species.name === updatedPokemon.species.name ? updatedPokemon : pokemon
      );
      return shuffle(updated);
    });
    setScore((prev) => prev + 1);
  };

  const handleScoreReset = (): void => {
    setScore(0);
    setPokeArr((prev) =>
      prev.map((pokemon) => ({
        ...pokemon,
        active: false,
      })),
    );
  };

  function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return (
    <main className="w-max-4xl min-h-screen">
      <div id="score-container" className="flex justify-center gap-6 font-bold">
        <span id="score">Score = {score}</span>
        <span id="hi-score">Hi-score = {hiScore}</span>
      </div>
      <div id="poke-grid" className="grid h-full grid-cols-4 gap-4">
        {loading && 'Catching Pokémon...'}
        {!loading &&
          !error &&
          pokeArr[0] &&
          pokeArr.map((pokemon) => (
            <Card
              key={pokemon.species.name}
              pokemon={pokemon}
              setPokemon={handlePokemonUpdate}
              onReset={handleScoreReset}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
