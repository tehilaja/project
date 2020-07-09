import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { async } from "q";

import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
//App being father component of all components:
import HomePage from './HomePage.js'
import OrgPage from './components/OrgComponents/OrgPage.js';
import OrgBody from './components/OrgComponents/OrgBody.js';
import UserPage from './components/UserComponents/UserPage.js'
import NewOrgPage from './components/NewOrgComponents/NewOrgPage.js'
import EditOrgPage from './components/NewOrgComponents/EditOrgPage.js'
import OrgSearch from './components/OrgComponents/OrgSearch.js'
import Prizes from './components/Prizes.js'
import AdminPage from './components/Admin/AdminPage.js'

import ContactUs from './components/Extra/ContactUs.js'
import About from './components/Extra/About.js'

const userParametersService = require('./cognito/user-parameters.service').data.userParametersService;

//to know which page is open and make the navbar active
class ActivePage {
    static Home = 1;
    static Organizations = 2;
    static Prizes = 3;
    static MyProfile = 4;
    static AdminPage = 5;
}

class App extends React.Component {
    //-------constructor------------
    constructor(props) {
        super(props);
        this.state = {
            check_login_status: false,
            loggedIn: null,
            userName: null,
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            program_admin: null,
        };
        this.org = {};
        this.activePage = 0;
        this.guardRoute = this.guardRoute.bind(this);
        this.renderPageBody = this.renderPageBody.bind(this);
    }

    async get_is_org_admin(orgId) {
        await (async () => {
            const url = `${this.state.email}/is-org-admin/${orgId}`;
            const response = await axios.get(url);
            this.setState({ org_admin: response.data });
        })();
    }

    async run_necessary_guard_checks() {
        const path = window.location.pathname.split('/');
        switch (path[1].toLowerCase()) {
            case 'editorgpage':
                await this.get_is_org_admin(path[2]);
                break;
            default:
                break;
        }
    }

    get_user_params() {
        const getParamsCallback = (err, params) => {
            if (params && Array.isArray(params) && params.length) {
                const fname = params.find(x => x.Name === 'name').Value;
                const lname = params.find(x => x.Name === 'family_name').Value;
                const email = params.find(x => x.Name === 'email').Value;
                //phone is not required
                const phone = params.find(x => x.Name === 'phone_number') && params.find(x => x.Name === 'phone_number').Value;
                const program_admin = params.find(x => x.Name === 'program_admin').Value;

                this.setState({
                    loggedIn: true,
                    userName: email,
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    phone: phone,
                    check_login_status: true,
                    program_admin: program_admin,
                });

                this.run_necessary_guard_checks();

            } else {                
                this.setState({
                    check_login_status: true,
                    loggedIn: false,
                    userName: '',
                    program_admin: false,
                    org_admin: false,
                });
            }
        }
        userParametersService.getParameters(getParamsCallback.bind(this));
    }

    renderPageBody(path) {
        const spliting = path.split("/")
        switch (path.toLowerCase()) {
            case "/":
                {
                    return [ActivePage.Home, <HomePage data={this.state} />];
                }
            case "/userpage":
                {
                    return [ActivePage.MyProfile, this.guardRoute('loggedIn', (<UserPage data={this.state} />), '/')];
                }
            case `/orgpage/${spliting[2]}`:
                {
                    return [0, <OrgPage data={this.state} id={spliting[2]} />];
                }
            case "/contactus":
                {
                    return [0, <ContactUs data={this.state} />];
                }
            case "/about":
            {
                return [0, <About data={this.state} />];
            }
            case "/neworgpage":
                return [0, <NewOrgPage data={this.state} />];
            case "/orgsearch":
                return [ActivePage.Organizations, <OrgSearch data={this.state} activePage={ActivePage.Organizations} />];
            case "/prizes":
                return [ActivePage.Prizes, <Prizes data={this.state} activePage={ActivePage.Prizes} />];
            //The following cases will be guarded:
            case "/adminpage":
                return [ActivePage.AdminPage, this.guardRoute('program_admin', (<AdminPage data={this.state} />), '/')];
            case `/editorgpage/${spliting[2]}`:
                return [0, this.guardRoute('org_admin', (<EditOrgPage data={this.state} id={spliting[2]} />), '/')];
            default:
                break;
        }
    }

    componentDidMount() {
        this.get_user_params();
    }

    guardRoute(activateAttributeName, componentToRender, elsePath) {
        // alert(this.state[activateAttributeName]);
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
            const [activePage, renderObject] = this.renderPageBody(path)
            return (
                <div>
                    <Header data={{ loggedIn: this.state.loggedIn, program_admin: this.state.program_admin, userName: this.state.userName, activePage: activePage }} />
                    {renderObject}
                    <Footer />
                </div>)
        }
    }
}



export default App;
