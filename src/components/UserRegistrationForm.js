/*
TO DO:
change user name to be the begining of email or the cell number!!
*/

import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import { async } from "q";

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { RegistrationUser } from '../cognito/user-registration.service';

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
					user_name: this.state.userName, first_name: this.state.first_name, last_name: this.state.last_name, pswd: this.state.pswd, email: this.state.email,// ---- req
					is_admin: false
				},
				{ header: { 'Content-Type': 'application/json' } }
			)
			console.log("after registration")
			alert("response: "+JSON.stringify(response))
			if (response.data === "success") {
				this.setState({status: Status.PreConfirmation})
			} else {
				
			}
			console.log("response: "+JSON.stringify(response))
			console.log(response.data);
			this.registrationCallback(response.data.message, response.data.result);
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
				//login confimed user:
				(async () => {
					const response = await axios.post(
						'/login',
						{
							userName: this.state.email,
							pswd: this.state.pswd,
						},
						{ header: { 'Content-Type': 'application/json' } }
					)
				});
			} else {
				
			}
			console.log("after confirmation")
			alert("response: "+JSON.stringify(response))
			console.log("response: "+JSON.stringify(response))
			console.log(response.data);
		}
		)();
	}

	registrationCallback(message, result) {console.log("cognito callback")
		if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            //move to the next step
			console.log("user registerd");
			this.state.status = Status.PreConfirmation;
        }
	}

	confirmationCallback() {
		this.state.status = Status.PostConfirmation;
	}

	render() {
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
					/>
					<Form.Input
						icon='user'
						iconPosition='left'
						placeholder='Last name'
						name="last_name"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						icon='lock'
						iconPosition='left'
						placeholder='Password'
						type='password'
						name="pswd"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						icon='lock'
						iconPosition='left'
						placeholder='Validate password'
						type='password'
						name="valid_pswd"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						icon='phone'
						iconPosition='left'
						placeholder='Phone number'
						name="first_name"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						icon='envelope'
						iconPosition='left'
						type='email'
						placeholder='email'
						name="email"
						onChange={this.handleChange.bind(this)}
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


/*the old form*/
//  <div className="App-header-form">
// 		<form onSubmit={this.handleSubmit}>
// 			User name: <input type="text" name="userName" onChange={this.handleChange.bind(this)}></input><br></br>
// 			{/* change */}
// 			first name: <input type="text" name="first_name" onChange={this.handleChange.bind(this)}></input><br></br>
// 			last name: <input type="text" name="last_name" onChange={this.handleChange.bind(this)}></input><br></br>
// 			{/* -- */}
// 			password: <input type="password" name="pswd" onChange={this.handleChange.bind(this)}></input><br></br>
// 			validate password: <input type="password" name="valid_pswd" onChange={this.handleChange.bind(this)}></input><br></br>
// 			email: <input type="email" name="email" onChange={this.handleChange.bind(this)}></input><br></br>
// 		  <input type="submit" value="Submit"></input>
// 		</form>
// 		</div> 
