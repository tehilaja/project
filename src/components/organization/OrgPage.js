
import React from 'react';
import {Redirect} from "react-router-dom";



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
			routeMain: false

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
		
		// const data = this.props.location.state
		// const and calculation

		return(
			<div>
                <HeaderOrg />
				<OrgBody data = {this.state}/>
				<Footer />
			</div>
		)
	}	
}
export default OrgPage;
