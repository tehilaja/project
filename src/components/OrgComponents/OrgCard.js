/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Feed, Icon, Image, Segment } from 'semantic-ui-react'


class OrgCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            org: this.props.org,
            routeOrgPage: false,
        }

    }


//-------------render----------------
    render(){
      if (this.state.routeOrgPage === true){
        window.location.assign(`/OrgPage/${this.state.org.org_id}`);
        // return <Redirect to = {{
        //   pathname: `/OrgPage/${this.props.id}`

        // }} />
        } 
    //-----------return---------------------- 
      return( 
        <Card style ={{margin: '1em', border: '2px solid #DC143C', height:'300px', width: '400px'}} 
          onClick = {() => this.setState(prevState => {
            return {
                routeOrgPage: !prevState.routeOrgPage}
              })}>

          <Card.Content>
            <Image src={this.state.org.img_url} wrapped ui={true} />

          </Card.Content>
          <Card.Content extra>
          <Card.Header>{this.state.org.org_name}</Card.Header>
            <Card.Meta>
              <span className='date'>Monthy Donation: {this.state.org.initialDonation} $</span>
            </Card.Meta>
            <Card.Description>
            {this.state.org.description.substring(0, 70)}...
            </Card.Description>
            {/* <a>
              <Icon name='gift' />
              last prize winner
            </a> */}
            <br />
            <Feed.Like>
            <Icon name='like' /> 5 Monthly Donors
          </Feed.Like>
          </Card.Content>
        </Card>

        )
    }
}

export default OrgCard;