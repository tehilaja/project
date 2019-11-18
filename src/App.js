import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";


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
	}
//---------render------------------
	render() 
	{
		return(
			<div>
				<Header />
				<Body />
				<Footer />
			</div>
		)
	}	
}
export default App;
