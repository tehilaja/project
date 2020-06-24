import React from 'react';
import {Redirect} from "react-router-dom";

import { Header, Image, Segment,Dimmer,Loader} from 'semantic-ui-react'


import axios from "axios";
import { async } from "q";

import HeaderPage from '../Header.js';
import OrgBody from './OrgBody.js';
import Footer from '../Footer.js';


class OrgPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
			userName: this.props.data.userName,
			loggedIn: this.props.data.loggedIn,
			program_admin: this.props.data.program_admin,
			
			loadData: false,
			orgDetails: null, // all details from DB
			org_field_of_activity: null,

			id: this.props.id,

			// $$$$$$$$$

			routeMain: false,
		}
		this.get_field_of_activity = this.get_field_of_activity.bind(this);
	}	

	//TODO: fetch orgData from DB



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
			}	
		})
		.catch(error=> {
			alert(error);
		})
		this.get_field_of_activity() // get list of activity

	}

	// ------------- get_field_of_activity
	get_field_of_activity()
	{
		axios.get('/orgPage/get_org_field_of_activity/'+this.state.id)
		.then(res => 
			{
				if (res.status >= 400) {
					throw new Error("Bad response from server");}
				else if (res === "no data") // the data is not null
					alert ("no data!")
				else{
					// alert("res:\n "+ JSON.stringify(res.data))
					this.setState({org_field_of_activity: res.data});
				}
			})
			.catch(error=> {
				alert(error);
			})
	}

	

	

	render() {
		if (this.state.orgDetails == null || this.state.org_field_of_activity == null)
			return(
			<Segment>
				<Dimmer active  inverted>
				<Loader size='massive'>Loading</Loader>
				</Dimmer>
		
				<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
				<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
				<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		  </Segment>
			)
		return(
			<div >
				<HeaderPage data={{ loggedIn: this.state.loggedIn, program_admin: this.state.program_admin, userName: this.state.userName }} />				{/* <header>
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
