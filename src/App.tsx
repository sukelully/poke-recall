import { useState, useEffect } from 'react';
import './styles.css';

type PokeData = {
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
    url: string;
  };
};

function App() {
  // const [score, setScore] = useState<number>(0);
  const [data, setData] = useState<PokeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPokemonData = async (id: number): Promise<void> => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { mode: 'cors' });
        const json = await res.json();
        const { sprites, species } = json;
        setData(prev => [...prev, { sprites, species }]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemon data:', error);
        setLoading(false);
        setError(true);
      }
    };
    getPokemonData(1);
  }, []);

  return (
    <main className="w-max-4xl min-h-screen">
      <div className="flex flex-col gap-4 bg-teal-300">
        {!loading && !error && data[0] && (
          <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <img src={data[0].sprites.front_default} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
