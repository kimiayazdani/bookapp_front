import React, { Component } from "react";
import axios from "axios"; 
import { Redirect } from 'react-router';

import './deleteAd.css'
import SideMenu from './../SideMenu';

export default class DeleteAd extends Component {

    state = {
        redirectBack:false,
        redirect: false,
    };

	handleDelete = (e) => {
        e.preventDefault(); 
        var url = "http://localhost:8000/api/asknima/" + this.props.adId;


        axios.post(url, { 
             
          }).then((res) => { 
              this.setState({ 
                  redirect: true
              }); 

        })
	};

    redirectHandlerBack = (val) => {
        this.setState({
            redirectBack: true,
        });
    };

    renderRedirectBack = (e) => {
        if (this.state.redirectBack) {
            return (
            <Redirect to={{
                                          pathname: '/ad/detail',
                                          state: {
                                            adId: this.props.adId
                                          }
                                        }} />
            )
        }
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname:'/ad/',
                }} /> )
        }
    };
	render() {
		return (
		<div className="App">
		<SideMenu logged_in={this.props.logged_in}/>
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
            <form class="ui form">
                <p style={{fontSize:20+'px', textAlign: 'right', dir:"rtl"}}>
                    آیا از حذف کتاب 
                    {' ' + (this.props.bookName ? this.props.bookName : '') + ' '}
                    اطمینان دارید؟
                </p>
                <button class="red ui button" onClick={this.handleDelete.bind(this)}>حذف</button>
                <button class="ui button" onClick={this.redirectHandlerBack.bind(this)}>بازگشت</button>
            </form>
        </div>
    </div>
		{this.renderRedirectBack()}
    </div>
			);
	};
    }


	