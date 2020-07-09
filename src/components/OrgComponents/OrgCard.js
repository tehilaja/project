/*card for a specific org on homepage and search organizations*/
import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";

import {Redirect} from "react-router-dom";
import { Card, Feed, Icon, Image, Segment,Statistic } from 'semantic-ui-react'


class OrgCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            org: this.props.org,
            routeOrgPage: false,
            numDonors: 0
        }
        this.getNumDonors();

    }

    async getNumDonors(){
      await (async () => {
        const response = await axios.get(`/get-num-donors/${this.state.org.org_id}`);
        this.setState({numDonors: response.data.num_donors})
      })();
    }

    render(){
      if (this.state.routeOrgPage === true){
        window.location.assign(`/OrgPage/${this.state.org.org_id}`);
        } 

      return( 
        <div style ={{ padding: '0.8em', margin:'0.8em'}}>
        <Card style ={{border: '2px solid #708090', height:'300px'}} 
          onClick = {() => this.setState(prevState => {
            return {
                routeOrgPage: !prevState.routeOrgPage}
              })}>


          <Card.Content>
            <Image 
            floated='right'
            size='tiny'
            src={this.state.org.img_url}
            />
            <Card.Header>
              
	            <Statistic size='tiny' floated='left'>
                  <Statistic.Value>
                    <Icon  name='handshake outline' />{this.state.numDonors}
                    </Statistic.Value>
                    <Statistic.Label>Supporters</Statistic.Label>
                </Statistic>
               
                </Card.Header>
                <br/>
                <Icon  inverted loading circular name ='hand point up outline' size = 'large' color ='blue'></Icon>

        </Card.Content>
          <Card.Content extra>

          <Card.Header >{this.state.org.org_name}</Card.Header>
            <Card.Description>
            {this.state.org.description.substring(0, 70)}...
            </Card.Description>
        
          </Card.Content>
        </Card>
        </div>
        )
    }
}

export default OrgCard;