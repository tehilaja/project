import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import logo from './magdilim_logo.jpg';
//---------------------need to work out hirarchy of the files so we don't need to use specific directory like here....
import LoginVsSignIn from '../LoginVsSignIn';

// import LoginForm from './LoginForm.js';
// import UserProfile from './UserProfile.js';

class HeaderOrg extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			routeMain: false,
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
		this.props.record(user_name)
	}
	

		render() {
			if (this.state.routeMain === true){
				return <Redirect to = {{
					pathname: '/',
					state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
				}} />
			} 

			return(
				<div className = "App-header">
					<img src={logo} className="App-logo-header" alt="logo" />
					<button className ="btnRedirectHome" onClick ={() => this.setState(prevState => {
					return {
						routeMain: !prevState.routeMain
					}})} >back to home page</button>
					{!this.state.loggedIn && <LoginVsSignIn record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
					{this.state.loggedIn && <div>
						<button name = "btnLogOut" onClick={() => this.handlerLogoutClick()}>Log Out</button>
					<h1>Hello {this.state.userName} :)</h1></div>}
				</div>
			)
	}
}

export default HeaderOrg;