import React from 'react';

import {Redirect} from "react-router-dom";



import axios from "axios";

import { async } from "q";
import ImageUploader from 'react-images-upload';
import { GoOrganization } from "react-icons/ai";

////---------------


import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Menu,
  Radio,
  Responsive,
  Segment,
  Sidebar,
  Step,
  Visibility,
} from 'semantic-ui-react'

class NewOrg extends React.Component{

	constructor(props){
		super(props)
	this.state ={ 
				pswd: "", 
				validPswd: false,
				loggedIn: true, //this.props.data.loggedIn,
				userName: "", //this.props.data.userName
				check_login_status: true,
				orgName:"",
				admin_name:"",
				photo:"",
				minDonation: 10,
				city:"",
				building:"",
				street:"",
				p_code:"",
				org_num:"",
				branch:"",
				account_num:"",
				bank_num:"",
				description:"",
				field_of_acctivity:"",
				founding_year:"",
				working:"",
				volunteers:"",
				flag_done: false,
				pictures: []
			}			  
		this.handleChange = this.handleChange.bind(this)
		this.handlerClick = this.handlerClick.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.function_log_status();
	}

	onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }


		//the function below checks if the user is already logged in before rendering page
		function_log_status(){
			(async ()=> {
				const response = await axios.post(
					'/is_logged_in',
					{ headers: { 'Content-Type': 'application/json' } }
				  )

				if(response.data === "no user"){
					this.setState({
						loggedIn: false,
						userName: ""})
				}
				else{
					this.setState({
						loggedIn: true,
						userName: response.data});
					this.forceUpdate();
					//alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
				}
				this.setState({check_login_status:true})
		})();
	}



	handleChange(event){
		const {name, value, type, checked} = event.target
		type === "file" ? this.setState({[name]: event.target.files[0] }) : this.setState({[name]: value})
	}



	handleSubmit=(e)=>
	{
        e.preventDefault();
         /*add new org to dataBase */
        // if (this.state.DuserName != "") // TODO: if find in db (func findDuser)
        // {
		// 	// TODO : nust filde....
		// }



            (async () => {
		 		const response = await axios.post(
					 '/addOrg',
         			{ 
						 // org_name,admin_name,description,field_of_acctivity,org_pic,min_donation,org_num,branch,account_num,bank_num,founding_year,working,volunteers,friends,city_id,building,street,p_code)
						// TODO : all data
						org_name: this.state.orgName,admin_name:this.state.admin_name,org_pic:this.state.photo, monthly_donation:this.state.minDonation,  // ---- req
                    },
                     {header:{'Content-Type': 'application/json'}}
                     )
                    console.log("resp",response)
                    if(response.data === "no conection"){
                        alert("you need to login...")
                    }
                    else if(response.data ==="added succesfully!"){
                    // this.setState({loggedIn: false})
                        alert("the organization " + this.state.orgName+ "added succesfully ")
                    //  }
                    // else if(response.data ==="fail2"){
                    //     alert("the referred by is incorrect")
                    // }
                    // else if(response.data ==="fail1"){
                    //     alert("the level")
                    }
               })();  
		// }

        // else
		//     alert("please enter Referred detiles")
		this.setState({flag_done:true});
	}

	//function to deal with passing state to parent component:
	handlerClick(user_name) {
        this.setState({
			loggedIn: true,
			userName: user_name
		});
		this.props.record(user_name)

    }	

	 //---------increment + ----------

    increment() 
    {
            this.setState(prevState => {
                return {
                    minDonation: prevState.minDonation + 1
                }
			})
    }

    //---------decrement - -------------
    decrement()
     {
        if(this.state.minDonation > 1)
            this.setState({minDonation: this.state.minDonation - 1})
    }
	

	render() {
		// if(!this.state.check_login_status)
		// 	return(<h1>loading...</h1>)
		return(
			<div>
				<Segment style={{ padding: '8em 0em' }} vertical>
				<Grid container stackable verticalAlign='middle'>		
				<br></br>
				<Label as='a' color='teal' ribbon left>
				Get Started!
				</Label>
				<Header as='h3' style={{ fontSize: '2em' }}>
				Thank you for using us for your organization!
				</Header>
				<Segment>
				<p style={{ fontSize: '1.33em' }}>
						We will provide you with the design and software necessary to create an online platform for ongoing donations.
						All we left for you to do, is focus on content that will be appealing and attract your ongoing doners.
				</p>
				</Segment>
				<br></br>
				<br></br>
				{/* <Grid relaxed='very' stackable centered> */}
				<Form onSubmit={this.handleSubmit.bind(this)}>
				<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}
				>
				<a href='#'>Enter the Details Bellow:</a>
				</Divider>
					{/* info about organization */}
					<h4></h4>
					<Form.Field>
					<Form.Input
						label= 'name of organization:'
						iconPosition='left'
						placeholder='Organization name'
						name="orgName"
						onChange={this.handleChange.bind(this)}
					/>
					</Form.Field>
					<br/><br/>
					<Form.Field>
					{/* <Form.label>name of Admin:</Form.label> */}
					<Form.Input
						label= 'name of Admin:'
						icon='user'
						iconPosition='left'
						placeholder='Admin name'
						name="admin_name"
						onChange={this.handleChange.bind(this)}
					/>
					</Form.Field>
					<br/><br/>
					<Form.Field>
					<Form.TextArea label='Description:' placeholder='Tell us more about your organization...' />					</Form.Field>
					<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					<a href='#'>Organization Contact Info:</a>
					</Divider>
					<Form.Input
						label= 'Phone number:'
						icon='phone'
						iconPosition='left'
						placeholder='Phone number'
						name="phone"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						label= 'email:'
						icon='envelope'
						iconPosition='left'
						placeholder='email'
						name="email"
						onChange={this.handleChange.bind(this)}
					/>
					<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}
				>
				<a href='#'>Mailing Address</a>
				</Divider>
					<Form.Input
						label= 'Building:'
						placeholder='Building'
						name="building"
						onChange={this.handleChange.bind(this)}
					/>
						<Form.Input
						label= 'street:'
						placeholder='street'
						name="street"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						label= 'city:'
						placeholder='city'
						name="city"
						onChange={this.handleChange.bind(this)}
					/>
					<Form.Input
						label= 'postal code:'
						placeholder='postal code'
						name="p_code"
						onChange={this.handleChange.bind(this)}
					/>	
					<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					<a href='#'>Upload a Photo:</a>
					</Divider>
					<Segment raised>
					<ImageUploader
						withIcon={true}
						buttonText='Choose images'
						onChange={this.onDrop}
						imgExtension={['.jpg', '.gif', '.png', '.gif']}
						maxFileSize={5242880}
            		/>
					<br/><br/>
					</Segment>
					{/* // TODO : STYLE height */}
					{/* set minimum donation per month */}
					<div>
					<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					<a href='#'>Set minimum monthly doation</a>
					</Divider>

						<label > $ </label>
						<lable name="minDonation">{this.state.minDonation}  </lable>
						<button onClick={this.decrement.bind(this)}>-</button>
						<button onClick={this.increment.bind(this)}>+</button>
					</div>
					<br></br>
					<br></br>
					<Radio toggle 
					label="Allow One-time Donations"/>
					{/* TODO: work out how payment will be done! */}
					{/* <Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					<a href='#'>Bank Info:</a>
					</Divider>
					<lable className= "newOrgLable"> org_num: </lable>
					<input type="text" name="org_num" onChange={this.handleChange.bind(this)}/>
					<br/>
					<lable className= "newOrgLable"> num of branch: </lable>
					<input type="text" name="branch" onChange={this.handleChange.bind(this)}/>
					<br/>
					<lable className= "newOrgLable"> account_num: </lable>
					<input type="text" name="account_num" onChange={this.handleChange.bind(this)}/>
					<br/>
					<lable className= "newOrgLable"> bank_num: </lable>
					<input type="text" name="bank_num" onChange={this.handleChange.bind(this)}/>
					<br/>
					more details */}
					<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
					{/* TODO: see which details are actually necessay for us */}
					<a href='#'>More Details:</a>
					</Divider>
					<br/><br/>
					<lable className= "newOrgLable"> field_of_acctivity: </lable>
					<input type="text" name="field_of_acctivity" onChange={this.handleChange.bind(this)}/>
					<br/><br/>
					<lable className= "newOrgLable"> founding_year: </lable>
					<input type="text" name="founding_year" onChange={this.handleChange.bind(this)}/>
					<br/><br/>
					<lable className= "newOrgLable"> working: </lable>
					<input type="text" name="working" onChange={this.handleChange.bind(this)}/>
					<br/><br/>
					<lable className= "newOrgLable"> volunteers: </lable>
					<input type="text" name="volunteers" onChange={this.handleChange.bind(this)}/>
					<br/><br/>
					<lable className= "newOrgLable"> friends: </lable>
					<input type="text" name="friends" onChange={this.handleChange.bind(this)}/>
					<br/><br/>
					<br />
					<Button content='Submit' primary />				
					</Form>
				{/* </Grid> */}
				</Grid>
				</Segment>	
			</div>
		)
	}	
}

export default NewOrg;