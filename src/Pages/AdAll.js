import React, { Component } from "react";
import axios from "axios"; 
import SideMenu from './../SideMenu';

export default class AdAll extends Component {
	render () {
		return (
			<div className="App">
				<SideMenu classIn={"allads"}/>
				<h1> <br/> <br/> <br/> <br /> <br/>
  overview of ads page </h1>
			</div>
			)
	}
}