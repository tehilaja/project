import React from 'react';
import ReactDOM from 'react-dom';
import logo from './magdilim_logo.jpg';

import LoginForm from './LoginForm.js';
import UserRegistrationForm from './UserRegistrationForm.js';

import {Redirect} from "react-router-dom";


class Header extends React.Component 
{
		constructor()
		{
		super()
		this.state = {
			showLogin: false,
			 showUser: false,
			 newOrgFlag: false
			}
	}
	
	/*conditional rendering based on what was clicked*/
	render(){
		if (this.state.newOrgFlag === true){
			return <Redirect to = {{pathname: '/newOrg'	}} />
        } 
	return(
			<div className="App">
			  <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{this.state.showLogin && <LoginForm />}
				{this.state.showUser && <UserRegistrationForm />}
				{!this.state.showLogin && !this.state.showUser && <div>
				<button name = "btnOrgJoin" onClick={() => this.setState({newOrgFlag: true})}> Join as organization</button> 
				<button name = "btnUserJoin" onClick={() => this.setState({showLogin: false, showUser: true})}> Join to donate</button> 
				<button name = "btnLogin" onClick={() => this.setState({showLogin: true, showUser: false})}> Login</button> 
				</div>}
			  </header>
			</div>
		)	
	}
}

export default Header