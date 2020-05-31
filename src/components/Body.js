import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import OrgCard from './OrgComponents/OrgCard.js'
import orgData from './OrgComponents/orgData.js'
import LastDonation from './LastDonationCard.js'

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
	Label,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Step,
	Visibility,
  } from 'semantic-ui-react'


// class YourComponent extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.state = {
// 		isFetchingData: false,
// 		data: null
// 	  };
// 	}
  
// 	componentDidMount () {
// 	  this.setState({ isFetchingData: true });
// 	  apiCall().then((data) => {
// 		this.setState({
// 		  isFetchingData: true,
// 		  data
// 		});
// 	  });
// 	}
  
// 	render () {
// 	  if (!this.state.data) {
// 		return <p>No data</p>;
// 	  }
  
// 	  if (!this.state.isLoading) {
// 		return <p>Loading data</p>;
// 	  }
  
// 	  // Render your component with data
// 	}
//   }
class Body extends React.Component
{
//-----------constructor----------------------
	constructor(props)
	{
		super(props)
		//------state--
		this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
			userName: this.props.data.userName, 
			organizations: [],
			clickOrg: false,

			// **
			isFetchingData: false,
			data: null,
			// id: "3"
			routerCreateOrgPage: false,
			lastDonation: [] // the info of last donation

		}
		this.selectOrg = this.selectOrg.bind(this)
		this.handleClick = this.handleClick.bind(this)
		// this.fetch_org_data = this.fetch_org_data.bind(this)
		this.getLastDonation = this.getLastDonation.bind(this)

		
	}
//------------function-------------------------

	componentDidMount () {

// ~~~~~~~~~~ get (select *) 
		let self = this;
        fetch('/data', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({organizations: data});
        }).catch(err => {
        console.log('caught it!',err);
		})

		// lastDonation
		this.getLastDonation()
		
		
	}

	getLastDonation()
	{
		axios.get('/lastDonation').then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
				return res
			}).then(respones=>
				{
					// alert("lastDonation \n" + JSON.stringify(respones.data))
					if(respones.data==="no data") //TODO: if no last donation///
						// alert(respones.data)
					this.setState({lastDonation: respones.data});
		}).catch(error=> {
			// alert(error);
		})
	}



	

	//------------------
	selectOrg(event) 
	{
        
		const {id} = event.target
	}

	//----------------------
	handleClick(id)
    {
		if (this.state.clickOrg === true)
			alert("id: " +id )
		
	}
	// logout()

//--------------render------------------------
	render()
	{

		// **
		// if (!this.state.isLoading) 
		// {
		// 	return <p>Loading data</p>;
		// }


		//redirecting to create organization page
		//TODO: make sure the user is signed in! take care of other option!
		if (this.state.routerCreateOrgPage === true){
			return <Redirect to = {{
				pathname: '/NewOrgPage',
			}} />
		} 

		const orgComponents = this.state.organizations.map(org =>{
			return(
				<OrgCard key={org.org_id} imgUrl={org.img_url} name={org.org_name} id= {org.org_id} initialDonation= {org.min_donation} 
				/>)
				// 	admin_name = {org.admin_name} field_of_activity = {org.field_of_activity} org_num = {org.org_num} description = {org.description}
				// 	working = {org.working} volunteers = {org.volunteers} friends = {org.friends}
				// />)
			// -- $$$$$$$ ---
		})

		const donationInfo = this.state.lastDonation.map(donation =>{
			return(
				<LastDonation ldonation ={donation}  
				/>)
		})

		// const carouselOrganizations = this.orgComponents.map(org =>{
		// 	<Carousel>
		// 	<div>
		// 		org
		// 	</div>
		// </Carousel>
		// })
			
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		  };
			 

		// ---orgComponents (card)---
		// const orgComponents = this.state.organizations.map(org => {
		// 		return (
		// 	<OrgCard key={org.id} imgUrl={org.imgUrl} name={org.name} id= {org.id} initialDonation= {org.initialDonation}/>)
		// })


		

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
				<Segment style={{ padding: '8em 0em', width: '100%' }} vertical >
					<Grid container  verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={10}>
								{/*putting organizations into home page:*/}
								{/*~~~~~~~~~~~  organization */}
								<Segment>
									<Header as='h2' icon='globe' content='Donate to organization' />
									<div style ={{display: 'flex', flexDirection: 'row', padding: '1em', margin:'1em'}}> 
										{/* className = "orgComponents" */}
										{orgComponents}
									</div>
								</Segment>
							</Grid.Column>
							<Grid.Column textAlign='center' width={6}>
								<Header as='h3' style={{ fontSize: '1.5em' }}>
									Create an account so you too can donate!
								</Header>
								<Icon size="huge" name='heart outline' />
							</Grid.Column>
						</Grid.Row>
							{/*~~~~~~~~~~~  last donation */}
							<Segment>
								<Grid.Column floated='cener' width ={12}>
									<Header as='h2' icon='time' content='the last donation' />
									<div  style ={{display: 'flex'}}>
										{donationInfo}
									</div>
								</Grid.Column>
							</Segment>
						<Grid.Row >

						</Grid.Row>
						<Grid.Row >
							<Grid.Column floated='right' width={6}>
							
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
					</Grid>
				</Segment>
					
				<Segment style={{ padding: '0em' }} vertical>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>
						<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
							<Header as='h3' style={{ fontSize: '2em' }}>
							"What an Organization"
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
				<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					<a href='#'>Create a Platform</a>
					</Divider>
					<Header as='h3' style={{ fontSize: '2em' }}>
					Create an account!
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					Yes that's right, you too can become a part of this wonderful community, helping to build something greater.
					<br></br>
					If you already have a user account, you're good to go to the next step!
					If you don't already have an account then create a user account.
					</p>
					<Button as='a' size='large'>
					Sign Up
					</Button>

					<Header as='h3' style={{ fontSize: '2em' }}>
					Tell Us About Yourself!				
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					We will provide you with the design and software necessary to create an online platform for ongoing or one-time donations. 
					<br></br>
					All we left for you to do, is focus on content that will be appealing and attract your ongoing doners.
					Tell us about your organization. We will be in touch with you shortly, and create your platform.
					</p>
					<Button as='a' size='large'
					onClick ={() => this.setState(prevState => {
						return {
								routerCreateOrgPage: !prevState.routerCreateOrgPage
							}})}
					>
					Get Approved To Create Platform
					</Button>
				</Container>
			</Segment>
			</div>
		)
	}

}

export default Body;
