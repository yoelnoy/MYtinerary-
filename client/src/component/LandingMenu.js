import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class LandingMenu extends Component {
    constructor() {
        super ()
        this.state = {
            userOptions: false,
            dropdownOpen: false,
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId')
        }
        this.logIn = 'fas fa-user fa-2x landingPage-user-icon'; 
        this.logInHide = 'fas fa-user fa-2x landingPage-user-icon-hide';
        this.logOut = 'fas fa-sign-out-alt fa-2x landingPage-logout-icon';
        this.logOutHide = 'fas fa-sign-out-alt fa-2x landingPage-logout-icon-hide';
        this.account = 'far fa-user fa-2x landingPage-account-icon';
        this.accountHide = 'far fa-user fa-2x landingPage-logout-icon-hide';
        this.headerIconLogin = this.logIn;
        this.headerIconLogout = this.logOutHide;
        this.headerIconAccount = this.logOutHide;
        this.ConfirmationShow = 'ConfirmationShow';
        this.ConfirmationHide = 'ConfirmationHide';
        this.ConfirmationWindow = this.ConfirmationHide;

        if (this.state.cache !== null){
            this.headerIconLogin = this.logInHide  
            this.headerIconLogout = this.logOut   
            this.headerIconAccount = this.account   
        } else {
            this.headerIconLogin = this.logIn   
            this.headerIconLogout = this.logOutHide   
            this.headerIconAccount = this.accountHide   
        }
    }

    handleLogOut = (event) => {
        window.localStorage.removeItem('cacheToken');
        this.setState({cache: null })    
        this.ConfirmationWindow = this.ConfirmationShow;
        this.headerIconLogin = this.logIn  
        this.headerIconLogout = this.logOut
    }
    
    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }

    
    
    render (){
        
        return(
            <div className="header">
                <div className="backHeader-left">
                    <Link to='/LoginPage'> 
                        <span className={this.headerIconLogin}></span>
                    </Link>

                    <Link to='/LogOutConfirmation'>
                        <button onClick={this.handleLogOut} className={this.headerIconLogout}></button>
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
                                <Link to='/MyFavorites'><DropdownItem>Favorites</DropdownItem></Link>
                                <Link to='/LogOutConfirmation'><DropdownItem>Logout</DropdownItem></Link>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>        
                </div>
            </div>
        )
    }  
}

export default LandingMenu;

