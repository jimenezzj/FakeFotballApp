import React, { Fragment, useEffect } from 'react';
import Tabs from '../../UI/Tabs/Tabs';
import classes from './CompetitionHeader.module.scss';

const CompetitionHeader = ({ competition, ...props }) => {

    useEffect(() => {
        // console.log(l);
    }, []);


    return (
        <div className={classes.CompetitionHeader}>
            <div className={classes.CompetitionHeader__Top}>
                <figure className={classes.CompetitionHeader__Logo}>
                </figure>
                <div className={classes.CompetitionHeader__Info}>
                    {competition.name &&
                        <Fragment>
                            <h1>{competition.name}</h1>
                            <p className={classes.CompetitionHeader__Info_country}>
                                {competition.area.name}
                            </p>
                        </Fragment>
                    }
                    {/* <DropDown /> */}
                </div>
            </div>
        </div>
    )
}

export default CompetitionHeader;
