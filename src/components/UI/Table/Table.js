import React, { useEffect } from 'react';
import Card from '../Card/Card';
import classes from './Table.module.scss';

const Table = ({ cols, data, ...props }) => {
    useEffect(() => {
        // console.log(data);
        // console.log(data.length);
    }, [data]);

    const generateCells = (obj) => {
        // console.log(obj);
        // console.log(props);
        return Object.keys(obj).map((k, i) => {
            const typeData = typeof obj[k];
            switch (typeData) {
                case "string":
                case "number":
                    return <td key={`${obj[props.keyVal]}${i}`}>{obj[k]}</td>
                case "object":
                    return <td key={obj[props.keyVal]}>{obj[k]}</td> // obj: Its he objec with its props, k: Means key
                // return obj[k];
                default:
                    console.log("Formatt of data inserted invalid!");
                    return <td key={obj[props.keyVal]}></td>
            }
        });
    }

    return (
        <Card roundedBorders={true} customStyles={[classes.TableWrapp]}>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        {
                            cols.map(c => <td key={c}>{c}</td>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0
                        && data.map(obj => <tr key={obj[props.keyVal] + data.length}> {generateCells(obj)} </tr>)
                    }
                </tbody>
            </table>
            {data.length === 0
                && <p className={classes.TableWrapp__Mess}>The list its empty</p>}
        </Card>
    )
}

export default Table;
