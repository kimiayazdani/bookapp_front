import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default class App extends Component{

	render() {
  return (
     <div className="App">
     	<Helmet>
	     	<meta charset="utf-8"/>
		    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
		    <meta
		            name="viewport"
		            content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=no"
		    />
		    <meta
		            name="description"
		            content="Semantic-UI-Forest, collection of design, themes and templates for Semantic-UI."
		    />
		    <meta name="keywords" content="Semantic-UI, Theme, Design, Template"/>
		    <meta name="author" content="PPType"/>
		    <meta name="theme-color" content="#ffffff"/>
		    <title> ketabbaz </title>
		    <link
		            rel="stylesheet"
		            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
		            type="text/css"
		    />
		    <link rel="stylesheet" type="text/css" href="./public/css/base.css"/>
		    <link rel="stylesheet" type="text/css" href="./public/css/fontiran.css"/>
		    <link rel="stylesheet" type="text/css" href="./public/css/fonts.css"/>
		    <link rel="stylesheet" type="text/css" href="./public/css/semantic.css"/>
     	</Helmet>
      	<Routes />
    </div>
  )};
}

