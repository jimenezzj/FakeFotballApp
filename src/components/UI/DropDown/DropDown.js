import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import classes from './DropDown.module.scss';

const DropDownEle = ({ label, optsList, icon, customStyles, btnDropDownRef }) => {

    // const dropDown = useRef(null);
    const dropDownList = useRef(null);

    // useImperativeHandle(dropDownRef, () => ({
    //     focus: () => {
    // dropDownRef.current.focus()
    //         console.log(dropDownRef)
    //     }
    // }))

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

    // useEffect(() => {
    //     console.log(optsList);
    // });

    return (
        <div className={classes.DropDown} >
            <button className={`${classes.DropDown__Btn} ${flatClassModdArr(customStyles)} 
            ${!label ? 'btnIcon' : classes.DropDown__BtnLabeled}`}
                onClick={openList}
                ref={btnDropDownRef} aria-haspopup="listbox"
                value={!!openList.length ? openList[0].label : ""}>
                {label && <span>{label}</span>}
                <FontAwesomeIcon icon={icon} />
            </button>
            <ul className={label ? classes.DropDown__List_Labeled : classes.DropDown__List} ref={dropDownList}>
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

const DropDown = forwardRef((props, ref) => <DropDownEle {...props} btnDropDownRef={ref} />);

export default DropDown;
