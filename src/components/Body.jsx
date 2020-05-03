import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {Redirect} from "react-router-dom";


import { userActions } from '../_actions';

import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	Label,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Step,
	Visibility,
  } from 'semantic-ui-react'



function Body() {
    let user = useSelector(state => state.authentication.user);


    	// 	//redirecting to create organization page
		// //TODO: make sure the user is signed in! take care of other option!
		// if (this.state.routerCreateOrgPage === true){
		// 	return <Redirect to = {{
		// 		pathname: '/NewOrgPage',
		// 		state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		// 		// state: {userName: 'Tehila', loggedIn: true}
		// 	}} />
		// } 

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <Segment style={{ padding: '8em 0em' }} vertical>
			<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
				<Grid.Column width={8}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					We Make Bananas That Can Dance
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					Yes that's right, you thought it was the stuff of dreams, but even bananas can be
					bioengineered.
					</p>
				</Grid.Column>
				<Grid.Column floated='right' width={6}>
				<Header as='h3' style={{ fontSize: '2em' }}>
					Create an online platform for ongoing donations
					</Header>
					<Label as='a' color='red' tag>
				Create Your Own!
				</Label>
					<Image bordered rounded size='large' src='https://i.insider.com/5ab2a71c5851aebb008b46da?width=3100&format=jpeg&auto=webp' />
					<Button primary size='huge' onClick ={() => this.setState(prevState => {
						return {
								routerCreateOrgPage: !prevState.routerCreateOrgPage
							}})}>
						Get Started
						<Icon name='right arrow' />
					</Button>
				</Grid.Column>
				</Grid.Row>
				<Grid.Row>
				<Grid.Column textAlign='center'>
					<Button size='huge'>Check Them Out</Button>
				</Grid.Column>
				</Grid.Row>
			</Grid>
			</Segment>
			
			<Segment style={{ padding: '0em' }} vertical>
			<Grid celled='internally' columns='equal' stackable>
				<Grid.Row textAlign='center'>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					"What a Company"
					</Header>
					<p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
				</Grid.Column>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					"I shouldn't have gone with their competitor."
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					<b>Nan</b> Chief Fun Officer Acme Toys
					</p>
				</Grid.Column>
				</Grid.Row>
			</Grid>
			</Segment>
			<Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
				<Header as='h3' style={{ fontSize: '2em' }}>
				Breaking The Grid, Grabs Your Attention
				</Header>
				<p style={{ fontSize: '1.33em' }}>
				Instead of focusing on content creation and hard work, we have learned how to master the
				art of doing nothing by providing massive amounts of whitespace and generic content that
				can seem massive, monolithic and worth your attention.
				</p>
				<Button as='a' size='large'>
				Read More
				</Button>

				<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}
				>
				<a href='#'>Case Studies</a>
				</Divider>

				<Header as='h3' style={{ fontSize: '2em' }}>
				Did We Tell You About Our Bananas?
				</Header>
				<p style={{ fontSize: '1.33em' }}>
				Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
				it's really true. It took years of gene splicing and combinatory DNA research, but our
				bananas can really dance.
				</p>
				<Button as='a' size='large'>
				I'm Still Quite Interested
				</Button>
			</Container>
			</Segment>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { Body };