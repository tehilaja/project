/*card for a specific org on homepage*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect} from "react-router-dom";
import { Card, Feed,Header, Icon, Image, Segment, Label } from 'semantic-ui-react'


class WinnerCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={ }

    }


//-------------render----------------
    render(){
    //-----------return---------------------- 
      return( 
        <Card style ={{margin: '1em', height:'400px', border: '2px solid #F5F5F5'}} >
          <Card.Content>
            <Label color='olive' attached='top'>{`Congrats to ${this.props.winner}!`}</Label>
            <Image src={this.props.gift_pic} wrapped ui={true} />
          </Card.Content>
          <Card.Content extra>
          <Card.Header>{this.props.gift_name}</Card.Header>
          <Card.Header>{`Gift from ${this.props.org_id}`}</Card.Header>
            <Card.Meta>
              <Label color='olive'>
              {`Level in Raffle: ${this.props.level_num} `}
              </Label>
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