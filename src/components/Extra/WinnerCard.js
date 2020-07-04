/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Feed,Header, Icon, Image, Segment } from 'semantic-ui-react'


class WinnerCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            congratulate: false
        }

    }


//-------------render----------------
    render(){
      if (this.state.congratulate === true){
        return null
        } 
    //-----------return---------------------- 
      return( 
        <Card style ={{margin: '1em', height:'300px', border: '2px solid #F5F5F5'}} 
          onClick = {() => this.setState(prevState => {
            return {
                congratulate: !prevState.congratulate}
              })}>

          <Card.Content>
            <Image src={this.props.gift_pic} wrapped ui={true} />
          </Card.Content>
          <Card.Content extra>
          <Card.Header>{this.props.gift_name}</Card.Header>
          <Card.Header>{`Gift from ${this.props.org_id}`}</Card.Header>
            <Card.Meta>
              {`Level of donors enered in raffle: ${this.props.level_num} `}
            </Card.Meta>
            <Card.Description>
            {this.props.gift_description}
            </Card.Description>
            <a>
              <Icon name='user' />
              {` ${this.props.winner}`}
            </a>
            <br />
            <Feed.Like>
            <Icon name='like' /> {this.props.likes} Likes
          </Feed.Like>
          </Card.Content>
        </Card>

        )
    }
}

export default WinnerCard;