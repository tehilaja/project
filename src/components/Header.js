// import React from 'react';
// import ReactDOM from 'react-dom';
// import logo from './magdilim_logo.jpg';

// import LoginVsSignIn from './LoginVsSignIn.js';

// import {Redirect} from "react-router-dom";
// import axios from "axios";
// import { async } from "q";

// import {
// 	Container,
// 	Header,
// 	Step,
//   } from 'semantic-ui-react'

// class Header extends React.Component 
// {
// 		constructor(props)
// 		{
// 		super(props)
// 		this.state = {
// 			 newOrgFlag: false,
// 			 loggedIn: this.props.data.loggedIn,
// 			 userName: this.props.data.userName
// 		}
// 		this.handlerClick = this.handlerClick.bind(this);
// 		this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
// 		this.userProfile = this.userProfile.bind(this);

// 	}
// // --------- userProfile 
// 	userProfile ()
// 	{
// 		alert("in userprofile")
// 		let self = this;
//         fetch('/userProfile ', {
//             method: 'GET'
//         }).then(function(response) {
//             if (response.status >= 400) {
//                 throw new Error("Bad response from server");
//             }
//             return response.json();
//         }).then(function(data) {
//             self.setState({organizations: data});
//         }).catch(err => {
//         console.log('caught it!',err);
// 		})
		
// 	} 


// 	handlerLogoutClick(user_name) {
// 		        //http - sign out        
// 		(async ()=> {            
// 			const response = await axios.post( 
// 				'/logout',             
// 				{ headers: { 'Content-Type': 'application/json' } } 
// 				             )              
// 				console.log("resp",response)              
// 				if(response.data === "logged out"){
// 					this.setState({			
// 						loggedIn: false,
// 						userName: ""})              
// 					return;              
// 				}              
// 				else{
// 					 alert("failed to log out")
// 				            }
// 			})();
// 	}

// 		handlerClick(user_name) {
//         this.setState({
// 			loggedIn: true,
// 			userName: user_name
//         });
// 	}
	
// 	/*conditional rendering based on what was clicked*/
// 	render(){
// 		if (this.state.newOrgFlag === true){
// 			return <Redirect to = {{
// 				pathname: '/newOrg',
// 				data: {userName: this.state.userName, loggedIn: this.state.loggedIn}
// 			}} />
// 		} 
// 	return(
// 			<div className="App">
// 			  <header className="App-header">
// 				<img src={logo} className="App-logo" alt="logo" />
// 				<div>
// 					<button name = "btnOrgJoin" onClick={() => this.setState(prevState => {
// 				  return {
//                       newOrgFlag: !prevState.newOrgFlag}
//                     })} > Join as organization</button> 
// 					{!this.state.loggedIn && <LoginVsSignIn record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
// 					{this.state.loggedIn && <div>
// 						<button name = "btnLogOut" onClick={() => this.handlerLogoutClick()}>Log Out</button>
// 						<button name = "btnUserProfile" onClick={() => this.userProfile()}>my profile</button>
// 					<h1>Hello {this.state.userName} :)</h1></div>}
// 				</div>
// 			  </header>
// 			</div>
// 		)	
// 	}
// }

// export default Header;


import {Redirect} from "react-router-dom";

import LoginForm from './LoginForm.js';
import UserRegistrationForm from './UserRegistrationForm.js';


import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

const style = {
	h1: {
	  marginTop: '3em',
	},
	h2: {
	  margin: '4em 0em 2em',
	},
	h3: {
	  marginTop: '2em',
	  padding: '2em 0em',
	},
	last: {
	  marginBottom: '300px',
	},
  }

  const getWidth = () => {
	const isSSR = typeof window === 'undefined'
  
	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  /* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
<Container text>
	<Header
		as='h1'
		content='MAGDILIM'
		inverted
		style={{
			fontSize: mobile ? '2em' : '4em',
			fontWeight: 'normal',
			marginBottom: 0,
			marginTop: mobile ? '1.5em' : '3em',
		}}
	/>
	<Header
		as='h2'
		content='Multilevel crowd fundraising platform.'
		inverted
		style={{
			fontSize: mobile ? '1.5em' : '1.7em',
			fontWeight: 'normal',
			marginTop: mobile ? '0.5em' : '1.5em',
		}}
	/>
	{/*responsive steps:*/}
	<Container style={style.last}>
	<Step.Group fluid>
	<Step icon='user' title='Sign Up' description='Become a magdilim member' />
	<Step icon='dollar' title='Donate' description='Choose and donate to organization' />
	<Step
		active
		icon='gift'
		title='Win a prize'
		description='Join the raffles'
	/>
	</Step.Group>
	</Container>
</Container>
)

  HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
  }

class DesktopContainer extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {
			loggedIn: this.props.data.loggedIn,
			userName: this.props.data.userName,
			routeMain: false,
			routeUserProfile: false
		}
	this.handlerClick = this.handlerClick.bind(this);
	//this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
	}

	handlerClick(userName) {
        this.setState({
			loggedIn: true,
			userName: userName
		});
		this.props.record(userName)
	}

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })
	  
render() {

	const { children } = this.props
    const { fixed } = this.state

	//redirecting to Home
	if (this.state.routeMain === true){
		return <Redirect to = {{
			pathname: '/',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 

	//redirecting to User Profile ToDo: route to corect page!
	if (this.state.routeUserProfile === true){
		return <Redirect to = {{
			pathname: '/UserPage',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 
	
  return (
	<Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
	  <Visibility
		once={false}
		onBottomPassed={this.showFixedMenu}
		onBottomPassedReverse={this.hideFixedMenu}
	  >
		<Segment
		  inverted
		  textAlign='center'
		  style={{ minHeight: 700, padding: '1em 0em' }}
		  vertical
		>
		  <Menu
			fixed={fixed ? 'top' : null}
			inverted={!fixed}
			pointing={!fixed}
			secondary={!fixed}
			size='large'
		  >
			<Container>
			  <Menu.Item as='a' active onClick ={() => this.setState(prevState => {
				  return {
						routeMain: !prevState.routeMain
					}})}>
					Home
			  </Menu.Item>
			  <Menu.Item as='a'>Organizations</Menu.Item>
			  <Menu.Item as='a'>Prizes</Menu.Item>
			  <Menu.Item as='a' active onClick ={() => this.setState(prevState => {
				  return {
						routeUserProfile: !prevState.routeUserProfile
					}})}>
					My Profile
				</Menu.Item>
			  <Menu.Item position='right'>
			  {this.state.showLogin && <LoginForm record={this.handlerClick}/>}
                {this.state.showUser && <UserRegistrationForm />}
				{!this.state.showLogin && !this.state.showUser &&
				<div>
				<Button as='a' inverted={!fixed} onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>
				  Log in
				</Button>
				<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={() => this.setState({showLogin: false, showUser: true, showBackButton: true})}>
				  Sign Up
				</Button>
				</div>}
				{this.state.showBackButton && <button name = "btnBack" onClick={() => this.setState({showLogin: false, showUser: false, showBackButton: false})}>close</button>}
				{this.state.loggedIn && <Button as='a' inverted={!fixed} onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>
				  Log out
				</Button>}
			  </Menu.Item>
			</Container>
		  </Menu>
		  <HomepageHeading />
		</Segment> 
	  </Visibility>

	  {children}
	</Responsive>
  )
}
}

DesktopContainer.propTypes = {
	children: PropTypes.node,
}

class MobileContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			routeMain: false,
			routeUserProfile: false,
			loggedIn: this.props.data.loggedIn,
			userName: this.props.data.userName
		}
	this.handlerClick = this.handlerClick.bind(this);
	//this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
	}

	handlerClick(userName) {
        this.setState({
			loggedIn: true,
			userName: userName
		});
		this.props.record(userName)
	}
  
	handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
	handleToggle = () => this.setState({ sidebarOpened: true })
  
	render() {
	  const { children } = this.props
	  const { sidebarOpened } = this.state
  
	  return (
		<Responsive
		  as={Sidebar.Pushable}
		  getWidth={getWidth}
		  maxWidth={Responsive.onlyMobile.maxWidth}
		>
		  <Sidebar
			as={Menu}
			animation='push'
			inverted
			onHide={this.handleSidebarHide}
			vertical
			visible={sidebarOpened}
		  >
			<Menu.Item as='a' active>
			  Home
			</Menu.Item>
			<Menu.Item as='a'>Organizations</Menu.Item>
			<Menu.Item as='a'>Prizes</Menu.Item>
			{!this.state.loggedIn && 
			<Menu.Item as='a'>Log in</Menu.Item> &&
			<Menu.Item as='a'>Sign Up</Menu.Item>}

			{/* allow showing profile only when signed in */}
			{this.state.loggedIn && <Menu.Item as='a' active onClick ={() => this.setState(prevState => {
				  return {
						routeUserProfile: !prevState.routeUserProfile
					}})}>
					My Profile
			</Menu.Item>}
		  </Sidebar>
  
		  <Sidebar.Pusher dimmed={sidebarOpened}>
			<Segment
			  inverted
			  textAlign='center'
			  style={{ minHeight: 350, padding: '1em 0em' }}
			  vertical
			>
			  <Container>
				<Menu inverted pointing secondary size='large'>
				  <Menu.Item onClick={this.handleToggle}>
					<Icon name='sidebar' />
				  </Menu.Item>
				  <Menu.Item position='right'>
					<Button as='a' inverted>
					  Log in
					</Button>
					<Button as='a' inverted style={{ marginLeft: '0.5em' }}>
					  Sign Up
					</Button>
				  </Menu.Item>
				</Menu>
			  </Container>
			  <HomepageHeading mobile />
			</Segment>
  
			{children}
		  </Sidebar.Pusher>
		</Responsive>
	  )
	}
  }
  
  MobileContainer.propTypes = {
	children: PropTypes.node,
  }
  
  const ResponsiveContainer = ({ children }) => (
	<div>
	  <DesktopContainer>{children}</DesktopContainer>
	  <MobileContainer>{children}</MobileContainer>
	</div>
  )
  
  ResponsiveContainer.propTypes = {
	children: PropTypes.node,
  }

//   const HeaderLayout = () => (
// 	<ResponsiveContainer>
	  
// 	  {/* <HeaderFile data={{loggedIn: false, userName: ""}}/> */}
// 	  <Body data={{loggedIn: false, userName: ""}}/>
// 	  <Footer />
// 	</ResponsiveContainer>
//   )
  
//   export default HeaderLayout;
  

export default DesktopContainer;