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
  Checkbox
} from "semantic-ui-react";


export default class AdVer extends Component {
    state = {
        lists: [{
            id: 1,
            title: "طراحی الگوریتم",
            author: ["ریچارد نیپولیتان"],
            image: "/images/default.jpg",
            description: "قیمت بسیار ارزان - ویرایش چهارم",
            sell: "buy",
            price: 0

        },
            {
                id: 2,
                title: "هالیدی۱ ",
                author: "دکتر محمد ابراهیم ابوکاظمی",
                image: "/images/default.jpg",
                description: "کتاب هالیدی ۱ مخصوص درس فیزیک ۱ ویرایش هشتم قیمت مناسب بسیار تمیز",
                sell: "sell",
                price: 24000,
            }],
        redirect: false,
        topass: 1,
        redirectall: false,
        is_staff: "f"

    };

    redirectHandler = (val) => {
         axios
            .patch("http://localhost:8000/api/v1/book-advertise/approve/" + val.target.name, {status:"approved"},{ headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
            .then((res) => {
               this.setState({
            redirect: true,
            topass: val.target.name
        });

            })
            .catch((err) => {
                // this.setState({redirectall:true})
                
            });
    	this.setState({
    		redirect: true,
    		topass: val.target.name
    	});
    };


    handleDelete = (e) => {
        e.preventDefault(); 
        axios
            .patch("http://localhost:8000/api/v1/book-advertise/approve/" + e.target.name, {status:"disapproved"}, { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
            .then((res) => {
               this.setState({
            redirect: true,
            topass: e.target.name
        })}).catch((err)=>{});
    };

    renderRedirect = (e) => {
    	if (this.state.redirect) {
    	    return (
    		<Redirect to={{
										  pathname: '/ad/ver',
										}} />

    		)
    	}
        if (this.state.redirectall) {
            return (
            <Redirect to={{
                                          pathname: '/ad/',
                                        }} />

            )

        }
    }

    componentDidMount = () => {
         axios.get("http://127.0.0.1:8000/api/v1/account/properties/", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}}).then((res)=>{
            if(res.data.is_staff) {} else {this.setState({redirectall:true})}
          }).catch((err) => {})


             axios
            .get("http://localhost:8000/api/v1/book-advertise/all", { headers: {'Authorization': 'Bearer  ' + localStorage.getItem('token')}})
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
    };
    render() {
        return (
            <div className="App">
                <SideMenu classIn={"adver"} />
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
                        {this.state.lists.map((ad) => (
                            <div key={{ad}} className="item">
                                <div className="ui small image">
                                    <img src={ad.image} alt="Cinque Terre" width="600" height="400"/>
                                </div>
                                <div className="content" style={{textAlign:"right"}}>

                                    <a target="_blank" href="/ads/" className="header" dir="rtl" >{ad.title}</a>

                                    <div className="meta">
                                        <a>{ad.author}</a>
                                    </div>

                                    <div className="description">{ad.description}</div>
                                    <br />
                                    <div className="ui label">{ad.sell === 'sell'? 'فروش': 'خرید'}</div>
                                    {ad.sell === 'sell' && <div className="ui label" dir="rtl">  {ad.price} تومان </div>}
                                    <div className="extra">
                                     <Button target="_blank" name={ad.id} onClick={this.redirectHandler.bind(this)}
                                           className="ui right floated primary button">
                                            تایید آگهی
                                            <i className="right chevron icon"></i>
                                       </Button>
                                       <Button target="_blank" name={ad.id} onClick={this.handleDelete.bind(this)}
                                           className="ui right floated secondary button">
                                            رد آگهی
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