
import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import OrgBody from './OrgBody.js';
import Footer from '../Footer.js';


class OrgPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
			
			loadData: false,
			orgDetails: null, // all details from DB

			id: this.props.location.state.id,

			// $$$$$$$$$

			routeMain: false,
			check_login_status: false,
			userName: this.props.userName,
			loggedIn: this.props.loggedIn
		}
		this.function_log_status();
	}	

	// (async () => {
		//             const response = await axios.post(
		//                 '/findDuser',
		//                 {userD:this.state.DuserName},
		//                 {header:{'Content-Type': 'application/json'}}
		//                 )
		//                 console.log("resp",response)
		//                 if(response.data == "fail"){
		//                     alert("the user not found")
		//                 }
		//                 else if(response.data != " "){
		//                 // this.setState({loggedIn: false})
		//                 this.setState({DuserId: response.data})
		//                 alert("id " + this.state.DuserId)
		//                 }
		//             })(); 


	componentDidMount() 
	{

// 	Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
		


		axios.get('/orgPage/'+this.state.id
			// ,{orgId: this.state.id,},
			// { header: { 'Content-Type': 'application/json' }}
		).then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
			else if (res === "no data") // the data is not null
				alert ("no data!")
			else{
				// alert("re: "+ res.data.org_name);
				// for(let i=0; i<10 ; i--); // await
				
				this.setState({ orgDetails: res.data});
				// alert("res: " +res.min_donation)
				// if(this.state.orgDetails != null)
				// 	this.setState({ loadData:true });
				// 	alert("state: "+ this.state.orgDetails.min_donation)

				// alert("state " + this.state.orgDetails);
				// alert(this.state.orgDetails.org_name);
			}	
		})
		.catch(error=> {
			alert(error);
		})
	}

	// (async () => {
	// 	const response = await axios.post(
	// 		'/confirm_registerd_user',
	// 		{
	// 			user_name: this.state.email,
	// 			confirmation_code: this.state.confirmation_code,
	// 		},
	// 		{ header: { 'Content-Type': 'application/json' } }
	// 	)
	// 	if (response.data === "confirmed") {
	// 		this.setState({status: Status.PostConfirmation})
			
	// 	} else {
			
	// 	}
	// 	console.log("after confirmation")
	// 	alert("response: "+JSON.stringify(response))
	// 	console.log("response: "+JSON.stringify(response))
	// 	console.log(response.data);
	// }
	// )();

	// let self = this;
	// fetch('/data', {
	// 	method: 'GET'
	// }).then(function(response) {
	// 	if (response.status >= 400) {
	// 		throw new Error("Bad response from server");
	// 	}
	// 	return response.json();
	// }).then(function(data) {
	// 	self.setState({organizations: data});
	// }).catch(err => {
	// console.log('caught it!',err);
	// })
	


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

	// function 

	render() {
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		if (this.state.orgDetails == null)
			return(<h1>not load data...</h1>)
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				{/* <header>
					<img src = {this.state.img} ></img>
				</header> */}

				<OrgBody 
					data = {this.state}/>
				<Footer />

			</div>
		)
	}	
}
export default OrgPage;
