import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import NewOrg from './NewOrg.js';
import Footer from '../Footer.js';

import DatePicker from './DatePicker.js'
import { Divider, Form , Segment} from 'semantic-ui-react';

import ImageUploader from 'react-images-upload';

class NewOrgPage extends React.Component{
	constructor(props){
		super(props)
	this.state ={
		giftName: "",
		statusInRaffle: "all",
		autowinner: 'true',
		pictures: []

	}
	this.onDrop = this.onDrop.bind(this);
}
handleChange = (e, { statusInRaffle }) => this.setState({ statusInRaffle })
handleWinnerChange = (e, { autowinner }) => this.setState({ autowinner })

onDrop(picture) {
	this.setState({
		pictures: this.state.pictures.concat(picture),
	});
}
	render() {
		const { statusInRaffle } = this.state
		const { autowinner } = this.state

		return(
			<div>
				<Form>
				<Form.Input
						label= 'Gift Description:'
						placeholder='Gift Description:'
						name="giftName:"
						onChange={this.handleChange.bind(this)}
					/>
			<label><b>Select the status of the Doners to enter the raffle:</b></label>
		<Form.Group inline>
		  <Form.Radio
            label='All Doners'
            statusInRaffle='all'
            checked={statusInRaffle === 'all'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Silver'
            statusInRaffle='silver'
            checked={statusInRaffle === 'silver'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Gold'
            statusInRaffle='gold'
            checked={statusInRaffle === 'gold'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Platnum'
            statusInRaffle='platnum'
            checked={statusInRaffle === 'platnum'}
            onChange={this.handleChange}
          />
        </Form.Group>
		  {/* YOUR CHOICE: {this.state.statusInRaffle} */}
		  <br></br>
		</Form>
		<br></br>
		<div><b>Choose a date for your raffle</b></div>
        <DatePicker />
		</div>
		)
	}	
}
export default NewOrgPage;
