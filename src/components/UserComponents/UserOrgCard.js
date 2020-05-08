/*card for a Organizations in User page*/
// TODO: change the state to have the information of specific user for organization
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Icon, Image, Label } from 'semantic-ui-react'

class OrgCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            routeOrgPage: false,
            myStatus: this.props.myStatus,
            imgUrl: this.props.imgUrl,
            orgName: this.props.orgName,
            myMonthlyDonation: this.props.myMonthlyDonation,
        }
        this.user = {
            name: ""
        }
        this.handleClick = this.handleClick.bind(this)
        alert("in card: "+ JSON.stringify(this.state)) 
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
		    // -- $$$$$$$ ---
        state: {id: this.props.id, img: this.props.imgUrl, name: this.props.name, initialDonation:this.props.initialDonation,
          admin_name:this.props.admin_name, field_of_acctivity:this.props.field_of_acctivity, org_num:this.props.org_num,
          description :this.props.description ,working:this.props.working ,volunteers:this.props.volunteers ,
          friends:this.props.friends,founding_year:this.props.founding_year}
           

}} />
        } 
    //-----------return---------------------- 
	    return( 
            <Card onClick = {() => this.setState(prevState => {
                return {
                    routeOrgPage: !prevState.routeOrgPage}
                  })}>
            <Image src={this.state.imgUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.state.orgName}</Card.Header>
              <Card.Meta>
                <span className='date'>My Monthy Donation: {this.state.myMonthlyDonation} $</span>
              </Card.Meta>
              <Card.Description>
                organization desciption
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Label floating color='red' tag>
                <Icon name='user' />
                My Status: {this.state.myStatus}
              </Label>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='gift' />
                last prize winner
              </a>
            </Card.Content>
          </Card>
        )
    }
}

export default OrgCard;