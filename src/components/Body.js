import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import OrgCard from './OrgComponents/OrgCard.js'
import orgData from './OrgComponents/orgData.js'

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
  } from 'semantic-ui-react';




// let user;
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
			routerCreateOrgPage: false

		}
		this.selectOrg = this.selectOrg.bind(this)
		this.handleClick = this.handleClick.bind(this)
		// this.fetch_org_data = this.fetch_org_data.bind(this)
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
	}



	//the function below has Server fetch data about organizations from datbase: 
	// fetch_org_data(){
	// (async ()=> {
	// 	const response = await axios.post(
	// 		'/fetch_org_data',
	// 		{ headers: { 'Content-Type': 'application/json' } }
	// 	)
	// 	alert("responce: " + response.data)
	// 	if(response.data === "failed to get org data"){
	// 		alert("failed to get org data");
	// 		return;
	// 	}
	// 	else {
				// var orgNewData = JSON.parse(response.data)




				// var orgNewData = response.data
				// alert(orgNewData)


				// var f = orgNewData.prototype.map()
				// alert(f)

				// orgNewData = JSON.parse(JSON.stringify(response.data))
				// alert(orgNewData)



				// this.setState({organizations:orgNewData.conversations})
				// this.setState({f:orgNewData})



				
	// 		if(response.data != null){

	// 			const orgNewData = JSON.parse(response.data)
	// 			alert(orgNewData)
	// 			this.setState({organizations: orgNewData});

	// 			// this.setState({organizations: response.data});
	// 		}
	// 		else{
	// 			this.setState({organizations: orgData});
	// 	}
	// }
		
	// })();}

	//------------------
	selectOrg(event) 
	{
        // const {name, value, type, checked} = event.target
        // type === "checkbox" ? 
        //     this.setState({
        //         [name]: checked
        //     })
        // :
        // this.setState({
        //     [name]: value
		// }) 
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
				state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
				// state: {userName: 'Tehila', loggedIn: true}
			}} />
		} 

		const orgComponents = this.state.organizations.map(org =>{
			return(
				<OrgCard key={org.org_id} imgUrl={org.org_pic} name={org.org_name} id= {org.org_id} initialDonation= {org.min_donation} 
				/>)
				// 	admin_name = {org.admin_name} field_of_acctivity = {org.field_of_acctivity} org_num = {org.org_num} description = {org.description}
				// 	working = {org.working} volunteers = {org.volunteers} friends = {org.friends}
				// />)
			// -- $$$$$$$ ---
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
			<Segment style={{ padding: '8em 0em' }} vertical>
			<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
				{/* <Grid.Column width={8}> */}
					{/*putting organizations into home page:*/}
					{/* <Carousel>{orgComponents}</Carousel> */}
				{/* </Grid.Column> */}
				<Grid.Column width={8}>
					{/*putting organizations into home page:*/}
					{orgComponents}
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
				<Header as='h3' style={{ fontSize: '2em' }}>
					Create an account so you too can donate!
					</Header>
					<Icon size="huge" name='heart outline' />
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
				<Header as='h3' style={{ fontSize: '2em' }}>
				Create an account!
				</Header>
				<p style={{ fontSize: '1.33em' }}>
					Yes that's right, you too can become a part of this wonderful community, helping to build something greater.
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
				<a href='#'>Create a Platform</a>
				</Divider>

				<Header as='h3' style={{ fontSize: '2em' }}>
				Just Sign Up
				</Header>
				<p style={{ fontSize: '1.33em' }}>
				We will provide you with the design and software necessary to create an online platform for ongoing or one-time donations. 
				All we left for you to do, is focus on content that will be appealing and attract your ongoing doners.
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

export default Body
