import React from 'react';
import axios from "axios";

import OrgCard from './OrgCard.js'
import orgData from './orgData.js'
import OrgSpechCard from './OrgSpechCard.js'


import Doners from "./Doners.js"

class OrgBody extends React.Component {
    constructor(props)
    {
        super(props)
        // this.details ={
        //     firstName: "",
        //     lastName: ""
        // }
        this.state = 
        {
            // firstName: "",
            // email: "",
            showLogin: false,
            showUser: false,
            organization: orgData,
            btnDonateClicked: false,
            confirmBtn: false,
            initialDonation : this.props.data.initialDonation,
            color: "F33333",
            userName: "a", // -
            DuserName: "",
            DuserId: "",
            userEmail: "", // -
            user_id: 5 // todo : real info

        }
        // this.user = {
        //     userName : "avital"
        // }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this) 
        this.clickToDonate = this.clickToDonate.bind(this) 

        // this.findDuser = this.findDuser.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    //---------increment +----------
    increment() 
    {
            this.setState(prevState => {
                return {
                    initialDonation: prevState.initialDonation + 1
                }
            })
    }
    //---------decrement--------------
    decrement()
     {
        if (this.state.initialDonation != this.props.data.initialDonation)
        {
            this.setState(prevState => {
                return {
                    initialDonation: prevState.initialDonation - 1
                }
            })
        }
    }

    //---------componentDidUpdate-------
    componentDidUpdate(prevProps, prevState) {
        // const newColor = ''
        if(prevState.initialDonation !== this.state.initialDonation) 
        {
            if(this.state.initialDonation ===this.props.data.initialDonation)
                this.setState({color: '#F33333'})
            else
                this.setState({color: 'black'})
        }
    }

    //----------handleClick-------------
    handleClick(id)
    {
        alert("id: "+id )
        this.setState(prevState => {
            return {
                clicked: !prevState.clicked
            } 
        })
    }
    

    // ---- add Donation
	handleSubmit=(e)=>{
        e.preventDefault();
        alert("s", this.state.DuserName)
         /*add donation to dataBase */
        if (this.state.DuserName != "") // TODO: if find in db (func findDuser)
        {
            (async () => {
		 		const response = await axios.post(
					 '/donation',
         			{ 
                        // todo- level(update +1), 
						user_id:this.state.user_id, org_id:this.props.data.id, monthly_donation:this.state.initialDonation,  // ---- req
                        level:1, referred_by:this.state.DuserName
                    },
                     {header:{'Content-Type': 'application/json'}}
                     )
                    console.log("resp",response)
                    if(response.data == "no conection"){
                        alert("you need to login...")
                    }
                    else if(response.data =="added succesfully!"){
                    // this.setState({loggedIn: false})
                        alert("the donation " + this.state.initialDonation+ "$ added succesfully ")
                     }
                    else if(response.data =="fail"){
                        alert("the referred by is incorrect")
                    }
               })();  
        }
        else
            alert("please enter Referred detiles")
        // this.set
		
	}
    //---------onSumbit---------------
    // onSumbit()
    // {

    // } 


    //-------- findDuser ---------
    // findDuser(){
    //     if(this.state.DuserName!="")
    //     {
    //         (async () => {
    //             const response = await axios.post(
    //                 '/findDuser',
    //                 {userD:this.state.DuserName},
    //                 {header:{'Content-Type': 'application/json'}}
    //                 )
    //                 console.log("resp",response)
    //                 if(response.data == "fail"){
    //                     alert("the user not found")
    //                 }
    //                 else if(response.data != " "){
    //                 // this.setState({loggedIn: false})
    //                 this.setState({DuserId: response.data})
    //                 alert("id " + this.state.DuserId)
    //                 }
    //             })(); 
    //     }
    //     else
    //         alert("you must to enter a name that you Referred to this organization by")
    // }

     //----------clickToDonate--------------------
     clickToDonate()
     {
         // alert("clickToDonate")
         this.setState(prevState => {
             return {
                 confirmBtn: !prevState.confirmBtn
             } 
         })
     }
    
     handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
        })
        // this.findDuser() // find the throw donate
        // alert(this.state.DuserId)
	}
	
	
//----------render------------------
    render() 
    {
        const styles = 
        {
            fontStyle: "italic",
            color: "rgb(30, 100, 121)"
        }
        const nameDonateThrough = this.state.firstName
    //---------return------------------------------
        return(
            <div className = "orgBody">
                {/* need to change from orgBody */}
                {/* < OrgSpechCard 
                    // id = {this.props.id}
                    id= {this.props.data.id}
                    imgUrl= {this.props.data.img}
                    name= {this.props.data.name}
                /> */}
                {/* the data about specific organization */}
				
                <div className="org-spech-card">
                    {/* <h3>id = {this.props.data.id}</h3> */}
                    <h1> {this.props.data.name} </h1>
                    <img src={this.props.data.img}></img>
                </div>
                <br/>

                {/* Donation amount */}
                <div className = "initialDonation">
                    <label > Donation amount (per month):</label>
                    <lable className= "initialDonationValue" style={{color: this.state.color}}>{this.state.initialDonation} </lable>
                    <lable>$  </lable>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.increment} >+</button>
                </div>

                <button className ="btnDonateOrg" onClick ={() => this.setState(prevState => {
                    return {
                        btnDonateClicked: !prevState.btnDonateClicked
                    }})}
                >donate </button>

                {/* Donation throw information... */}
                {this.state.btnDonateClicked && 
                    <div className = "doners">
                        <h4 style ={styles} >Referred to this organization by: </h4>
                        <form className="fillFormDoners" onSubmit={this.handleSubmit}>
                            <lable>name: </lable>
                            <input 
                                type="text" name="DuserName" onChange={this.handleChange.bind(this)} 
                                placeholder="user Name" 
                            /><br /><br/>
                            <lable>email: </lable>
                            <input 
                                input type="email"
                                name="userEmail" 
                                onChange={this.handleChange.bind(this)}
                                placeholder="email" 
                            /> <br/><br/>
                            
                            <input className="btnConfirm"  type="submit" value="Submit"></input>             
                            <br/><br/>
                        </form>
                    </div>
                }


            {/* <div className = "doners">
                <h4 style ={styles} >Referred to this organization by: </h4>
                <form className="fillFormDoners" onSubmit={this.handleSubmit.bind(this)}> 
                    <lable>name: </lable>
                    <input 
                    name="firstName" 
                    onChange={this.handleChange} 
                    placeholder="First Name" 
                    />
                    <br /><br/>
                    <lable>email : </lable>
                    <input 
                        name="email" 
                        onChange={this.handleChange} 
                        placeholder="Last Name" 
                    />
                    <br/>
                    <input className="btnConfirm" type="submit" value="Submit" />                
                    <br/><br/>
                </form>
            </div> */}




                {/* {this.state.btnDonateClicked && 
                <Doners 
                        handleChange={this.handleChange}
						clickToDonate = {this.clickToDonate}
						data = {this.state}/> 
                } */}

                {/* <p>{this.props.data.img}</p> */}
                <h2>Entered information:</h2>
                <h3>{nameDonateThrough}</h3>
                <p>Your name: {this.state.DuserName} {this.state.userEmail}</p>  
                
            </div>
        )
    }
    
}

export default OrgBody