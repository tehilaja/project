
import React from 'react';
import {Redirect} from "react-router-dom";



////---------------
import HeaderOrg from './organization/HeaderOrg.js';
import Footer from './organization/Footer.js';



class newOrg extends React.Component{

	constructor(){
		super()
		this.state = {orgName:"",
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
		//e.preventDefault()	
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
        if (this.state.minDonation > 1)
            this.setState({minDonation: this.state.minDonation - 1})
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
				
				{/* set minimum donation per month */}
                <div>
                    <label > set minimum donation per month:</label>
					<label > $ </label>
                    <lable name="minDonation" onChange={this.handleChange}>{this.state.minDonation}</lable>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.increment}>+</button>
                </div>
				
				<br />
				
				{/* info about Admin of organization */}
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
