// import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";
// import './App.css';

// ////---------------
// import Header from './components/Header.js';
// import Footer from './components/Footer.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js'
import HeaderFile from './components/Header.js'

// //////-------------

// class App extends React.Component
// {
// //-------constructor------------
// 	constructor(props)
// 	 {
// 		super(props)
// 		this.state = 
// 		{
// 			loggedIn: false,
// 			org: null, 
// 			userName: "",
// 			check_login_status: false
// 		}
// 		this.handlerClick = this.handlerClick.bind(this);
// 		this.function_log_status();
// 	}

// 	//the function below checks if the user is already logged in before rendering page
// 	function_log_status(){
// 		(async ()=> {
//             const response = await axios.post(
//                 '/is_logged_in',
//                 { headers: { 'Content-Type': 'application/json' } }
// 			  )
// 			if(response.data === "no user"){
// 				this.setState({
// 					loggedIn: false,
// 					userName: ""})
// 			}
// 			else{
// 				this.setState({
// 					loggedIn: true,
// 					userName: response.data});
// 				this.forceUpdate();
// 				//alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
// 			}
// 			this.setState({check_login_status:true})
// 	})();
// }

// 	handlerClick(user_name) {
//         this.setState({
// 			userName: user_name,
// 			loggedIn: true
//         });
//     }

// //---------render------------------
// 	render() 
// 	{
// 		if(!this.state.check_login_status)
// 			return(<h1>loading...</h1>)
// 		else{
// 		return(
// 			<div>
// 				<Header record={this.handlerClick} data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
// 				<Body data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
// 				<Footer />
// 				{/*<button onClick={this.check.bind(this)}>button</button>*/}
// 			</div>
// 		)}
// 	}	
// }
// export default App;


//############################################################################
//copied design:
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

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
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
      content='Multilevl crowd fundraising platform.'
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

/* my code */
// class App extends React.Component
// {
// //-------constructor------------
// 	constructor(props)
// 	 {
// 		super(props)
// 		this.state = 
// 		{
// 			loggedIn: false,
// 			org: null, 
// 			userName: "",
// 			check_login_status: false
// 		}
// 		this.handlerClick = this.handlerClick.bind(this);
// 		this.function_log_status();
// 	}
// }
// /****************************************************/

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

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
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Organizations</Menu.Item>
                <Menu.Item as='a'>Prizes</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
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
  state = {}

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
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
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

const HomepageLayout = () => (
  <ResponsiveContainer>
    
    {/* <HeaderFile data={{loggedIn: false, userName: ""}}/> */}
    <Body data={{loggedIn: false, userName: ""}}/>
    <Footer />
  </ResponsiveContainer>
)

export default HomepageLayout;
