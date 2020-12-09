import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import AdAll from "./Pages/AdAll";
import AdForm from "./Pages/AdForm";
import DeleteAd from "./Pages/deleteAd";
import SignIn from "./Pages/SignIn"
import AccForm from "./Pages/SignUp"

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/ad/" exact component={AdAll} />
                    <Route path="/ad/del" render={(props) => (
                        <DeleteAd {...props} bookName={"طراحی الگوریتم"} adId={1}/>
                        )} />
                    <Route path="/ad/detail" render={(props) => (
                        <AdDetails {...props}  />
                        )} />
                    <Route path="/ad/new" render={(props) => (
                            <AdForm {...props} classIn={"newad"} />
                            )}/>
                    <Route path="/ad/edit" render={(props) => (
                            <AdForm {...props} classIn={"editad"} />
                            )}/> />
                    <Route path="/acc/" exact component={SignIn} />
                    <Route path="/acc/edit" render={(props) => (
                            <AccForm {...props} classIn={"editacc"} />
                            )}/>
                    <Route path="/acc/register" render={(props) => (
                            <AccForm {...props} classIn={"regacc"} />
                            )}/>
                   </Switch>
            </Router>


        )
    }
}

export default Routes;

