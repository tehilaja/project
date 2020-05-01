import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import UserPageBody from './UserPageBody.js';
import Footer from '../Footer.js';


class UserPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
            loggedIn: this.props.loggedIn,
            userName: this.props.userName,
			routeMain: false,
			check_login_status: false
		}
		this.function_log_status();
		this.get_current_user();

	}
	
	// componentWillReceiveProps(nextProps){
	// 	nextProps= this.props
	// }

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
				//return;
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

//get_current_user:
get_current_user(){
	(async ()=> {
		const response = await axios.post(
			'/get_current_user',
			{ headers: { 'Content-Type': 'application/json' } }
		  )
		  console.log("get_current response:"+JSON.stringify(response.data))
		  alert("get_current response:"+JSON.stringify(response.data))
		if(response.data === null){
			this.setState({
				loggedIn: false,
				userName: ""})
		}
		else{
			console.log("server get current user before getting attributes");
			alert("server get current user before getting attributes")
			response.data.getUserAttributes(function(err,userAtrributes){
				console.log("CallBack get current user error: "+JSON.stringify(err));
			})
			this.setState({
				loggedIn: true,
				userName: response.data});
			this.forceUpdate();
			//alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
		}
		this.setState({check_login_status:true})
})();
}

	// function 

	render() {
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<UserPageBody 
					data = {this.state}/>
				<Footer />
			</div>
		)
	}	
}
export default UserPage;
