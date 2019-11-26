
import React from 'react';
import {Redirect} from "react-router-dom";



////---------------
import HeaderOrg from './organization/HeaderOrg.js';
import Footer from './organization/Footer.js';

import LoginVsSignIn from './LoginVsSignIn.js';




class newOrg extends React.Component{

	constructor(){
		super()
		this.state ={ orgName:"",
						  photo:"", 
						  minDonation:10,
						  userName: "", 
						  pswd: "", 
						  validPswd: false,
						  loggedIn: false
						  }
					  
		this.handleChange = this.handleChange.bind(this)
		this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
	}

	handleChange(event){
		const {name, value, type, checked} = event.target
		type === "file" ? this.setState({[name]: event.target.files[0] }) : this.setState({[name]: value})
	}

	handleSubmit(e){
		e.preventDefault()	
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
		return(
			<div>
				<HeaderOrg />
				<div  className = "doners">
				<form className="fillFormDoners" onSubmit={this.handleSubmit.bind(this)}>

				{/* info about Admin of organization */}
				<h2>Sign up or sign in as organization Admin: </h2>
				<LoginVsSignIn />
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
				</div>
				<Footer />
			</div>
		)
	}	
}
export default newOrg;
