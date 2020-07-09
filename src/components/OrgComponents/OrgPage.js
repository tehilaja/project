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


			routeMain: false,
		}
		this.get_field_of_activity = this.get_field_of_activity.bind(this);
	}	




	componentDidMount() 
	{
		
		axios.get('/orgPage/'+this.state.id
		).then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
			else if (res === "no data") // the data is not null
				alert ("no data!")
			else{				
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
			<Segment style={{ padding: '5em 0em', width: '100%', background:'#F5F5F5', textAlign:'center'}}>
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
				<OrgBody 
					data = {this.state}/>
			</div>
		)
	}	
}
export default OrgPage;
