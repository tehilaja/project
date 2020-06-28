/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Feed, Icon, Image, Segment } from 'semantic-ui-react'


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

    }


//-------------render----------------
    render(){
      if (this.state.routeOrgPage === true){
        return <Redirect to = {{
          pathname: `/OrgPage/`+`${this.props.id}`
          // -- $$$$$$$ ---
            // state: {id: this.props.id}

        }} />
        } 
    //-----------return---------------------- 
      return( 
        <Card style ={{margin: '1em', border: '2px solid #DC143C'}} 
          onClick = {() => this.setState(prevState => {
            return {
                routeOrgPage: !prevState.routeOrgPage}
              })}>

          <Card.Content>
            <Image src={this.props.imgUrl} wrapped ui={true} />

          </Card.Content>
          <Card.Content extra>
          <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Monthy Donation: {this.props.initialDonation} $</span>
            </Card.Meta>
            <Card.Description>
              organization desciption
            </Card.Description>
            <a>
              <Icon name='gift' />
              last prize winner
            </a>
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