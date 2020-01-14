import React, { Component } from 'react';

// Popup window confirming the user indeed wants to logout
class LogOutConfirmation extends Component {
    constructor(){
        super()
        this.ConfirmationShow = 'ConfirmationShow';
        this.ConfirmationHide = 'ConfirmationHide';
    }
    // Upon agreeing to logout the window will be hidden, user's token is removed from cache and user is redirected to Landing page
    handleSubmit = () => {
        this.ConfirmationWindow = this.ConfirmationHide;
        window.location.href = 'http://localhost:3000/LandingPage';
        window.localStorage.removeItem('cacheToken');
    }
    // Redirecting the user to the previos page he was on before clicking the logout icon (In case the user clicked the logout icon by mistake)
    handleClick = () => {
        window.history.back()
    }
    render(){
        return(
            <div className="logoutConfirmation">
                <div  className='LogOutConfirmation-div'>
                    <div className="conformation-window">
                        <div className="button-x-div">
                            <button onClick={this.handleClick} className="button-x">
                                <span className="far fa-2x fa-times-circle button-x-icon"></span>
                            </button>
                        </div>
                        <p className="confirmation-title">
                            Leaving so soon?
                        </p>
                        <button onClick={this.handleSubmit} className="confirmation-button">
                            <p className="logOutConfirmation-text"> Log out </p> 
                            <span className="fas fa-sign-out-alt fa-2x logOutConfirmation-icon"></span>

                        </button> 
                    </div>
                </div>
            </div>
        )
    }
}

export default LogOutConfirmation;