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

export default class AccForm extends Component {
	state = {
	    user:"",
      pass:"",
      number:"",
      name:"",
      image:"",
      redirect: false,
      redirectBack: false,
  	};

  	fileInputRef = React.createRef();

  	componentDidMount() {
  		if (this.props.classIn==="editacc") {
  			this.setState({
  			user:"سیام",
        pass:"شسیبشس",
        number:"09121406265",
        name:"کیمیا یزدانی",
        image:"/images/books.jpg",
  			})
  		}
  	};
 redirectToReg = (e) => {
    this.setState({
      redirectBack: true
    })
  };

	fileChange = (e) => {
	    this.setState({ image: e.target.files[0] }, () => {
	      console.log("File uploaded --->", this.state.image);
	    });
  	};

  	fileUpload = file => {
	  	const url = "http://localhost:8000/api/asknima";
	    const formData = new FormData();
	    formData.append("file", file);

	    const config = {
	      headers: {
	        "Content-type": "multipart/form-data"
	      }
	    };
	    return put(url, formData, config);
  	};

  	handleToggle = (e) => {
  		this.setState ({
  			for_sale: !this.state.for_sale
  		})
  	};

	handleInput = (e) => { 
		
	    this.setState({ 
	        [e.target.name]: e.target.value, 
	    }); 
		
	}; 
  renderRedirectBack = (e) => {
        if (this.state.redirectBack) {
            return (
            <Redirect to={{pathname: '/acc/'}} />
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
	  this.fileUpload(this.state.image).then(response => {
      	console.log(response.data);
    });


	  axios 
	      .post("http://localhost:8000/api/asknima", { 
	          user: this.state.user, 
            pass: this.state.pass, 
            name: this.state.name,
            number: this.state.number,
            image: this.state.image
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

			<div  className="App">

				<SideMenu classIn={this.props.classIn}/>
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

    <Grid textAlign="center" verticalAlign="middle" dir="rtl">
    <Grid.Column style={{ maxWidth: 700, backgroundColor:"#e0e0eb"}} >
           
            
    <Form onSubmit={this.handleSubmit} class="ui right">
    <Form.Field>
      <label style={{textAlign:"right"}}>تصویر پروفایل:</label>
      <Form.Input
        placeHolder= "تصویر پروفایل"
      	ref={this.fileInputRef}
      	type="file"
      	name="image"
      	onChange= {this.fileChange}
      />
    </Form.Field>
    <Form.Field>

      <label style={{textAlign:"right"}}>نام و نام خانوادگی:</label>
      <input
        placeHolder= "نام و نام خانوادگی"
        name="name"
        value={this.state.name}
        onChange= {this.handleInput}

      />
      </Form.Field>
       <Form.Field>

      <label style={{textAlign:"right"}}>شماره‌ی همراه:</label>
      <input
        placeHolder= "شماره‌ی همراه"
        name="number"
        value={this.state.number}
        onChange= {this.handleInput}

      />
      </Form.Field>
    <Form.Field>

      <label style={{textAlign:"right"}}>نام کاربری:</label>
      <input
        placeHolder= "نام کاربری"
      	name="user"
      	value={this.state.user}
      	onChange= {this.handleInput}

      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>رمز عبور:</label>
      <input
        dir="rtl"
      	name="pass"
        type="password"
      	value={this.state.pass}
      	onChange= {this.handleInput}
        placeHolder="رمز عبور"
      />
    </Form.Field>
  
    
    

    {this.props.classIn==="editacc"? <Button type='submit' color="green" >ثبت</Button>:
    <Button.Group>
    <Button primary onClick={this.redirectToReg.bind(this)}>عضو هستید</Button>
    <Button.Or text='یا' />
    <Button positive onClick={this.handleSubmit}>ساخت اکانت</Button>
  </Button.Group>}

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