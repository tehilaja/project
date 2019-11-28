import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";



import logo from './magdilim_logo.jpg';

// import LoginForm from './LoginForm.js';
// import UserProfile from './UserProfile.js';

class Header extends React.Component {
		constructor(){
		super()
		this.state = {
			showLogin: false, 
			showUser: false,
			routeMain: false,
			userName: ""
		}
	}
		render() {

			if (this.state.routeMain === true){
				return <Redirect to = {{
					pathname: '/'
					// state: this.onClickOrg
				}} />
			} 

			return(
				<div className = "App-header">
					<img src={logo} className="App-logo-header" alt="logo" />
					<button className ="btnRedirectHome" onClick ={() => this.setState(prevState => {
					return {
						routeMain: !prevState.routeMain
					}})} >back to home page</button>
					{this.state.showUser && <h1>hello {this.state.userName}</h1>}
				</div>
			)
	}
}

export default Header