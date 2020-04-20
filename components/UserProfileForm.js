import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import { async } from "q";

class UserProfileForm extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			userName: "",
			first_name: "",
			last_name: "",
			pswd: "",
			valid_pswd: "",
			email: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	
	// ---- add user
	handleSubmit=(e)=>{
		e.preventDefault();
		 /*add user to dataBase, login with new user*/
		(async () => {
		 		const response = await axios.post(
					 '/add_user',
					 { //todo- send real data
						// -- * change
						user_name:this.state.userName, first_name:this.state.first_name, last_name:this.state.last_name, pswd:this.state.pswd, email:this.state.email, credit_info_id:1,// ---- req
						is_admin:false
					 },
		 			{header:{'Content-Type': 'application/json'}}
		 		);
				 console.log(response.data)
				 
		 	}
		)();

	}
	render(){
		return(
		<div className="App-header-form">
		<form onSubmit={this.handleSubmit}>
			User name: <input type="text" name="userName" onChange={this.handleChange.bind(this)}></input><br></br>
			{/* change */}
			first name: <input type="text" name="first_name" onChange={this.handleChange.bind(this)}></input><br></br>
			last name: <input type="text" name="last_name" onChange={this.handleChange.bind(this)}></input><br></br>
			{/* -- */}
			password: <input type="password" name="pswd" onChange={this.handleChange.bind(this)}></input><br></br>
			validate password: <input type="password" name="valid_pswd" onChange={this.handleChange.bind(this)}></input><br></br>
			email: <input type="email" name="email" onChange={this.handleChange.bind(this)}></input><br></br>
		  <input type="submit" value="Submit"></input>
		</form>
		</div>
		)
	}
}

export default UserProfileForm;