import React, { Component } from "react";
import axios, {put} from "axios";

import { Redirect } from 'react-router';

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

import "./new_ad.css"

export default class SignIn extends Component {
	state = {
	    user: "",
      pass: "",
      redirect: false,
      redirectBack: false
  	};

  	fileInputRef = React.createRef();


	handleInput = (e) => { 
		
	    this.setState({ 
	        [e.target.name]: e.target.value, 
	    }); 
		
	}; 
  redirectToReg = (e) => {
    this.setState({
      redirectBack: true
    })
  }
  renderRedirectBack = (e) => {
        if (this.state.redirectBack) {
            return (
            <Redirect to={{ pathname: '/acc/register' }} />
            )
        }
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname:'/ad/',
                }} /> )
        }
    };
	handleSubmit = (e) => { 
	  e.preventDefault(); 
	  this.fileUpload(this.state.file).then(response => {
      	console.log(response.data);
    });


	  axios 
	      .post("http://localhost:8000/api/asknima", { 
	          user: this.state.user, 
	          pass: this.state.pass,
	      }) 
        .then((res) => { 
            this.setState({
                redirect: true
              })
            })
	      .catch((err) => {
	        
	        
	      }); 
	}; 
	render () {
		return (

			<div dir="rtl" className="App">

				<SideMenu classIn="login" logged_in={this.props.logged_in}/>
				<div class="ui container">

        <div class="ui message">
            <h1 class="ui huge header">کتاب‌باز</h1>
            <p class="lead">
                مکانی برای تبادل کتاب های شما
            </p>
        </div>
    </div>
    <br />
    <br />

    <Grid textAlign="center" verticalAlign="middle" >
    <Grid.Column style={{ maxWidth: 700, backgroundColor:"#e0e0eb"}} >
           
            
    <Form onSubmit={this.handleSubmit} class="ui right">
    
    <Form.Field>

      <label style={{textAlign:"right"}}>نام کاربری:</label>
      <input
      	name="userName"
      	value={this.state.user}
      	onChange= {this.handleInput}
        placeHolder= "نام کاربری"

      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>رمز عبور:</label>
      <input
        type="password"
        dir="rtl"
      	name="authorName"
      	value={this.state.pass}
      	onChange= {this.handleInput}
        placeHolder="زمر عبور"
      />
    </Form.Field>


    

    <Button.Group>
    <Button primary onClick={this.redirectToReg.bind(this)}>ساخت اکانت جدید</Button>
    <Button.Or text='یا' />
    <Button positive onClick={this.handleSubmit}>ورود به اکانت</Button>
  </Button.Group>

  </Form>
  {this.renderRedirectBack()}
 {this.state.error_message && <Message
      error
      header='مشکل در ثبت اطلاعات'
      content= {this.state.error_message}
    />}

                      </Grid.Column>

        </Grid>
    </div>
			)
	}
}