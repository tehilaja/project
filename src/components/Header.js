import React from 'react';
import ReactDOM from 'react-dom';
import logo from './magdilim_logo.jpg';

import LoginVsSignIn from './LoginVsSignIn.js';

import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";

class Header extends React.Component 
{
		constructor(props)
		{
		super(props)
		this.state = {
			 newOrgFlag: false,
			 loggedIn: this.props.data.loggedIn,
			 userName: this.props.data.userName
		}
		this.handlerClick = this.handlerClick.bind(this);
		this.handlerLogoutClick = this.handlerLogoutClick.bind(this);

	}

	    
	handlerLogoutClick(user_name) {
		        //http - sign out        
		(async ()=> {            
			const response = await axios.post( 
				'/logout',             
				{ headers: { 'Content-Type': 'application/json' } } 
				             )              
				console.log("resp",response)              
				if(response.data === "logged out"){
					this.setState({			
						loggedIn: false,
						userName: ""})              
					return;              
				}              
				else{
					 alert("failed to log out")
				            }
			})();
	}

		handlerClick(user_name) {
        this.setState({
			loggedIn: true,
			userName: user_name
        });
	}
	
	/*conditional rendering based on what was clicked*/
	render(){
		if (this.state.newOrgFlag === true){
			return <Redirect to = {{
				pathname: '/newOrg',
				data: {userName: this.state.userName, loggedIn: this.state.loggedIn}
			}} />
		} 
	return(
			<div className="App">
			  <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<button name = "btnOrgJoin" onClick={() => this.setState(prevState => {
				  return {
                      newOrgFlag: !prevState.newOrgFlag}
                    })} > Join as organization</button> 
					{!this.state.loggedIn && <LoginVsSignIn record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
					{this.state.loggedIn && <div>
						<button name = "btnLogOut" onClick={() => this.handlerLogoutClick()}>Log Out</button>
					<h1>Hello {this.state.userName} :)</h1></div>}
				</div>
			  </header>
			</div>
		)	
	}
}

export default Header