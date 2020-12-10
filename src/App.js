import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import React, { Component } from "react";
import {Helmet} from 'react-helmet';
import axios from 'axios'

export default class App extends Component{
	state = {
			logged_in: localStorage.getItem('token') ? true : false,
			username: '',
			error_mess: ''
		};
	constructor (props) {
		super(props);	
		console.log(this.state.logged_in);
	};

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('http://localhost:8000/curuser/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')} `
				}
			})
			.then(res => res.json())
			.then(json=>{
				this.setState({username:json.username});
			});

		};
	};

	handle_login(users, passs) {
		

	  axios 
	      .post("http://localhost:8000/api/asknima", { 
	          user: users,
	          pass: passs,
	      }) 
        .then((res) => { 
        	localStorage.setItem('token', res.token);
        	this.setState({
        		logged_in: true,
        		username: res.user.username
        	});
            return true;
            })
	      .catch((err) => {
	      	this.setState({
	      		error_mess: err
	      	});
	        return false;
	        
	      }); 

	}

	handle_logout() {
		localStorage.removeItem('token');
		this.setState({logged_in:false, username:''});
	}

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
      	<Routes logged_in={this.state.logged_in? "t": "f"} handle_login={this.handle_login} handle_logout={this.handle_logout}/>
    </div>
  )};
}

