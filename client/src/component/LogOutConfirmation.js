import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LogOutConfirmation extends Component {
    constructor(){
        super()
        this.ConfirmationShow = 'ConfirmationShow';
        this.ConfirmationHide = 'ConfirmationHide';
        // this.ConfirmationWindow = this.ConfirmationHide;
    }
    handleSubmit = () => {
        this.ConfirmationWindow = this.ConfirmationHide;
        window.location.href = 'http://localhost:3000/LandingPage';
        window.localStorage.removeItem('cacheToken');
    }

    render(){
        return(
            <div className="logoutConfirmation">
                <div  className='LogOutConfirmation-div'>

                    <div className="conformation-window">
                        <p className="confirmation-title">
                            Leaving so soon?
                        </p>
                        <button onClick={this.handleSubmit} className="confirmation-button">
                            Log out
                        </button>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default LogOutConfirmation;