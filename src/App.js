import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { async } from "q";

import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';
//App being father component of all components:
import HomePage from './HomePage.js'
import OrgPage from './components/OrgComponents/OrgPage.js';
import OrgBody from './components/OrgComponents/OrgBody.js';
import UserPage from './components/UserComponents/UserPage.js'
import NewOrgPage from './components/NewOrgComponents/NewOrgPage.js'
import OrgSearch from './components/OrgComponents/OrgSearch.js'
import Prizes from './components/Prizes.js'
import AdminPage from './components/Admin/AdminPage.js'

//to know which page is open and make the navbar active
class ActivePage {
    static Home = 1;
    static Organizations = 2;
    static Prizes = 3;
    static MyProfile = 4;
}

class App extends React.Component {
    //-------constructor------------
    constructor() {
        super()
        this.state = {}
        this.org = {};
        this.get_user_params();
        this.guardRoute = this.guardRoute.bind(this);
    }

    async get_is_program_admin() {
        await (async () => {
            const response = await axios.get(`${this.state.email}/is-program-admin`);
            this.setState({ program_admin: response.data });
            const event = new Event('got_is_program_admin');
            document.dispatchEvent(event);
        })();
    }

    async get_user_params() {
        await (async () => {
            const response = await axios.post(
                '/get_user_params',
                { headers: { 'Content-Type': 'application/json' } }
            );

            const params = response.data;
            if (response.data === 'null') {
                this.setState({
                    loggedIn: false,
                    userName: "",
                    check_login_status: true,
                    program_admin: false,
                })
            }
            if (Array.isArray(params) && params.length) {
                const fname = params.find(x => x.Name === 'name').Value;
                const lname = params.find(x => x.Name === 'family_name').Value;
                const email = params.find(x => x.Name === 'email').Value;
                //phone is not required
                const phone = params.find(x => x.Name === 'phone_number') && params.find(x => x.Name === 'phone_number').Value;

                this.setState({
                    loggedIn: true,
                    userName: email,
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    phone: phone,
                    check_login_status: true,
                });

                await this.get_is_program_admin();
            } else {
                this.setState({
                    loggedIn: false,
                    userName: "",
                    check_login_status: true,
                    program_admin: false,
                })
            }
        })();
    }

    componentDidMount() {
        // alert("window.location.pathname: \n" + window.location.pathname)
    }

    guardRoute(activateAttributeName, componentToRender, elsePath) {
        alert(this.state[activateAttributeName]);
        switch (this.state[activateAttributeName]) {
            case undefined:
                return null;
            case true:
                return componentToRender;
            case false:
                window.location.assign(elsePath);
                break;
        }
    }

    // //---------render------------------
    render() {
        if (!this.state.check_login_status)
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>)
        else {

            const path = window.location.pathname;
            const spliting = path.split("/")
            switch (path.toLowerCase()) {
                case "/":
                    return (<HomePage data={this.state} activePage={ActivePage.Home} />);
                case "/userpage":
                    return (<UserPage data={this.state} />);
                case `/orgpage/${spliting[2]}`:
                    {
                        return (<OrgPage data={this.state} id={spliting[2]} />);
                    }
                //The following case to get to Admin page will be guarded:
                case "/adminpage":
                        return this.guardRoute('program_admin', (<AdminPage data={this.state} />), '/');
                case "/neworgpage":
                    return (<NewOrgPage data={this.state} />);
                case "/orgsearch":
                    return (<OrgSearch data={this.state} />);
                case "/prizes":
                    return (<Prizes data={this.state} />);
                default:
                    break;
            }
        }
    }
}



export default App;