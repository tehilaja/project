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
			img: this.props.location.state.img,
			name: this.props.location.state.name,
			id: this.props.location.state.id,
			about: this.props.location.state.about,
			initialDonation: this.props.location.state.initialDonation,
			admin_name:this.props.location.state.admin_name,
			field_of_acctivity:this.props.location.state.field_of_acctivity,
			org_num:this.props.location.state.org_num, 
			description :this.props.location.state.description,
			working:this.props.location.state.working,
			volunteers:this.props.location.state.volunteers,
			friends:this.props.location.state.friends,
			founding_year:this.props.location.state.founding_year,

			// $$$$$$$$$

			routeMain: false,
			check_login_status: false
		}
		this.function_log_status();
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

	// function 

	render() {
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<OrgBody 
					data = {this.state}/>
				<Footer />
			</div>
		)
	}	
}
export default OrgPage;
