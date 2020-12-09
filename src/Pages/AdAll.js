import React, {Component} from "react";
import axios from "axios";
import SideMenu from './../SideMenu';
// import './AddAll.css'
import 'semantic-ui-css/semantic.min.css';

export default class AdAll extends Component {
    state = {
        lists: [{
            id: 1,
            title: "طراحی الگوریتم",
            author: ["ریچارد نیپولیتان"],
            image: "public/images/default.jpg",
            description: "قیمت بسیار ارزان - ویرایش چهارم",
            sell: "خرید"

        },
            {
                id: 2,
                title: "هالیدی۱ ",
                author: "دکتر محمد ابراهیم ابوکاظمی",
                image: "public/images/default.jpg",
                description: "کتاب هالیدی ۱ مخصوص درس فیزیک ۱ ویرایش هشتم قیمت مناسب بسیار تمیز",
                sell: "فروش",
            }],
        redirect: false,
        topass: 0,

    };

    render() {
        return (
            <div className="App">
                <SideMenu classIn={"allads"}/>
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
                                <div href="/ads/{{ ad.id }}" className="ui small image">
                                    <img src={ad.image} alt="Cinque Terre" width="600" height="400"/>
                                </div>
                                <div className="content">

                                    <a target="_blank" href="/ads/" className="header" dir="rtl">{ad.title}</a>
                                    <div className="meta">
                                        <a>{ad.author}</a>
                                    </div>
                                    <div className="description">{ad.description}</div>
                                    <div className="extra">
                                        <a target="_blank" href="/ads/{{ ad.id }}"
                                           className="ui right floated primary button">
                                            اطلاعات بیشتر
                                            <i className="right chevron icon"></i>
                                        </a>

                                        <div className="ui label">{ad.sell}</div>

                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>


                <div className="clearfix"></div>

            </div>
        )
    }
}