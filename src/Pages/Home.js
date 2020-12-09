import React, { Component } from "react";
import axios from "axios"; 

import "./Home.css"
class Login extends Component {

render() {
 return (
  <div className="App">
      <div class="pusher" dir="rtl">

        <div class="ui inverted vertical masthead center aligned segment" dir="rtl">
            <div class="ui text container" dir="rtl">
                <h1 class="ui inverted header">
                     سامانه‌ی تبادل کتاب هوشمند
                </h1>
                <h2>دیگر نگران منابع درسی خود نباشید!</h2>
                <br />
                <a target="_blank" href="" class="ui huge primary button">
                    <i class="right arrow icon"></i>
                    مشاهده‌ی آگهی‌ها
                </a>

            </div>
        </div>

        <div class="ui vertical stripe segment" dir="rtl">
            <div class="ui middle aligned stackable grid container" dir="rtl">
                <div class="row" dir="rtl">
                    <div class="eight wide column" dir="rtl">
                        <h3 class="ui header">کتاب‌های درسی قدیمی خود را بفروشید</h3>
                        <p>دیگر لازم نیست نگران خاک‌خوردن کتاب طراحی الگوریم خود باشید... آن را به یک دانشجوی فلک‌زده‌ی دیگر بفروشید!</p>
                        <h3 class="ui header">کتاب موردنیاز خود را ارزان بخرید</h3>
                        <p>بله، دیگر لازم نیست هزینه‌های نجومی برای کتاب‌های درسی خود بدهید یا کل میدان انقلاب را گز کنید!</p>
                    </div>
                    <div class="six wide left floated column">
                        <img src="images/landing-left.jpg" class="ui huge bordered rounded image" />
                    </div>
                </div>
                <div class="row" dir="rtl">
                    <div class="center aligned column" dir="rtl">
                        <a target="_blank" href="" class="ui huge button">ثبت آگهی</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui vertical stripe quote segment" dir="rtl">
            <div class="ui equal width stackable internally celled grid" dir="rtl">
                <div class="center aligned row" dir="rtl">
                    <div class="column" dir="rtl">
                        <h3>"دیگر نگران شروع ترم جدید نیستم"</h3>
                        <p>- قال کلیه‌ی دانشجویان کشور</p>
                    </div>
                    <div class="column" dir="rtl">
                        <h3>"دیگه فقط نگران نمره‌هامم"</h3>
                    </div>
                </div>
            </div>
        </div>

        <img style={{height: 500 + 'px', objectFit: 'cover'}} class="ui fluid image" src="images/colored-books.webp" />
    </div>

    <div class="clearfix"></div>
  </div>
  );
}

}

export default Login;