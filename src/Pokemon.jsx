import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import PokemonCards from './PokemonCards';
import { TiFilter } from 'react-icons/ti';
import { ThemeContext } from './Context/ThemeContext';

const Pokemon = () => {

    const {theme, myName} = useContext(ThemeContext)

    console.log(myName)

    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('ascending');


    const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()
            // console.log(data)

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url)
                const data = await res.json()
                return data
            })

            // console.log(detailedPokemonData);

            const detailedResponses = await Promise.all(detailedPokemonData)

            const sortedByName = detailedResponses.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });

            setPokemonData(sortedByName)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    // search functionality
    const searchData = pokemonData.filter((currPokemon) =>
        currPokemon.name.toLowerCase()
            .includes(search.toLowerCase()
            ))

    // Sorting based on Sort Order 
    const sortedData = [...searchData].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        } else {
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        }
    });

    // user selection sorting 
    const sortingOptions = [
        { value: 'ascending', label: 'Ascending' },
        { value: 'descending', label: 'Descending' },
    ]

    // Close modal function
    const closeModal = () => {
        setModalVisible(false);
    };

    // Open modal function
    const openModal = () => {
        setModalVisible(true);
    };

    if (loading) return <h1>Loading...</h1>

    if (error) return <h1>{error.message}</h1>

    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Pokemon" />
                    {/* filter button */}
                    <button className='filter-btn' onClick={openModal} >
                        <TiFilter color='white' size={25} />
                    </button>


                    {modalVisible && (
                        <div className="modal-overlay" onClick={closeModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <button type="button" className="close-modal-icon">
                                    <span onClick={closeModal} >&times;</span>
                                </button>
                                <h1 className='sort-heading'>Sort Pokemon</h1>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="sort-dropdown"
                                >
                                    {sortingOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <button className="close-modal" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                    

                </div>


                {/* if result not found */}

                {
                    searchData.length === 0 ? (
                        <h1 className='no-result'>No Pokemon found for "{search}"</h1>
                    ) : (
                        <div>
                            <ul className='cards'>
                                {sortedData.map((currPokemon) =>
                                    <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                                )}
                            </ul>
                        </div>
                    )
                }

            </section>

        </>
    )
}

export default Pokemon
