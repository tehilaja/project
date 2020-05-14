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
          pathname: `/OrgPage/`+`${this.props.id}`
          // -- $$$$$$$ ---
            // state: {id: this.props.id}

        }} />
        } 
    //-----------return---------------------- 
	    return( 
            <Card style ={{margin: '1em'}} 
              onClick = {() => this.setState(prevState => {
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