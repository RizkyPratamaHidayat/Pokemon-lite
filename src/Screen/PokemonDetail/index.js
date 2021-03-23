import React, { useEffect, useState } from 'react';
import { getData, getDataDetail } from '../../helpers/requests';
import ButtonCatch from '../../Components/ButtonCatch';
import { Link, useHistory } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import BaseLoader from '../../Components/BaseLoader';
import ProgressBar from '../../Components/ProgressBar'
const PokemonsDetail = (props) => {
    const history = useHistory();
    const [pokemonId, setPokemonId] = useState(localStorage.getItem("detail"));
    const [pokemonNameAda, setPokemonNameAda] = useState();
    const [owned, setOwned] = useState();
    const [pokemonName, setPokemonName] = useState(false);
    const [pokeData, setPokeData] = useState(JSON.parse(localStorage.getItem('addCatch')))
    const [pokemonEditName, setPokemonEditName] = useState('')
    const [pokemonDetailData, setPokemonDetailData] = useState();
    const [actions, setAction] = useState('');
    const [addArr, setAddArr] = useState(JSON.parse(localStorage.getItem('arr')));
    const [modal, setModal] = useState(false)

    const onOpenModal = () => setModal(true);
    const onCloseModal = () => setModal(false);


    useEffect(() => {
        const PokemonDetail = async () => {
            const responseDetail = await getDataDetail(pokemonId);
            setPokemonDetailData(responseDetail);
            console.log('pokemon detail : ', responseDetail);

        }
        PokemonDetail();
    }, [])

    const directCatchPage = () => {
        const arrValidation = JSON.parse(localStorage.getItem('arr'))
        if (!arrValidation) {
            localStorage.setItem('arr', JSON.stringify([]))
            const params = {
                attacks: pokeData.attacks,
                id: pokeData.id,
                image: pokeData.image,
                maxCP: pokeData.maxCP,
                maxHP: pokeData.maxHP,
                name: pokemonEditName ? pokemonEditName : pokeData.name,
            }
            console.log(params);
            localStorage.setItem('addCatch', JSON.stringify(params));
            history.push('/catchPokemon');
        }
        else {
            const params = {
                attacks: pokeData.attacks,
                id: pokeData.id,
                image: pokeData.image,
                maxCP: pokeData.maxCP,
                maxHP: pokeData.maxHP,
                name: pokemonEditName ? pokemonEditName : pokeData.name,
            }
            localStorage.setItem('addCatch', JSON.stringify(params));
            history.push('/catchPokemon');
            console.log(params);
        }
    }

    useEffect(() => {
        if (pokemonDetailData) { validationName(); }
    })

    const validationName = async () => {
        if (addArr) {
            const types = {};
            addArr.forEach((d) => {
                if (types[d["id"]]) {
                    types[d["id"]] += 1;

                } else {
                    types[d["id"]] = 1;
                }
            })
            const mapping = Object.entries(addArr).map(async (item, idx) => {
                const idAwal = pokemonId * 1;
                const idPokemon = item[1].id * 1
                if (idAwal === idPokemon) {
                    setPokemonName(true)
                    setOwned(item[1].owned)
                    setPokemonNameAda(item[1].name);
                    setAction('editting')
                }
            })
        }
    }

    const handleSubmitChange = () => {
        const idDetail = pokemonId;
        const id = idDetail;
        setAddArr(addArr.filter(item => item.id !== id));
        change();
    }

    const change = () => {
        const data = {
            attacks: pokeData.attacks,
            id: localStorage.getItem('detail'),
            id_pokemon: pokeData.id,
            image: pokeData.image,
            maxCP: pokeData.maxCP,
            maxHP: pokeData.maxHP,
            name: pokemonEditName ? pokemonEditName : pokemonNameAda,
            __typename: pokeData.__typename,
            owned: owned
        }
        let arr = addArr.concat(data)
        console.log('params : ', arr);
        localStorage.setItem('arr', JSON.stringify(arr))
        const params = {
            attacks: pokeData.attacks,
            id: pokeData.id,
            image: pokeData.image,
            maxCP: pokeData.maxCP,
            maxHP: pokeData.maxHP,
            name: pokemonEditName ? pokemonEditName : pokemonNameAda,
        }
        console.log(params);
        localStorage.setItem('addCatch', JSON.stringify(params));
    }
    if (pokemonDetailData) {
        // if(actions === 'editting'){change()}
        return (
            <div>

                <div className="container list-container detail-container">
                    
                    <div className="pokemon-container" >
                        <div className="pokemon-name">
                            <div className="pokemon-name-inner-container">
                                <img src={pokeData.image} class="pokemon-title-image" width="30" height="30" alt={pokeData.name} />
                                {actions !== 'editting' ? <span class="pokemon-title">{pokemonNameAda ? pokemonNameAda : pokemonDetailData.species.name}</span> :
                                    (
                                        <div className="input-container">

                                            <input className="pokemonNameInput" type="text" onChange={(e) => setPokemonEditName(e.target.value)} value={pokemonEditName} placeholder={pokemonNameAda ? pokemonNameAda : pokemonDetailData.species.name} />

                                            <button className="btn-input-name" onClick={() => {
                                                handleSubmitChange();
                                                onOpenModal();
                                            }}>Change</button>
                                        </div>
                                    )}
                            </div>

                        </div>
                        <div className="pokemon-image">
                            <img src={pokeData.image} alt={pokeData.name} />
                        </div>
                        <div className="pokemon-attacks-container">
                            {pokeData.attacks.special.map((atk, index) => (
                                <div className="pokemon-attacks">
                                    <div class="pokemon-attacks-title-container">
                                        <span class="pokemon-attacks-title">{atk.name}</span>
                                        <span class="pokemon-attacks-title">{atk.damage}%</span>
                                    </div>
                                    <ProgressBar percentageStat={atk.damage} />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="detail-desc-container">
                        <div class="abilities-container">
                            <h3 className="abilities-title">Abilities</h3>
                            <div className="abilities-content">
                                {pokemonDetailData.abilities.map((abilities, idx) => (
                                    <div className="abilities" key={idx}>
                                        <span>{abilities.ability.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div class="abilities-container">
                            <h3 className="abilities-title">Moves</h3>
                            <div className="abilities-content">
                                {pokemonDetailData.moves.map((moves, idx) => (
                                    <div className="abilities" key={idx}>
                                        <span>{moves.move.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                    </div>
                </div>
                <div className="btnCatchContainer">
                    <ButtonCatch onClick={directCatchPage} className="btnCatch" label={'Catchs'} />
                </div>

                <Modal open={modal} onClose={onCloseModal} center>
                    <div className="modal-container">
                    <h3>Ar u sure to changes the pokemon's name?</h3>
                    <a href="/myPokemonList" className="btn-input-name-verify" onClick={()=>{
                                                handleSubmitChange();
                                                onclose();
                                                alert('Success to Changed Name')
                                            }}>Change?</a>
                    </div>
                </Modal>
            </div>
        )
    }
    else {
        return (
            <BaseLoader />
        )
    }
}

export default PokemonsDetail;

