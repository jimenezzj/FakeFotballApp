import React, { Component, Fragment } from 'react';
import TopNav from '../../components/Navigation/TopNav/TopNav';
import classes from './Layout.module.scss';

const Layout = (props) => {

    return (
        <Fragment>
            <header>
                <TopNav />
            </header>
            <main>
                {/* <SideBar /> */}
                {props.children}
            </main>
            {/* <Footer/> */}
        </Fragment>
    );
}

export default Layout;