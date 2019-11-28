import React from 'react';
import ReactDOM from 'react-dom';
import logo from './magdilim_logo.jpg';

import LoginVsSignIn from './LoginVsSignIn.js';

import {Redirect} from "react-router-dom";


class Header extends React.Component 
{
		constructor(props)
		{
		super(props)
		this.state = {
			 newOrgFlag: false,
			 loggedIn: false
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
				<div>
					<button name = "btnOrgJoin" onClick={() => this.setState({newOrgFlag: true})}> Join as organization</button> 
					{!this.state.loggedIn && <LoginVsSignIn />}
					{this.state.loggedIn && <h1>hello</h1>}
				</div>
			  </header>
			</div>
		)	
	}
}

export default Header