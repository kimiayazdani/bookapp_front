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
  Feed
} from "semantic-ui-react";


export default class ChatPage extends Component {
    state = {
        lists: [ 
        {
            id: 2,
            corr: this.props.location.state.accId,
            lastpm: "نیما نیما بیا اینتگریت کنیم.",
            lastdate: "10/23/1999 12:03",
            profile: ""
        },
        {
            id: 3,
            corr: "پارسا",
            lastpm: "لاعات زیست‌شناسی، از ترکیب علوم کامپیوتر، آمار، ریاضی و مهندسی استفاده می‌کند. به عبارتی دیگر از بیوانفورماتیک برای تجزیه و تحلیل درون کامپیوتریِ مسائل زیست‌شناسی با استفاده از تکنیک‌های ریاضی و آمار استفاده می‌شود.",
            lastdate: "04/11/2020 12:00",
            profile: ""
        }
        ],
        redirect: false,
        topass: 1,
        logged_in: false

    };

    redirectHandler = (val) => {
        console.log(val)
    	this.setState({
    		redirect: true,
    		topass: val
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
    }
    componentDidMount = () => {
        axios
            .get("http://localhost:8000/api/v1/book-advertise/post/")
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

             axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
            localStorage.setItem('token', res.data.access);
            this.setState({logged_in:true});
          }).catch((err) => {


          });
    };
    render() {

        return (
            <div className="App">
                <SideMenu classIn={"allads"} />
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
                        

                        {this.state.lists.map((chat) => (
                    <Card fluid color="orange" key={{chat}} name={chat.id} link onClick={this.redirectHandler.bind(this, chat.id)}>
                            <Card.Content>
                            <Card.Header>{chat.corr} </Card.Header>
                            </Card.Content>

                            <Card.Content dir='rtl'>

            <Feed>
            <Feed.Event>
              {chat.profile? <Feed.Label image={`data:image/png;base64,${chat.profile}`} />: <Feed.Label image="/images/default.jpg" />}
              <Feed.Content>
                <Feed.Date content={chat.lastdate} />

                <Feed.Summary>
                  {chat.lastpm}

                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            </Feed>
            </Card.Content>
            
                            </Card>
                            ))}
                    </div>
                    {this.renderRedirect()}
                </div>


                <div className="clearfix"></div>

            </div>

        )
    } 
    
}