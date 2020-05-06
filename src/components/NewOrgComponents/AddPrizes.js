import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import NewOrg from './NewOrg.js';
import Footer from '../Footer.js';

import DatePicker from './DatePicker.js'
import { Button, Divider, Form , Segment} from 'semantic-ui-react';

import ImageUploader from 'react-images-upload';

class NewOrgPage extends React.Component{
	constructor(props){
		super(props)
	this.state ={
		statusInRaffle: "all",
		autowinner: 'true',
		pictures: []
	}
	this.onDrop = this.onDrop.bind(this);
}
handleChange = (e, { statusInRaffle }) => this.setState({ statusInRaffle })
handleChangeName(event){
	this.setState({
		[event.target.name]: event.target.value
	})
}
handleWinnerChange = (e, { autowinner }) => this.setState({ autowinner })

onDrop(picture) {
	this.setState({
		pictures: this.state.pictures.concat(picture),
	});
}

handleSubmit=(e)=>
	{
		e.preventDefault();
		alert(JSON.stringify(this.state));
	}
	render() {
		const { statusInRaffle } = this.state
		const { autowinner } = this.state

		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
				<Form.Input
						label= 'Gift Description:'
						placeholder='Gift Description:'
						name="giftName:"
						onChange={this.handleChangeName.bind(this)}
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
		  <label><b>Choose your winner option:</b></label>
		<Form.Group widths='equal'>
		  <Form.Radio
            label='Get Winner Automatically'
            autowinner = 'true'
            checked={autowinner === 'true'}
            onChange={this.handleWinnerChange}
          />
          <Form.Radio
            label='Send List of Doners to Enter Raffle'
            autowinner = 'false'
            checked={autowinner === 'false'}
            onChange={this.handleWinnerChange}
          />
        </Form.Group>
		
		{/* YOUR CHOICE: automatic winner: {this.state.autowinner} */}
		<br></br>
		<div><b>Choose a date for your raffle</b></div>
        <DatePicker />
		<Divider as='h4'
		className='header'
		horizontal
		style={{ margin: '3em 0em', textTransform: 'uppercase' }}
		>
		<a href='#'>Upload a Raffle Flier (optional):</a>
		</Divider>
		<label><b>The flier will automatically be emailed to all doners</b></label>
		<Segment raised>
		<ImageUploader
			withIcon={true}
			buttonText='Choose images'
			onChange={this.onDrop}
			imgExtension={['.jpg', '.gif', '.png', '.gif']}
			maxFileSize={5242880}
		/>
		<br/><br/>
		</Segment>
		<Button content='Submit Prize' primary />
		</Form>
		</div>
		)
	}	
}
export default NewOrgPage;
