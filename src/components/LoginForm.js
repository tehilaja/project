import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

import UserRegistrationForm from './UserRegistrationForm.js'
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            { 
                userName: "",
                pswd: "",
                isAdmin: false,
                loggedIn: false,
                showUserRegister: false,
                loading: false
            }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.userName == "" && this.state.pswd != "") {
            alert("Username Cannot be empty!");
            return;
        }
        if (this.state.pswd == "" && this.state.userName != "") {
            alert("please fill in password field");
            return;
        }
        if (this.state.pswd == "" && this.state.userName == "") {
            alert("Username and password Cannot be empty!");
            return;
        }
        //login user to server
        this.setState({loading: true});
        (async () => {
            const response = await axios.post(
                '/login',
                { userName: this.state.userName, pswd: this.state.pswd, isAdmin: this.state.isAdmin, loggedIn: false },
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log("resp", response)

            if (response.data === "loggedIn") {
                // alert("Hello: "+this.state.userName)
                this.setState({ loggedIn: true });
                window.location.assign('/UserPage');;
                // this.props.record(this.state.userName)
            } else {
                alert(response.data);
                this.setState({loading: false});
            }
        })();
    }

    render() {
        return (
            <div>
            {this.state.loading && <Dimmer active inverted>
                        <Loader size='massive'>Logging in...</Loader>
                    </Dimmer>}
            {!this.state.loading && <div>
            {!this.state.showUserRegister && <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                placeholder='Username'
                                name="userName"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                name="pswd"
                                onChange={this.handleChange.bind(this)}
                            />

                            <Button content='Login' primary />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => this.setState(prevState => {
						return {
								showUserRegister: !prevState.showUserRegister
							}})}/>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>}
            {this.state.showUserRegister && <UserRegistrationForm />}
            </div>}
            </div>
        )
    }
}

export default LoginForm;