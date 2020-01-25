
import React from 'react';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

////---------------
import HeaderOrg from './organization/HeaderOrg.js';
import Footer from './organization/Footer.js';

import LoginVsSignIn from './LoginVsSignIn.js';




class newOrg extends React.Component{

	constructor(props){
		super(props)
		this.state ={ orgName:"",
						photo:"", 
						minDonation:10,
						pswd: "", 
						validPswd: false,
						loggedIn: false, //this.props.data.loggedIn,
						userName: "", //this.props.data.userName
						check_login_status: false
					}			  
		this.handleChange = this.handleChange.bind(this)
		this.handlerClick = this.handlerClick.bind(this);
		this.increment = this.increment.bind(this)
		this.decrement = this.decrement.bind(this)
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

	handleChange(event){
		const {name, value, type, checked} = event.target
		type === "file" ? this.setState({[name]: event.target.files[0] }) : this.setState({[name]: value})
	}

	handleSubmit(e){
		e.preventDefault()	
	}

	//function to deal with passing state to parent component:
	handlerClick(user_name) {
        this.setState({
			loggedIn: true,
			userName: user_name
		});
		this.props.record(user_name)
    }
	
	 //---------increment + ----------
    increment() 
    {
            this.setState(prevState => {
                return {
                    minDonation: prevState.minDonation + 1
                }
			})
    }
    //---------decrement - -------------
    decrement()
     {
        if(this.state.minDonation > 1)
            this.setState({minDonation: this.state.minDonation - 1})
    }
	

	render() {
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		return(
			<div>				
				<HeaderOrg record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>
				
				{/*if user isn't signed in, will ask him to sign in*/}
				{!this.state.loggedIn && <h2>Please sign up or login! :) </h2>}

				{/*will only show the form to sign up a new org if the user is logged in*/}
				{this.state.loggedIn && <div  className = "doners">
				<form className="fillFormDoners" onSubmit={this.handleSubmit.bind(this)}>

				<h2>Thank you for using us for your organization!</h2>

				{/* info about organization */}
				<h2>enter the name of your organization: </h2>
				<input type="text" name="orgName" onChange={this.handleChange.bind(this)}/>
				<h2>add photo for your organization:</h2>
				<input type="file" name="photo" accept=".jpg" onChange={this.handleChange.bind(this)}/>
				<br />
				
				{/* set minimum donation per month */}
                <div>
                    <label > set minimum donation per month:</label>
					<label > $ </label>
                    <lable name="minDonation">{this.state.minDonation}</lable>
                    <button onClick={this.decrement.bind(this)}>-</button>
                    <button onClick={this.increment.bind(this)}>+</button>
                </div>
				
				<br />

				<input type="submit" value="Submit" />
				</form>
				</div>}
				<Footer />
			</div>
		)
	}	
}
export default newOrg;
