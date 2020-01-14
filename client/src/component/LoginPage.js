import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackHeader from './BackHeader';
import { Button, Form } from 'reactstrap';
import axios from 'axios';

// Loging page allowing to users to login upon introducing correct details
class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: 'Email',
            password: 'Password',
            userId: '',
            cache: window.localStorage.getItem('cacheToken'),
            logOutClass: 'logout-hide'
        }
        // Creating a ref in order to attach it to the username input for immediate typing without the need for clicking on the input field
        this.inputRef = React.createRef();
        //Binding the text inserted by the user to the function and updating it to the state
        this.handleChange_email = this.handleChange_email.bind(this);
        this.handleChange_password = this.handleChange_password.bind(this);
    }
    componentDidMount() {
        // Making the username field typable immediately upon load
        this.inputRef.current.focus();  
        // Toggeling logout icon according to the login/logout status of the user
        if(this.state.cache !== null){
            this.setState({ logOutClass: 'logout-Show'})
        } else {
            this.setState({ logOutClass: 'logout-hide'})
        }
    }
    // Updating the state typing of user
    handleChange_email = (event) => {
        this.setState({email: event.target.value});
    }
    handleChange_password = (event) => {
        this.setState({password: event.target.value});
    }
    // Sending the login details of the user to backend and if correct, retriving and storing token in cache
    handleSubmit = (event) => {
        event.preventDefault();
        let newUser = this.state; 
        axios.post('/api/auth/login', newUser )
            .then(res => {
                this.setState({ userId: res.data.user.id})
                window.localStorage.setItem('cacheToken', res.data.token);
                window.localStorage.setItem('userId', res.data.user.id);
                window.localStorage.setItem('userUsername', res.data.user.username);
                window.location.href = 'http://localhost:3000/LandingPage';
            })
            .catch(err => {
            })        
    }
    // Deleting user's token and id from state upon logging out
    handleLogOut = (event) => {
        event.preventDefault();
        window.localStorage.setItem('cacheToken', 'null');
        window.localStorage.setItem('userId', 'null');
    }
    render (){
        return(
            <div className="page">
                <BackHeader />
                <Form className="loginForm" inline>
                <h1 className="loginPageTItle">Login</h1>
                        <div className="loginUpperDiv">
                            <input className="textareaForm" ref={this.inputRef} type="text" name="email" placeholder={this.state.email}  
                            onChange={this.handleChange_email}></input>  
                        
                            <input className="textareaForm" type="password" name="password" placeholder={this.state.password}  
                            onChange={this.handleChange_password}></input>

                            <div className="form-check terms-div">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label termsText" htmlFor="exampleCheck1">
                                    Remember me 
                                </label>
                            </div>
                        </div>
                    
                    <Button className="loginButtonSubmit" color="secondary" onClick={this.handleSubmit}>Submit</Button>
                    <Button className="loginButton" color="danger"><a className="loginGoogleButton" href="http://localhost:5000/api/auth/google"> Log in with Google+ </a></Button>
                    <Button className="loginButton" color="primary">Log in with Facebook</Button>
                    <Link to='/CreatNewAccount'><p className="loginCreatNew">Create New Account</p></Link>
                    <div onClick={this.handleLogOut} className={this.state.logOutClass}>
                        <Link to='/LogOutConfirmation'>
                            <button className="loginLogout">Log out</button>
                            <span className="fas fa-sign-out-alt fa-2x loginLogoutIcon"></span>
                        </Link>
                    </div>

                </Form>
            </div>
        )
    }
}

export default LoginPage;
