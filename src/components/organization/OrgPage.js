
import React from 'react';
import {Redirect} from "react-router-dom";



import HeaderOrg from './HeaderOrg.js';
import OrgBody from './OrgBody.js';
import Footer from './Footer.js';



class OrgPage extends React.Component{
	constructor(props) {
		alert("in org page");
		super(props)	
		this.state = {
			img: this.props.location.state.img,
			name: this.props.location.state.name,
			id: this.props.location.state.id,
			initialDonation: this.props.location.state.initialDonation,
			routeMain: false,
			loggedIn: false,
			userName: ""
		}
	}
	
	componentWillReceiveProps(nextProps){
		alert("*********")
		nextProps= this.props
	}

	
	/*componentDidMount(){
		this.state = {
			img: this.props.location.state.img,
			name: this.props.location.state.name,
			id: this.props.location.state.id,
			routeMain: false

		}
	}*/

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
