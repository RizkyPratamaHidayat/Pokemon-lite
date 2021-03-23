import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom'
import Catch from '../../assets/png/catch.gif'

const ButtonCatch = (props) => {
    const {
        label
    } = props;

    return (
        <Link to="#" {...props}>
             <h2 className="catchlabel">{label}</h2>
            <img src={Catch} width="150" height="150"/>
           
        </Link>
    )
}

export default ButtonCatch;

ButtonCatch.propTypes = {
    label: PropTypes.string,
  };
  
  ButtonCatch.defaultProps = {
    label: '',
  };
  