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

    //TODO: see why this isn't working
    async getNumDonors(){
      // alert("get Donors")
      await (async () => {
        const response = await axios.get(`/get-num-donors/${this.state.org.org_id}`);
        this.setState({numDonors: response.data.num_doners})
      })();
    }

    render(){
      if (this.state.routeOrgPage === true){
        window.location.assign(`/OrgPage/${this.state.org.org_id}`);
        } 

      return( 
        // {{border: '2px solid #9400D3', height:'300px'}}
        <Card style ={{border: '2px solid #DC143C', height:'300px'}} 
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
                    <Icon name='handshake outline' />{this.state.numDonors}
                    </Statistic.Value>
                    <Statistic.Label>Supporters</Statistic.Label>
                </Statistic>
                {/* <Icon name = 'user'/>
                {this.state.name} */}
                </Card.Header>
        </Card.Content>

{/* 
          <Card.Content>
            <Image src={this.state.org.img_url} wrapped ui={true} />

          </Card.Content> */}
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
            {/* <Feed.Like>
            <Icon name='like' /> {this.state.numDonors} Monthly Donors
          </Feed.Like> */}
          </Card.Content>
        </Card>

        )
    }
}

export default OrgCard;