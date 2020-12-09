import React, { Component } from "react";
import axios from "axios"; 

import './deleteAd.css'
import SideMenu from './../SideMenu';

export default class DeleteAd extends Component {

	handleDelete = (e) => {

	};

	handleBack = (e) => {

	};
	render() {
		return (
		<div className="App">
		<SideMenu />
		<div class="ui container">

        <div class="ui message">
            <h1 class="ui huge header">کتاب‌باز</h1>
            <p class="lead">
                مکانی برای تبادل کتاب های شما
            </p>
        </div>
    </div>
    <br />
    <div class="ui divider"></div>
    <div class="ui text container float center">
        <div class="ui segment">
            <form class="ui form" onSubmit={this.handleDelete}>
                <p style={{fontSize:20+'px', textAlign: 'right', dir:"rtl"}}>
                    آیا از حذف کتاب 
                    {' ' + (this.props.bookName ? this.props.bookName : '') + ' '}
                    اطمینان دارید؟
                </p>
                <button class="red ui button" type="submit">حذف</button>
                <button class="ui button" onclick={this.handleBack}>بازگشت</button>
            </form>
        </div>
    </div>
		
    </div>
			);
	};
}


	