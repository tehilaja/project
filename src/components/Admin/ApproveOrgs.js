import axios from 'axios';
import React from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import * as emailUtil from '../../utilities/email';



class ApproveOrgs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orgs: [],
    };
    this.getNonApprovedOrgs();
    this.approve = this.approve.bind(this);
  }

  getNonApprovedOrgs = () => {
    (async () => {
      const response = await axios.get('non-approved-orgs');
      this.setState({ orgs: response.data || [] });
    })();
  }

  approve(orgsToApprove) {
    (async () => {
      const response = await axios.post(
        '/approve-orgs',
        { org_ids: orgsToApprove.map(org => org.org_id) },
        { headers: { 'Content-Type': 'application/json' } });

      if (response.data === 'success') {
        this.emailApprovedOrgs(orgsToApprove);
      }
      this.getNonApprovedOrgs();
    })();
  }

  disapprove() {
    const orgsToDisapprove = this.state.orgs.filter(org => org.disapprove);

    (async () => {
      const response = await axios.post(
        '/disapprove-orgs',
        { org_ids: orgsToDisapprove.map(org => org.org_id) },
        { headers: { 'Content-Type': 'application/json' } });

      if (response.data === 'success') {
        this.emailDisapprovedOrgs(orgsToDisapprove);
      }
      this.getNonApprovedOrgs();
    })();
  }

  emailApprovedOrgs(approvedOrgs) {
    approvedOrgs.forEach(org => {
      emailUtil.sendEmail(
        [org.org_admin_id],
        null,
        null,
        `${org.org_name} was approved`,
        `Dear ${org.admin_name}, we are happy to approve your organization - ${org.org_name}.\n\nPlease log into our website. Your user page will then open. On you profile page you will find a button to edit your organization's page and add prizes.\nWe are happy to have ${org.org_name} join Magdilim!\n\nYours, the Magdilim team`);
    });
  }

  emailDisapprovedOrgs(disapprovedOrgs) {
    disapprovedOrgs.forEach(org => {
      emailUtil.sendEmail(
        [org.org_admin_id],
        null,
        null,
        `${org.org_name} was not approved`,
        `Dear ${org.admin_name}, we are sorry to let you know that your organization - ${org.org_name} does not fit our criteria and therefore will not by Magdilim.\n\n\n\nThe Magdilim team`);
    });
  }

  computeTableRows = () => {

    return this.state.orgs.map(org => (
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider onChange={() => org.approve = !org.approve} />
        </Table.Cell>
        <Table.Cell collapsing>
          <Checkbox slider onChange={() => org.disapprove = !org.disapprove} />
        </Table.Cell>
        <Table.Cell>{org.org_name}</Table.Cell>
        <Table.Cell>{org.admin_name}</Table.Cell>
        <Table.Cell>{org.field_of_activity}</Table.Cell>
        <Table.Cell>{org.description}</Table.Cell>
        <Table.Cell>{org.org_admin_id}</Table.Cell>
        <Table.Cell>{org.pc_num}</Table.Cell>
      </Table.Row>
    ));
  }

  OrgTables = () => (
    <Table color="purple" compact celled definition selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon color='green' name='checkmark' size='small' />
          Approve
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon color='olive' name='x' size='small' />
          Disapprove
          </Table.HeaderCell>
          <Table.HeaderCell>Organization Name</Table.HeaderCell>
          <Table.HeaderCell>Org Admin Name</Table.HeaderCell>
          <Table.HeaderCell>Field of Activity</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>PC num</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.computeTableRows()}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='7'>
            {/* <Button
              floated='right'
              icon
              labelPosition='left'
              primary
              size='small'
            >
              <Icon name='user' /> View Admins
            </Button> */}
            <Button size='small' onClick={() => this.approve(this.state.orgs.filter(org => org.approve))}>Approve</Button>
            <Button size='small' onClick={() => this.approve(this.state.orgs)}>
              Approve All
            </Button>
            <Button size='small' onClick={() => this.disapprove()}>
              Disapprove
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )

  render() {
    return (
      <div>
        {this.OrgTables()}
      </div>)
  }
}

export default ApproveOrgs;
