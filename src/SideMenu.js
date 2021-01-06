import React, { Component } from "react";
import axios from "axios"; 

export default class SideMenu extends Component {
    state = {
        logged_in: "f",
        is_staff: "f"
    }
	constructor(props) {
		super(props);
	}

    handle_logout() {
		axios.post("http://localhost:8000/api/v1/account/logout/", {}, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).
		catch((err) => {
		});
		localStorage.removeItem('token')
		localStorage.removeItem('refresh_token')
        this.setState({logged_in:"f"})
    }

    componentDidMount() {
        axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
        localStorage.setItem('token', res.data.access);
          this.setState({logged_in: "t"});
      }).catch((err) => {

		  });

      axios.get("http://127.0.0.1:8000/api/v1/account/properties/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            this.setState({is_staff: res.data.is_staff? "t": "f"})
          }).catch((err) => {})
    }

	render() {
		return (
			<div class="ui tablet computer only padded grid">
    		<div class="ui top fixed borderless fluid huge menu">
        	<div class="ui container">
        		<a class="link mobile hidden item" href="/">
                <img src="/images/logo1.png" style={{width: 70 + 'px'}} /></a>
            	<a href="/" class="header item">کتاب‌باز</a>
            	<div class="right menu">
           		<a href="/" class={"Home"===this.props.classIn ? "active item" : "item"}> صفحه‌ اصلی </a>
                {this.state.is_staff === "t"? <a href="/ad/ver" class={"adver"===this.props.classIn?"active item":"item"}> تایید آگهی</a>:''}
                <a href="/ad/" class={"allads"===this.props.classIn ? "active item" : "item"}> آگهی‌ها</a>
                {this.state.logged_in === "t"? <a href="/ad/new" class={"newad"===this.props.classIn ? "active item" : "item"}> ثبت آگهی </a>:''}
                {this.state.logged_in === "t"? <a href="/acc/edit" class={"editacc"===this.props.classIn ? "active item" : "item"}> ویرایش پروفایل </a>:''}
                {this.state.logged_in === "t"? <a onClick={this.handle_logout.bind(this)} class="item"> خروج از اکانت </a>:''}
                {this.state.logged_in === "f"? <a href="/acc/" class={"login"===this.props.classIn?"active item":"item"}> ورود به اکانت</a>:''}
                {this.state.logged_in === "f"? <a href="/acc/register" class={"regacc"===this.props.classIn?"active item":"item"}> ساخت اکانت</a>:''}
                {this.state.logged_in === "t"? <a href="/acc/prof" class={"accprof"===this.props.classIn?"active item":"item"}> مشاهده‌ پروفایل</a>:''}
                {this.state.logged_in === "f"? <a href="/acc/chats" class={"chats"===this.props.classIn?"active item":"item"}> مکالمات</a>:''}

            </div>
        </div>
    </div>
</div>
			);
	}
}