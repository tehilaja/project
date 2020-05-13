import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { async } from "q";

//App being father component of all components:
import HomePage from './HomePage.js'
import OrgPage from './components/OrgComponents/OrgPage.js';
import OrgBody from './components/OrgComponents/OrgBody.js';
import UserPage from './components/UserComponents/UserPage.js'
import NewOrgPage from './components/NewOrgComponents/NewOrgPage.js'
import OrgSearch from './components/OrgComponents/OrgSearch.js'
import Prizes from './components/Prizes.js'


class App extends React.Component
{
//-------constructor------------
	constructor()
	 {
		super()
		this.state = { }
		this.get_user_params();
	}

	get_user_params() {
		alert("in app:"+JSON.stringify(this.state));
        (async () => {
            const response = await axios.post(
                '/get_user_params',
                { headers: { 'Content-Type': 'application/json' } }
            );

			const params = response.data;
			
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

// //---------render------------------
	render() 
	{
		if(!this.state.check_login_status)
			return(<h1>loading...</h1>)
		else{
			const path = window.location.pathname;
			alert('path: '+path);
			switch (path.toLowerCase()) {
					case "/":
						return(<HomePage data={this.state}/>);
					case "/userpage":
						return(<UserPage data={this.state}/>);
					case "/orgpage":
						return(<OrgPage data={this.state}/>);
					// case "/orgbody":
					// 	return(<OrgBody data={this.state}/>);
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
