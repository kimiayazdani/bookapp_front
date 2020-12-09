import React, { Component } from "react";
import axios from "axios"; 

export default class SideMenu extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div class="ui tablet computer only padded grid">
    <div class="ui top fixed borderless fluid huge menu">
        <div class="ui container">
        <a class="link mobile hidden item" href="/">
                <img src="/images/logo1.png" style={{width: 70 + 'px'}} /></a>
            <a href="/" class="header item">کتاب‌باز</a>
            <div class="right menu">
           		<a href="/" class={"Home"===this.props.classIn ? "active item" : "item"}> صفحه‌ اصلی </a>
                <a href="/allads" class={"allads"===this.props.classIn ? "active item" : "item"}> آگهی‌ها</a>
                <a href="/newad" class={"newad"===this.props.classIn ? "active item" : "item"}> ثبت آگهی </a>
            </div>
        </div>
    </div>
</div>
			);
	}
}