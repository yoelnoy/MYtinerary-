import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        userOptions: false,
    }
    render (){
        return(
            <div className="header">
                <div className="header-user">
                   <Link to="/LogOrCreatPage"> <span className="fas fa-user-circle fa-2x header-menu-icon"></span>   </Link>         
                </div>

                <div className="header-menu">
                    <span className="fas fa-bars fa-2x header-menu-icon"></span>
                </div>
            </div>
        )
    }  
}

export default Header;