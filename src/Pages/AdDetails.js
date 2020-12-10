import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';
import { Redirect } from 'react-router';

import "./AdDetails.css"

export default class AdDetails extends Component {
	
    state = {
        id: this.props.location.state.id,
        title: "طراحی الگوریتم",
        author: "دکتر محمد ابراهیم ابوکاظمی",
        image: "/images/default.jpg",
        description: "قیمت بسیار ارزان - ویرایش چهارم",
        sell: "فروش",
        redirect: false,
        price: 0,

        user_name: 'علی حیدری',
        user_number: '09121406265',
        user_univ: 'صنعتی شریف',
        user_dep: 'کامپیوتر'

        

    };

    componentDidMount = () => {
    	console.log('sdfadf')
    	console.log(localStorage.getItem('salam'))
    	console.log(this.props.logged_in)
        axios
            .get("http://localhost:8000/api/asknima" + this.state.id, { headers: {'token': localStorage.getItem('token')}} )
            .then((res) => {
                this.setState({ title: res.title, author: res.author, image: res.image? res.image: "/images/default.jpg",
                description: res.description, sell: res.sell, price: res.price, user_name: res.user_name, user_dep: res.user_dep,
                user_number: res.user_number, user_univ: res.user_univ})
            })
            .catch((err) => {
            	this.setState({redirect:false})
            });
    };

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
                                    {sell == "sell" ? <div className="ui label">فروش</div> :
                                        <div className="ui label">خرید</div>}
                                    <a> {this.state.author} </a>
                                </div>
                            </div>
                        </div>

                        {/* other information about the book */}
                        <div className="item">
                            {/* book image */}
                            <div className="ui medium image">
                                <img className="info_container__image" src={this.state.image} alt="image"/>
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
                                        <strong>دانشکده: {this.state.user_dep}</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>دانشگاه: {this.state.user_univ}</strong>
                                    </div>
                                    {this.state.sell==='sell'? <div className="ui segment" dir="rtl">
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
                        <button className="green ui button" onclick="window.open('/ads/{{ ad.id }}/edit')">
                            ویرایش
                        </button>
                        <button className="red ui button" onclick="window.open('/ads/{{ ad.id }}/delete')">
                            حذف
                        </button>

                    </div>
                    {this.renderRedirectBack()}
                </div>

            </div>

        );
    }

}

