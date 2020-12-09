import React, { Component } from "react";
import axios from "axios"; 
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

export default class AdForm extends Component {
	state = {
	    bookName:"",
	    authorName:"",
	    image: "",
	    description:"",
	    error_message:"مسئله",
  	};
  	componentDidMount() {
  		if (this.props.classIn==="editad") {
  			this.setState({
  				bookName: "جنایات و مکافات",
  				authorName: "داستایوفسکی",
  				image: "باید این رو درست کنم",
  				description: "وضیحات"
  			})
  		}
  	};
  handleInput = (e) => { 
        this.setState({ 
            [e.target.name]: e.target.value, 
        }); 
  }; 
  handleSubmit = (e) => { 
      e.preventDefault(); 

      axios 
          .post("http://localhost:8000/api/asknima", { 
              bookName: this.state.bookName, 
              authorName: this.state.authorName,
              image: this.state.image,
              description: this.state.description 
          }) 
          .catch((err) => {
            
              this.setState({ 
                  error_message:err.response.data.error
               });
            
          }); 
  }; 
	render () {
		return (
			<div className="App">
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


    <Grid textAlign="center" verticalAlign="middle" >
    <Grid.Column style={{ maxWidth: 700, backgroundColor:"#e0e0eb"}} >
           
            
    <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label style={{textAlign:"right"}}>:تصویر</label>
      <Form.Input
      	name="image"
      	value={this.state.image}
      	onChange= {this.handleInput}
      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>:نام کتاب</label>
      <Form.Input
      	name="bookName"
      	value={this.state.bookName}
      	onChange= {this.handleInput}

      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>:نام نویسنده</label>
      <Form.Input
      	name="authorName"
      	value={this.state.authorName}
      	onChange= {this.handleInput}
      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>:توضیحات</label>
      <Form.TextArea 
      	name="description"
      	value={this.state.description}
      	onChange= {this.handleInput}
      /> 
    </Form.Field>
    <Form.Field style={{textAlign:"right"}}>
      <Checkbox label='فروشی' />
    </Form.Field>

    <Button type='submit' color="green" >ثبت</Button>

  </Form>
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


 // <Header as="h2" color="teal" textAlign="center">
              // <img src="/static/images/HappyAnimals.png" alt="logo" className="image" />{" "}
              // به حساب کاربری خود وارد شوید.
            // </Header>
// <Form size="large" onSubmit={this.handleSubmit}>
//               <Segment stacked>
//                 <Form.Input
//                   fluid
//                   icon="user"
//                   iconPosition="left"
//                   placeholder="آدرس ایمیل"
//                   name = "user"
//                   value={this.state.user}
//                   onChange = {this.handleInput}
//                 />
//                 <Form.Input
//                   fluid
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="پسورد"
//                   type="password"
//                   name = "pass"
//                   value = {this.state.pass}
//                   onChange = {this.handleInput}
//                 />
//                 <Button type="submit" color="teal" fluid size="large">
//                   وارد شوید
//                 </Button>
//               </Segment>
//             </Form>

// <Message>
              // جدیدید؟ <a href="/SignUp">به ما بپیوندید</a>
              // <p background-color="coral"> error message: {this.state.error_message? this.state.error_message : "none"} </p>
            // </Message>
