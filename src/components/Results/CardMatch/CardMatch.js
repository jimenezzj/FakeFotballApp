import React, { useEffect } from 'react';
import Card from '../../UI/Card/Card';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import classes from './CardMatch.module.scss';

const CardMatch = ({ matches, ...props }) => {
    // useEffect(() => {
    //     console.log(props.matches);
    // })
    return (
        <Card roundedBorders={true} customStyles={[classes.CardMatch]}>
            <div className={classes.CardMatch__Header}>
                <figure className={classes.CardMatch__Compt} style={{ padding: "1rem", backgroundColor: "red" }}>
                </figure>
                <div className={classes.CardMatch__Info}>
                    <h1 className={classes.CardMatch__Name}>{props.competition}</h1>
                    {props.stage && <h2 className={classes.CalendarMatches__Phase}>{props.stage}</h2>}
                </div>
            </div>
            <div className={classes.CardMatch__Body}>
                {
                    !matches
                        ? <p>Cargando...</p>
                        : matches.map(({ homeTeam, awayTeam, score, ...m }) => (
                            <ScoreBoard key={m.id} teamHome={homeTeam.name} teamAway={awayTeam.name}
                                score={score} status={m.status} utcDate={m.utcDate} />
                        ))
                }
                {/* <ScoreBoard teamHome={props.teamHome} teamAway={props.teamAway} result={props.result} />
                <ScoreBoard teamHome={props.teamHome} teamAway={props.teamAway} result={props.result} /> */}
            </div>
        </Card>
    )
}

export default CardMatch;
