import type { PokeData } from "../types";

interface CardProps {
  pokemon: PokeData;
}

function Card({ pokemon }: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
      <h1 className="font-semibold">{pokemon.species.name}</h1>
    </div>
  );
}

export default Card;
