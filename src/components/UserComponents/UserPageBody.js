import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import UserAvatar from 'react-avatar';

import Tree from 'react-vertical-tree'

import UserOrgCard from './UserOrgCard.js'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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


const WIDTH = 70;
const HEIGHT = 80;


class UserPage extends React.Component{
//-----------constructor----------------------
constructor(props)
{
    super(props)
    //------state--
    this.state = 
    {
        loggedIn: this.props.data.loggedIn, 
		userName: this.props.data.userName,
		//userName: 'Tehila Jacobs', 
		//get the list of organization for thde specific user
        clickOrg: false,
        isFetchingData: false,
		data: null,
		getOrgDownline: false
        // id: "3"
	}
	this.state.organizations = this.getUserOrganizations();
	this.handleClick = this.handleClick.bind(this);
	alert("user page body: " + JSON.stringify(this.state))
    // this.fetch_org_data = this.fetch_org_data.bind(this)
}

//TODO: return list of organizations based on current user
getUserOrganizations(){
	return( [{
		key:'1',
		imgUrl:'https://cdn.shopify.com/s/files/1/0143/4478/1878/articles/lotus_flower_symbol_1200x1200.jpg?v=1553953163',
		 name:'org name',
		  id: "1",
		  myMonthlyDonation: "1",
		  myStatus: "1" }])
}


//TODO: return list of downline for user, in specific organization that was clicked. chose max height
getMyDownLine(){
	return(
		[
			{id: 1, name: 'ME', parent: null, children: [
			  	{id: 2, parent: {id: 1}, name: 'Someone I brought', children: []},
			  	{id: 3, parent: {id: 1}, name: 'Someone I brought', children: [
					{id: 4, parent: {id: 3}, name: 'Someone He brought', children: []},
					{id: 7, parent: {id: 3}, name: 'Someone He brought', children: []}
				]},
			  	{id: 5, parent: {id: 1}, name: 'Someone I brought', children: []},
			  	{id: 6, parent: {id: 1}, name: 'Someone I brought', children: []}
			]}
		  ]
	)
}

//get the information for specific user from DB
// componentDidMount () {

//     // ~~~~~~~~~~ get (select *) 
//             let self = this;
//             fetch('/data', {
//                 method: 'GET'
//             }).then(function(response) {
//                 if (response.status >= 400) {
//                     throw new Error("Bad response from server");
//                 }
//                 return response.json();
//             }).then(function(data) {
//                 self.setState({organizations: data});
//             }).catch(err => {
//             console.log('caught it!',err);
//             })
//         }

handleClick(id){
		
}
render()
	{
			// send the list of the organization for this user	 
		  const orgComponents = this.state.organizations.map(org =>{
			return(
				<UserOrgCard key={org.key} imgUrl={org.imgUrl} orgName={org.orgName} id= {org.id} myMonthlyDonation= {org.myMonthlyDonation} myStatus = {org.myStatus} 
				/>)
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
			<Segment style={{ padding: '8em 0em' }} vertical>
			<Grid container stackable verticalAlign='middle'>
			{/* putting in initials ToDo: change name to user name*/}
			<UserAvatar size={100} name={this.state.userName} />
				<Grid.Row>
				<Grid.Column width={8}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					Your Donations:
					</Header>
					{orgComponents}
					<p style={{ fontSize: '1.33em' }}>
						Show list of people I brought to this specific organiztion:
					</p>
				</Grid.Column>
				{/* <Grid.Column floated='right' width={6}>
				<Header as='h3' style={{ fontSize: '2em' }}>
					Create an online platform for ongoing donations
					</Header>
					<Image bordered rounded size='large' src='https://i.insider.com/5ab2a71c5851aebb008b46da?width=3100&format=jpeg&auto=webp' />
					<Button primary size='huge'>
						Get Started
						<Icon name='right arrow' />
					</Button>
				</Grid.Column> */}
				</Grid.Row>
				<Grid.Row>
				<Grid.Column textAlign='center'>
				<Tree data={this.getMyDownLine()} />
				</Grid.Column>
				</Grid.Row>
			</Grid>
			</Segment>
			
			<Segment style={{ padding: '0em' }} vertical>
			<Grid celled='internally' columns='equal' stackable>
				<Grid.Row textAlign='center'>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					"What an Organization"
					</Header>
					<p style={{ fontSize: '1.33em' }}>That is what they all say about it</p>
				</Grid.Column>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }}>
					"So glad to be a part of this wonderful Organization."
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					<Image avatar src='/images/avatar/large/nan.jpg' />
					<b>Wow</b> Just incredible
					</p>
				</Grid.Column>
				</Grid.Row>
			</Grid>
			</Segment>
			<Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
				<Header as='h3' style={{ fontSize: '2em' }}>
				Build. Create. Inspire others.
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
				Did We Tell You About Our?
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
			</div>
		)
	}
    
}
export default UserPage;