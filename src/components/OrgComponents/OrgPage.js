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
			
			loadData: false,
			orgDetails: null, // all details from DB

			id: this.props.id,

			// $$$$$$$$$

			routeMain: false,

			userName: this.props.data.userName,
			loggedIn: this.props.data.loggedIn
		}
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

	

	render() {
		// if(!this.state.check_login_status)
		// 	return(<h1>loading...</h1>)
		if (this.state.orgDetails == null)
			return(
			// <h1>not load data...</h1>
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
                <HeaderPage data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
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
