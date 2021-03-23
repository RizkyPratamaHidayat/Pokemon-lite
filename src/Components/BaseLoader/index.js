import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom'
import PokeBall from '../../assets/png/pokeBall.png'


const BaseLoader = (props) => {

    return (
        <img src={PokeBall} className="pokeBall" width="150" height="100" alt="pokeBall" />
    )
}

export default BaseLoader;
