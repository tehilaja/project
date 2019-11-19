import React from 'react';

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
            firstName: "",
            email: "",
            showLogin: false,
            showUser: false,
            organization: orgData,
            btnDonateClicked: false,
            confirmBtn: false,
            initialDonation : this.props.data.initialDonation,
            color: "F33333"

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this) 
        this.clickToDonate = this.clickToDonate.bind(this) 

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
    
    //---------onSumbit---------------
    // onSumbit()
    // {

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
        const {name, value} = event.target
        this.setState({[name]: value}) 
    }
	
	
//----------render------------------
    render() 
    {
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

                {this.state.btnDonateClicked && 
                <Doners 
                        handleChange={this.handleChange}
						clickToDonate = {this.clickToDonate}
						data = {this.state}/> 
                    
                }
                {/* <p>{this.props.data.img}</p> */}
                <h2>Entered information:</h2>
                <h3>{nameDonateThrough}</h3>
                <p>Your name: {this.state.firstName} {this.state.email}</p>  
                
            </div>
        )
    }
    
    
}

export default OrgBody