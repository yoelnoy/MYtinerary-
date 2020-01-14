import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class BackHeader extends Component {
    constructor() {
        super ()
        this.state = {
            userOptions: false,
            dropdownOpen: false,
            cache: window.localStorage.getItem('cacheToken'),
            cacheGoogle: window.localStorage.getItem('cacheTokenGogle')
        }
    }
    //function for saving last page path to cache for returning to last page
    handleClick = () => {
        window.history.back()
    }
    //toggeling dropdown (on/off)
    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }
    
    render (){
        //controling redirecting routs acording to wether the user is logged in or not
        let ifLoggedIn;
        let ifLoggedInFavorites;
        if (this.state.cache || this.state.cacheGoogle !== null){ 
            ifLoggedIn = '/LogOutConfirmation'
            ifLoggedInFavorites = '/MyFavorites'
        }else {
            ifLoggedIn = '/LoginPage'
            ifLoggedInFavorites = '/LoginPage'
        }
        
        return(
            <div className="header">
                <div className="backHeader-left">
                    <div onClick={this.handleClick} className="header-back">
                        <span className="fas fa-chevron-left fa-2x header-menu-icon"></span>      
                    </div>
                </div>
                
                <div className="backHeader-right">
                    <Link to='/LoginPage'>
                        <div className="header-user">
                            <span className="fas fa-user fa-2x header-user-icon"></span>
                        </div>
                    </Link>
                    
                    <div className="header-menu">                            
                        <ButtonDropdown className="menu-dropdown" isOpen={this.state.dropdownOpen} toggle={this.handleDropDown} >
                            <DropdownToggle className="menu-dropdown">
                                <span className="fas fa-bars fa-2x header-menu-icon"></span>
                            </DropdownToggle>
                            <DropdownMenu right className="menu-dropdown-toggled">
                                <Link to='/LandingPage'><DropdownItem>Home</DropdownItem></Link>
                                <Link to='/Cities'><DropdownItem>Cities</DropdownItem></Link>
                                <Link to={ifLoggedInFavorites}><DropdownItem>Favorites</DropdownItem></Link>
                                <Link to= {ifLoggedIn}/*{ `/${ifLoggedIn}`}*/><DropdownItem>Logout</DropdownItem></Link>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>        
                </div>
            </div>
        )
    }  
}

export default BackHeader;

