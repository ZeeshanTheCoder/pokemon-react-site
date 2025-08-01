import React from 'react'

const PokemonCards = ({ pokemonData }) => {
    return (
        <>
            <li className='pokemon-card' >
                <figure>
                    <img
                        src={pokemonData.sprites.other.dream_world.front_default}
                        alt={pokemonData.name}
                        className='pokemon-image' />
                </figure>
                <h2 className='pokemon-name' >{pokemonData.name}</h2>
                <h2 className='pokemon-highlight'>
                    <p>
                        {pokemonData.types.map((currType) =>
                            currType.type.name
                        ).join(", ")}
                    </p>
                </h2>
                <div className="grid-three-cols">
                    <div className="pokemon-info">
                        <span>Height: </span>
                        <p>{pokemonData.height}</p>
                    </div>
                    <div className="pokemon-info">
                        <span>Weight: </span>
                        <p>{pokemonData.weight}</p>
                    </div>
                    <div className="pokemon-info">
                        <span>Stats: </span>
                        <p>{pokemonData.stats[5].base_stat}</p>
                    </div>
                </div>
                <div className="grid-three-cols">
                    <div className="pokemon-info">
                        <span>Experience: </span>
                        <p>{pokemonData.base_experience}</p>
                    </div>
                    <div className="pokemon-info">
                        <span>Attack: </span>
                        <p>{pokemonData.stats[1].base_stat}</p>
                    </div>
                    <div className="pokemon-info">
                        <span>Abilities: </span>
                        <p>
                            {pokemonData.abilities.map((abilityInfo) => {
                                return abilityInfo.ability.name
                            }).slice(0, 1).join(', ')}
                        </p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default PokemonCards
