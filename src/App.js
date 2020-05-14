import React from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";

import {Dimmer, Image, Loader, Segment} from 'semantic-ui-react';
//App being father component of all components:
import HomePage from './HomePage.js'
import OrgPage from './components/OrgComponents/OrgPage.js';
import OrgBody from './components/OrgComponents/OrgBody.js';
import UserPage from './components/UserComponents/UserPage.js'
import NewOrgPage from './components/NewOrgComponents/NewOrgPage.js'
import OrgSearch from './components/OrgComponents/OrgSearch.js'
import Prizes from './components/Prizes.js'

//to know which page is open and make the navbar active
class ActivePage {
	static Home = 1;
	static Organizations = 2;
	static Prizes = 3;
	static MyProfile = 4;
}

class App extends React.Component
{
//-------constructor------------
	constructor()
	 {
		super()
		this.state = { }
		this.org ={}
		this.get_user_params();
	}

	get_user_params() {
        (async () => {
            const response = await axios.post(
                '/get_user_params',
                { headers: { 'Content-Type': 'application/json' } }
            );

			const params = response.data;
			if(response.data === 'null'){
				this.setState({
                    loggedIn: false,
					userName: "",
					check_login_status: true
                })
			}	
            if (Array.isArray(params) && params.length) {
                const fname = params.find(x => x.Name === 'name').Value;
                const lname = params.find(x => x.Name === 'family_name').Value;
				const email = params.find(x => x.Name === 'email').Value;
				//phone is not required
                const phone = params.find(x => x.Name === 'phone_number') &&  params.find(x => x.Name === 'phone_number').Value;

                this.setState({
					loggedIn: true,
					userName: email,
                    first_name: fname,
                    last_name: lname,
                    email: email,
					phone: phone,
					check_login_status: true
                });
            } else {
                this.setState({
                    loggedIn: false,
					userName: "",
					check_login_status: true
                })
            }
		})();
	}
	
	componentDidMount()
	{
		// alert("window.location.pathname: \n" + window.location.pathname)
	}

// //---------render------------------
	render() 
	{
		if(!this.state.check_login_status)
		return(
		<Segment>
		<Dimmer active  inverted>
		<Loader size='massive'>Loading</Loader>
		</Dimmer>

		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
		<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  		</Segment>)
		else{
			// return(
			// 	<React.Fragment>
			// 		<BrowserRouter>
			// 		<div>
			// 		<Route path="/orgpage/:id" component={OrgPage} />


			// 	</div>
			// 	</BrowserRouter>
			// </React.Fragment>
			// )

			


			const path = window.location.pathname;
			const spliting = path.split("/")
			// alert("arr: \n"+ spliting+ " \n"+ spliting[2])
			switch (path.toLowerCase()) {
					case "/":
						return(<HomePage data={this.state} activePage={ActivePage.Home}/>);
					case "/userpage":
						return(<UserPage data={this.state}/>);
					case `/orgpage/${spliting[2]}`:
						{
							// alert("prop id in  app: \n" + this.props.match.params.id)
							return(<OrgPage data={this.state} id = {spliting[2]}/>);
						}
						
						// id={this.props.match.params.id}
							// id={this.props.match.params.id} />);
					// case "/orgbody":
					// 	return(<OrgBody data={this.state}/>);
					// case "/orgpage":

					// 	// alert(this.props.match.params.id)
					// 	return(<OrgPage data={this.state}/>);
					case "/neworgpage":
						return(<NewOrgPage data={this.state}/>);
					case "/orgsearch":
						return(<OrgSearch data={this.state}/>);
					case "/prizes":
						return(<Prizes data={this.state}/>);
					default:
						break;
				}            
		}
	}	
}
export default App;
