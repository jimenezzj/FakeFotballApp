import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.css';
// import logoPng from '../../../assets/img/logo.png';

const Logo = (props) => {


    return (
        <NavLink to="/" className={classes.Logo__link}>
            {/* <img src={logoPng}
                alt="UEFA Champions League logo" className={classes.Logo__img} /> */}
        </NavLink>
    );
}

export default Logo;