import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';

import "./AdDetails.css"

export default class AdDetails extends Component {
<<<<<<< HEAD
	state = {
		   title: "طراحی الگوریتم",
		    author: "دکتر محمد ابراهیم ابوکاظمی",
            image: "/images/default.jpg",
            description: "قیمت بسیار ارزان - ویرایش چهارم",
            sell: "فروش"
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
			<SideMenu logged_in={this.props.logged_in}/>
			
			<link rel="stylesheet" type="text/css" href="{% 'AdDetails.css' %}" />
			
			<div className="ui container">
			  <div className="ui message">
				<h1 className="ui huge header">کتاب‌باز</h1>
				<p style={{fontFamily: 'iransansdn', fontWeight: 'bold'}} className="lead">
				  مکانی برای تبادل کتاب های شما
				</p>
			  </div>
			</div>
			
			<div className="ui divider" />
			<div className="ui container">
			  <div className="ui relaxed divided items">

				{/*  author title + sell/buy */}
				<div className="item">
				  <div className="content" dir="rtl"  style={{textAlign:"right"}}>
					<a className="ui large header"> {this.state.title }</a>
					<div className="meta" dir="rtl">
					{sell == "فروش"?  <div className="ui label">فروش</div>:<div className="ui label">خرید</div> }
					  <a> {this.state.author} </a>
					</div>
				  </div>
				</div>

				{/* other information about the book */}
				<div className="item">
				  {/* book image */}
				  <div className="ui medium image">
					<img className="info_container__image" src={this.state.image} alt="image" />
				  </div>
				  {/* general information */}
				  
				  <div className="ui text container float right">
					<div className="ui segments" style={{textAlign:"right"}}>
					  <div className="ui segment" dir="rtl">
						<strong>آگهی‌دهنده: علی حیدری</strong>
					  </div>
					  <div className="ui segment" dir="rtl">
						<strong>شماره تماس: 09120123456</strong>
					  </div>
					  <div className="ui segment" dir="rtl">
						<strong>دانشکده: کامپیوتر</strong>
					  </div>
					  <div className="ui segment" dir="rtl">
						<strong>دانشگاه: صنعتی شریف</strong>
					  </div>
					  <div className="ui segment" dir="rtl">
						<strong>قیمت: 20000 تومان</strong>
					  </div>
					</div>
				  </div>
				</div>
				{/* long description */}
				<div className="item" dir="rtl">
				  <div className="description" dir="rtl">
					{ this.state.description }
				  </div>
				  
				</div>
				
			  </div>
			  
			  <div className="ui divider" />
			  {/* action buttons */}
			  <div className="spaced" dir="rtl">
				<button className="green ui button" onclick="window.open('/ads/{{ ad.id }}/edit')">
				  ویرایش
				</button>
				<button className="red ui button" onclick="window.open('/ads/{{ ad.id }}/delete')">
				  حذف
				</button>
				
			  </div>
			  
			</div>
		
		  </div>
		 
		);
	  }

	  
=======
    state = {
        title: "طراحی الگوریتم",
        author: "دکتر محمد ابراهیم ابوکاظمی",
        image: "/images/default.jpg",
        description: "قیمت بسیار ارزان - ویرایش چهارم",
        sell: "فروش"

    };

    componentDidMount = () => {
        axios
            .get("http://localhost:8000/api/asknima")
            .then((res) => {
                this.setState({ title: res.title, author: res.author, image: res.image? res.image: "/images/default.jpg",
                description: res.description, sell: res.sell})
            })
            .catch((err) => {
            });
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
                <SideMenu/>

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
                                    {sell == "فروش" ? <div className="ui label">فروش</div> :
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
                                        <strong>آگهی‌دهنده: علی حیدری</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>شماره تماس: 09120123456</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>دانشکده: کامپیوتر</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>دانشگاه: صنعتی شریف</strong>
                                    </div>
                                    <div className="ui segment" dir="rtl">
                                        <strong>قیمت: 20000 تومان</strong>
                                    </div>
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

                </div>

            </div>

        );
    }

>>>>>>> 95f77ce1d53f151b28512b11a484a7278b456a93

}

