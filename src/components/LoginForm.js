import React from 'react';
import axios from "axios";
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = 
            {userName: "", pswd: "", isAdmin: false, loggedIn: false}
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(e){
        e.preventDefault()
        if (this.state.userName == "" && this.state.pswd != "") {
            alert("Username Cannot be empty!");
            return;
        }
        if (this.state.pswd == "" && this.state.userName != "" ){
            alert("please fill in password field");
            return;
        }
        if (this.state.pswd == "" && this.state.userName == ""  ){
            alert("Username and password Cannot be empty!");
            return;
        }
        //login user to server
        (async ()=> {
            const response = await axios.post(
                '/login',
                { userName: this.state.userName, pswd: this.state.pswd, isAdmin: this.state.isAdmin, loggedIn: false},
                { headers: { 'Content-Type': 'application/json' } }
              )
              console.log("resp",response)
              if(response.data === "fail"){
                  alert("failed to login user");
                  return;
              }
              else if(response.data ==="user dosent exist"){
                this.setState({loggedIn: false})
                alert("Please make sure to click the correct button, and that you typed in the correct username and password ");
                return;
              }
              else if(response.data === "loggedIn"){
                console.log("response from server")
                // alert("Hello: "+this.state.userName)
                this.setState({loggedIn: true})
                // this.props.record(this.state.userName)
              }
              window.location.assign('/UserPage');
        })();
    }
    
    render(){
        return(
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
                <Button content='Sign up' icon='signup' size='big' />
            </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>
        )
    }
}

export default LoginForm;