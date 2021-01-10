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
            time: "2020-04-19T12:59-0500",
            profile: "",
            owned: true,
        },
        {
            from: "kim",
            txt: "سلام چهطوری کجایی؟",
            time: "1976-06-19T13:59-0500",
            owned: false,
        },
        {
            from: "kim",
            txt: "سلام چهطوری کجایی؟",
            time: "1976-04-19T12:59-0500",
            owned: true,
        }
        ],
        message:"",
        redirect: false,
        topass: 1,
        logged_in: 0,
        last_update: "04/11/2020 12:00",
        next_link: "",
        user: ""


    };

    loadMore = (val) => {
        


      axios.get(this.state.next_link, { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
        .then((res) =>{
            var prevlist = this.state.lists;
            this.setState({lists:[], next_link: res.data.next})
            var list = []
            for (var i = res.data.results.length - 1; i >= 0; i--) {
                list.push({id: res.data.results[i].id, time: res.data.results[i].created, owned: (res.data.results[i].sender !== this.props.location.state.accId),
                    txt: res.data.results[i].text, from:res.data.results[i].sender})
            }
            list = list.concat(prevlist)
            console.log(list)
            this.setState({lists:list})
        }).catch((err) => {

        })

        // newlist.push({from:'amin', txt:'بریم بریم', time:'14.14.14 12:23', owned:false})
        // newlist.push({from:'amin', txt:'بریم بریم', time:'14.14.14 12:23', owned:true})
        // newlist = newlist.concat(list)
        // this.setState({lists:newlist, next_link:''})


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

        axios.post("http://localhost:8000/api/v1/chat/" + this.props.location.state.accId + "/post/", {text:this.state.message}, { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
        .then((res) => { window.location.reload() }).catch((err) => { console.log(err) })
       
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


             axios.get("http://127.0.0.1:8000/api/v1/account/properties/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({logged_in:res.data.id, user:res.data.username})
          }).catch((err) => {})


             console.log(this.state.logged_in)



            axios.get("http://localhost:8000/api/v1/chat/" + this.props.location.state.accId + "/get/?limit=2", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
            .then((res) =>{
                this.setState({lists:[], next_link: res.data.next})
                var list = []
                for (var i = res.data.results.length - 1; i >= 0; i--) {
                    list.push({id: res.data.results[i].id, time: res.data.results[i].created, owned: (res.data.results[i].sender !== this.props.location.state.accId),
                        txt: res.data.results[i].text, from:res.data.results[i].sender});
                    console.log(res.data.results[i].sender)
                }
                this.setState({lists:list})
            }).catch((err) => {

            })
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
        (chat.owned === false ?
    <Grid key={chat.id} columns={2}>

     <Grid.Column>
     <Segment inverted color='orange' >
     {chat.from}
     <br />
     <Segment>
        {chat.txt}
        </Segment>
        {moment(chat.time).format("MM/DD/YYYY hh:mm:ss")}
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
        {moment(chat.time).format("MM/DD/YYYY hh:mm:ss")}
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