import React, { Component } from 'react';
import Logo from './Logo.png';
import Arrow from './circled-right-2.png';
import Header from './Header';
import SimpleSlider from './SlideTest';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    state = {
        items: [1,2,3]
    }
    render(){
        return (
            <div className="landing-Page">
                <Header />

                <div className="logo-cont">
                    <img src={ Logo } alt="1" className="logo-pic"/>
                </div>
                <div>
                    <h5 className="landing-Page-desc">
                        Find your perfect trip, 
                        designed by insiders who know and love their cities.
                    </h5>

                    <div className="landing-Page-arrow-pic-div">
                        <Link to="/Cities" className="landing-Page-arrow-icon"><img src={ Arrow } alt="1" className="landing-Page-arrow-pic" /></Link>
                    </div>

                    {/* <div  className="log-sign-div">
                        
                        <a href="example" className="">Log in</a>
                        <a href="" className="">Create Account</a>
                    </div> */}

                    {/* <div className="home-icon">
                        <img src={ HomeIcon } alt="1" className="home-icon-pic"/>
                    </div> */}

                    <SimpleSlider />
                </div>
                
            </div>
        )
    }
}

export default LandingPage;