/*card for a Organizations in User page*/
import React from 'react';
import ReactDOM from 'react-dom';

import { Redirect } from "react-router-dom";
import { Card, Icon, Image, Label } from 'semantic-ui-react'

class OrgCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeOrgPage: false,
      myStatus: this.props.myStatus,
      imgUrl: this.props.imgUrl,
      orgId: this.props.orgId,
      orgName: this.props.orgName,
      myMonthlyDonation: this.props.myMonthlyDonation,
      reffered: this.props.reffered,
      collected: this.props.collected,
    }
    this.user = {
      name: ""
    }
    this.handleClick = this.handleClick.bind(this)
    // alert("in card: "+ JSON.stringify(this.state)) 
  }

  handleClick() {
    const event = new Event(`userOrg${this.state.orgId}CardClicked`);
    document.dispatchEvent(event);
  }

  //-------------render----------------
  render() {
    if (this.state.routeOrgPage === true) {
      return <Redirect to={{
        pathname: '/OrgPage',
        // -- $$$$$$$ ---
        state: {
          id: this.props.id, img: this.props.imgUrl, name: this.props.name, initialDonation: this.props.initialDonation,
          admin_name: this.props.admin_name, field_of_activity: this.props.field_of_activity, org_num: this.props.org_num,
          description: this.props.description, working: this.props.working, volunteers: this.props.volunteers,
          friends: this.props.friends, founding_year: this.props.founding_year
        }


      }} />
    }

    //-----------return---------------------- 
    return (
      <Card onClick={this.handleClick} style ={{margin: '5em', border: '2px solid #F5F5F5', height: '500px', width:'500px'}}>
        <Image src={this.state.imgUrl} wrapped ui={true} />
        <Card.Content>
          <Card.Header>{this.state.orgName}</Card.Header>
          <Card.Meta>
            <span className='date'>My Monthly Donation: {this.state.myMonthlyDonation} $</span>
          </Card.Meta>
          <Card.Description>
          {this.state.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra floating='right'>
          <Label as='a' color='olive'  tag floating>
          <Icon name='user' />
                Status: {this.state.myStatus} <br />
          </Label>
          <Label as='a' color='olive'>
            <Icon name='users' />
                People I Referred: {this.state.reffered} <br />
          </Label>
          <Label as='a' color='grey'>
            <Icon name='dollar' />
                {`Total: $${this.state.collected}`}
          </Label>
          <br />
          Click to view Downline
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