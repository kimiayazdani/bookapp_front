import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import React, { Component } from "react";

export default class App extends Component{

	componentDidMount() {
		document.title = "ketabbaz"
		document.icon = "./public/images/logo1.png"
	}
	render() {
  return (
     <div className="App">
      <Routes />
    </div>
  )};
}

