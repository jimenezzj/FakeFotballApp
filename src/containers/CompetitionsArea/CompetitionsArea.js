import { faSearch, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../../components/UI/Card/Card';
import DropDown from '../../components/UI/DropDown/DropDown';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import UrlHandler from '../../util/UrlHandler';
import classes from './CompetitionsArea.module.scss';

// const competitionsList = {
//     clubs: [2021, 2019, 2014, 2002, 2015],
//     nationalTeams: [],
//     myTeams: []
// }

const CompetitionsArea = ({ currentComptList, comptsOpts, changeComptList, ...props }) => {

    // const [stateCrrntCompetitions, setstateCrrntCompetitions] =
    //     useState(currentComptList);
    const [stateComptns, setStateComptns] = useState({
        list: [],
        name: "Clubs"
    });

    useEffect(() => {
        // console.log(currentComptList);
        loadCompetitions(currentComptList);
    }, [currentComptList]);

    // useEffect(() => {
    //     console.log(stateComptnsList);
    // }, [stateComptnsList]);

    const loadCompetitions = (arrComptns) => {
        const urlHandlr = UrlHandler();
        urlHandlr.addEndPointVal("competitions");
        const url = urlHandlr.getCustomURL(true, true);
        const opts = {
            headers: urlHandlr.getHeaders()
        };
        fetch(url, opts)
            .then(res => {
                const resParsed = res.json();
                if (res.status !== 200) {
                    const err = new Error(resParsed.messsage || resParsed.error);
                    err.status = res.status;
                    throw err;
                }
                return resParsed;
            })
            .then(({ competitions, ...res }) => {
                const crrntComptns = competitions.filter(cp => arrComptns.find(id => id === cp.id));
                setStateComptns({ ...stateComptns, list: crrntComptns });
            })
            .catch(err => {
                console.dir(err);
                console.log(err.message);
                props.throwError(err)
            });
    }

    // should be ina util file
    const capitalizeCamelVars = (word) => {
        let newTmpW = word.replaceAll(/\B[A-Z]\B/g, ' ');
        return newTmpW.split('').map((l, i) => {
            if (i === 0) return l.toUpperCase();
            if (l === ' ') return ` ${word[i]}`;
            return l;
        }).join('');
    }

    const changeList = (listName) => {
        // console.log(comptsOpts[listName]);
        changeComptList(comptsOpts[listName]);
        setStateComptns({ ...stateComptns, name: capitalizeCamelVars(listName) })
    }

    const dropDownList = [
        { label: "Clubs", action: changeList.bind(this, 'clubs') },
        { label: "National Tems", action: changeList.bind(this, 'nationalTeams') },
        { label: "My Teams", action: changeList.bind(this, 'myTeams') }
    ];
    return (
        <Card customStyles={[classes.CompetitionsList]} roundedBorders={true}>
            <div className={classes.CompetitionsList__Actions}>
                <span className={classes.CompetitionsList__Opt}>{stateComptns.name}</span>
                <DropDown icon={faSortDown} optsList={dropDownList} />
                <button className={`${classes.CompetitionsList__BtnSearch} btnIcon`}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <ul className={classes.CompetitionsList__List}>
                {/* SOMELIST */}
                {
                    stateComptns.list.length < 1
                        ? <p className={classes.CompetitionsList__List_Empty}>List its empty</p>
                        : stateComptns.list.map(({ id, name, ...comp }) => (
                            <li className={classes.CompetitionsList__Item} key={id}>
                                <NavLink to={`/competition/${id}`} className={classes.CompetitionsList__Link}>
                                    <figure ></figure>
                                    <span>{name}</span>
                                </NavLink>
                            </li>
                        ))
                }
            </ul>
        </Card>
    )
}

export default withErrorHandling(CompetitionsArea);
