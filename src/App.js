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
			isLoggedIn: false,
			org: null, 
			user: null 

		}
		this.check = this.check.bind(this)
	}

	check(){
		/*add user to dataBase, login with new user*/
		(
			async () => {
				alert('hi1')
				const response = await axios.post(
					'/add_user',
					{userName: "tehila"},
					{header:{'Content-Type': 'application/json'}}
				)
				console.log(response.data)
			}
		)();
	}
//---------render------------------
	render() 
	{
		return(
			<div>
				<Header />
				<Body />
				<Footer />
				<button onClick={this.check.bind(this)}>button</button>
			</div>
		)
	}	
}
export default App;
