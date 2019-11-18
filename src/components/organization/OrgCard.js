/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";


class OrgCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            routeOrgPage: false
        }

        this.handleClick = this.handleClick.bind(this) 
    }

    handleClick(id)
    {
        alert("hi: " +`${id}`)
    }
//-------------render----------------
    render(){
        if (this.state.routeOrgPage === true){
			return <Redirect to = {{
				pathname: '/OrgPage',
				state: {id: this.props.id, img: this.props.imgUrl, name: this.props.name }
			}} />
        } 
    //-----------return---------------------- 
	    return( 
        <div className="org-card">
    
            <img src={this.props.imgUrl} 
                  onClick = {() => this.setState(prevState => {
				  return {routeOrgPage: !prevState.routeOrgPage}})}>
            </img>
            <h3>{this.props.name}</h3>
            <button className = "btnOrgCard " onClick = {() => this.handleClick(this.props.id)} >donate </button>
        </div>
        )
    }
}

export default OrgCard