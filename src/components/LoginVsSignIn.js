import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './LoginForm.js';
import UserProfileForm from './UserProfileForm.js';


class LoginVsSignIn extends React.Component 
{
		constructor()
		{
		super()
		this.state = {
			showLogin: false,
			showUser: false,
			showBackButton: false
			}
	}
	
    /*conditional rendering based on what was clicked*/
    render(){
	return(
			<div>
                {this.state.showLogin && <LoginForm />}
                {this.state.showUser && <UserProfileForm />}
                {!this.state.showLogin && !this.state.showUser && <div>
                <button name = "btnUserJoin" onClick={() => this.setState({showLogin: false, showUser: true, showBackButton: true})}> Create account</button> 
                <button name = "btnLogin" onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}> Login</button> 
                </div>}
                {this.state.showBackButton && <button name = "btnBack" onClick={() => this.setState({showLogin: false, showUser: false, showBackButton: false})}> Back</button>}
            </div>
		)	
	}
}

export default LoginVsSignIn