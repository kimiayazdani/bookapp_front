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
                    <Route path="/" exact render={(props) => (
                        <HomePage {...this.props} />
                      )}/> 
                    <Route path="/ad/" exact render={(props) => (
                        <AdAll {...this.props} />
                      )}/>
                    <Route path="/ad/del" render={(props) => (
                        <DeleteAd {...this.props} bookName={"طراحی الگوریتم"} adId={1}/>
                        )} />
                    <Route path="/ad/detail" render={(props) => (
                        <AdDetails {...this.props}  />
                        )} />
                    <Route path="/ad/new" render={(props) => (
                            <AdForm {...this.props} classIn={"newad"} />
                            )}/>
                    <Route path="/ad/edit" render={(props) => (
                            <AdForm {...this.props} classIn={"editad"} />
                            )}/> />
                    <Route path="/acc/" exact render={(props) => (
                        <SignIn {...this.props} />
                      )}/>
                    <Route path="/acc/edit" render={(props) => (
                            <AccForm {...this.props} classIn={"editacc"} />
                            )}/>
                    <Route path="/acc/register" render={(props) => (
                            <AccForm {...this.props} classIn={"regacc"} />
                            )}/>
                   </Switch>
            </Router>


        )
    }
}

export default Routes;

