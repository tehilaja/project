import React from 'react';
import { Redirect } from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import UserPageBody from './UserPageBody.js';
import Footer from '../Footer.js';

import AddPrize from '../NewOrgComponents/AddPrizes.js'
import { Segment } from 'semantic-ui-react';

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
            routeMain: false,
            check_login_status: false,
            first_name: this.props.data.first_name,
            last_name: this.props.data.last_name,
            email: this.props.data.email,
            phone: this.props.data.phone,
            userIsAdmin: false
        }
        alert(JSON.stringify(this.state))
    }

    render() {
        return (
            <div>
                {/* <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/> */}
                <Header data={{ loggedIn: this.state.loggedIn, userName: this.state.email }} />
                <UserPageBody
                    data={this.state} />
                {this.state.userIsAdmin && <Segment relaxed='very'>
                <AddPrize />
                </Segment>}
                <Footer />
            </div>
        )
    }
}
export default UserPage;
