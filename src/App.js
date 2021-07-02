import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import classes from './App.module.scss';
import Results from './containers/Results/Results';
import Competition from './containers/Competition/Competition';
import NoMatch from './components/NoMatch/NoMatch';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/results" />
          <Route path="/results" component={Results} />
          <Route path="/competition/:idCompt" component={Competition} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
