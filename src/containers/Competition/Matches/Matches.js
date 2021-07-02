import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardMatch from '../../../components/Results/CardMatch/CardMatch';
import Select from '../../../components/UI/Select/Select';
import UrlHandler from '../../../util/UrlHandler';
import classes from './Matches.module.scss';

const Matches = ({ numTeams, compt, season }) => {

    const [sttMatches, setMatches] = useState([]);
    const [sttMatchDay, setMatchDay] = useState(1);

    useEffect(() => {
        loadMatches();
        console.log(compt);
    }, [compt, sttMatchDay]);

    const createURL = () => {
        const urlHandlr = UrlHandler();
        urlHandlr.addEndPointVal("competitions");
        urlHandlr.addEndPointVal(compt.id);
        urlHandlr.addEndPointVal("matches");
        urlHandlr.addParam("matchday", sttMatchDay);
        const opts = {
            headers: urlHandlr.getHeaders()
        }
        urlHandlr.opts = opts;
        return urlHandlr;
    }

    const callApi = (urlObj) => {
        return fetch(urlObj.getCustomURL(true, true), urlObj.opts)
            .then(res => res.json())
    }

    const loadMatches = () => {
        if (compt.id) {
            const urlObj = createURL();
            callApi(urlObj)
                .then(res => {
                    console.log(res);
                    setMatches(res.matches);
                });
        }
    }

    const onClickSelect = (valSelect) => {
        const crrRound = valSelect.substr((valSelect.length - 2), valSelect.length).trim();
        setMatchDay(crrRound);
    }
    const generateRoundsList = (nTeams) => {
        if (nTeams > 0) {
            const lbl = "Round ";
            const roundsCalc = (nTeams - 2) * 2;
            const arr = [...Array(roundsCalc).map(_ => "")];
            return arr.map((f, i) => lbl.concat(i + 1));
        }
    }

    return (
        <div className={classes.Matches}>
            {numTeams > 0 &&
                <Fragment>
                    <Select opts={generateRoundsList(numTeams)} setValue={onClickSelect} />
                    <CardMatch competition={compt.name} stage={`Round ${sttMatchDay}`}
                        matches={sttMatches} />
                </Fragment>
            }
        </div>
    )
}

export default Matches
