import React, { Component } from 'react';
import Logo from './Logo.png';
// import Arrow from './circled-right-2.png';
import SimpleSlider from './SlideTest';
import LogOutConfirmation from './LogOutConfirmation';
import LandingMenu from './/LandingMenu';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
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
    
    render(){
        return (
            <div>
                <div className="landingPageNew">
                    <LandingMenu />
                    <div>
                        <div className="landing-Page-arrow-pic-div">
                            <Link to="/Cities" className="landing-Page-arrow-icon">
                                <button className="goToCities btn white waves-effect waves-white">ENTER</button>
                            </Link>

                            <SimpleSlider />

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LandingPage;