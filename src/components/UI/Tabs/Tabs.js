import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Card from '../Card/Card';
import TabLink from './TabLink/TabLink';
import classes from './Tabs.module.scss';

const Tabs = ({ opts, ...props }) => {

    // let location = useLocation();

    // useEffect(() => {
    //     console.log(location);
    // }, []);


    const createLink = (tabLink) => `${props.baseUrl}/${tabLink}`;

    return (
        <Fragment>
            <Card roundedBorders={[false, false, true, true]}
                customStyles={[classes.Tabs]}>
                {/* <div className={classes.Tabs}> */}
                {
                    opts.map(obj => (
                        <TabLink link={createLink(obj.link)} name={obj.name} key={obj.name} />
                    ))
                }
                {/* </div> */}
            </Card>
            <Switch>
                <Redirect exact path={`${props.baseUrl}/:id`}
                    to={`${props.baseUrl}/${opts[0].link}`} />
                {
                    opts.map(obj => (
                        <Route path={createLink(obj.link)} key={obj.link}>
                            {obj.component()}
                        </Route>
                    ))
                }
            </Switch>
        </Fragment >
    )
}

export default Tabs;
