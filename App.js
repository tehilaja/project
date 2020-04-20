import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";


////---------------
import Header from './components/Header.js';
import Footer from './components/organization/Footer.js';
import Body from './components/Body.js';

import './App.css';

//////-------------

class App extends React.Component
{
//-------constructor------------
	constructor(props)
	 {
		super(props)
		this.state = 
		{
			loggedIn: false,
			org: null, 
			userName: "",
			check_login_status: false
		}
		this.handlerClick = this.handlerClick.bind(this);
		this.function_log_status();
	}

	//the function below checks if the user is already logged in before rendering page
	function_log_status(){
		(async ()=> {
            const response = await axios.post(
                '/is_logged_in',
                { headers: { 'Content-Type': 'application/json' } }
			  )
			if(response.data === "no user"){
				this.setState({
					loggedIn: false,
					userName: ""})
			}
			else{
				this.setState({
					loggedIn: true,
					userName: response.data});
				this.forceUpdate();
				//alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
			}
			this.setState({check_login_status:true})
	})();
}

	handlerClick(user_name) {
        this.setState({
			userName: user_name,
			loggedIn: true
        });
    }

//---------render------------------
	render() 
	{
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		else{
		return(
			<div>
				<Header record={this.handlerClick} data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Body data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Footer />
				{/*<button onClick={this.check.bind(this)}>button</button>*/}
			</div>
		)}
	}	
}
export default App;
