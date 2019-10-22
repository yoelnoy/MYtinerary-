import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import LogOrCreate from './component/LogOrCreatPage';
import Cities from './component/Cities';

// import './bootstrap/dist/css/bootsrap.min.css';

class App extends Component {
 render (){

   return (
    
    <BrowserRouter>
      <div className="App">
      {/* <Route path='/' component={ Header } /> */}
      <Route exact path='/' component={ LandingPage } /> 
      <Route exact path='/LogOrCreatPage' component={ LogOrCreate } />  
      <Route exact path='/Cities' component={ Cities } />  
      

      </div> 
    </BrowserRouter>
   );
 }
}
export default App;

