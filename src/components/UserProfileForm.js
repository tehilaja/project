import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import { async } from "q";

class UserProfileForm extends React.Component {
	
	constructor(){
		super()
		this.state = {userName: "", pswd: "", valid_pswd: "", email: ""}
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	
	handleSubmit(e){
		e.preventDefault()
		 alert("hiii")
		 /*add user to dataBase, login with new user*/
		(async () => {
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
	
	render(){
		return(
		<div className="App-header-form">
		<form onSubmit={this.handleSubmit.bind(this)}>
		  User name: <input type="text" name="userName"></input><br></br>
		  password: <input type="password" name="pswd"></input><br></br>
		  validate password: <input type="password" name="valid_pswd"></input><br></br>
		  email: <input type="email" name="email"></input><br></br>
		  <input type="submit" value="Submit"></input>
		</form>
		</div>
		)
	}
}

export default UserProfileForm;