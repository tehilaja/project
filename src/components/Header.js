import {Redirect} from "react-router-dom";

import axios from "axios";

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
  Label,
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

  const  logOutFunc = () => {
	//logout user to server
	(async ()=> {
		const response = await axios.post(
			'/logout',
			{ headers: { 'Content-Type': 'application/json' } }
		  )
		  if(response.data === "logged out"){
			  alert("user logged out");
		  }
		  else{
			  alert("failed logging out")
		  }
		  window.location.assign('/');
		})();
}

//to know which page is open and make the navbar active
class ActivePage {
	static Home = 1;
	static Organizations = 2;
	static Prizes = 3;
	static MyProfile = 4;
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
	{/* <Image bordered rounded size='large' src='https://magdilim-organization-images.s3.amazonaws.com/MagdilimLogo.jpg' /> */}
	<Step.Group fluid>
	<Step icon='user' title='Join'/>
	<Step icon='money bill alternate outline' title='Donate' />
	<Step icon='users' title='Reffer'/>
	<Step icon='building' title='Build'/>
	<Step active icon='gift' title='Win!'/>
	</Step.Group>
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
	<Menu compact>
    <Menu.Item as='a'>
      <Icon name='user' /> Sign Up
      <Label basic color='red' pointing='below' floating>
        1
      </Label>
    </Menu.Item>
	<Menu.Item as='a'>
      <Icon name='dollar' /> Donate
      <Label basic color='red' pointing='below' floating>
        2
      </Label>
    </Menu.Item>
	<Menu.Item as='a'>
      <Icon name='users' /> Reffer others
      <Label basic color='red' pointing='below' floating>
        3
      </Label>
    </Menu.Item>
    <Menu.Item as='a' active>
      <Icon name='gift' /> win a prize!
      <Label basic color='red' pointing='below' floating>
        4
      </Label>
    </Menu.Item>
  </Menu>
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
			loggedIn: props.data.loggedIn,
			userName: props.data.userName,
			activePage: props.activePage,
			routeMain: false,
			routeUserProfile: false, 
			routeOrgSearch: false,
			routePrizes: false,
		}

	}


	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })
	  
render() {
	// alert("in desktop render:"+ JSON.stringify(this.state))
	const { children } = this.props
    const { fixed } = this.state

	//redirecting to Home
	if (this.state.routeMain === true){
		return <Redirect to = {{
			pathname: '/',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 

	//redirecting to User Profile TODO: route to correct page!
	if (this.state.routeUserProfile === true){
		return <Redirect to = {{
			pathname: '/UserPage',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 

	//redirecting to User Profile TODO: route to correct page!
	if (this.state.routeAdminPage === true){
		return <Redirect to = {{
			pathname: '/AdminPage',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 

	//redirecting to Prizes
	if (this.state.routePrizes === true){
		return <Redirect to = {{
			pathname: '/Prizes',
			state: {userName: this.state.userName, loggedIn: this.state.loggedIn}
		}} />
	} 
		//redirecting to OrgSearch page
		if (this.state.routeOrgSearch === true){
			return <Redirect to = {{
				pathname: '/OrgSearch',
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
			  <Menu.Item as='a' active={this.state.activePage===ActivePage.Home} onClick ={() => this.setState(prevState => {
				  return {
						routeMain: !prevState.routeMain
					}})}>
					Home
			  </Menu.Item>
			  <Menu.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
						routeOrgSearch: !prevState.routeOrgSearch
					}})}>Organizations</Menu.Item>
			  <Menu.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
						routePrizes: !prevState.routePrizes
					}})}>Prizes</Menu.Item>
			  {this.state.loggedIn &&
			  <Menu.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
						routeUserProfile: !prevState.routeUserProfile
					}})}>
					My Profile
				</Menu.Item>}
				{this.state.loggedIn &&
			  <Menu.Item as='a' onClick ={() => this.setState(prevState => {
				  return {
					routeAdminPage: !prevState.routeAdminPage
					}})}>
					Admin Page
				</Menu.Item>}
			  <Menu.Item position='right'>
			  {this.state.showLogin && <LoginForm record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
                {this.state.showUser && <UserRegistrationForm record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
				{!this.state.loggedIn &&
				<div>
				<Button as='a' inverted={!fixed} onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>
				  Log in
				</Button>
				<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={() => this.setState({showLogin: false, showUser: true, showBackButton: true})}>
				  Sign Up
				</Button>
				</div>}
				{this.state.loggedIn && <Button as='a' inverted={!fixed} onClick={logOutFunc}>
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
			loggedIn: props.data.loggedIn,
			userName: props.data.userName,
			activePage: props.activePage,
			routeMain: false,
			routeUserProfile: false,
			routeOrgSearch: false,
			routePrizes: false,
			routeAdminPage: false
		}
		// alert("in Header Mobile:"+JSON.stringify(this.state))

	this.handlerClick = this.handlerClick.bind(this);
	//this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
	}

	handlerClick(userName) {
        this.setState({
			loggedIn: true,
			userName: userName
		});
		// this.props.record(userName)
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
			{!this.state.loggedIn && <div>
			<Menu.Item as='a' onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>Log in</Menu.Item> 
			<Menu.Item as='a' onClick={() => this.setState({showLogin: false, showUser: true, showBackButton: true})}>Sign Up</Menu.Item>
			</div>}
			{this.state.loggedIn && <Menu.Item as='a' onClick={logOutFunc}>
				  Log out
				</Menu.Item>}

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
				  {this.state.showLogin && <LoginForm record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
                {this.state.showUser && <UserRegistrationForm record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>}
				{!this.state.loggedIn &&
				<div>
				<Button as='a' onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>
				  Log in
				</Button>
				<Button as='a' style={{ marginLeft: '0.5em' }} onClick={() => this.setState({showLogin: false, showUser: true, showBackButton: true})}>
				  Sign Up
				</Button>
				</div>}
				{this.state.showBackButton && <button name = "btnBack" onClick={() => this.setState({showLogin: false, showUser: false, showBackButton: false})}>close</button>}
				{this.state.loggedIn && <Button as='a' onClick={logOutFunc}>
				  Log out
				</Button>}
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
  
  const ResponsiveContainer = ({ children }, props ) => (
	<div>
	  <DesktopContainer data={props}>{children}</DesktopContainer>
	  <MobileContainer data={props}>{children}</MobileContainer>
	</div>
  )
  
  ResponsiveContainer.propTypes = {
	children: PropTypes.node,
  }

  const HeaderLayout = (props) => (
	<ResponsiveContainer data={props}>
	</ResponsiveContainer>
  )
export default DesktopContainer;