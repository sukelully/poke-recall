import { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [score, setScore] = useState<number>(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPokemonData = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto', { mode: 'cors' });
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemon data:', error);
        setLoading(false);
        setError(true);
      }
    };
    getPokemonData();
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-teal-300">
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </>
  );
}

export default App;
