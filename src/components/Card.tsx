import type { PokeData } from '../types';
import { useState } from 'react';

interface CardProps {
  pokemon: PokeData;
  onChange: (updatedPokemon: PokeData) => void;
}

function Card({ pokemon, onChange }: CardProps) {
  const [active, setActive] = useState<boolean>(pokemon.active);

  const handleClick = (): void => {
    setActive(true);
    const updatedPokemon = {
      ...pokemon,
      active: true
    }
    console.log(updatedPokemon);
    onChange(updatedPokemon);
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
      <span className='font-semibold'>{pokemon.active}</span>
    </button>
  );
}

export default Card;
