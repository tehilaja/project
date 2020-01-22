
import React from 'react';
import {Redirect} from "react-router-dom";



////---------------
import HeaderOrg from './organization/HeaderOrg.js';
import Footer from './organization/Footer.js';

import LoginVsSignIn from './LoginVsSignIn.js';




class newOrg extends React.Component{

	constructor(props){
		super(props)
		alert("newOrg constructor"+ this.props)
		//alert("in new org. logged: " + this.props.data.loggedIn + "name: " + this.props.data.userName);
		this.state ={ orgName:"",
						photo:"", 
						minDonation:10,
						pswd: "", 
						validPswd: false,
						loggedIn: false, //this.props.data.loggedIn,
						userName: "" //this.props.data.userName
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
				{/*	{!this.state.loggedIn && <LoginVsSignIn record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
				{this.state.loggedIn && <h1>Hello {this.state.userName} :)</h1>}*/}
				<HeaderOrg data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>
				<div  className = "doners">
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
				</div>
				<Footer />
			</div>
		)
	}	
}
export default newOrg;
