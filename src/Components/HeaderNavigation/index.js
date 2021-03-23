import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../assets/png/logo.png'
import Explore from '../../assets/png/explore.png'
import bag from '../../assets/png/bag.png'

const HeaderNavigation = (props) => {
    const[active,setActive] = useState('')
    return (
        <div className="container navigation-container">
            <Link to="/" className="logo-container">
                <img alt="" src={Logo} width="170" height="70" />
            </Link>
            <div className="action-container">
                <Link onClick={() => {
                    localStorage.setItem('active', 'list');
                    setActive('list');
                }} className={`navigation ${active === 'list' ? 'active' : ''}`} to="/"> <img alt="" src={Explore} width="60" height="60" /></Link>
            <Link onClick={() => {
                localStorage.setItem('active', 'mylist')
                setActive('mylist')
            }} className={`navigation ${active === 'mylist' ? 'active' : ''}`} to="/myPokemonList"><img alt="" src={bag} width="60" height="60" /></Link>
        </div>
       </div >
    )
}

export default HeaderNavigation;
