import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { toTimeISOFormatt } from '../../../util/DateHelper';
import classes from './ScoreBoard.module.scss';


const ScoreBoard = ({ score, status, ...props }) => {

    const createScoreStrg = (s) => {
        return `${s.homeTeam}-${s.awayTeam}`;
    }

    const generateScoreBoard = (status) => {
        switch (status) {
            case "FINISHED":
                return <Fragment>
                    <p className={classes.ScoreBorad__Status}>FULLTIME</p>
                    <p className={classes.ScoreBorad__Result}>{createScoreStrg(score.fullTime)}</p>
                </Fragment>
            case "IN_PLAY":
                return <Fragment>
                    <p className={classes.ScoreBorad__Status_Progress}>InProgess'</p>
                    <p className={classes.ScoreBorad__Result}>{createScoreStrg(score.fullTime)}</p>
                </Fragment>
            //  SCHEDULEDF
            default:
                return <Fragment>
                    <p className={classes.ScoreBorad__Status}>{toTimeISOFormatt(new Date(props.utcDate))}</p>
                    <FontAwesomeIcon icon={faClock} />
                </Fragment>
        }
    };

    return (
        <div className={classes.ScoreBorad}>
            <NavLink to="#" className={classes.ScoreBoard__left}>
                <span>{props.teamHome}</span>
            </NavLink>
            <div className={classes.ScoreBorad__Result}>
                {
                    generateScoreBoard(status)
                }
            </div>
            <NavLink to="#" className={classes.ScoreBoard__right}>
                <span>{props.teamAway}</span>
            </NavLink>
        </div >
    )
}

export default ScoreBoard;
