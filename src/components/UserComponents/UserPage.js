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
            loggedIn: this.props.loggedIn,
            // userName: this.props.userName,
            userName: "Tehila Jacobs",
            routeMain: false,
            check_login_status: false,
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            userIsAdmin: false
        }
        alert(JSON.stringify(this.state))
        this.function_log_status();
        this.get_user_params();

    }

    get_user_params() {
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
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    phone: phone,
                });
                alert("my state in user page:\n" + JSON.stringify(this.state));
            } else {
                this.setState({
                    loggedIn: false,
                    userName: ""
                })
                //return;
            }
            this.setState({ check_login_status: true })
        })();
    }

    // componentWillReceiveProps(nextProps){
    //  nextProps= this.props
    // }

    //the function below checks if the user is already logged in before rendering page
    function_log_status() {
        (async () => {
            const response = await axios.post(
                '/is_logged_in',
                { headers: { 'Content-Type': 'application/json' } }
            )
            if (response.data === "no user") {
                this.setState({
                    loggedIn: false,
                    userName: ''
                })
                //return;
            }
            else {
                this.setState({
                    loggedIn: true,
                    userName: response.data
                });
                this.forceUpdate();
                alert("loggedIn " + this.state.loggedIn + " userName " + this.state.userName);
            }
            this.setState({ check_login_status: true })
        })();
    }

    //get_current_user:
    get_current_user() {
        (async () => {
            const response = await axios.post(
                '/get_current_user',
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log("get_current response:" + JSON.stringify(response.data))
            alert("get_current response:" + JSON.stringify(response.data))
            if (response.data === null) {
                this.setState({
                    loggedIn: false,
                    userName: ""
                })
            }
            else {
                console.log("server get current user before getting attributes");
                alert("server get current user before getting attributes")
                response.data.getUserAttributes(function (err, userAtrributes) {
                    console.log("CallBack get current user error: " + JSON.stringify(err));
                })
                this.setState({
                    loggedIn: true,
                    userName: response.data
                });
                this.forceUpdate();
                //alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
            }
            this.setState({ check_login_status: true })
        })();
    }

    // function 

    render() {
        if (!this.state.check_login_status)
            return (<h1>loading...</h1>)
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
