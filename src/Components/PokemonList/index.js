import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import BaseLoader from '../../Components/BaseLoader';
import ProgressBar from '../../Components/ProgressBar'

const PokemonList = (props) => {
  const history = useHistory();

  const handleList = () => {
    localStorage.setItem("detail", props.index);
    localStorage.setItem('addCatch', JSON.stringify(props.pokemon));
    history.push('/pokemonDetail')
  }
  const [pokemonName, setPokemonName] = useState(localStorage.getItem("namaAwal"));
  const [pokemonEditName, setPokemonEditName] = useState(localStorage.getItem("namaSetelah"));



  return (
      <Link {...props} onClick={handleList} >
        <div className="pokemon-name">
          <div className="pokemon-name-inner-container">
            <img src={props.pokemon.image} class="pokemon-title-image" width="30" height="30" alt={props.pokemon.name} />
            {pokemonName && pokemonEditName ? <span class="pokemon-title">{props.pokemon.name === pokemonName[0].toUpperCase() + pokemonName.substring(1) ? pokemonEditName : props.pokemon.name}</span> : <span class="pokemon-title">{props.pokemon.name}</span>}
          </div>

        </div>
        <div className="pokemon-image">
          <img src={props.pokemon.image} alt={props.pokemon.name} />
        </div>
        <div className="pokemon-attacks-container">
          {props.pokemon.attacks.special.map((atk, index) => (
            <div className="pokemon-attacks">
              <div class="pokemon-attacks-title-container">
                <span class="pokemon-attacks-title">{atk.name}</span>
                <span class="pokemon-attacks-title">{atk.damage}%</span>
              </div>
              <ProgressBar percentageStat={atk.damage} />
            </div>
          ))}

        </div>
      </Link>
   
 
  )
}

export default PokemonList;