
import React from 'react';
import {Redirect} from "react-router-dom";



////---------------
import HeaderOrg from './organization/HeaderOrg.js';
import Footer from './organization/Footer.js';



class newOrg extends React.Component{

	constructor(){
		super()
		this.state = {orgName:"", photo:"", userName: "", pswd: "", validPswd: false, loggedIn: false}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})

	}

	handleSubmit(e){
		//e.preventDefault()	
	}

	render() {
		return(
			<div>
				<HeaderOrg />
				<div  className = "doners">
				<form className="fillFormDoners" onSubmit={this.handleSubmit.bind(this)}>
				<h2>enter the name of your organization:</h2>
				<input type="text" name="orgName" onChange={this.fileChanged}/>
				<h2>add photo for your organization:</h2>
				<input type="file" name="photo" accept=".jpg" onChange={this.fileChanged}/>
				<br />
				Admin UserName: <input type="text" name="userName" onChange={this.handleChange}/><br />
				password: <input type="password" name="pswd" onChange={this.handleChange}/><br />
				validate password: <input type="password" name="validPswd" onChange={this.handleChange}/><br />
				<input type="submit" value="Submit" />
				</form>
				</div>
				<Footer />
			</div>
		)
	}	
}
export default newOrg;
