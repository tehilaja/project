import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import ApproveOrgs from './ApproveOrgs.js'
import PayOrgs from './PayOrgs.js'
import OrgTables, * as approveOrgsUtils from './ApproveOrgs';

class Status {
  static None = 0;
  static ApproveOrgs = 1;
  static MonthlyPayments = 2;
  static OneTimePayments = 3;
}

class AdminPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: Status.ApproveOrgs,
      showAproveOrgs: false,
      showPayOrgsMonthly: false,
      showPayOrgsOneTime: false,
    }
  }





  render() {
    return (
      <div>
        <Button
          icon
          labelPosition='left'
          primary
          size='small'
        >
          <Icon name='user' /> Approve Organizations
          </Button>
        <Button
          icon
          labelPosition='left'
          primary
          size='small'
        >
          <Icon name='user' /> Monthly Payments
          </Button>
        <Button
          icon
          labelPosition='left'
          primary
          size='small'
        >
          <Icon name='user' /> One Time Payments
          </Button>
        <br/>
        <br/>
        <br/>
        <br/>
        {this.state.showAproveOrgs && <ApproveOrgs />}
        {this.state.showPayOrgsMonthly && <PayOrgs />}
        {this.getComponentByStatus()}
      </div>)
  }

  getComponentByStatus() {
    switch (this.state.status) {
      case Status.ApproveOrgs:
        return <ApproveOrgs />;
      case Status.None:
      default:
        return null;
    }
  }
}

export default AdminPage;