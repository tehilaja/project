import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react'
import UserRegistrationForm from './UserRegistrationForm.js';
import ForgotPasswordForm from './ForgotPasswordForm.js';

const userLoginService = require('../cognito/user-login.service').data.userLoginService;

class Status {
    static Regular = 1;
    static Loading = 2;
    static ShowUserRegister = 3;
    static ShowForgotPassword = 4;
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
                userName: "",
                pswd: "",
                isAdmin: false,
                loggedIn: false,
                status: Status.Regular,
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

    validation() {
        if (this.state.userName == "" && this.state.pswd != "") {
            alert("Username Cannot be empty!");
            return false;
        }
        if (this.state.pswd == "" && this.state.userName != "") {
            alert("please fill in password field");
            return false;
        }
        if (this.state.pswd == "" && this.state.userName == "") {
            alert("Username and password Cannot be empty!");
            return false;
        }
        return true;
    }

    login() {
        userLoginService.authenticate(this.state.userName, this.state.pswd, (err, session) => {
            if (err) {
                alert(err);
                this.setState({ status: Status.Regular });
            } else {
                this.setState({ loggedIn: true });
                window.location.assign('/UserPage');;
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validation()) {
            return;
        }
        
        this.login();
    }

    loadingRender() {
        return (
            <Dimmer active inverted>
                <Loader size='massive' />
            </Dimmer>);
    }

    regularRender() {
        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        
                    <Segment textAlign='left'>
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
                            <Button content='Forgot Password' size='small' onClick={() => this.setState({ status: Status.ShowForgotPassword })} />
                            <br></br>
                            <Button content='Login' primary />
                        </Form>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Segment>
                        <Grid relaxed='very' stackable>
                            <Grid.Column verticalAlign='middle'>
                                <Button content='Sign Up' icon='signup' size='big' onClick={() => this.setState({ status: Status.ShowUserRegister })} />
                            </Grid.Column>
                        </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        );
    }

    showUserRegisterRender() {
        return (<UserRegistrationForm />);
    }

    showForgotPasswordRender() {
        return (<ForgotPasswordForm/>);
    }

    render() {
        return (
            <div>
                {
                    this.state.status === Status.Loading && this.loadingRender() ||
                    this.state.status === Status.Regular && this.regularRender() ||
                    this.state.status === Status.ShowUserRegister && this.showUserRegisterRender() ||
                    this.state.status === Status.ShowForgotPassword && this.showForgotPasswordRender() ||
                    null
                }
            </div>
        );
    }
}

export default LoginForm;
