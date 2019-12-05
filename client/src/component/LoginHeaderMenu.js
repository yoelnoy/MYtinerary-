import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginHeaderMenu extends Component {
    state = {
        userOptions: false,
    }
    render (){
        return(
            <div className="header">
                <div className="backHeader-left">
                    <div className="header-back">
                    <Link to='/LandingPage'> <span className="fas fa-chevron-left fa-2x header-menu-icon"></span>   </Link>         
                    </div>
                </div>
                
                <div className="backHeader-right">
                    <div className="header-menu">
                        <span className="fas fa-bars fa-2x header-menu-icon"></span>
                    </div>

                </div>
            </div>
        )
    }  
}

export default LoginHeaderMenu;

