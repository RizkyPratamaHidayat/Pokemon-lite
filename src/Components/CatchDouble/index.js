import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import PokeBall from '../../assets/png/pokeBall.png'
const CatchPokemonDouble = (props) => {
    const history = useHistory();
    const [typeCatch, setTypeCatch] = useState('');
    const [addArr, setAddArr] = useState(JSON.parse(localStorage.getItem('arr')));
    const [pokeData, setPokeData] = useState(JSON.parse(localStorage.getItem('addCatch')))
    const [typeAdd, setTypeAdd] = useState('')
    const [idPoke, setIdPoke] = useState(localStorage.getItem('detail'));
    const [owned, setOwned] = useState();
    const [direct, setDirect] = useState(false);
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        const chanceValidation = () => {
            const chance = Math.floor(Math.random() * 100);
            console.log(chance)
            if (chance >= 50) { 
                setTypeCatch('successfull')
         }
            else {
                setTypeCatch('failed')
            }

            const types = {};
            addArr.forEach((d) => {
                if (types[d["id"]]) {
                    types[d["id"]] += 1;

                } else {
                    types[d["id"]] = 1;
                }
            })
            const mapping = Object.entries(addArr).map(async (item, idx) => {
                const idAwal = idPoke * 1;
                const idPokemon = item[1].id * 1

                if (idAwal === idPokemon) {
                    setTypeAdd('double')
                    setOwned(item[1].owned)
                    console.log('id yang dipilih : ', typeAdd)
                }
            })

        }
        chanceValidation();
 
    }, [])


    const handle = async () => {
        const idDetail = idPoke;
            const id = idDetail;
            setAddArr(addArr.filter(item => item.id !== id));
            Add();
    }
        function Add(){
            const data = {
                attacks: pokeData.attacks,
                id: localStorage.getItem('detail'),
                id_pokemon: pokeData.id,
                image: pokeData.image,
                maxCP: pokeData.maxCP,
                maxHP: pokeData.maxHP,
                name: pokeData.name,
                __typename: pokeData.__typename,
                owned: owned ? owned + 1 : 1
            }
            let arr = addArr.concat(data)
            console.log('params : ', arr);
            localStorage.setItem('arr', JSON.stringify(arr))
            
        }
        const handleback = () =>{
            history.push('/');
        }
    
    
    
     
    if (typeCatch === 'successfull') {
        Add();
        return (
            <div className="catch-container">
                      <img src={PokeBall} className="pokeBall-catch" width="200" height="200" alt="pokeBall" />
                <h1 className="succes-label">Success</h1>
                <a className="btn-take" href="/myPokemonList" onClick={handle}>Take Your Pokemon</a>
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

export default CatchPokemonDouble;

