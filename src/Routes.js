import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/Home";

// import history from './history';


class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                </Switch>
            </Router>


        )
    }
}

export default Routes;