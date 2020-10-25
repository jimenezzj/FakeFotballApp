import React from 'react';
import { NavLink } from 'react-router-dom';

import DrawerToggle from '../DrawerToggle/DrawerToggle';
import Logo from '../Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import clasess from './TopNav.module.css';
// import SearchBar from '../../UI/SearchBar/SearchBar';

const TopNav = (props) => {


    return (
        <div className={clasess.topNav}>
            <div className={clasess.topNav__left}>
                <DrawerToggle />
                <Logo />
            </div>
            {/* <div className={clasess.searchBar}>
                <SearchBar searchItem={props.searchItem} />
            </div> */}
            <div className={clasess.UsrMenuOpts}>
                <NavLink className={clasess.UsrMenuOpts__link} to="/">
                    <figure className={clasess.UsrMenuOpts__WrapImg}  >
                        {/* <img className={clasess.UsrMenuOpts__img} /> */}
                    </figure>
                    <span className={clasess.UsrMenuOpts__name}>Usuario</span>
                </NavLink>
                <button>
                    <FontAwesomeIcon icon={faSortDown} />
                </button>
            </div>
        </div>
    );
}

export default TopNav;