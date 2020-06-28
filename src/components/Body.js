import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import OrgCard from './OrgComponents/OrgCard.js'
import orgData from './OrgComponents/orgData.js'
import LastDonationCard from './LastDonationCard.js'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import {
	Advertisement,
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
	Popup,
	Responsive,
	Segment,
	Sidebar,
	Step,
	Visibility,
	Dimmer,
	Loader,
	Card
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

	
//function to get three org components each time:
getThreeOrgs(){

}
//------------function-------------------------

	componentDidMount () {

		fetch('/lastDonation', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({lastDonation: data});
        }).catch(err => {
        console.log('caught it!',err);
		})


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
		// this.getLastDonation()
		
		
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
		if (this.state.lastDonation === null)
			return(
				<Segment>
					<Dimmer active  inverted>
					<Loader size='massive'>Loading</Loader>
					</Dimmer>
			
					<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
					<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
					<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
			</Segment>
			)

			// **
			// if (!this.state.isLoading) 
			// {
			// 	return <p>Loading data</p>;
			// }


			//redirecting to create organization page
			//TODO: make sure the user is signed in! take care of other option!
			if(this.state.routerCreateOrgPage === true){
				return <Redirect to = {{
					pathname: '/NewOrgPage',
				}} />
			} 

			const orgComponents = this.state.organizations.map(org =>{
				return(
					<div style ={{display: 'flex', flexDirection: 'row', padding: '0.5em', margin:'0.5em', border_color: 'coral'}}>
					<OrgCard key={org.org_id} imgUrl={org.img_url} name={org.org_name} id= {org.org_id} initialDonation= {org.min_donation} 
					/>
					</div>)
					// 	admin_name = {org.admin_name} field_of_activity = {org.field_of_activity} org_num = {org.org_num} description = {org.description}
					// 	working = {org.working} volunteers = {org.volunteers} friends = {org.friends}
					// />)
				// -- $$$$$$$ ---
			})

			const donationInfo = this.state.lastDonation.map(donation =>{
				return(
					<LastDonationCard ldonation ={donation}  
					/>)
			})

				
			const settings = {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1
			};
				
			const responsive = {
				superLargeDesktop: {
				  // the naming can be any, depends on you.
				  breakpoint: { max: 4000, min: 3000 },
				  items: 5
				},
				desktop: {
				  breakpoint: { max: 3000, min: 1024 },
				  items: 3
				},
				tablet: {
				  breakpoint: { max: 1024, min: 464 },
				  items: 2
				},
				mobile: {
				  breakpoint: { max: 464, min: 0 },
				  items: 1
				}
			  };
		

			// ---orgComponents (card)---
			// const orgComponents = this.state.organizations.map(org => {
			// 		return (
			// 	<OrgCard key={org.id} imgUrl={org.imgUrl} name={org.name} id= {org.id} initialDonation= {org.initialDonation}/>)
			// })

		return(
			<div>
				<Segment style={{ padding: '5em 0em', width: '100%' }} vertical >
					<Grid container  verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={10}>
								{/*displaying organizations on home page:*/}
								<Segment color='red'>
									<Header as='h2' icon='globe' content='Donate to Organization' />
									<Carousel 
									centerMode={true}
									swipeable={false}
									draggable={false}
									showDots={true}
									responsive={responsive}
									ssr={true} // means to render carousel on server-side.
									infinite={true}
									autoPlay={this.props.deviceType !== "mobile" ? true : false}
									autoPlaySpeed={2000}
									keyBoardControl={true}
									customTransition="all .5"
									// transitionDuration={500}
									containerClass="carousel-container"
									removeArrowOnDeviceType={["tablet", "mobile"]}
									deviceType={this.props.deviceType}
									dotListClass="custom-dot-list-style"
									itemClass="carousel-item-padding-40-px">
										{orgComponents}
									</Carousel>
									{/* <div style ={{display: 'flex', flexDirection: 'row', padding: '1em', margin:'1em'}}> 
										{orgComponents}
									</div> */}
								</Segment>
							</Grid.Column>
							<Grid.Column floated='center' textAlign='center'>
								<Popup
								inverted
								trigger={<Icon name='heart' color='red' size='huge' circular />}
								content='Create an account so you too can donate!'
								position='right center'
								/>
							</Grid.Column>
							
						</Grid.Row>
						{/* Showing last prize winners */}
						<Grid.Row>
						<Grid.Column width={10}>
						<Segment color='orange'>
									<Header as='h2' icon='gift' content='Winners' />
									<div  style ={{display: 'flex'}}>
										{/* {donationInfo} */}
									</div>
							</Segment>
						</Grid.Column>
						</Grid.Row>
						{/*~~~~~~~~~~~  last donation */}
						<Grid.Row>
							<Grid.Column width={10}>
							<Segment color='purple'>
									<Header as='h2' icon='time' content='Recent Donations' />
									<Carousel 
									// centerMode={true}
									swipeable={false}
									draggable={false}
									showDots={true}
									responsive={responsive}
									ssr={true} // means to render carousel on server-side.
									infinite={true}
									autoPlay={this.props.deviceType !== "mobile" ? true : false}
									autoPlaySpeed={2000}
									keyBoardControl={true}
									customTransition="all .5"
									// transitionDuration={500}
									containerClass="carousel-container"
									removeArrowOnDeviceType={["tablet", "mobile"]}
									deviceType={this.props.deviceType}
									dotListClass="custom-dot-list-style"
									itemClass="carousel-item-padding-40-px">
										{donationInfo}
									</Carousel>
									</Segment>
							</Grid.Column>
							<Grid.Column floated='right' width={6}>
							
							<Label as='a' color='red' tag>
						Create Your Own Platform!
						</Label>
							<Image bordered rounded size='large' src='https://i.insider.com/5ab2a71c5851aebb008b46da?width=3100&format=jpeg&auto=webp' />
							{this.state.loggedIn && <Button primary size='huge' onClick ={() => this.setState(prevState => {
								return {
										routerCreateOrgPage: !prevState.routerCreateOrgPage
									}})}>
								Get Started
								<Icon name='right arrow' />
							</Button>}
							{!this.state.loggedIn && <Label>Login or Sign Up to build your own platform!</Label>}
						</Grid.Column>
						</Grid.Row >
					</Grid>
				</Segment>
					
				<Segment style={{ padding: '0em' }} vertical color='pink'>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>
						<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<div as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='globe' />
                        "Thanks Magdilim"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>for enabling us to create an ongoing platform</p>	
						</Grid.Column>
						<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<div as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='building' />
                        "This campaign will be different!"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>
                        This time, our efforts will build something that will <b>last forever</b>
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
					<a href='#'>
					<Icon size='big' name='globe' />
						Create a Platform
					</a>
					</Divider>
					<Header as='h3' style={{ fontSize: '2em' }}>
					<Icon size="huge" name='edit outline' />
					Create an account!
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					Yes that's right, you too can become a part of this wonderful community, helping to build something greater.
					</p>
					<br></br>
					{!this.state.loggedIn &&
					<div>
					<p style={{ fontSize: '1.33em' }}>
					If you already have a user account, please login!
					If you don't already have an account then create a user account.
					</p>
					 <Button as='a' size='large' onClick={() =>  window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })}>
					Sign Up
					</Button></div>}

					<Header as='h3' style={{ fontSize: '2em' }}>
					<Icon size="huge" name='handshake outline' />
					Tell Us About Yourself!				
					</Header>
					<p style={{ fontSize: '1.33em' }}>
					We will provide you with the design and software necessary to create an online platform for ongoing or one-time donations. 
					<br></br>
					All we left for you to do, is focus on content that will be appealing and attract your ongoing donors.
					Tell us about your organization. We will be in touch with you shortly, and create your platform.
					</p>
					{!this.state.loggedIn && <p style={{ fontSize: '1.33em' }}>
					Please Login or Sign Up to send a request to build a platform.
					</p>}
					{this.state.loggedIn && <Button as='a' size='large'
					onClick ={() => this.setState(prevState => {
						return {
								routerCreateOrgPage: !prevState.routerCreateOrgPage
							}})}
					>
					Get Approved To Create Platform
					</Button>}
				</Container>
			</Segment>
			<div>
			</div>
			
		</div>
		)
	}

}

export default Body;