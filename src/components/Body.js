import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";


import OrgCard from './organization/OrgCard.js'
import orgData from './organization/orgData.js'

// import OrgCard from "./OrgCard"
// import orgData from "./orgData"


class Body extends React.Component
{
//-----------constructor----------------------
	constructor()
	{
		super()
		//------state--
		this.state = 
		{
			isLoggedIn: false, 
			organizations: orgData,
			clickOrg: false,
			// id: "3"
		}
		this.selectOrg = this.selectOrg.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.clickedOrg = this.clickedOrg.bind(this)
	}
//------------function-------------------------
	
	
	//--------------------
	clickedOrg()
	{
		alert("hi")
	}

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
		alert()
	}

	//----------------------
	handleClick(id)
    {
		if (this.state.clickOrg === true)
			alert("id: " +id )
		
	}


//--------------render------------------------
	render()
	{
		//---orgComponents (card)---
		const orgComponents = this.state.organizations.map(org => {
				return (
			<OrgCard key={org.id} imgUrl={org.imgUrl} name={org.name} id= {org.id} initialDonation= {org.initialDonation}/>)
		})
		
		//--- login
		let loggedStatus
		if(this.state.isLoggedIn)
		{
			loggedStatus = "Hello " + this.props.user
		}
		

		//-----Redirect--------
		if (this.state.clickOrg === true){
			return <Redirect to = {{
				pathname: '/OrgPage',
				state: {id: this.state.id}
			}} />
		}

	//-----------return------------------------------
		return(
			<div>
				{/* <myButton /> */}
				<h1>{loggedStatus}</h1>
				{orgComponents}
			</div>
		)
	}

}

export default Body
