import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import ApproveOrgs from './ApproveOrgs.js'
import PayOrgs from './PayOrgs.js'
import OrgTables, * as approveOrgsUtils from './ApproveOrgs';

import Header from '../Header.js'

class Status {
  static None = 0;
  static ApproveOrgs = 1;
  static PayOrgs = 2;
}

class AdminPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: this.props.data.loggedIn,
      userName: this.props.data.userName,
      status: Status.None,
      showAproveOrgs: false,
      showPayOrgsMonthly: false,
      showPayOrgsOneTime: false,
    }
  }


  render() {
    return (
      <div textAlign='center'>
        <Header data={{ loggedIn: this.state.loggedIn, program_admin: true, userName: this.state.userName }} />
        <br />
        <br />
        <br />
        <div >
          <Button
            icon
            labelPosition='left'
            primary
            size='small'
            onClick={() => this.setState({ status: Status.ApproveOrgs })}
          >
            <Icon name='user' /> Approve Organizations
          </Button>
          <Button
            icon
            labelPosition='left'
            primary
            size='small'
            onClick={() => this.setState({ status: Status.PayOrgs })}
          >
            <Icon name='user' /> Pay Organizations
          </Button>
        </div>
        <br />
        <br />
        <br />
        {this.getComponentByStatus()}
      </div>)
  }

  getComponentByStatus() {
    switch (this.state.status) {
      case Status.ApproveOrgs:
        return <ApproveOrgs />;
      case Status.PayOrgs:
        return <PayOrgs />
      case Status.None:
      default:
        return null;
    }
  }
}

export default AdminPage;