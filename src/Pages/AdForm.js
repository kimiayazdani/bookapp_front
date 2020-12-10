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

export default class AdForm extends Component {
	state = {
	    bookName:"",
	    authorName:"",
	    image: "/images/books.jpg",
	    description:"",
	    error_message:"مسئله",
	    for_sale: false,
      redirect: false,
      redirectBack: false,
      adId: 0,
  	};

  	fileInputRef = React.createRef();

  	componentDidMount() {
  		if (this.props.classIn==="editad") {
  			this.setState({
  				bookName: "جنایات و مکافات",
  				authorName: "داستایوفسکی",
  				image: "باید این رو درست کنم",
  				description: "وضیحات",
  				for_sale: true,
          adId: 2
  			})
  		}
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
            <Redirect to={{
                                          pathname: '/ad/detail',
                                          state: {
                                            adId: this.state.adId
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
	handleSubmit = (e) => { 
	  e.preventDefault(); 
	  this.fileUpload(this.state.image).then(response => {
      	console.log(response.data);
    });


	  axios 
	      .post("http://localhost:8000/api/asknima", { 
	          bookName: this.state.bookName, 
	          authorName: this.state.authorName,
	          image: this.state.image,
	          description: this.state.description,
	          for_sale: this.state.for_sale
	      }) 
        .then((res) => { 
            if(this.props.classIn==="editad") {
              this.setState({
                redirectBack: true
              })
            } else {
              this.setState({
                redirect: true
              })
            }
            })
	      .catch((err) => {
	        
	        
	      }); 
	}; 
	render () {
		return (

			<div  className="App">

				<SideMenu classIn={this.props.classIn}logged_in={this.props.logged_in}/>
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
      <label style={{textAlign:"right"}}>تصویر:</label>
      <Form.Input
        placeHolder= "تصویر"
      	ref={this.fileInputRef}
      	type="file"
      	name="image"
      	onChange= {this.fileChange}
      />
    </Form.Field>
    <Form.Field>

      <label style={{textAlign:"right"}}>نام کتاب:</label>
      <input
        placeHolder= "نام کتاب"
      	name="bookName"
      	value={this.state.bookName}
      	onChange= {this.handleInput}

      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>نام نویسنده:</label>
      <input
        dir="rtl"
      	name="authorName"
      	value={this.state.authorName}
      	onChange= {this.handleInput}
        placeHolder="نام نویسنده"
      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>توضیحات:</label>
      <Form.TextArea 
      	name="description"
      	value={this.state.description}
      	onChange= {this.handleInput}
        placeHolder="توضیحات"
      /> 
    </Form.Field>
    <Form.Field style={{textAlign:"right"}}>
      <Checkbox label='فروشی' name="for_sale" checked={this.state.for_sale} onChange={this.handleToggle.bind(this)}/>
    </Form.Field>

    <Button type='submit' color="green" >ثبت</Button>

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