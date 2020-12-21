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
      imagefile: "",
      email:"",
      redirect: false,
      redirectBack: false,
      error_message: '',
      namename: '',
      bio: ''
  	};

  	fileInputRef = React.createRef();

  	componentDidMount() {
  		if (this.props.classIn==="editacc") {
  		        axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
        localStorage.setItem('token', res.data.access);
        
          }).catch((err) => {
            this.setState({redirectBack:true})

      });
          axios.get("http://127.0.0.1:8000/api/v1/account/properties/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({user:res.data.username, email:res.data.email, image:(res.data.avatar? "../../bookapp_back" + res.data.avatar: "/images/books.jpg"), number: res.data.phone_number, namename: res.data.name,
              bio: res.data.bio})
          })
  		}
      else {
        axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
        localStorage.setItem('token', res.data.access);
        this.setState({redirect:true})
        
          }).catch((err) => {

      });
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
    if (this.props.classIn === 'editacc') {
	  this.fileUpload(this.state.image).then(response => {
      	console.log(response.data);
    });
    axios 
        .post("http://localhost:8000/api/v1/account/update/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}},{ 
            username: this.state.user, 
            password: this.state.pass, 
            email: this.state.name,
            number: this.state.number,
            image: this.state.image
        }) 
        .then((res) => { 
              this.setState({
                redirect: true
              })
            })
        .catch((err) => {
          
          if (err.response && err.response.data && err.response.data.message) {
            this.setState({error_message: err.response.data.message})
          }else {
          this.setState({error_message:'متاسفانه اتصال برقرار نشد.'});
        }
        });
    }
    else {

	  axios 
	      .post("http://localhost:8000/api/v1/account/register/", { 
	          username: this.state.user, 
            password: this.state.pass, 
            email: this.state.name,
            number: this.state.number,
            image: this.state.image
	      }) 
        .then((res) => { 
              
              localStorage.setItem('token', res.data.access_token);
              localStorage.setItem('refresh_token', res.data.refresh_token);
              this.setState({
                redirect: true
              })
            })
	      .catch((err) => {
	        
	        if (err.response && err.response.data && err.response.data.message) {
            this.setState({error_message: err.response.data.message})
          }else {
          this.setState({error_message:'متاسفانه اتصال برقرار نشد.'});
        }
	      });
        } 
	}; 
	render () {
		return (

			<div  className="App">

				<SideMenu classIn={this.props.classIn} logged_in={this.props.logged_in} handle_logout={this.props.handle_logout}/>
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
    {this.props.classIn === "editacc" && <Form.Field>
      <label style={{textAlign:"right"}}>تصویر پروفایل:</label>
      <Form.Input
        placeHolder= "تصویر پروفایل"
      	ref={this.fileInputRef}
      	type="file"
      	name="imagefile"
      	onChange= {this.fileChange}
      />
    </Form.Field>}

    {this.props.classIn === "editacc" && <img src={this.state.image} style={{width: 70 + 'px'}} />}

    {this.props.classIn === "editacc" && <Form.Field>
    

      <label style={{textAlign:"right"}}>نام و نام خانوادگی:</label>
      <input
        placeHolder= "نام و نام خانوادگی"
        name="namename"
        value={this.state.namename}
        onChange= {this.handleInput}

      />
      </Form.Field> }
      {this.props.classIn === "editacc" && <Form.Field>
      <label style={{textAlign:"right"}}>بیوگرافی:</label>
      <Form.Input
        placeHolder= "بیوگرافی"
        name="bio"
        value={this.state.bio}
        onChange= {this.handleInput}
      />
    </Form.Field>}
    {this.props.classIn === "editacc" && <Form.Field>


      <label style={{textAlign:"right"}}>ایمیل:</label>
      <input
        placeHolder= "ایمیل"
        name="email"
        value={this.state.email}
        onChange= {this.handleInput}

      />
      </Form.Field> }
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
        placeholder= "نام کاربری"
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
        placeholder="رمز عبور"
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