import React, { Component } from 'react';
import LoginHeaderMenu from './LoginHeaderMenu'
import Select from 'react-select';
import axios from 'axios';

//Creating new account for new users
class CreatNewAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
                    username: 'username',
                    email: 'email',
                    password: 'password',
                    firstName: 'firstName',
                    lastName: 'lastName',
                    country: '',
                    checkbox: false,
                    citiesList: [],
                    value: 'choose a city'
                }
        //binding all functions to the data recieved from the user upon filling the Create new user form      
        this.handleChange_username = this.handleChange_username.bind(this);
        this.handleChange_email = this.handleChange_email.bind(this);
        this.handleChange_password = this.handleChange_password.bind(this);
        this.handleChange_firstName = this.handleChange_firstName.bind(this);
        this.handleChange_lastName = this.handleChange_lastName.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        
        //Acquiring cities from DB
        axios.get('/api/cities')
        .then(res => {
            this.setState({citiesList: res.data})
            })
            .catch(err => {
            })
    }
    //Function for updating the state upon change (writing/checkbox/submit) by the user
    handleChange_username(event) {
        this.setState({username: event.target.value});
    }
    handleChange_email(event) {
        this.setState({email: event.target.value});
    }
    handleChange_password(event) {
        this.setState({password: event.target.value});
    }
    handleChange_firstName(event) {
        this.setState({firstName: event.target.value});
    }
    handleChange_lastName(event) {
        this.setState({lastName: event.target.value});
    }
    handleChecked() {
        this.setState({checkbox: !this.state.checkbox})        
    }
    handleCountry = (event) => {
        this.setState({country: event.value});
    }

    //Submiting new user's data to the DB upon submit
    handleSubmit(event) {
        event.preventDefault();
        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country
        }
        if(!this.state.checkbox === true){
            alert('Please agree to our Terms & Conditions')             
        }else{
            axios.post('/api/users', newUser )
            .then(res => {
            })
            .catch(err => {
                let resErrors = err.response.data.errors
                for(let i = 0; i < resErrors.length ; i++) {
                    if(resErrors[i].param == 'email'){
                        alert('Invalid Email. Please make sure you got it right')
                    } else if (resErrors[i].param == 'password'){
                        alert('Invalid Password. Please make sure you got it right')
                    }
                } 
            })
            window.location.href = "http://localhost:3000/LoginPage";
        }
    }

    render () {   
        let mycitiesList = this.state.citiesList
        const options = mycitiesList.map(v => ({
            label: v.name,
            value: v.name
          }));

        return (
            <div className="page">
                <div className="creatNewForm">
                    <LoginHeaderMenu />
                    <h1 className="titleForm">Create New Account </h1>
                        <form className="creatNewForm" onSubmit={this.handleSubmit}>
                            <div  className="creatNewForm-inner-div">
                                <div className="addPhoto">                    
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                        <span className="fas fa-camera fa-1x">
                                            <input type="file" className="custom-file-input" id="inputGroupFile01"></input></span>
                                            <label className="addPhoto-input" htmlFor="inputGroupFile01"></label>
                                        </div>
                                    </div>    
                                </div>

                                <input className="textareaForm" type="text" name="username" placeholder={this.state.username}  
                                    onChange={this.handleChange_username}></input>
                                <input className="textareaForm" type="text" name="email" placeholder={this.state.email}  
                                    onChange={this.handleChange_email}></input>
                                <input className="textareaForm" type="password" name="password" placeholder={this.state.password}  
                                    onChange={this.handleChange_password}></input>
                                <input className="textareaForm" type="text" name="firstName" placeholder={this.state.firstName}  
                                    onChange={this.handleChange_firstName}></input>
                                <input className="textareaForm" type="text" name="lastName" placeholder={this.state.lastName}  
                                    onChange={this.handleChange_lastName}></input>

                                <Select onChange={this.handleCountry} className="mt-4 col-md-8 col-offset-4 select-menu" 
                                    value={this.state.value} placeholder={this.state.country} options={options}>
                                </Select>

                            </div>

                            <div className="form-check terms-div">
                                <input type="checkbox" onChange={this.handleChecked} checked={this.state.checkbox} className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label termsText" htmlFor="exampleCheck1">
                                    I agree to MYtinerary's 
                                    <a className="termsTextLink" href=""> Terms & Conditions</a>
                                </label>
                            </div>

                            <button onSubmit={this.handleSubmit} className="btn btn-primary"> Submit </button>
                        </form>
                </div>

            </div>
        )
    }
}

export default CreatNewAccount;
