import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react';
import UserRegistrationForm from './UserRegistrationForm.js'

const userLoginService = require('../cognito/user-login.service').data.userLoginService;

class Status {
    static Start = 1;
    static PreConfirmation = 2;
}

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            pswd: '',
            confirm_pswd: '',
            code: '',
            status: Status.Start,
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

    forgotPassword() {
        userLoginService.forgotPassword(this.state.userName, (err, result) => {
            if (err) {
                alert(err);
                this.setState({ loading: false });
            } else {
                this.setState({ status: Status.PreConfirmation });
            }
        });
    }

    cofirmForgotPasswordValidation() {
        if (!this.state.pswd) {
            alert("Please fill in new password field");
            return false;
        }
        if (!this.state.confirm_pswd) {
            alert("Please fill in confirm new password field");
            return false;
        }
        if (this.state.confirm_pswd !== this.state.pswd) {
            alert("New password field and confirm new password field must be identical");
            return false;
        }

        return true;
    }

    cofirmForgotPassword() {
        if (!this.cofirmForgotPasswordValidation()) {
            return;
        }

        userLoginService.confirmNewPassword(this.state.userName, this.state.code, this.state.pswd, (err, result) => {
            if (err) {
                alert(err);
            } else {
                alert('Password reset successfully');
                window.location.assign('/');
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.userName) {
            alert("Please fill in username field");
            return;
        }        

        this.forgotPassword();
    }

    render() {
        return (
            <div>
                <Segment placeholder>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column>
                                {
                                    this.state.status === Status.Start && this.startForm() ||
                                    this.state.status === Status.PreConfirmation && this.preConfirmationForm() ||
                                    null
                                }
                            </Grid.Column>
                        </Grid>
                    </Segment>
            </div>
        )
    }

    startForm() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    name="userName"
                    onChange={this.handleChange.bind(this)}
                />
                <Button content='Send Confirmation Code' primary />
            </Form>
        );
    }

    preConfirmationForm() {
        return (
            <Form onSubmit={this.cofirmForgotPassword.bind(this)}>
                <label>Please check you email for a confirmation code.</label>
                <br/>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Confirmation Code'
                    placeholder='Confirmation Code'
                    type='password'
                    name="code"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='New Password'
                    placeholder='New Password'
                    type='password'
                    name="pswd"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Confirm New Password'
                    placeholder='Confirm New Password'
                    type='password'
                    name="confirm_pswd"
                    onChange={this.handleChange.bind(this)}
                />
                <Button content='Reset Password' primary />
            </Form>
        );
    }
}

export default ForgotPasswordForm;
