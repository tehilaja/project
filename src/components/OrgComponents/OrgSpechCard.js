
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";

class OrgSpechCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }

        // this.handleClick = this.handleClick.bind(this) 
    }

    // handleClick(id)
    // {
    //     alert("hi: " +`${id}`)
    // }

    render(){
    
	    return( 
        <div className="org-spech-card">
                <h3>id = {this.props.id}</h3>
                <h1> {this.props.name} </h1>
                <img src={this.props.imgUrl}></img>
                
            
        </div>
        )
    }
}

export default OrgSpechCard