import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import CatchSingle from '../../Components/CatchSingle';
import CatchDouble from '../../Components/CatchDouble';
const CatchPokemon = (props) => {
    const history = useHistory();
    const [addArr, setAddArr] = useState(JSON.parse(localStorage.getItem('arr')));
    const [typeAdd, setTypeAdd] = useState('')
    const [id, setId] = useState(localStorage.getItem('detail'));
    localStorage.setItem('header', true);
    useEffect(() => {
        const types = {};
        addArr.forEach((d) => {
            if (types[d["id"]]) {
                types[d["id"]] += 1;

            } else {
                types[d["id"]] = 1;
            }
        })
        const mapping = Object.entries(addArr).map(async (item, idx) => {
            const idAwal = id * 1;
            const idPokemon = item[1].id * 1

            if (idAwal === idPokemon) {
                setTypeAdd('double')
                console.log('id yang dipilih : ', typeAdd)
            }
        })


    }, [])


    return (
    <div className="bg-catch">
         {typeAdd !== 'double' ? <CatchSingle /> : <CatchDouble /> }
    </div>
    )
}

export default CatchPokemon;

