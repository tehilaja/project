import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import NewOrg from './NewOrg.js';
import Footer from '../Footer.js';
import AddPrizes from './AddPrizes.js';

import {Button, Grid,Icon, Image, Label, Segment} from 'semantic-ui-react';
const emailService = require('../../utilities/email');


class NewOrgPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
			routeMain: false,
			allowAddPrize: false,
			showAddPrize: false,
			orgAproved: false
		}
		this.handlerClick = this.handlerClick.bind(this);

	}
	
	//TODO: Add new organization to DB with approved being false
	// }

	//the following function is to send an email that a new oragnization is awaiting approval
    sendEmail() {
        // TODO: get text to send, get list of mail
        emailService.sendEmail(
            //'mordeyj316@gmail.com'
            ['tehilaj97@gmail.com'],
            null,
            null,
            'A new organization is awaiting your approval',
            'organization name: '+ this.state.orgName +
            '\norganizaion description: ' + this.state.description +
            '\nname of user asking to create platform: ' + this.state.userName,
            null,
        )
    }
    

	handlerClick(allowAddPrize) {
        this.setState({
			allowAddPrize: true
		});
		this.props.record(allowAddPrize)
	}

	// function 

	render() {
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column width={8}>
					<NewOrg record={this.handlerClick} data = {this.state}/>
					</Grid.Column>
					<Grid.Column floated='right' width={6}>
					</Grid.Column>
				</Grid.Row>
				</Grid>
				<Footer />
			</div>
		)
	}	
}
export default NewOrgPage;