import React from 'react';

import {Redirect} from "react-router-dom";

class Donors extends React.Component{
    
	/*const styles = {
        fontStyle: "italic",
        color: "rgb(30, 100, 121)"
    }*/
	
	constructor(){
		super()
		this.state = {firstName: "", email: ""}
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}
	
	handleSubmit(e){
		e.preventDefault()
		/*error: the page doesn't know how to rerender orgPage
		
		constructClassInstance

		updateClassComponent

		beginWork$1

		callCallback
		
		maybe to do with lifeCycle of OrgPage?????

		*/
		/*return <Redirect to = {{
				pathname: '/OrgPage',
				state: {id: this.props.id, img: this.props.imgUrl, name: this.props.name }
			}} />*/
			
		/*update info of who referred me*/
	}

	render(){
		const styles = 
        {
            fontStyle: "italic",
            color: "rgb(30, 100, 121)"
        }
    return(
        <div className = "donors">
            <h4 style ={styles} >Referred to this organization by: </h4>
            <form className="fillFormDonors" onSubmit={this.handleSubmit.bind(this)}> 
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
        </div>
    )}
}

export default Donors;