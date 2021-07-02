import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import classes from './Select.module.scss';

const Select = ({ opts, name, setValue }) => {

    const btnDropDownRef = useRef(null);

    // useEffect(() => {
    //     console.log(btnDropDownRef);
    // }, []);

    const changeSelectVal = (val) => {
        btnDropDownRef.current.value = val;
        btnDropDownRef.current.textContent = val;
        setValue(val)
        // console.dir(btnDropDownRef.current.value);
        // console.dir(btnDropDownRef.current);
    }


    const prepareListForDropDown = (arr) => arr.map(val =>
        ({
            label: val, action: changeSelectVal.bind(this, val)
        }));

    return (
        opts.length > 0 &&
        <div className={classes.Select} >
            <span className={classes.Select__Label}>Rounds</span>
            <DropDown label={opts[0]} icon={faSortDown} optsList={prepareListForDropDown(opts)}
                ref={btnDropDownRef} />
        </div >

    )
}

export default Select;
