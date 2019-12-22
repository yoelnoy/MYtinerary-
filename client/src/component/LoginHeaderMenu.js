import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class LoginHeaderMenue extends Component {
    constructor() {
        super ()
        this.state = {
            userOptions: false,
            dropdownOpen: false
        }
    }
    
    handleClick = () => {
        window.history.back()
    }

    handleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen})
    }
    
    render (){
        
        return(
            <div className="header">
                <div className="backHeader-left">
                    <div onClick={this.handleClick} className="header-back">
                        <span className="fas fa-chevron-left fa-2x header-menu-icon"></span>      
                    </div>
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

export default LoginHeaderMenue;

