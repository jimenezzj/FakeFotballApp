import React from 'react';

import classes from './Drawer.module.css';

const DrawerToggle = (props) => {


    return (
        <button className={classes.btnHamburger} id="btnHamburger">
            <span className={classes.Hamburger} id="hamburgerToggle"></span>
        </button>
    );
}

export default DrawerToggle;