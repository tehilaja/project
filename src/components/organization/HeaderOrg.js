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
			routeMain: false
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
				</div>
			)
			
			// if(this.state.showLogin)
			// {
			// return(
			// 	<div className="App">
			// 		<header className="App-header">
			// 			<img src={logo} className="App-logo" alt="logo" />
			// 			{/* <LoginForm /> */}
			// 		</header>
			// 	</div>
			// )}

			// if(this.state.showUser){
			// 	return(
			// 	<div className="App">
			// 		<header className="App-header">
			// 		<img src={logo} className="App-logo" alt="logo" />
			// 		{/* <UserProfile /> */}
			// 		</header>
			// 	</div>
			// )}	

			// else{
			// 	return(
			// 	<div className="App">
			// 		<header className="App-header">
			// 		<img src={logo} className="App-logo" alt="logo" />
			// 		{/* <button name = "btnOrgJoin" onClick={() => this.setState({showLogin: false, showUser: false})}> Join as organization</button> 
			// 		<button name = "btnUserJoin" onClick={() => this.setState({showLogin: false, showUser: true})}> Join to donate</button> 
			// 		<button name = "btnLogin" onClick={() => this.setState({showLogin: true, showUser: false})}> Login</button>  */}
			// 		</header>
			// 	</div>
			// )
		// }
	}
}

export default Header