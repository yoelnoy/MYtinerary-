import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import LoginPage from './component/LoginPage';
import Cities from './component/Cities';
import ChosenCity from './component/ChosenCity';
import CreatNewAccount from './component/CreatNewAccount';
import MyAccount from './component/MyAccount';
import LogOutConfirmation from './component/LogOutConfirmation';
import MyFavorites from './component/MyFavorites';

class App extends Component {
  componentDidMount() {
    // if(this.props.match.params.id){
    //   let id = this.props.match.params.id;
    // window.localStorage.setItem('cacheTokenGogle', id)
    // }
  }
 render (){

   return (
    
    <BrowserRouter>
      <div className="App">
      
      <Route exact path='/LandingPage' component={ LandingPage } /> 
      <Route path='/LandingPage/:id' component={ LandingPage } /> 
      <Route exact path='/LoginPage' component={ LoginPage } />  
      <Route exact path='/LogOutConfirmation' component={ LogOutConfirmation } />  
      <Route exact path='/CreatNewAccount' component={ CreatNewAccount } /> 
      <Route exact path='/MyAccount' component={ MyAccount } /> 
      <Route exact path='/Cities' component={ Cities } />  
      <Route exact path='/ChosenCity/:id' component={ ChosenCity } />  
      <Route exact path='/MyFavorites' component={ MyFavorites } />  

      </div> 
    </BrowserRouter>
   );
 }
}
export default App;

