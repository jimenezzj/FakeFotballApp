import React from 'react';

import classes from './BackDrop.module.scss';

const backDrop = (props) => {
    return props.show
        ? <div className={classes.Background} onClick={props.clicked}></div>
        : null
    };

export default backDrop;