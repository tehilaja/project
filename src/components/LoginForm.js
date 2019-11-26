import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import { async } from "q";

class LoginForm extends React.Component {
	constructor(){
		super()
		this.state = 
			{userName: "", pswd: "", isAdmin: false, loggedIn: false}
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(event){
		const {name, value, type, checked} = event.target
		type === "checkbox" ? this.setState({[name]: checked }) : this.setState({[name]: value})

	}
	
	handleSubmit(e){
		e.preventDefault()
		if (this.state.userName == "" && this.state.pswd != "") {
			alert("Username Cannot be empty!");
		}
		if (this.state.pswd == "" && this.state.userName != "" ){
			alert("please fill in password field");
		}
		if (this.state.pswd == "" && this.state.userName == ""  ){
					alert("Username  and  password Cannot be empty!");
		}
		/*(async ()=> {
            const response = await axios.post(
                '/userExists',
                { userName: this.state.userName, pswd: this.state.pswd, isAdmin: this.state.isAdmin, loggedIn: false},
                { headers: { 'Content-Type': 'application/json' } }
              )
              alert(response.data)
              if(response.data === 'Success'){
                this.setState({loggedIn: true})
              }
              else if(response.data ==='Failed'){
                this.setState({loggedIn: false})
                alert("Please make sure to click the correct button, and that you typed in the correct username and password ")
              }
        })();
		
		//log in with user name*/
	}
	
	render(){
		return(
		<div className="App-header-form">
		<form onSubmit={this.handleSubmit.bind(this)}>
		  User name: <input type="text" name="userName" onChange={this.handleChange.bind(this)}/><br />
		  password: <input type="password" name="pswd" onChange={this.handleChange.bind(this)}/><br />
		  <input type="checkbox" name="isAdmin" checked={this.state.isAdmin} onChange={this.handleChange}/> Admin<br />
		  <input type="submit" value="Submit" />
		  {/*<h1>{this.state.isAdmin ? this.state.pswd : this.state.userName} </h1>*/}
		</form>
		</div>
		)
	}
}

export default LoginForm;