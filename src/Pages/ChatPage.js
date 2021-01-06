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
  Step,
  Icon,
  Image,
  Divider,

} from "semantic-ui-react";


export default class ChatPage extends Component {
    state = {
        lists: [ 
        {
            id: 2,
        from: "ss",
            txt: "نیما نیما بیا اینتگریت کنیم.",
            time: "1976-04-19T12:59-0500",
            profile: "",
            owned: true,
        },
        {
            id: 3,
            from: "پارسا",
            txt: "لاعات زیست‌شناسی، از ترکیب علوم کامپیوتر، آمار، ریاضی و مهندسی استفاده می‌کند. به عبارتی دیگر از بیوانفورماتیک برای تجزیه و تحلیل درون کامپیوتریِ مسائل زیست‌شناسی با استفاده از تکنیک‌های ریاضی و آمار استفاده می‌شود.",
            time: "04/11/2020 12:00",
            profile: "",
            owned: true,
        },
        {
            from: "kim",
            txt: "سلام چهطوری کجایی؟",
            time: "14",
            owned: false,
        },
        {
            from: "kim",
            txt: "سلام چهطوری کجایی؟",
            time: "14",
            owned: true,
        }
        ],
        message:"",
        redirect: false,
        topass: 1,
        logged_in: false,
        last_update: "04/11/2020 12:00",
        next_link: "yes"

    };

    loadMore = () => {
        var list = this.state.lists
        var newlist = []
        this.setState({lists:[]})
        newlist.push({from:'amin', txt:'بریم بریم', time:'14.14.14 12:23', owned:false})
        newlist.push({from:'amin', txt:'بریم بریم', time:'14.14.14 12:23', owned:true})
        newlist = newlist.concat(list)
        this.setState({lists:newlist, next_link:''})
    }

    redirectHandler = (val) => {
        
        window.location.reload()

    };
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    sendHandler = (e) => {
        if (this.state.message) {
        console.log(this.state.message)
        }
        window.location.reload()
    }
    renderRedirect = (e) => {
        if (this.state.redirect) {
            console.log(this.props.location.state.accId)
            window.location.reload()
            return (
            <Redirect to={{
                                          pathname: '/chatroom',
                                          
                                            state: {
                                            accId: this.props.location.state.accId
                                             }
                                          
                                        }} />
            )
        }
    }
    componentDidMount = () => {
        console.log(this.props.location.state.accId)
        console.log("hello")
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
          var date= new Date()
          this.setState({last_update:moment(date).format('MM/DD/YYYY hh:mm:ss')})
          
    };
    render() {
        return (
            <div className="App">
                <SideMenu />
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
                        <div>

                        {this.state.next_link && <Button circular icon='arrow circle up' color="yellow" onClick={this.loadMore.bind(this)}/>}
                        <Divider />
    {this.state.lists.map((chat) => (
        (chat.owned ?
    <Grid key={chat.id} columns={2}>

     <Grid.Column>
     <Segment inverted color='orange' >
     {chat.from}
     <br />
     <Segment>
        {chat.txt}
        </Segment>
        {chat.time}
    </Segment>

    
  
    </Grid.Column>

    <Grid.Column>
      
    </Grid.Column>
  </Grid>
    :
    <Grid key={chat.id} columns={2}>

     <Grid.Column>
     

    
  
    </Grid.Column>

    <Grid.Column>

    
    <Segment inverted color='teal'>
    {chat.from}
    <br />
    <Segment>
    {chat.txt}
    </Segment>
        {chat.time}
    </Segment>
      
    </Grid.Column>
  </Grid>
    )

  ))}

    {this.state.lists.length === 0 && <div>  <Message color='violet' dir="rtl">تاکنون پیامی ارسال نشده‌است.</Message></div>}
    <br />
    <Divider />

    <Segment inverted color="black">
    <Form dir="rtl">
     <Form.TextArea name="message"
        value={this.state.message}
        onChange= {this.handleInput} placeholder='پیام جدید' />
    <Button animated='vertical' inverted color="yellow" onClick={this.redirectHandler.bind(this)}>
      <Button.Content hidden>به‌روزرسانی</Button.Content>
      <Button.Content visible>
        آخرین به‌روزرسانی: {this.state.last_update}
      </Button.Content>
    </Button>
    <Button inverted color='green' onClick={this.sendHandler.bind(this)}>
    ارسال
    </Button>
     </Form>
    </Segment>

    <br />
      
    
  </div>
                        
                    </div>
                    {this.renderRedirect()}
                </div>


                
          
          

                <div className="clearfix"></div>

            </div>
        )
    }
}