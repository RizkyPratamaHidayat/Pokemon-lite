import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../../graphql/get-pokemon';
import PokemonList from '../../Components/PokemonList';
import { getData, getDataDetail } from '../../helpers/requests';
import { Link } from 'react-router-dom'
import BaseLoader from '../../Components/BaseLoader';

const PokemonsContainer = () => {
    const [buffering, setBuffering] = useState(true)
    const [pokemonList, setPokemonList] = useState([])
    const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
        variables: { first: 9 },
       
    });
    
    useEffect(()=>{
        setBuffering(false)
    },[])

    if(!buffering){
        return(  <div className="container list-container">
                               <div className="breadcrumb">
                                    <span>{'Home > '}<b>Pokemon List</b></span>
                                    </div>
        {pokemons.map((pokemon, index) => {
            return (
                <div className="pokemon-container" style={{ animationDuration: `0.${index}s` }} >
                    <PokemonList index={index + 1} key={pokemon.id} pokemon={pokemon} />
                    </div>
                    )
        }) }
    </div>)
    }
    else{
        return <BaseLoader />
    }
}

export default PokemonsContainer;
