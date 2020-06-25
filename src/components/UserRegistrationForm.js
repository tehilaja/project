/*
TO DO:
change user name to be the begining of email or the cell number!!
*/

import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { async } from "q";

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

class Status {
    static PreRegistration = 1;
    static PreConfirmation = 2;
    static PostConfirmation = 3;
}

class UserRegistrationForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            first_name: "",
            last_name: "",
            pswd: "",
            valid_pswd: "",
            email: "",
            phone: "",
            confirmation_code: "",
            status: Status.PreRegistration,
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

    // ---- add user
    handleSubmit = (e) => {
        e.preventDefault();
        
        switch (this.state.status)
        {
            case Status.PreRegistration:
                this.register();
                break;
            
            case Status.PreConfirmation:
                this.confirmUser();
                break;
        }
    }

    register() {
        if (this.state.pswd !== this.state.valid_pswd) {
            alert('Validate Password field must be identical to Password field');
            return;
        }
        
        const user = {
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            phone: this.state.phone,
            password: this.state.pswd,
        };
        /*add user to dataBase, login with new user*/
        (async () => {
            const response = await axios.post(
                '/add_user',
                { //todo- send real data
                    // -- * change
                    user: user,
                    user_name: this.state.userName, first_name: this.state.first_name, last_name: this.state.last_name, pswd: this.state.pswd, email: this.state.email, phone: this.state.phone,// ---- req
                    is_admin: false
                },
                { header: { 'Content-Type': 'application/json' } }
            )
            console.log("after registration");

            if (response.data === "registered") {
                this.setState({status: Status.PreConfirmation});
            } else {
                alert(response.data);
                console.log(response.data);             
            }
            console.log("response: "+JSON.stringify(response))
        }
        )();
    }

    confirmUser() {
        (async () => {
            const response = await axios.post(
                '/confirm_registerd_user',
                {
                    user_name: this.state.email,
                    confirmation_code: this.state.confirmation_code,
                },
                { header: { 'Content-Type': 'application/json' } }
            )
            if (response.data === "confirmed") {
                this.setState({status: Status.PostConfirmation})
            } else {
                console.log(response.data);
                alert(response.data);
            }
            console.log("after confirmation")
            console.log("response: "+JSON.stringify(response));
        }
        )();
    }

    render() {
        if (this.state.status === Status.PostConfirmation) {
            window.location.assign('/');
        }

        return (
            <Segment placeholder>
                {
                    this.state.status === Status.PreRegistration && this.preRegistrationRender() ||
                    this.state.status === Status.PreConfirmation && this.preConfirmationRender()
                }
            </Segment>
        )
    }

    preRegistrationRender() {
        return <div>
        <Grid relaxed='very' stackable>
            <Grid.Column>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        placeholder='First name'
                        name="first_name"
                        onChange={this.handleChange.bind(this)}
                        required='true'
                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        placeholder='Last name'
                        name="last_name"
                        onChange={this.handleChange.bind(this)}
                        required='true'
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="pswd"
                        onChange={this.handleChange.bind(this)}
                        required='true'
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Validate password'
                        type='password'
                        name="valid_pswd"
                        onChange={this.handleChange.bind(this)}
                        required='true'
                    />
                    <Form.Input
                        icon='phone'
                        iconPosition='left'
                        placeholder='Phone number'
                        name="phone"
                        onChange={this.handleChange.bind(this)}
                    />
                    <Form.Input
                        icon='envelope'
                        iconPosition='left'
                        type='email'
                        placeholder='email'
                        name="email"
                        onChange={this.handleChange.bind(this)}
                        required='true'
                    />
                    <Button content='Sign Up' primary />
                </Form>
            </Grid.Column>
        </Grid>
    </div>;
    }   

    preConfirmationRender() {
        return <div>
        <Grid relaxed='very' stackable>
            <Grid.Column>
                <Form onSubmit={this.handleSubmit}>
                    <label>Please check you email for a confirmation code.</label>
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirmation Code'
                        type='password'
                        name="confirmation_code"
                        onChange={this.handleChange.bind(this)}
                    />
                    <Button content='Confirm' primary />
                </Form>
            </Grid.Column>
        </Grid>
    </div>;
    }
}

export default UserRegistrationForm;
