import type { PokeData } from '../types';

interface CardProps {
  pokemon: PokeData;
  setPokemon: (updatedPokemon: PokeData) => void;
  onReset: () => void;
}

function Card({ pokemon, setPokemon, onReset }: CardProps) {

  const handleClick = (): void => {
    if (pokemon.active) {
      onReset();
      return;
    }
    setPokemon({...pokemon, active: true})
  };

  const capitalise = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <button
      className='flex cursor-pointer flex-col items-center justify-center rounded-lg bg-red-300 hover:bg-red-400 duration-200'
      onClick={handleClick}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
      <h1 className="font-semibold">{capitalise(pokemon.species.name)}</h1>
      <span className='font-semibold'>{pokemon.active}</span>
    </button>
  );
}

export default Card;
