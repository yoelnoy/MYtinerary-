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
    handleClick = () => {
        //alert(window.history.length)
        window.history.back()
    }
    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }
    
    render (){
        let ifLoggedIn;
        let ifLoggedInFavorites;
        if (this.state.cache || this.state.cacheGoogle !== 'undefined' || null){ 
            ifLoggedIn = '/LogOutConfirmation'
            ifLoggedInFavorites = '/MyFavorites'
        }else {
            ifLoggedIn = '/LoginPage'
            ifLoggedInFavorites = '/LoginPage'
        }
        console.log('Cache');
        console.log(this.state.cache);
        console.log('Cache Google');
        console.log(this.state.cacheGoogle);
        console.log(ifLoggedIn);
        
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

