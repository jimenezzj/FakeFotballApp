import React from 'react';
import classes from './Card.module.scss';

const Card = ({ roundedBorders, customStyles, ...props }) => {

    const generateBorderClass = (pBorders) => {
        if (pBorders) {
            if (pBorders instanceof Array) {
                return pBorders.map((v, i) => {
                    if (v) return classes['Card_br' + (i + 1)]
                    return '';
                }).reduce((prev, curr) => `${prev} ${curr}`)
            }
            return classes.Card_BorRounded;
        }
        return classes.Card_BorNone;
    }

    // should be util
    const flatClassModdArr = (arr) => arr && arr.reduce((prev, curr) => `${prev} ${curr}`);

    return (
        <div className={`${classes.Card}  ${flatClassModdArr(customStyles)} ${generateBorderClass(roundedBorders)}`}>
            {props.children}
        </div>
    )
}

export default Card
