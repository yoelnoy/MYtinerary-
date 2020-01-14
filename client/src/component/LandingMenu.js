import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//Header for Landing page containg the menue and login/logout icons acording to whether the user is logged in
class LandingMenu extends Component {
    constructor() {
        super ()
        this.state = {
            userOptions: false,
            dropdownOpen: false,
            cacheGoogle: window.localStorage.getItem('cacheTokenGogle'),
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId'),
            loginIcon: 'landingPage-user-icon-hide',
            logoutIcon: 'landingPage-logout-icon-hide',
        }
    }
    componentDidMount() {    
        //Showing login/logout icon according to whether the user is logged in and the token appears in cache    
        if (this.state.cache == null){
            this.setState({ logoutIcon: "landingPage-logout-icon-hide" })
            this.setState({ loginIcon: "fas fa-user fa-2x landingPage-user-icon" })
        } else {
            this.setState({ logoutIcon: "fas fa-sign-out-alt fa-2x landingPage-logout-icon" })
            this.setState({ loginIcon: "landingPage-user-icon-hide" })
        }
    }
    //Showing logout confirmation (Leaving so soon?) and removing token from cache apon logout
    handleLogOut = (event) => {
        window.localStorage.removeItem('cacheToken');
        window.localStorage.removeItem('cacheTokenGogle');
        this.setState({
            cache: null,
            cacheGoogle: null
         })    
        this.ConfirmationWindow = this.ConfirmationShow;
        this.headerIconLogin = this.logIn  
        this.headerIconLogout = this.logOut
    }
    //Toggeling the drop down -> show/hide
    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }
    render (){
        //Changing routes (redirection paths) according to whether the user is logged in or not
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
            <div className="header-landing">
                <div className="backHeader-left">
                    <Link to='/LoginPage'> 
                        <span className={this.state.loginIcon}></span>
                    </Link>

                    <Link to='/LogOutConfirmation'>
                        <button onClick={this.handleLogOut} className={this.state.logoutIcon}></button>
                    </Link>
                </div>
                
                <div className="backHeader-right">  
                    <div className="header-menu">                            
                        <ButtonDropdown className="menu-dropdown" isOpen={this.state.dropdownOpen} toggle={this.handleDropDown} >
                            <DropdownToggle className="menu-dropdown">
                                <span className="fas fa-bars fa-2x header-menu-icon"></span>
                            </DropdownToggle>
                            <DropdownMenu right className="menu-dropdown-toggled">
                                <Link to='/LandingPage'><DropdownItem>Home</DropdownItem></Link>
                                <Link to='/Cities'><DropdownItem>Cities</DropdownItem></Link>
                                <Link to={ifLoggedInFavorites}><DropdownItem>Favorites</DropdownItem></Link>
                                <Link to={ifLoggedIn}><DropdownItem>Logout</DropdownItem></Link>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>        
                </div>
            </div>
        )
    }  
}

export default LandingMenu;

