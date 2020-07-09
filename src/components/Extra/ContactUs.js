import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

import * as emailUtil from '../../utilities/email';

class ContactUs extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            { 
                loggedIn: this.props.data.loggedIn, 
                userName: this.props.data.userName,
                message: "",
                contact: ""
            }
        this.handleChange = this.handleChange.bind(this)
    }

    emailMessage() {
          emailUtil.sendEmail(
            ['tehilaj97@gmail.com'],
            null,
            null,
            `someone sending a message from magdilim`,
            `contact information: ${this.state.contact} \n Message: ${this.state.message}`);
      }

    componentDidMount() {
        window.scrollTo({
            top: 500,
            left: 0,
            behavior: 'smooth'
          });
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(e) {
        this.emailMessage();
        window.location.assign('/')
    }

    render() {
        return (
            <div>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='How can we contact you?'
                                placeholder='contact info'
                                name="contact"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                icon='question'
                                iconPosition='left'
                                label='How can we help you?'
                                placeholder='message...'
                                name="message"
                                onChange={this.handleChange.bind(this)}
                            />

                            <Button content='Send' primary />
                        </Form>
                    </Grid.Column>
                </Grid>

            </Segment>
            </div>
        )
    }
}

export default ContactUs;