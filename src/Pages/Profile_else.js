import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';
import { Redirect } from 'react-router';
// import './AddAll.css'
import 'semantic-ui-css/semantic.min.css';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Checkbox,
  Card,
  Icon,
  Feed,
  Rating
} from "semantic-ui-react";


export default class ProfileElse extends Component {
    state = {
        email:"yazdanikimia@gmail.com",
        image:"",
        namename: 'کیمیا یزدانی',
        username: this.props.accId,
        bio: 'کتاب خیلی خوب است.',
        lists: [{
            id: 1,
            title: "طراحی الگوریتم",
            author: ["ریچارد نیپولیتان"],
            image: "",
            description: "قیمت بسیار ارزان - ویرایش چهارم",
            sell: "buy",
            price: 0

        },
            {
                id: 2,
                title: "هالیدی۱ ",
                author: "دکتر محمد ابراهیم ابوکاظمی",
                image: "",
                description: "کتاب هالیدی ۱ مخصوص درس فیزیک ۱ ویرایش هشتم قیمت مناسب بسیار تمیز",
                sell: "sell",
                price: 24000,
            }],
        redirect: false,
        topass: 1,
        logged_in: false,
        redirectchat: false,
        average_rating: 1,
        number_rating: 20,
        prev_rating: 0

    };

    redirectHandler = (val) => {
    	this.setState({
    		redirect: true,
    		topass: val.target.name
    	});
    };

    renderRedirect = (e) => {
    	if (this.state.redirect) {
    	    return (
    		<Redirect to={{
										  pathname: '/ad/detail',
										  state: {
										    adId: this.state.topass
										  }
										}} />
    		)
    	}
        if (this.state.redirectchat) {
            return (
            <Redirect to={{
                                          pathname: '/chatroom',
                                          state: {
                                            accId: this.state.username
                                          }
                                        }} />
            )
        }
    }

    handleRate = (e, { rating, maxRating }) => {    
        
        console.log(rating)
        console.log(maxRating)
        console.log(this.state.average_rating)
        console.log(this.state.number_rating)
        axios.post("http://127.0.0.1:8000/api/v1/account/rate/"+this.state.username+"/post/", {
            rate: rating
        },  { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            
          }).catch((err) => {})



    }

    redirectChat = (val) => {
        this.setState({redirectchat:true})
    }
    componentWillMount = () => {
        
                axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
            localStorage.setItem('token', res.data.access);
            this.setState({logged_in:true});
          }).catch((err) => {


          });
        axios.get("http://127.0.0.1:8000/api/v1/account/show/"+this.state.username+"/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({username:res.data.username, email:res.data.email, image:(res.data.avatar? res.data.avatar: ""), namename: res.data.name,
              bio: res.data.bio})
          }).catch((err) => {})
        console.log(this.state.image)
        axios
            .get("http://localhost:8000/api/v1/book-advertise/"+this.state.username+"/posts/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
            .then((res) => {
                var a = this.state.lists
                for (var i = 0; i < res.data.length; i++) {
                    a.push({id: res.data[i].id, title: res.data[i].title, author: res.data[i].authorName,
                        image:res.data[i].poster? res.data[i].poster: '',
                        description: res.data[i].description, sell: res.data[i].ad_type, price: (res.data[i].price? res.data[i].price: 0)
                    })
                }
                console.log(a)
                this.setState({
                    lists: a
                })
            })
            .catch((err) => {
                
            });

         axios.get("http://127.0.0.1:8000/api/v1/account/rate/"+this.state.username+"/get/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({average_rating:res.data.rating})
            this.setState({number_rating:res.data.number_rating})
            this.setState({prev_rating: res.data.prev_rating})
          }).catch((err) => {})
         


         if (this.state.logged_in) {
            axios.get("http://127.0.0.1:8000/api/v1/account/rate/"+this.state.username+"/get/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({prev_rating: res.data.prev_rating})
          }).catch((err) => {})
         }

    };
    render() {
        const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
)
        return (
            <div className="App">
                <SideMenu classIn={"accprof"} />
                <div className="ui container">

                    <div className="ui message">
                        <h1 className="ui huge header">کتاب‌باز</h1>
                        <p className="lead">
                            مکانی برای تبادل کتاب های شما
                        </p>
                    </div>
                </div>
                <br/>
                <div className="ui container" dir="ltr">
                    <div className="ui relaxed divided items">
                    
            <Card fluid color='green'>
            <Card.Content dir='rtl'>
                <Card.Header dir ='ltr'>{this.state.logged_in && <Button secondary onClick={this.redirectChat.bind(this)}>مکالمه‌ی خصوصی</Button>}{this.state.username} </Card.Header>
                {this.state.logged_in===false?   <Rating dir='ltr' defaultRating={Math.floor(this.state.average_rating)} maxRating={5} disabled/> : <Rating dir='ltr' defaultRating={Math.floor(this.state.prev_rating)} maxRating={5} onRate={this.handleRate} />} 
                <br/>
                میانگین: {this.state.average_rating} در {this.state.number_rating} نفر
            </Card.Content>
            <Card.Content dir='rtl'>
            <Feed dir='rtl'>
            <Feed.Event>
              {this.state.image? <Feed.Label image={`data:image/png;base64,${this.state.image}`} />: <Feed.Label image="/images/avatar.jpeg" />}
              

              <Feed.Content>
                <Feed.Date content={this.state.namename} />

                <Feed.Summary>
                  {this.state.bio}


                </Feed.Summary>
              </Feed.Content>

              
            </Feed.Event>
            </Feed>
            </Card.Content>
            

            </Card>

            
  
                       {this.state.lists.map((ad) => (
                            <div key={{ad}} className="item">
                                <div className="ui small image">
                                    {ad.image? <img src={`data:image/png;base64,${ad.image}`} style={{width: 600 + 'px'}}/> :<img src="/images/default.jpg" alt="Can't reload" width="600" height="400"/>}
                                    
                                </div>
                                <div className="content" style={{textAlign:"right"}}>

                                    <a target="_blank" href="/ads/" className="header" dir="rtl" >{ad.title}</a>

                                    <div className="meta">
                                        <a>{ad.author}</a>
                                    </div>

                                    <div className="description">{ad.description}</div>
                                    <br />
                                    <div className="ui label">{ad.sell === 'sale'? 'فروش': 'خرید'}</div>
                                    {ad.sell === 'sale' && <div className="ui label" dir="rtl">  {ad.price} تومان </div>}
                                    <div className="extra">
                                     <Button target="_blank" name={ad.id} onClick={this.redirectHandler.bind(this)}
                                           className="ui right floated primary button">
                                            اطلاعات بیشتر
                                            <i className="right chevron icon"></i>
                                       </Button>
                                        

                                    </div>
                                </div>
                            </div>


                        ))}
                    </div>
                    {this.renderRedirect()}
                </div>


                <div className="clearfix"></div>

            </div>
        )
    }
}
