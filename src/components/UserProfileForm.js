import React from 'react';
import ReactDOM from 'react-dom';

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
	
	onSubmit(){
		/*add user to dataBase, login with new user*/
	}
	
	render(){
		return(
		<div className="App-header-form">
		<form onSubmit={this.handleSubmit}>
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