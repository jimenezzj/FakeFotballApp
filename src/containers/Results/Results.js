import React, { useEffect, useState } from 'react';
import CalendarMatches from '../../components/Results/CalendarMatches/CalendarMatches';
import CardMatch from '../../components/Results/CardMatch/CardMatch';
import { toDateISOFormatt } from '../../util/DateHelper';
import UrlHandler from '../../util/UrlHandler';
import CompetitionsArea from '../CompetitionsArea/CompetitionsArea';
import classes from './Results.module.scss';

const competitionsList = {
    clubs: [2021, 2015], // 2021, 2019, 2014, 2002, 2015
    nationalTeams: [2003],
    myTeams: []
}

const Results = () => {

    const [stateCrrntDate, setStateCrrntDate] = useState(new Date());
    const [stateComptnsList, setStateComptnsList] = useState(competitionsList.clubs);
    const [stateComptMatches, setStateComptMatches] = useState([]);

    useEffect(() => {
        console.log("- - - RESULT  MOUNT STATE - - -");

    }, []);

    useEffect(() => {
        console.log("- - - RESULT DATE STATE - - -");
        loadMatchesOfDay(); // fetchMatches form the day choosen
    }, [stateCrrntDate, stateComptnsList]);


    const createApiCallsMatches = (arrIdComptns) => {
        const callsList = arrIdComptns.map(idCompt => {
            const urlHandler = UrlHandler();
            urlHandler.addEndPointVal("competitions");
            urlHandler.addEndPointVal(idCompt);
            urlHandler.addEndPointVal("matches");
            urlHandler.addParam("dateFrom", toDateISOFormatt(stateCrrntDate));
            urlHandler.addParam("dateTo", toDateISOFormatt(stateCrrntDate));
            const opts = {
                headers: urlHandler.getHeaders()
            };
            urlHandler.opts = opts;
            return urlHandler;
        });
        return callsList;
    }

    const makeCallsToMatches = (urlList) => {
        return urlList.map(url => (
            fetch(url.getCustomURL(true, true), url.opts)
                .then(res => res.json())
        ));
    }

    const loadMatchesOfDay = () => {
        const urls = createApiCallsMatches(stateComptnsList);
        const promisesComptMatches = makeCallsToMatches(urls);
        Promise.all(promisesComptMatches)
            .then(res => {
                console.log(res);
                setStateComptMatches(res);
            });
    }

    return (
        <div className={classes.Results}>
            {/* Filters */}
            <div className={classes.Filters}>

            </div>
            <div className={classes.ResultsArea}>
                <CalendarMatches selectedDate={stateCrrntDate} changeDate={setStateCrrntDate} />
                <div className={classes.ResultsArea__list}>
                    {
                        !stateComptMatches.length > 0
                            ? <p>Cargando..</p>
                            : stateComptMatches.map(({ competition, matches, ...comp }) => (
                                <CardMatch key={competition.id} competition={competition.name}
                                    matches={matches} />
                            ))
                    }
                </div>
            </div>
            <CompetitionsArea currentComptList={stateComptnsList}
                changeComptList={setStateComptnsList}
                comptsOpts={competitionsList} />
        </div>
    )
}

export default Results;
