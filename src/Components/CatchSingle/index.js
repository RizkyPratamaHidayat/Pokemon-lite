import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import PokeBall from '../../assets/png/pokeBall.png'

const CatchPokemonSingle = (props) => {
    const history = useHistory();
    const [typeCatch, setTypeCatch] = useState('');
    const [addArr, setAddArr] = useState(JSON.parse(localStorage.getItem('arr')));
    const [pokeData, setPokeData] = useState(JSON.parse(localStorage.getItem('addCatch')))


    useEffect(() => {
        const chanceValidation = () => {
            const chance = Math.floor(Math.random() * 100);
            console.log(chance)
            if (chance >= 50) { setTypeCatch('successfull') }
            else {
                setTypeCatch('failed')
            }
        }
        const handle = async() =>{
            const data = {
                attacks: pokeData.attacks,
                id: localStorage.getItem('detail'),
                id_pokemon: pokeData.id,
                image: pokeData.image,
                maxCP: pokeData.maxCP,
                maxHP: pokeData.maxHP,
                name: pokeData.name,
                __typename: pokeData.__typename,
                owned: 1
            }
            let arr = addArr.concat(data)
            setAddArr(arr);
            await localStorage.setItem('arr', JSON.stringify(addArr));
        }
        handle();
        chanceValidation();

    }, [])


    const handle = async () => {
        const data = {
            attacks: pokeData.attacks,
            id: localStorage.getItem('detail'),
            id_pokemon: pokeData.id,
            image: pokeData.image,
            maxCP: pokeData.maxCP,
            maxHP: pokeData.maxHP,
            name: pokeData.name,
            __typename: pokeData.__typename,
            owned: 1
        }
        let arr = addArr.concat(data)
        setAddArr(arr);
        await localStorage.setItem('arr', JSON.stringify(addArr));
    }

    const handleback = () =>{
        history.push('/');
    }




    if (typeCatch === 'successfull') {
        return (
            <div className="catch-container">
                      <img src={PokeBall} className="pokeBall-catch" width="200" height="200" alt="pokeBall" />
                <h1 className="succes-label">Success</h1>
                <a href="/myPokemonList" className="btn-take" onClick={handle}>Take Your Pokemon</a>
            </div>

        )
    }
    else {
        return (
            <div className="catch-container">
                  <img src={PokeBall} className="pokeBall-catch" width="200" height="200" alt="pokeBall" />
                  <h1 className="failed-label">Failed</h1>
                  <button className="btn-take" onClick={handleback}>Try Again</button>
            </div>
        )
    }
}

export default CatchPokemonSingle;

