import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import AdAll from "./Pages/AdAll";
import AdForm from "./Pages/AdForm";


class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/ad/" exact component={AdAll} />
                    <Route path="/ad/detail" render={(props) => (
                        <AdDetails {...props} />
                        )} />
                    <Route path="/ad/new" render={(props) => (
                            <AdForm {...props} classIn={"newad"} />
                            )}/>
                    <Route path="/ad/edit" render={(props) => (
                            <AdForm {...props} classIn={"editad"} />
                            )}/> />
                </Switch>
            </Router>


        )
    }
}

export default Routes;