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
  Checkbox,
  Input,
  Icon,
  Label,
  Menu,
  Modal,
  Image,
  Radio
} from "semantic-ui-react";


export default class AdAll extends Component {


    state = {
         lists: [
             {
            id: 1,
            title: "طراحی الگوریتم",
            author: ["ریچارد نیپولیتان"],
            image: "",
            description: "قیمت بسیار ارزان - ویرایش چهارم",
            sell: "buy",
            price: 0

        },
            {
                id: 2,
                title: "هالیدی۱ ",
                author: "دکتر محمد ابراهیم ابوکاظمی",
                image: "",
                description: "کتاب هالیدی ۱ مخصوص درس فیزیک ۱ ویرایش هشتم قیمت مناسب بسیار تمیز",
                sell: "sell",
                price: 24000,
            }
    ],
        redirect: false,
        topass: 1,
        logged_in: false,

        search: '',
        setOpen: false,
        namesearch: '',
        authorsearch: '',
        minprice: 0,
        maxprice: 500,

    };

    redirectHandler = (val) => {
    	this.setState({
    		redirect: true,
    		topass: val.target.name
    	});
    };

    renderRedirect = (e) => {
    	if (this.state.redirect) {
    	    return (
    		<Redirect to={{
										  pathname: '/ad/detail',
										  state: {
										    adId: this.state.topass
										  }
										}} />
    		)
    	}
    }
    handleSimSearch = () => {
        console.log(this.state.search)

         axios 
          .post("http://localhost:8000/api/v1/search/", { 
              name_search: this.state.search
          }) 
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
          .catch((err) => {console.log(err)})

    

    }

    handleInput = (e) => { 

        this.setState({ 
            [e.target.name]: e.target.value, 
        });
        
    }; 
    handleMore = (e) => {
        console.log("im clicked")
    }
    componentDidMount = () => {
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
    };

    handleSubmit = (e) => {
        this.setState({setOpen: false})
        const params = {}
        if (this.state.minprice) { params.minprice = this.state.minprice }
        if (this.state.maxprice < 500) {params.maxprice = this.state.maxprice}
        if (this.state.namesearch) {params.namesearch = this.state.namesearch}
        if (this.state.authorsearch) {params.authorsearch = this.state.authorsearch}
        // console.log(params)

        axios 
          .post("http://localhost:8000/api/v1/search/",  { 
              name_search: params.namesearch,
              author_search: params.authorsearch,
              minprice: params.minprice,
              maxprice: params.maxprice
          }) 
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
          .catch((err) => {console.log(err)})

    }
    render() {
        return (
            <div className="App">
                <SideMenu classIn={"allads"} />
                <div className="ui container">

                    <div className="ui message">

                        <h1 className="ui huge header">کتاب‌باز</h1>
                        <p className="lead">
                            مکانی برای تبادل کتاب های شما
                        </p>

                    </div>

     
                </div>
                <br/>

                
                            

                <Menu compact inverted>
    <Menu.Item as='a' >
      <Input 
                    icon={<Icon name='search' inverted circular link onClick={this.handleSimSearch} />}
                    placeholder='جست‌و‌جو...'
                    name = 'search'
                    value={this.state.search}
                    onChange= {this.handleInput}


                />
      <Label color='red' circular floating onClick={this.handleMore}>
        +
      </Label>
    </Menu.Item>
    
  </Menu>

  <Modal
    dimmer = 'blurring'
      onClose = {()=>this.setState({setOpen:false})}
      onOpen={()=>this.setState({setOpen:true})}
      open={this.state.setOpen}
      trigger={<Button circular>جست‌وجوی پیشرفته</Button>}
      textAlign='center'

    >
      <Modal.Header dir='rtl' >جست‌ و جوی پیشرفته</Modal.Header>
      <Modal.Content>
      <div dir='rtl'>
              <Form>


        <Form.Group widths='equal' dir='rtl'>
        
      <Form.Input
        fluid
        label='جست‌وجو در نام کتاب'
        placeholder= "جست‌و‌جو در نام کتاب"
        name="namesearch"
        value={this.state.namesearch}
        onChange= {this.handleInput}

      />
      <Form.Input
        fluid
        label='جست‌وجو در نام نویسنده'
        placeholder= "جست‌و‌جو در نام نویسنده"
        name="authorsearch"
        value={this.state.authorsearch}
        onChange= {this.handleInput}

      />
     
        </Form.Group>

        <Form.Group widths='equal' dir='ltr'>
            <Form.Input labelPosition='right' type='number' placeholder='مقدار' label="حداقل قیمت">
                <Label basic>تومان</Label>
                <input name="minprice"
                        value={this.state.minprice}
                        onChange={this.handleInput}/>
                <Label>,000</Label>
              </Form.Input>
            <Form.Input labelPosition='right' type='number' placeholder='مقدار' label="حداکثر قیمت">
                <Label basic>تومان</Label>
                    <input name="maxprice"
                            value={this.state.maxprice}
                            onChange={this.handleInput} />
                <Label>,000</Label>
              </Form.Input>
        </Form.Group>
        
       
        
      </Form>
      </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => this.setState({setOpen:false})}>
          لغو جست و جو
        </Button>
        <Button
          content="جست و جو"
          labelPosition='right'
          icon='checkmark'
          onClick={this.handleSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
                
                <div className="ui container" dir="ltr">
                
                    <div className="ui relaxed divided items">

                        {this.state.lists.map((ad) => (
                            <div key={{ad}} className="item">
                                <div className="ui small image">
                                    {ad.image? <img src={`data:image/png;base64,${ad.image}`} style={{width: 600 + 'px'}}/> :<img src="/images/default.jpg" alt="Can't reload" width="600" height="400"/>}
                                </div>
                                <div className="content" style={{textAlign:"right"}}>

                                    <a target="_blank" href="/ads/" className="header" dir="rtl" >{ad.title}</a>

                                    <div className="meta">
                                        <a>{ad.author}</a>
                                    </div>

                                    <div className="description">{ad.description}</div>
                                    <br />
                                    <div className="ui label">{ad.sell === 'sale'? 'فروش': 'خرید'}</div>
                                    {ad.sell === 'sale' && <div className="ui label" dir="rtl">  {ad.price} تومان </div>}
                                    {this.state.logged_in && <div className="extra">
                                     <Button target="_blank" name={ad.id} onClick={this.redirectHandler.bind(this)}
                                           className="ui right floated primary button">
                                            اطلاعات بیشتر
                                            <i className="right chevron icon"></i>
                                       </Button>
                                        

                                    </div>}
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