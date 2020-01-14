import React, { Component } from 'react';
import CitiesSlider from './CitiesSlider';
import LandingMenu from './LandingMenu';
import { Link } from 'react-router-dom';

//Landing page (main page) of the App
class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            cacheGoogle: window.localStorage.getItem('cacheTokenGoogle'),
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId'),
        }
    }
    //Removing user's token from cache upos logging out
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
                    {/* passing the state as props to the LandingMenu component in order to toggle login/logout icon */}
                    <LandingMenu LandingPage={this.state} />
                    <div>
                        <div className="landing-Page-arrow-pic-div">
                            <Link to="/Cities" className="landing-Page-arrow-icon">
                                <button className="goToCities btn waves-effect waves-white landing-page-button">ENTER</button>
                            </Link>
                            <CitiesSlider />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;