import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


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
        console.log('working?');
        console.log(this.state.cache);
        console.log('working?');
               
        if (this.state.cache /*|| this.state.cacheGoogle */ == /*'undefined' ||*/ null){
            this.setState({ logoutIcon: "landingPage-logout-icon-hide" })
            this.setState({ loginIcon: "fas fa-user fa-2x landingPage-user-icon" })
        } else {
            this.setState({ logoutIcon: "fas fa-sign-out-alt fa-2x landingPage-logout-icon" })
            this.setState({ loginIcon: "landingPage-user-icon-hide" })
        }
    }

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
    
    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }
    render (){
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

