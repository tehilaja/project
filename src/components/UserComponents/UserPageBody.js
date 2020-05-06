import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import UserAvatar from 'react-avatar';

import Tree from 'react-vertical-tree'

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

//need to create function to get all the people who i brought to the organization
const  verdicalTreeData = [
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
 

 
class MyComponent extends React.Component {
  render() {
    return (
      {/* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */}
    );
  }
}

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
		// userName: 'Tehila Jacobs', 
        organizations: [],
        clickOrg: false,

        // **
        isFetchingData: false,
        data: null
        // id: "3"
    }
	this.handleClick = this.handleClick.bind(this)
	alert("user page body: " + JSON.stringify(this.state))
    // this.fetch_org_data = this.fetch_org_data.bind(this)
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
			
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		  };
			 


		

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
					Your profile page
					</Header>
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
				<Tree data={verdicalTreeData} />
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
			</div>
		)
	}
    
}
export default UserPage;