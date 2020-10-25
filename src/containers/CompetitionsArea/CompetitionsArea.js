import { faSearch, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UrlHandler from '../../util/UrlHandler';
import classes from './CompetitionsArea.module.scss';


// const competitionsList = {
//     clubs: [2021, 2019, 2014, 2002, 2015],
//     nationalTeams: [],
//     myTeams: []
// }

const CompetitionsArea = ({ competitionsList, ...props }) => {

    const [stateCrrntCompetitions, setstateCrrntCompetitions] =
        useState(competitionsList.clubs);
    const [stateComptnsList, setStateComptnsList] = useState([]);

    useEffect(() => {
        loadCompetitions(stateCrrntCompetitions);
    }, []);

    useEffect(() => {
        console.log(stateComptnsList);
    }, [stateComptnsList]);

    const loadCompetitions = (arrComptns) => {
        const urlHandlr = UrlHandler();
        urlHandlr.addEndPointVal("competitions");
        const url = urlHandlr.getCustomURL(true, true);
        const opts = {
            headers: urlHandlr.getHeaders()
        };
        fetch(url, opts)
            .then(res => res.json())
            .then(({ competitions, ...res }) => {
                const crrntComptns = competitions.filter(cp => arrComptns.find(id => id === cp.id));
                setStateComptnsList(crrntComptns);
                // console.log(crrntComptns);
            });
    }

    return (
        <div className={classes.CompetitionsList}>
            <div className={classes.CompetitionsList__Actions}>
                <span className={classes.CompetitionsList__Opt}>Clubs</span>
                {/* DropDOwn */}
                <div className={classes.TypeComptns}>
                    <button className={classes.TypeComptns__btnDropDown}>
                        <FontAwesomeIcon icon={faSortDown} />
                    </button>
                    <ul className={classes.TypeComptnst__List}>
                        <li className={classes.TypeComptns__Item}>National Teams</li>
                        <li className={classes.TypeComptns__Item}>Clubs</li>
                        <li className={classes.TypeComptns__Item}>My List</li>
                    </ul>
                </div>
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <ul className={classes.CompetitionsList__List}>
                {/* SOMELIST */}
                {
                    stateComptnsList.length < 1
                        ? <p>List its empty</p>
                        : stateComptnsList.map(({ id, name, ...comp }) => (
                            <li className={classes.CompetitionsList__Item} key={id}>
                                <NavLink to={`/competition/${id}`} className={classes.CompetitionsList__Link}>
                                    <figure ></figure>
                                    <span>{name}</span>
                                </NavLink>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default CompetitionsArea;
