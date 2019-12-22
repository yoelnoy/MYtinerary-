import React, { Component } from 'react';
import SimpleSlider from './SlideTest';
import LandingMenu from './/LandingMenu';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            cacheGoogle: window.localStorage.getItem('cacheTokenGoogle'),
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId'),
            // loginIcon: 'landingPage-user-icon-hide',
            // logoutIcon: 'landingPage-logout-icon-hide',
        }
    }

    componentDidMount(){
        // console.log(this.state.cache);
        
        // if (this.state.cache || this.state.cacheGoogle == 'undefined' || null){
        //     console.log('IN-11');
        //     this.setState({ logoutIcon: "landingPage-logout-icon-hide" })
        //     this.setState({ loginIcon: "fas fa-user fa-2x landingPage-user-icon" })
        //     console.log(this.state.logoutIcon);
        //     console.log(this.state.loginIcon);
        // } else {
        //     console.log('IN-22');
        //     this.setState({ logoutIcon: "fas fa-sign-out-alt fa-2x landingPage-logout-icon" })
        //     this.setState({ loginIcon: "landingPage-user-icon-hide" })
        // }
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
                    <LandingMenu LandingPage={this.state} />
                    <div>
                        <div className="landing-Page-arrow-pic-div">
                            <Link to="/Cities" className="landing-Page-arrow-icon">
                                <button className="goToCities btn waves-effect waves-white landing-page-button">ENTER</button>
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