import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../../graphql/get-pokemon';
import PokemonList from '../../Components/PokemonList';
import { getData, getDataDetail } from '../../helpers/requests';
import { Link } from 'react-router-dom'
import Release from '../../assets/png/release.png';
import BaseLoader from '../../Components/BaseLoader';

const MyPokemonList = () => {


  const [pokemons, setPokemon] = useState(JSON.parse(localStorage.getItem('arr')))
  const [display, setDisplay] = useState(false);
  const [detail, setDetail] = useState(localStorage.getItem('detail'));
  console.log('my pokemon : ', pokemons)


  const handleRemoveItem = async (e) => {
    const id = e.target.getAttribute("id")
    setPokemon(pokemons.filter(item => item.id !== id));
  };
  localStorage.setItem('arr', JSON.stringify(pokemons))
  useEffect(() => {
    if (pokemons) {
      const types = {};
      pokemons.forEach((d) => {
        if (types[d["id"]]) {
          types[d["id"]] += 1;

        } else {
          types[d["id"]] = 1;
        }
      })
      const mapping = Object.entries(pokemons).map(async (item, idx) => {
        if (parseInt(item[1].id) === detail) {
          console.log('data yang di ubah : ', item[1].id, item[1].owned)
          const id = item[1].id
          const data = {
            id: localStorage.getItem('detail'),
            id_pokemon: item[1].id,
            image: item[1].image,
            maxCP: item[1].maxCP,
            maxHP: item[1].maxHP,
            name: item[1].name,
            __typename: item[1].__typename,
            owned: item[1].owned + 1
          }
          console.log('push data : ', data);
          await setPokemon(pokemons.filter(item => item.id !== id)); // dihapus dulu data yang sudah ada

          // let arr = pokemons.concat(data)
          // setPokemon(arr);
          // await localStorage.setItem('arr', JSON.stringify(pokemons)); // setelah di hapus di tambah lagi dengan value owned yang baru + 1    
        }

      })

      console.log('id value : ', types)

    }
  }, [])



  return (<div className="container list-container">
     <div className="breadcrumb">
                                    <span>{'Home > '}<b>My Pokemon List</b></span>
                                    </div>
    {pokemons ? pokemons.map((pokemon, index) => {
      return (
        <div className="pokemon-container" style={{ animationDuration: `0.${index}s` }} >
          <PokemonList release index={parseInt(pokemon.id)} key={pokemon.id} pokemon={pokemon} />
          <span className="btn-release owned-label">Owned : {pokemon.owned}</span>
          {/* <button className="btn-release" onClick={handleRemoveItem} id={parseInt(pokemon.id)}>
                        <img width="40" height="40" alt="" src={Release} />
                        <span className="release-label">Release</span>
                    </button> */}
          <a className="btn-release" href="/release" onClick={handleRemoveItem} id={parseInt(pokemon.id)}>
            Release
                    </a>
        </div>
      )
    }) : <a className="btn-release" href="/list">
      {' Belum ada Pokemon, tangkap Pokemon >'}
    </a>}
  </div>)
}

export default MyPokemonList;
