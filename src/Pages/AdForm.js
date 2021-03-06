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
	    image: null,
	    description:"",
	    error_message:"",
      price: 0,
	    for_sale: false,
      redirect: false,
      redirectBack: false,
      redirectAcc: false,
      title: '',
      id: 0,
  	};

  	fileInputRef = React.createRef();

  	componentDidMount() {
  		if (this.props.classIn==="editad") {
        if (this.props.location && this.props.location.state && this.props.location.state.adId) {
            this.setState({id:this.props.location.state.adId})
        }
        axios.get("http://localhost:8000/api/v1/book-advertise/post/" + this.props.location.state.adId + '/', { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
          this.setState({price:res.data.price, title: res.data.title, authorName: res.data.authorName, for_sale: (res.data.ad_type === "sale"? true: false), description: res.data.description, 
            image: (res.data.poster? res.data.poster: "")})
        }).catch((err)=>{});
      }
      console.log(this.state.description)
      console.log(this.state.title)
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
	    // return put(url, formData, config);
      axios.patch(url, formData, config).catch((err) => {})
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
	handleSubmit = (e) => { 
	  e.preventDefault(); 
	  // this.fileUpload(this.state.image).then(response => {
    //   	console.log(response.data);
    // });
    var url = "http://localhost:8000/api/v1/book-advertise/post/";
    if (this.props.classIn === "editad") { url = url + this.props.location.state.adId + '/'
    console.log(this.state.image)
    axios 
        .patch(url, { 
            authorName: this.state.authorName,
            poster: this.state.image == "" ? null : this.state.image,
            description: this.state.description,
            ad_type: (this.state.for_sale? 'sale': 'buy'),
            price: this.state.price,
            title: this.state.title
        }, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}) 
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
          if (err.response && err.response.status === 408) {
            this.props.handle_refresh();
            this.handleSubmit(e);
          } else {
          this.setState({redirectAcc: true}); }
        }); 
        this.fileUpload(this.state.image)
    }  else {


	  axios 
	      .post(url, { 
	          bookName: this.state.bookName, 
	          authorName: this.state.authorName,
	          poster: this.state.image,
	          description: this.state.description,
	          ad_type: (this.state.for_sale? 'sale': 'buy'),
            price: this.state.price,
            title: this.state.title
	      }, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}) 
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
	        if (err.response && err.response.status === 408) {
            this.props.handle_refresh();
            this.handleSubmit(e);
          } else {
	        this.setState({redirectAcc: true}); }
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
    {this.state.for_sale && <Form.Field>
      <label style={{textAlign:"right"}}>تصویر:</label>
      <Form.Input
        placeHolder= "تصویر"
      	ref={this.fileInputRef}
      	type="file"
      	name="image"
      	onChange= {this.fileChange}
      />
    </Form.Field>}
    <Form.Field>

      <label style={{textAlign:"right"}}>نام آگهی:</label>
      <input
        placeholder= "نام آگهی"
        name="title"
        value={this.state.title}
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
        placeholder="نام نویسنده"
      />
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:"right"}}>توضیحات:</label>
      <Form.TextArea 
      	name="description"
      	value={this.state.description}
      	onChange= {this.handleInput}
        placeholder="توضیحات"
      /> 
    </Form.Field>
    {this.state.for_sale && <Form.Field>
      <label style={{textAlign:"right"}}>قیمت:</label>
      <input
        dir="rtl"
        name="price"
        value={this.state.price}
        onChange= {this.handleInput}
        placeholder="نام نویسنده"
      />
    </Form.Field>}
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