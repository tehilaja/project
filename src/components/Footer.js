import React from 'react';
import ReactDOM from 'react-dom';

import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Step,
	Visibility,
  } from 'semantic-ui-react'
  

const action = "program started running"

const date = new Date();

class Footer extends React.Component {
	constructor(){
		super()
		this.state = {
			contact: false,
			about: false
		}
	}


	render(){
		if(this.state.contact === true){
				window.location.assign('/ContactUs');
		}
		if(this.state.about === true){
			window.location.assign('/About');
	}
		return(
			// 
			<Segment inverted vertical style={{ padding: '5em 0em' }}>
			<Container>
			  <Grid divided inverted stackable>
				<Grid.Row>
				  <Grid.Column width={3}>
					<Header inverted as='h4' content='About'>
					<Icon size='massive' name='comment'></Icon>
					</Header>
					<List link inverted>
					  <List.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
						contact: !prevState.contact
					}})}>Contact Us</List.Item>
					<List.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
						about: !prevState.about
					}})}>About Us</List.Item>
					</List>
				  </Grid.Column>
				  <Grid.Column width={3}>
					<Header inverted as='h4' content='Services' />
					<List link inverted>
					<List.Item as='a'>Create an Account</List.Item>
					<List.Item as='a'>Create a Platform</List.Item>
					<List.Item as='a'>Win Prizes</List.Item>
					</List>
				  </Grid.Column>
				  <Grid.Column width={7}>
					<Header as='h4' inverted>
					  On behalf of our staff
					</Header>
					<p>
					we thank you for using Magdilim!					</p>
				  </Grid.Column>
				</Grid.Row>
			  </Grid>
			</Container>
		  </Segment>
		)
	}
}

export default Footer;