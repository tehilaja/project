import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";




// import './App.css';

// ////---------------
// import HeaderFile from './components/Header.js';
// import Footer from './components/Footer.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js'
import Header from './components/Header.js'
// //////-------------


class App extends React.Component
{
//-------constructor------------
	constructor(props)
	 {
		super(props)
		this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
			userName: this.props.data.userName,
			org: null,
    }
	}

// //---------render------------------
	render() 
	{
		return(
			<div>
				<Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Body data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Footer />
				{/*<button onClick={this.check.bind(this)}>button</button>*/}
			</div>
        )
    }	
}
export default App;