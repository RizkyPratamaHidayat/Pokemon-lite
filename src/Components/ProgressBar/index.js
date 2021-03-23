import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom'
import { useDebounce, useDidUpdateEffect } from '../../helpers/hooks';

const ProgressBar = (props) => {
    const [percentage, setPercentage] = useState(0);
    const debouncedSearchVal = useDebounce(1000);
    const [counter, setCounter] = useState(0);
    const {
        percentageStat
    } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1);
            if(counter > 1) {setPercentage(percentageStat) }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className="progressBarContainer">
            <div {...props} className="progressBarInner" style={{ width: `${percentage > 100 ? 100 :percentage }%` }} ></div>
           
        </div>
    )
}

export default ProgressBar;

