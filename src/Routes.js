import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import AdAll from "./Pages/AdAll";

// import history from './history';


class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/ad/" exact component={AdAll} />
                    <Route path="/ad/detail" component={AdDetails} />
                </Switch>
            </Router>


        )
    }
}

export default Routes;