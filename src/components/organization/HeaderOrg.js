import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";



import logo from './magdilim_logo.jpg';

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
					{this.state.loggedIn && <h1>Hello {this.state.userName} :)</h1>}
					<h3>Hello {this.state.userName} :)</h3>
				</div>
			)
	}
}

export default HeaderOrg;