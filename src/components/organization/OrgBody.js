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
            confirmBtn: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this) 
        this.clickToDonate = this.clickToDonate.bind(this) 
    }


    handleClick(id)
    {
        this.setState(prevState => {
            return {
                clicked: !prevState.clicked
            } 
        })
    }

    clickToDonate()
    {
        // alert("clickToDonate")
        this.setState(prevState => {
            return {
                confirmBtn: !prevState.confirmBtn
            } 
        })
    }
    
        //  alert("id: "+id )
        // this.setState(prevState => {
        //     const updatedOrg = prevState.organization.map(org => {
        //         if (org.id === id) {
        //             alert("clicked" + id)
        //             // todo.complated = !todo.complated
        //             // return {
        //             //     ...org,
        //             //     clicked: !org.clicked  
        //             // }
        //         }
        //         // return org
        //     })
        //     // return {
        //     //     organization: updatedOrg
        //     // }
        // })
    
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value}) 
    }
//----------render------------------
    render() 
    {
        const nameDonateThrow = this.state.firstName
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
                    <h3>id = {this.props.data.id}</h3>
                    <h1> {this.props.data.name} </h1>
                    <img src={this.props.data.img}></img>
                </div>

                <br/>


                <button className ="btnOrg" onClick ={() => this.setState(prevState => {
                    return {
                        btnDonateClicked: !prevState.btnDonateClicked
                    }})}
                >donate </button>

                {this.state.btnDonateClicked && 
                <Doners handleChange={this.handleChange}
						clickToDonate = {this.clickToDonate}
						data = {this.state}/> 
                    
                }
                {/* <p>{this.props.data.img}</p> */}
                <h2>Entered information:</h2>
                <h3>{nameDonateThrow}</h3>
                <p>Your name: {this.state.firstName} {this.state.email}</p>  
                
            </div>
        )
    }
    
    
}




export default OrgBody