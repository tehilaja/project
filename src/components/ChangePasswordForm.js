import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

import UserRegistrationForm from './UserRegistrationForm.js'
class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            { 
                userName: this.props.userName,
                old_pswd: '',
                new_pswd: '',
                confirm_new_pswd: '',
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
        e.preventDefault();

        if (!this.state.old_pswd) {
            alert("Please fill in old password field");
            return;
        }
        if (!this.state.new_pswd) {
            alert("Please fill in new password field");
            return;
        }
        if (!this.state.confirm_new_pswd) {
            alert("Please fill in confirm new password field");
            return;
        }
        if (this.state.confirm_new_pswd !== this.state.new_pswd) {
            alert("New password field and confirm new password field must be identical");
            return;
        }
        
        (async () => {
            const response = await axios.post(
                '/change-password',
                { user_name: this.state.userName, old_password: this.state.old_pswd, new_password: this.state.new_pswd },
            );

            if (response.data === 'success') {
                alert('Password changed successfully');
                document.dispatchEvent(new Event('passwordChanged'));
            } else {
                alert(response.data);
            }
        })();
    }

    render() {
        return (
            <div>
            {this.state.loading && <Dimmer active inverted>
                        <Loader size='massive' />
                    </Dimmer>}
            {!this.state.loading && <div>
            {!this.state.showUserRegister && <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Old Password'
                                type='password'
                                name="old_pswd"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='New Password'
                                type='password'
                                name="new_pswd"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Confirm New Password'
                                type='password'
                                name="confirm_new_pswd"
                                onChange={this.handleChange.bind(this)}
                            />

                            <Button content='Change Password' primary />
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>}
            {this.state.showUserRegister && <UserRegistrationForm />}
            </div>}
            </div>
        )
    }
}

export default ChangePasswordForm;