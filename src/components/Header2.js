import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import { Button, Container, Header, Menu, Responsive, Segment, Step, Visibility } from 'semantic-ui-react'

import LoginForm from './LoginForm.js'
import UserRegistrationForm from './UserRegistrationForm.js'

const getWidth = () => {
	const isSSR = typeof window === 'undefined'
  
	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

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



class DesktopContainer extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {
			loggedIn: this.props.loggedIn,
			userName: this.props.userName,
			// loggedIn: true,
			// userName: "",
			routeMain: false,
			routeUserProfile: false, 
			routeOrgSearch: false,
			routePrizes: false
		}
		// alert("in Header Desktop:"+JSON.stringify(this.state))

	this.handlerClick = this.handlerClick.bind(this);
	//this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
	}

	handlerClick(userName) {
        this.setState({
			loggedIn: true,
			userName: userName
		});
		//this.props.record(userName)
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

	//redirecting to User Profile ToDo: route to corect page!
	if (this.state.routeUserProfile === true){
		return <Redirect to = {{
			pathname: '/UserPage',
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
			  <Menu.Item as='a' active onClick ={() => this.setState(prevState => {
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
			  <Menu.Item as='a' active onClick ={() => this.setState(prevState => {
				  return {
						routeUserProfile: !prevState.routeUserProfile
					}})}>
					My Profile
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
				{this.state.showBackButton && <button name = "btnBack" onClick={() => this.setState({showLogin: false, showUser: false, showBackButton: false})}>close</button>}
				{this.state.loggedIn && <Button as='a' inverted={!fixed} onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}>
				  Log out
				</Button>}
			  </Menu.Item>
			</Container>
		  </Menu>
		  {/* <HomepageHeading /> */}
            <Container text>
            <Header
                as='h1'
                content='MAGDILIM'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
            />
            <Header
                as='h2'
                content='Multilevel crowd fundraising platform.'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
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
		</Segment> 
	  </Visibility>

	  {children}
	</Responsive>
  )
}
}
export default DesktopContainer;