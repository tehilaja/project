
import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import HeaderOrg from './HeaderOrg.js';
import OrgBody from './OrgBody.js';
import Footer from './Footer.js';



class OrgPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
			img: this.props.location.state.img,
			name: this.props.location.state.name,
			id: this.props.location.state.id,
			initialDonation: this.props.location.state.initialDonation,
			routeMain: false,
			// loggedIn: this.props.location.state.loggedIn,
			// userName: this.props.location.state.userName
		}
	}
	
	componentWillReceiveProps(nextProps){
		nextProps= this.props
	}

	
	componentDidMount(){
		(async ()=> {
            const response = await axios.post(
                '/is_logged_in',
                { headers: { 'Content-Type': 'application/json' } }
			  )
			  if(response.data === "no user"){
				this.state={
					loggedIn: false,
					userName: ""}
			}
			else{
				this.state={
					loggedIn: true,
					userName: response.data}
			}
	})();}

	// function 

	render() {
		return(
			<div>
                <HeaderOrg data={{userName: this.state.userName, loggedIn: this.state.loggedIn}}/>
				<OrgBody 
					data = {this.state}/>
				<Footer />
			</div>
		)
	}	
}
export default OrgPage;
