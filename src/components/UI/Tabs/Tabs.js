import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
            <div className={classes.Tabs}>
                {
                    opts.map(obj => (
                        <TabLink link={createLink(obj.link)} name={obj.name} key={obj.name} />
                    ))
                }
            </div>
            <Switch>
                <Redirect exact path={props.baseUrl}
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
