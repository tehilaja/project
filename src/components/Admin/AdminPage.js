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
            <Icon name='user' /> View Admins
          </Button>
          <Button
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='user' /> View Admins
          </Button>
          <Button
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='user' /> View Admins
          </Button>
          {this.state.showAproveOrgs && <ApproveOrgs />}
          {this.state.showPayOrgsMonthly && <PayOrgs />}
        </div>)
    }
 }

 export default AdminPage;