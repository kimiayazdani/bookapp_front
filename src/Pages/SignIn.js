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
      redirectBack: false,
      error_message: this.props.location.state? this.props.location.state.error_message:'',
  	};

  componentDidMount(props) {
      console.log(props);
  };


	handleInput = (e) => { 
		
	    this.setState({ 
	        [e.target.name]: e.target.value, 
	    }); 
		
	}; 
  redirectToReg = (e) => {
    this.setState({
      redirectBack: true
    })
  };
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

     axios 
        .post("http://localhost:8000/api/v1/account/login/", { 
            username: this.state.user,
            password: this.state.pass,
        }) 
        .then((res) => { 
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          this.setState({redirect:true});
            })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            this.setState({error_message: err.response.data.message})
          }else {
          this.setState({error_message:'متاسفانه اتصال برقرار نشد.'});
        }
          
        }); 

      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('refresh_token'));
	}; 
	render () {
		return (

			<div className="App">

				<SideMenu classIn="login" {...this.props}/>
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

    <Grid textAlign="center" verticalAlign="middle" dir="rtl" >
    <Grid.Column style={{ maxWidth: 700, backgroundColor:"#e0e0eb"}} >
           
            
    <Form onSubmit={this.handleSubmit} class="ui right">
    
    <Form.Field>

      <label style={{textAlign:"right"}}>نام کاربری:</label>
      <input
      	name="user"
      	value={this.state.user}
      	onChange= {this.handleInput}
        placeholder= "نام کاربری"

      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>رمز عبور:</label>
      <input
        type="password"
        dir="rtl"
      	name="pass"
      	value={this.state.pass}
      	onChange= {this.handleInput}
        placeholder="زمر عبور"
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
      header='درخواست انجام نشد'
      content= {this.state.error_message}
    />}

                      </Grid.Column>

        </Grid>
    </div>
			)
	}
}