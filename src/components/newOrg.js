import React from 'react';

import {Redirect} from "react-router-dom";



import axios from "axios";

import { async } from "q";



////---------------

import HeaderOrg from './organization/HeaderOrg.js';

import Footer from './organization/Footer.js';



import LoginVsSignIn from './LoginVsSignIn.js';









class newOrg extends React.Component{



	constructor(props){

		super(props)

	this.state ={ 

				pswd: "", 

				validPswd: false,

				loggedIn: false, //this.props.data.loggedIn,

				userName: "", //this.props.data.userName

				check_login_status: false,



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

				flag_done: false



			}			  

		this.handleChange = this.handleChange.bind(this)

		this.handlerClick = this.handlerClick.bind(this);

		this.increment = this.increment.bind(this)

		this.decrement = this.decrement.bind(this)

		this.function_log_status();



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

		if(!this.state.check_login_status)

			return(<h1>loading...</h1>)

		return(

			<div>			

				<HeaderOrg record={this.handlerClick} data={{userName:this.state.userName, loggedIn:this.state.loggedIn}}/>

				

				{/*if user isn't signed in, will ask him to sign in*/}

				{!this.state.loggedIn && <h2>Please sign up or login! :) </h2>}



				{/*will only show the form to sign up a new org if the user is logged in*/}

				{this.state.loggedIn && <div  className = "doners">

				{/*(org_name,admin_name,description,field_of_acctivity,org_pic,min_donation,org_num,branch,account_num,bank_num,founding_year,working,volunteers,friends,city_id,building,street,p_code) */}



				{/* //  orgName , admin_name, photo, description     */}

				{this.state.flag_done && <h1>THANK YOU!!!!!</h1>}

				{!this.state.flag_done && 	

				<form className="fillFormDoners" onSubmit={this.handleSubmit.bind(this)}>



					<h3> Thank you for using us for your organization!</h3>

					<h3>~~~ please ener a details of your organization:  ~~~</h3>



					{/* info about organization */}

					<h4></h4>

					<lable className= "newOrgLable"> name of your organization: </lable>

					<input type="text" name="orgName" onChange={this.handleChange.bind(this)}/>

					<br/><br/>

					<lable className= "newOrgLable"> name of Admin: </lable>

					<input type="text" name="admin_name" onChange={this.handleChange.bind(this)}/>

					<br/><br/>

					<lable className= "newOrgLable"> add photo:  </lable>

					<input type="file" name="photo" accept=".jpg" onChange={this.handleChange.bind(this)}/>

					<br/><br/>

					{/* // TODO : STYLE height */}

					{/* set minimum donation per month */}

					<div>

						<label className= "newOrgLable"> set minimum donation per month:  </label>

						<label > $ </label>

						<lable name="minDonation">{this.state.minDonation}  </lable>

						<button onClick={this.decrement.bind(this)}>-</button>

						<button onClick={this.increment.bind(this)}>+</button>

					</div>

					{/* city,building,street,p_code */}

					<h4>-----------------------------</h4>

					<h4> address:     </h4>

					<lable className= "newOrgLable"> city: </lable>

					<input type="text" name="city" onChange={this.handleChange.bind(this)}/>

					<br/>

					<lable className= "newOrgLable"> building: </lable>

					<input type="text" name="building" onChange={this.handleChange.bind(this)}/>

					<br/>

					<lable className= "newOrgLable"> street: </lable>

					<input type="text" name="street" onChange={this.handleChange.bind(this)}/>

					<br/>

					<lable className= "newOrgLable"> postal code: </lable>

					<input type="text" name="p_code" onChange={this.handleChange.bind(this)}/>

					<br/>



					{/*,city_id,building,street,p_code */}

					<h4>-----------------------------</h4>

					<h4>Enter the bank account details of your organization: </h4>

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

					{/* more details */}

					<h4>-----------------------------</h4>

					<h4> more details: </h4>

					<lable className= "newOrgLable" style={{with: 400, height: 40}}> add description: (liimited to 3000 character)  </lable><br/>

					<input type="text" name="description" onChange={this.handleChange.bind(this)}/>

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

					<input className="btnConfirm"  type="submit" value="Submit"></input> 

				</form>}

				</div>}

				<Footer />

			</div>

		)

	}	

}

export default newOrg;