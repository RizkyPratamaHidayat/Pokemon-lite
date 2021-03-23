import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Release from '../../assets/png/release.png';
import ProgressBar from '../../Components/ProgressBar'

const ReleaseScreen = (props) => {
  const history = useHistory();

  return (
     <div class="release-container">
         <img src={Release} />
         <h1>Goodbye friend</h1>
         <Link class="btn-release" to="/myPokemonList">Back to my list</Link>
     </div>
 
  )
}

export default ReleaseScreen;