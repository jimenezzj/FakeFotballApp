import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CalendarMatches.module.scss';
import { addDays, isSameDay, months, substractDays } from '../../../util/DateHelper';
import Card from '../../UI/Card/Card';

const CalendarMatches = ({ selectedDate, ...props }) => {
    const getShortDateMonth = (date) => `${date.getDate()} ${months[date.getMonth()].slice(0, 3)}`;

    useEffect(() => {
    });

    const createArrDates = (date = new Date()) => {
        let btnsDate = [...Array(5)].map((_) => ""); // init empty array
        btnsDate = btnsDate.map((d, i) => {
            let diff;
            if (i < 2) {
                diff = (2 - i)
                return substractDays(date, diff);
            }
            if (i > 2) {
                diff = (i - 2);
                return addDays(date, diff);
            }
            return date
        });
        // console.log(btnsDate);
        return btnsDate;
    };

    const changeDate = (date) => {
        console.log(date);
        props.changeDate(date);
    }

    const setCustomName = (date) => {
        const today = new Date();
        if (isSameDay(date, today)) return "Today";
        if (isSameDay(date, addDays(today, 1))) return "Tommorrow";
        if (isSameDay(date, substractDays(today, 1))) return "Yesterday";
        return date;
    }

    const getBtnSClasses = (d, i) => {
        let style = "CalendarMatches__Btn";
        const isToday = isSameDay(d, new Date());
        if (isToday) style = "CalendarMatches__Btn_today";
        if (i === 2) {
            style = "CalendarMatches__Btn_active";
            if (isToday) style = "CalendarMatches__Btn_ta";
        }
        return classes[style];
    };

    const generateBtnsList = (list) => (
        list.map((d, i) => {
            const dateText = setCustomName(d);
            return <li className={classes.CalendarMatches__Item} key={d}>
                <button onClick={changeDate.bind(this, d)}
                    className={getBtnSClasses(d, i)}>
                    {
                        dateText instanceof Date
                            ? getShortDateMonth(d)
                            : dateText
                    }
                </button>
            </li >
        })
    );

    return (
        <Card roundedBorders={true}>
            <ul className={classes.CalendarMatches}>
                {generateBtnsList(createArrDates(selectedDate))}
            </ul>
        </Card>
    )
}

export default CalendarMatches;
