import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import AdAll from "./Pages/AdAll";
import AdForm from "./Pages/AdForm";
import DeleteAd from "./Pages/deleteAd";
import SignIn from "./Pages/SignIn"
import AccForm from "./Pages/SignUp"
import AdVer from "./Pages/AdVer"
import Profile from "./Pages/Profile"

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact render={(props) => (
                        <HomePage {...this.props} {...props} />
                      )}/> 
                    <Route path="/ad/" exact render={(props) => (
                        <AdAll {...this.props} {...props} />
                      )}/>
                    <Route path="/ad/del" render={(props) => (
                        <DeleteAd {...this.props} {...props} />
                        )} />
                    <Route path="/ad/detail" render={(props) => (
                        <AdDetails {...this.props} {...props} />
                        )} />
                    <Route path="/ad/new" render={(props) => (
                            <AdForm {...this.props} {...props} classIn={"newad"} />
                            )}/>
                    <Route path="/ad/edit" render={(props) => (
                            <AdForm {...this.props} {...props} classIn={"editad"} />
                            )}/> />
                    <Route path="/acc/" exact render={(props) => (
                        <SignIn {...this.props} {...props} />
                      )}/>
                    <Route path="/acc/edit" render={(props) => (
                            <AccForm {...this.props} {...props} classIn={"editacc"} />
                            )}/>
                    <Route path="/acc/register" render={(props) => (
                            <AccForm {...this.props} {...props} classIn={"regacc"} />
                            )}/>
                    <Route path="/ad/ver" exact render={(props) => (
                        <AdVer {...this.props} {...props} />
                      )}/>
                    <Route path="/acc/prof" exact render={(props) => (
                        <Profile {...this.props} {...props} />
                      )}/>
                    <Route path="/acc/profi/:accId" exact render={(props) => (
                        <Profile {...this.props} {...props} accId={props.match.params.accId}/>
                      )}/>
                   </Switch>
            </Router>


        )
    }
}

export default Routes;

