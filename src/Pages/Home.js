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
                    ﺪﻨﻤﺷﻮﻫ ﺏﺎﺘﮐ ﻝﺩﺎﺒﺗ ﯼﻪﻧﺎﻣﺎﺳ
                </h1>
                <h2>ﺪﯿﺷﺎﺒﻧ ﺩﻮﺧ ﯽﺳﺭﺩ ﻊﺑﺎﻨﻣ ﻥاﺮﮕﻧ ﺮﮕﯾﺩ! </h2>
                <br />
                <a target="_blank" href="" class="ui huge primary button">
                    <i class="right arrow icon"></i>
                    ﺎﻫﯽﻬﮔﺁ ﯼﻩﺪﻫﺎﺸﻣ
                </a>

            </div>
        </div>

        <div class="ui vertical stripe segment" dir="rtl">
            <div class="ui middle aligned stackable grid container" dir="rtl">
                <div class="row" dir="rtl">
                    <div class="eight wide column" dir="rtl">
                        <h3 class="ui header">ﺪﯿﺷﻭﺮﻔﺑ اﺭ ﺩﻮﺧ ﯽﻤﯾﺪﻗ ﯽﺳﺭﺩ ﯼﺎﻫﺏﺎﺘﮐ</h3>
                        <p>ﺪﯿﺷﻭﺮﻔﺑ ﺮﮕﯾﺩ ﯼﻩﺩﺯﮏﻠﻓ ﯼﻮﺠﺸﻧاﺩ ﮏﯾ ﻪﺑ اﺭ ﻥﺁ ...ﺪﯿﺷﺎﺑ ﺩﻮﺧ ﻢﯾﺭﻮﮕﻟا ﯽﺣاﺮﻃ ﺏﺎﺘﮐ ﻥﺩﺭﻮﺧﮎﺎﺧ ﻥاﺮﮕﻧ ﺖﺴﯿﻧ ﻡﺯﻻ ﺮﮕﯾﺩ!</p>
                        <h3 class="ui header">ﺪﯾﺮﺨﺑ ﻥاﺯﺭا اﺭ ﺩﻮﺧ ﺯﺎﯿﻧﺩﺭﻮﻣ ﺏﺎﺘﮐ</h3>
                        <p>ﺪﯿﻨﮐ ﺰﮔ اﺭ ﺏﻼﻘﻧا ﻥاﺪﯿﻣ ﻞﮐ ﺎﯾ ﺪﯿﻫﺪﺑ ﺩﻮﺧ ﯽﺳﺭﺩ ﯼﺎﻫﺏﺎﺘﮐ ﯼاﺮﺑ ﯽﻣﻮﺠﻧ ﯼﺎﻫﻪﻨﯾﺰﻫ ﺖﺴﯿﻧ ﻡﺯﻻ ﺮﮕﯾﺩ ،ﻪﻠﺑ!</p>
                    </div>
                    <div class="six wide left floated column">
                        <img src="images/landing-left.jpg" class="ui huge bordered rounded image" />
                    </div>
                </div>
                <div class="row" dir="rtl">
                    <div class="center aligned column" dir="rtl">
                        <a target="_blank" href="" class="ui huge button">ﯽﻬﮔﺁ ﺖﺒﺛ</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui vertical stripe quote segment" dir="rtl">
            <div class="ui equal width stackable internally celled grid" dir="rtl">
                <div class="center aligned row" dir="rtl">
                    <div class="column" dir="rtl">
                        <h3>"ﻢﺘﺴﯿﻧ ﺪﯾﺪﺟ ﻡﺮﺗ ﻉﻭﺮﺷ ﻥاﺮﮕﻧ ﺮﮕﯾﺩ"</h3>
                        <p>- ﺭﻮﺸﮐ ﻥﺎﯾﻮﺠﺸﻧاﺩ ﯼﻪﯿﻠﮐ ﻝﺎﻗ</p>
                    </div>
                    <div class="column" dir="rtl">
                        <h3>"ﻢﻣﺎﻫﻩﺮﻤﻧ ﻥاﺮﮕﻧ ﻂﻘﻓ ﻪﮕﯾﺩ"</h3>
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