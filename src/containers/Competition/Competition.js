import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompetitionHeader from '../../components/SingleCompetition/CompetitionHeader/CompetitionHeader';
import Card from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Tabs from '../../components/UI/Tabs/Tabs';
import UrlHandler from '../../util/UrlHandler';
import classes from './Competition.module.scss';

const Competition = () => {

    let param = useParams();
    const [stateCrrntSeason, setStateCrrntSeason] = useState(2020);
    const [sttCompt, setSttCompt] = useState({
        standings: [],
        info: {}
    });
    // const [sttCompt, setSttCompt] = useState({});

    useEffect(() => {
        fetchCompetitionInfo();
        // console.log(param);
    }, []);

    const createURLFetchStandings = () => {
        const urlHandler = UrlHandler();
        urlHandler.addEndPointVal("competitions");
        urlHandler.addEndPointVal(param.idCompt);
        urlHandler.addEndPointVal("standings");
        urlHandler.addParam("season", stateCrrntSeason);
        const opts = {
            headers: urlHandler.getHeaders()
        };
        urlHandler.opts = opts;
        // console.log(urlHandler);
        return urlHandler;
    }

    const fetchCompetitionInfo = () => {
        const url = createURLFetchStandings();
        makeCallFetchStandings(url.getCustomURL(true, true), url.opts)
            .then(({ competition, ...res }) => {
                // console.log(res);
                setSttCompt({
                    standings: createTableDateset(res.standings),
                    info: {
                        area: competition.area,
                        name: competition.name,
                        code: competition.code,
                        id: competition.id
                    }
                });
            });
    }

    const makeCallFetchStandings = (url, opts) => (
        fetch(url, opts)
            .then(res => res.json())
    );

    const createTableDateset = (response) => {
        const tData = response[0].table.map(t => {
            return {
                pos: t.position,
                club: generateClubEle(t.team),
                goalDifference: (t.goalsFor - t.goalsAgainst),
                points: t.points
            }
        });
        console.log(tData);
        return tData;
    }

    const generateClubEle = ({ name, crestUrl, ...team }) => {
        return (
            // <td key={}>
            <span className={classes.Table__Logo}>
                <img src={crestUrl} alt={name + "'s logo"} />
                <span>{name}</span>
            </span>
            // </td>
        );
    }
    const createTableComp = () => (
        <div className={classes.Table}>
            <h2 className={classes.Table__Title}>
                <span>Table</span>
            </h2>
            <Table cols={["#", "Club", "GD", "Pts"]} data={sttCompt.standings} keyVal="pos" />
        </div>
    );

    const createMatchesComp = () => (
        <p>
            This is matches Comp
        </p>
    );

    const createStadisticsComp = () => (
        <p>
            This is stadistics Comp
        </p>
    );

    const tabs = [
        { name: "QUALIFICATION", link: `${param.idCompt}/qualif`, component: createTableComp },
        { name: "Matches", link: `${param.idCompt}/matches`, component: createMatchesComp },
        { name: "Stadistics", link: `${param.idCompt}/stadistics`, component: createStadisticsComp }
    ];

    return (
        <div className={classes.Competition}>
            <CompetitionHeader competition={sttCompt.info} />
            <Tabs baseUrl={"/competition"} opts={tabs} />
        </div>
    )
}

export default Competition;
