import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';
import { Redirect } from 'react-router';
import moment, {Moment} from 'moment'
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


export default class ChatUsers extends Component {
    state = {
        lists: [ 
        {
            id: 2,
            corr: "نیما",
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
        logged_in: '',

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
										  pathname: '/chatroom',
										  state: {
										    accId: this.state.topass
										  }
										}} />
    		)
    	}
    }
    componentDidMount = () => {

             axios.get("http://127.0.0.1:8000/api/v1/account/properties/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({logged_in: res.username})
          }).catch((err) => {})
            axios.get("http://localhost:8000/api/v1/chat/main-page/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
                var a = []
                this.setState({lists:[]})
                console.log(res.data)
                for(var i = 0; i < res.data.length; i++) {
                    a.push({id:res.data[i].receiver.id, corr:res.data[i], profile:res.data[i].avatar,
                        lastpm: res.data[i].text, lastdate:res.data[i].created})
                    console.log(res.data[0].text)
                }
                console.log(a)
                this.setState({lists:a})
            }).catch((err)=>{console.log(err)})

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
                <SideMenu classIn={"chats"} />
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
                    <Card fluid color="orange" key={{chat}} name={chat.corr} link onClick={this.redirectHandler.bind(this, chat.id)}>
                            <Card.Content>
                            <Card.Header>{chat.corr} </Card.Header>
                            </Card.Content>

                            <Card.Content dir='rtl'>

            <Feed>
            <Feed.Event>
              {chat.profile? <Feed.Label image={`data:image/png;base64,${chat.profile}`} />: <Feed.Label image="/images/default.jpg" />}
              <Feed.Content>
                <Feed.Date content={moment(chat.lastdate).format("MM/DD/YYYY hh:mm:ss")} />

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

                {this.state.lists.length===0 &&   <div>  <Message color='teal' dir="rtl">تاکنون مکالمه‌ای انجام نشده‌است.</Message></div>}
                    {this.renderRedirect()}
                
                </div>




                <div className="clearfix"></div>

            </div>

        )
    } 
    
}