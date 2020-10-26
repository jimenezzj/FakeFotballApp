import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import classes from './DropDown.module.scss';

const DropDown = ({ label, optsList, icon, customStyles }) => {

    const dropDownList = useRef(null);

    const openList = () => {
        const { classList } = dropDownList.current;
        if (classList.contains(classes.DropDown__List_Open)) {
            closeList()
            return;
        }
        classList.add(classes.DropDown__List_Open);
    }

    const closeList = () => {
        const { classList } = dropDownList.current;
        classList.remove(classes.DropDown__List_Open);
    }
    const flatClassModdArr = (arr) => arr && arr.reduce((prev, curr) => `${prev} ${curr}`);

    return (
        <div className={classes.DropDown}>
            <button className={`${classes.DropDown__Btn} ${flatClassModdArr(customStyles)} btnIcon`} onClick={openList}>
                <FontAwesomeIcon icon={icon} />
                {label && <span>{label}</span>}
            </button>
            <ul className={classes.DropDown__List} ref={dropDownList}>
                {
                    optsList.map((op, i) => (
                        <li className={classes.DropDown__Item} key={op.label + optsList.length}>
                            <button className={classes.DropDown__BtnOpt}
                                onClick={op.action}
                            >{op.label}
                            </button>
                        </li>
                    ))
                }
                {/* <li className={classes.TypeComptns__Item}>Clubs</li>
                <li className={classes.TypeComptns__Item}>My List</li> */}
            </ul>
        </div>
    )
}

export default DropDown;
