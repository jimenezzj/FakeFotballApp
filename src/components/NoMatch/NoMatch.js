import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import classes from './NotMatch.module.scss';

const NoMatch = () => {

    const location = useLocation();

    return (
        <div className={classes.NoMatch}>
            <p className={classes.NoMatch__Mess}>
                There's not page that matches the direction:
               <strong>{` ${location.pathname}`}</strong>
                <strong className={classes.NoMatch__Face}>¯\_(ツ)_/¯</strong>
            </p>
                <NavLink className={classes.Btn} to="/">Home</NavLink>
        </div>
    )
}

export default NoMatch
