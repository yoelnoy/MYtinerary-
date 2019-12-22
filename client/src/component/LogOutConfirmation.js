import React, { Component } from 'react';

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

    handleClick = () => {
        //alert(window.history.length)
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