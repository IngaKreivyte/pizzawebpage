import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Header from './Layout/Header/Header';
import Pizzas from './Pages/Pizzas/Pizzas';
import Desserts from './Pages/Desserts/Desserts';
import Drinks from './Pages/Drinks/Drinks';
import Bag from './Pages/Bag/Bag';
import Orders from './Pages/Orders/Orders';
import SignUp from './Pages/Signup/SignUp';
import Kontaktai from './Pages/Kontaktai/Kontaktai';
import Login from './Pages/Login/Login';
import CheckOut from './Pages/CheckOut/CheckOut';
import customerData from './Pages/Customerdata/Customerdata';
import DoneOrder from './Pages/doneOrder/DoneOrder';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {store} from './Store';
import spiner from './Layout/Spiner/spiner';
import NewNav from './Layout/NewNav/NewNav';
import * as actions from '../src/actions/bag';
import{connect} from 'react-redux';

//login user on app load
let token = localStorage.getItem('abc123');
if(token){
  //i request header irasom jwt token
  axios.defaults.headers.common['Authorization'] = 'Bearer ' +     
  token;
  const user = jwt.decode(token);
  
 //rankiniubudu i store perduoti action
  store.dispatch({
    type:'LOG_IN',
    user,
  })
}
 

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const HomeLayout = props => (
  <div>
    <Header/>
    {props.children}
  </div>
)





class App extends Component { 
  _isMounted = false;

  componentDidMount(){
    this._isMounted = true;
    if(localStorage.getItem('myCart')){
      let  bag = JSON.parse(localStorage.getItem('myCart'));
     
      
      if(bag.length>0){
         bag.map(item=>{
                      return (
                          this.props.addToBag({name:item.name,pic:item.pic, amount:item.amount, price:item.price, size:item.size})
                      )
                  })
              }
      }
  }
  render() {
    const BagLayout = props => (
      <div>
        <NewNav />
        {props.children}
      </div>
    )
    return (
      <BrowserRouter>
      <Switch>
      <AppRoute exact path='/'  layout={ HomeLayout } component={Home}/> 
      <AppRoute path='/pizzas' layout={ HomeLayout }  component={Pizzas}/> 
      <AppRoute path='/desertai' layout={ HomeLayout }  component={Desserts}/> 
      <AppRoute path='/gerimai' layout={ HomeLayout }  component={Drinks}/>
      <AppRoute path='orders' layout={ HomeLayout }  component={Orders}/>  
      <AppRoute path='/bag' layout={ BagLayout }   component={Bag }/> 
      <AppRoute path='/SignUp' layout={ HomeLayout }  component={SignUp}/>
      <AppRoute path='/login' layout={ HomeLayout }  component={Login}/>
      <AppRoute path='/DoneOrder'  layout={ BagLayout } component={DoneOrder}/>
      <AppRoute path='/customerData'  layout={ BagLayout } component={customerData}/>
      <AppRoute path='/CheckOut'layout={ BagLayout }  component={CheckOut}/>
      <AppRoute path='/spiner' layout={ HomeLayout }  component={spiner}/>
      <AppRoute path='/kontaktai' layout={ HomeLayout }  component={Kontaktai}/>
      </Switch>
    </BrowserRouter>
    );
  }
}




export default  connect (null, actions)(App)