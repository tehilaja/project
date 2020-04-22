/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Icon, Image } from 'semantic-ui-react'

class OrgCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            routeOrgPage: false,
            loginStatus: ""
        }
        this.user = {
            name: ""
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
            <Image src={this.props.imgUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.props.name}</Card.Header>
              <Card.Meta>
                <span className='date'>Monthy Donation: {this.props.initialDonation} $</span>
              </Card.Meta>
              <Card.Description>
                organization desciption
              </Card.Description>
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