import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react'
import UserRegistrationForm from './UserRegistrationForm.js';
import ForgotPasswordForm from './ForgotPasswordForm.js';

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
        this.setState({status: Status.Loading});
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
                this.setState({status: Status.Regular});
            }
        })();
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
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column verticalAlign='middle'>
                                <Button content='Sign Up' icon='signup' size='big' onClick={() => this.setState({ status: Status.ShowUserRegister })} />

                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <Button content='Forgot Password' icon='signup' size='big' onClick={() => this.setState({ status: Status.ShowForgotPassword })} />
                            </Grid.Column>
                            <Divider vertical>Or</Divider><Divider vertical>Or</Divider>
                        </Grid>
                        {/* <Button content='Sign Up' icon='signup' size='big' onClick={() => this.setState({ status: Status.ShowUserRegister })} /> */}
                    </Grid.Column>

                    {/* <Grid.Column verticalAlign='middle'>
                        <Button content='Forgot Password' icon='signup' size='big' onClick={() => this.setState({status: Status.ShowForgotPassword})} />
                    </Grid.Column> */}
                </Grid>

                <Divider vertical>Or</Divider><Divider vertical>Or</Divider>
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