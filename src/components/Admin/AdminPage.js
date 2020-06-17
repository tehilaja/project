import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import ApproveOrgs from './ApproveOrgs.js'
import PayOrgs from './PayOrgs.js'

class AdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAproveOrgs: false,
            showPayOrgsMonthly: false,
            showPayOrgsOneTime: false
        }
    }
    render(){
        return(
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
          {this.state.showAproveOrgs && <ApproveOrgs />}
          {this.state.showPayOrgsMonthly && <PayOrgs />}
        </div>)
    }
 }

 export default AdminPage;