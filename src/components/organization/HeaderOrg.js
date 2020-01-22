import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";



import logo from './magdilim_logo.jpg';
//---------------------need to work out hirarchy of the files so we don't need to use specific directory like here....
import LoginVsSignIn from 'C:/Users/Tehila/magdilim/src/components/LoginVsSignIn';

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
	}

	handlerClick(user_name) {
        this.setState({
			loggedIn: true,
			userName: user_name
		});
		this.props.record(user_name)
	}
	

		render() {
			alert("ine headerOrg render "+this.state.userName)

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
					{this.state.loggedIn && <h1>Hello {this.state.userName} :)</h1>}
				</div>
			)
	}
}

export default HeaderOrg;