import React, { useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import classes from '../Tabs.module.scss';


const TabLink = ({ link, name, activeOnExact }) => {

    // Get a location obj if current patch matches the provide one
    // Object location example
    // isExact: true
    // params: {id: "2021"}
    // path: "/competition/:id/qualif"
    // url: "/competition/2021/qualif"
    let match = useRouteMatch({
        path: link
    });

    // useEffect(() => {
    //     console.log(link);
    //     console.log(match);
    // }, []);

    return (
        <NavLink to={link} className={match ? classes.Tabs__Link_active : classes.Tabs__Link}
            key={name}>
            {name}
        </NavLink>
    )
}

export default TabLink;
