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
  
 render (){

   return (
    
    <BrowserRouter>
      <div className="App">
      
      <Route path='/LandingPage' component={ LandingPage } /> 
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

