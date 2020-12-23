import React, { Component } from "react";
import axios from "axios"; 
import { Redirect } from 'react-router';

import './deleteAd.css'
import SideMenu from './../SideMenu';
import "semantic-ui-css/semantic.min.css";


import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Checkbox
} from "semantic-ui-react";


export default class DeleteAd extends Component {

    state = {
        id: 0,
        redirectBack:false,
        redirect: false,
        redirectAcc: false,
        error_message: '',

    };


	handleDelete = (e) => {
        e.preventDefault(); 
        var url = "http://localhost:8000/api/v1/book-advertise/post/" + this.props.location.state.adId;


        axios.delete(url
             , { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
          ).then((res) => { 
              this.setState({ 
                  redirect: true
              }); 

        }).catch((err) => {
            
                if (err.response && err.response.status === 401) {
                   this.setState({redirectAcc:true, error_message: err.response.data.message})
                } else {
                    this.setState({redirectBack:true})
                }
        })
	};

    redirectHandlerBack = (val) => {
        this.setState({
            redirectBack: true,
        });
    };

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.adId) {
            this.setState({id:this.props.location.state.adId})
        }
        // else {(this.setState({redirect:true}));} 
        console.log(this.props.location.state.adId)
        axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
            localStorage.setItem('token', res.data.access);
          }).catch((err) => {
            this.setState({redirect_acc:true})
            // return;
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
        if (this.state.redirectAcc) {
            console.log("redirecting")
            return (
            <Redirect to={{
                                          pathname: '/acc/',
                                          state: {
                                            error_message: 'برای دیدن صفحه‌ی مورد نظر باید ابتدا وارد شوید.'
                                          }
                                        }} />
            )
        }
    };
	render() {
		return (
		<div className="App">
		<SideMenu logged_in={this.props.logged_in} handle_logout={this.props.handle_logout}/>
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
                    {' ' + (this.props.location && this.props.location.state && this.props.location.state.bookName? this.props.location.state.bookName : '') + ' '}
                    اطمینان دارید؟
                </p>
                <button class="red ui button" onClick={this.handleDelete.bind(this)}>حذف</button>
                <button class="ui button" onClick={this.redirectHandlerBack.bind(this)}>بازگشت</button>
            </form>
             {this.state.error_message && <Message
      error
      header='درخواست انجام نشد'
      content= {this.state.error_message}
    />}
        </div>
       
    </div>
		{this.renderRedirectBack()}
    </div>
			);
	};
    }


	