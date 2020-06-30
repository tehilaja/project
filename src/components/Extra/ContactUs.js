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
        alert(JSON.stringify(this.state))
        this.emailMessage();
        // e.preventDefault()
        // if (this.state.userName == "" && this.state.pswd != "") {
        //     alert("Username Cannot be empty!");
        //     return;
        // }
        // if (this.state.pswd == "" && this.state.userName != "") {
        //     alert("please fill in password field");
        //     return;
        // }
        // if (this.state.pswd == "" && this.state.userName == "") {
        //     alert("Username and password Cannot be empty!");
        //     return;
        // }
        // //login user to server
        // this.setState({loading: true});
        // (async () => {
        //     const response = await axios.post(
        //         '/login',
        //         { userName: this.state.userName, pswd: this.state.pswd, isAdmin: this.state.isAdmin, loggedIn: false },
        //         { headers: { 'Content-Type': 'application/json' } }
        //     )
        //     console.log("resp", response)

        //     if (response.data === "loggedIn") {
        //         // alert("Hello: "+this.state.userName)
        //         this.setState({ loggedIn: true });
        //         window.location.assign('/UserPage');;
        //         // this.props.record(this.state.userName)
        //     } else {
        //         alert(response.data);
        //         this.setState({loading: false});
        //     }
        // })();
        window.location.assign('/')
    }

    render() {
        return (
            <div>
            {/* {this.state.loading && <Dimmer active inverted>
                        <Loader size='massive' />
                    </Dimmer>} */}
            {/* {!this.state.loading && <div> */}
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
            {/* } */}
            </div>
        )
    }
}

export default ContactUs;