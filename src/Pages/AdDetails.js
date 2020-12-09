import React, { Component } from "react";
import axios from "axios"; 
import SideMenu from './../SideMenu';


export default class AdDetails extends Component {
	render () {
		return (
			<div className="App">
				<SideMenu />
				<h1> <br/> <br/> <br/> <br /> <br/>
  details page {this.props.location.state.adId} </h1>
			</div>
			)
	}
}