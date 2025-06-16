import type { PokeData } from '../types';
import { useState } from 'react';

interface CardProps {
  pokemon: PokeData;
}

function Card({ pokemon }: CardProps) {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = (): void => {
    console.log(pokemon.species.name);
    setActive((prev) => !prev);
  };

  const capitalise = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <button
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg ${
        active ? 'bg-amber-400' : 'bg-blue-800'
      }`}
      onClick={handleClick}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
      <h1 className="font-semibold">{capitalise(pokemon.species.name)}</h1>
    </button>
  );
}

export default Card;
