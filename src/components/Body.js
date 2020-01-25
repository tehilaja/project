import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import OrgCard from './organization/OrgCard.js'
import orgData from './organization/orgData.js'



class Body extends React.Component
{
//-----------constructor----------------------
	constructor(props)
	{
		super(props)
		//------state--
		this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
			userName: this.props.data.userName, 
			organizations: orgData,
			clickOrg: false,
			// id: "3"
		}
		this.selectOrg = this.selectOrg.bind(this)
		this.handleClick = this.handleClick.bind(this)
		//this.fetch_org_data();
	}
//------------function-------------------------

	//the function below has Server fetch data about organizations from datbase: 
	fetch_org_data(){
	(async ()=> {
		const response = await axios.post(
			'/fetch_org_data',
			{ headers: { 'Content-Type': 'application/json' } }
		)
		alert(response.data);
		if(response.data === "failed to get org data"){
			alert("failed to get org data");
			return;
		}
		else {
			if(response.data != null){
				this.setState({organizations: response.data});
			}
			else{
			this.setState({organizations: orgData});
		}
	}
		
	})();}

	//------------------
	selectOrg(event) 
	{
        // const {name, value, type, checked} = event.target
        // type === "checkbox" ? 
        //     this.setState({
        //         [name]: checked
        //     })
        // :
        // this.setState({
        //     [name]: value
		// }) 
		const {id} = event.target
	}

	//----------------------
	handleClick(id)
    {
		if (this.state.clickOrg === true)
			alert("id: " +id )
		
	}
	// logout()

//--------------render------------------------
	render()
	{
		//---orgComponents (card)---
		const orgComponents = this.state.organizations.map(org => {
				return (
			<OrgCard key={org.id} imgUrl={org.imgUrl} name={org.name} id= {org.id} initialDonation= {org.initialDonation}/>)
		})
		

		// //-----Redirect--------
		// if (this.state.clickOrg === true){
		// 	return <Redirect to = {{
		// 		pathname: '/OrgPage',
		// 		state: {id: this.state.id}
		// 	}} />
		// }

	//-----------return------------------------------
		return(
			<div>
				{/* <myButton /> */}
				{orgComponents}
			</div>
		)
	}

}

export default Body
