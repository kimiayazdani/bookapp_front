import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';
import { Redirect } from 'react-router';

import "./AdDetails.css"

export default class AdDetails extends Component {
	
    state = {
        id: 6,
        title: "طراحی الگوریتم",
        author: "دکتر محمد ابراهیم ابوکاظمی",
        image: "/images/default.jpg",
        description: "قیمت بسیار ارزان - ویرایش چهارم",
        sell: "sale",
        redirect: false,
        redirect_edit: false,
        redirect_del: false,
        price: 123,
        redirec_ad: false,

        user_name: 'علی حیدری',
        user_number: '09121406265',
        email: 'yazdanikimia@gmail.com',
        redirect_acc: false,
        redirect_ad: false,
        redirect_del:false,
        redirect_edit: false,

        

    };

    componentDidMount = () => {
        if (this.props.location && this.props.location.state && this.props.location.state.adId) {
            this.setState({id:this.props.location.state.adId})           
        }
        else {(this.setState({redirect_ad:true})); return;} 

        axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
              refresh: localStorage.getItem('refresh_token')
          }).then((res) => {
            localStorage.setItem('token', res.data.access);
          }).catch((err) => {
            this.setState({redirect_acc:true})
            return;
          });
        axios
            .get("http://localhost:8000/api/v1/book-advertise/post/" + this.props.location.state.adId + '/', { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}} )
            .then((res) => {
                this.setState({ title: res.data.title, author: res.data.authorName, image: res.data.poster?  res.data.poster: '',
                description: res.data.description, sell: res.data.ad_type, price: res.data.price, user_name: res.data.author.username,
                user_number: res.data.author.phone_number, email: res.data.author.email})
            })
            .catch((err) => {
                if (err.response && (err.response.status === 401 || err.response.status == 403)) {
                    this.setRed()
            	    this.redire()
                } else {
                    this.setState({redirect_ad:true})
                }
            });
            console.log(this.state.redirect_acc)
    };



    delete_ad = () => {
        console.log("this this this")
        this.setState({redirect_del:true})
    }

    edit_ad = () => {
        this.setState({redirect_edit:true})
    }

    setRed = () => {
        this.setState({redirect_acc:true})
    }

    redire = () => {
        return (
            <Redirect to={{
                                          pathname: '/acc/',
                                          state: {
                                            error_message: 'برای دیدن صفحه‌ی مورد نظر باید ابتدا وارد شوید.'
                                          }
                                        }} />
            )
    }


    renderRedirectBack = (e) => {
        if (this.state.redirect) {
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
        if (this.state.redirect_edit) {
            return (
                <Redirect to={{
                                          pathname: '/ad/edit/',
                                          state: {
                                            adId: this.state.id
                                          }
                                        }} />
                )
        }
        if (this.state.redirect_ad) {
            return (
                 <Redirect to={{pathname: '/ad/'}} />
                )
        }
        if (this.state.redirect_del) {
            return (
                <Redirect to={{
                                          pathname: '/ad/del/',
                                          state: {
                                            adId: this.state.id,
                                            bookName: this.state.title,
                                          }
                                        }} />
                )
        }
    };

    render() {
        function buy(props) {
            return <a>خرید</a>;
        }

        function sell(props) {
            return <a>فروش</a>;
        }

        return (
            <div className="App">
                <SideMenu logged_in={this.props.logged_in} handle_logout={this.props.handle_logout}/>

                <link rel="stylesheet" type="text/css" href="{% 'AdDetails.css' %}"/>

                <div className="ui container">
                    <div className="ui message">
                        <h1 className="ui huge header">کتاب‌باز</h1>
                        <p style={{fontFamily: 'iransansdn', fontWeight: 'bold'}} className="lead">
                            مکانی برای تبادل کتاب های شما
                        </p>
                    </div>
                </div>

                <div className="ui divider"/>
                <div className="ui container">
                    <div className="ui relaxed divided items">

                        {/*  author title + sell/buy */}
                        <div className="item">
                            <div className="content" dir="rtl" style={{textAlign: "right"}}>
                                <a className="ui large header"> {this.state.title}</a>
                                <div className="meta" dir="rtl">
                                    {this.state.sell == "sale" ? <div className="ui label">فروش</div> :
                                        <div className="ui label">خرید</div>}
                                    <a> {this.state.author} </a>
                                </div>
                            </div>
                        </div>

                        {/* other information about the book */}
                        <div className="item">
                            {/* book image */}
                            <div className="ui medium image">
                                {this.state.image? <img src={`data:image/png;base64,${this.state.image}`} style={{width: 600 + 'px'}} /> :<img src="/images/default.jpg" alt="Cinque Terre" width="600" height="400"/>}
                            </div>
                            {/* general information */}

                            <div className="ui text container float right">
                                <div className="ui segments" style={{textAlign: "right"}}>
                                    <div className="ui segment" dir="rtl">
                                        <strong>آگهی‌دهنده: {this.state.user_name}</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>شماره تماس: {this.state.user_number}</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>نام نویسنده: {this.state.author}</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>ایمیل: {this.state.email}</strong>
                                    </div>
                                    {this.state.sell==='sale'? <div className="ui segment" dir="rtl">
                                        <strong>قیمت: {this.state.price} تومان</strong> </div>: ''}
                                    
                                </div>
                            </div>
                        </div>
                        {/* long description */}
                        <div className="item" dir="rtl">
                            <div className="description" dir="rtl">
                                {this.state.description}
                            </div>

                        </div>

                    </div>

                    <div className="ui divider"/>
                    {/* action buttons */}
                    <div className="spaced" dir="rtl">
                        <button className="green ui button" onClick={this.edit_ad.bind(this)}>
                            ویرایش
                        </button>
                        <button className="red ui button" onClick={this.delete_ad.bind(this)}>
                            حذف
                        </button>

                    </div>
                    {this.renderRedirectBack()}
                </div>

            </div>

        );
    }

}

