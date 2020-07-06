import React from 'react'
import { Button, Checkbox, Icon, Table, Input, TableRow } from 'semantic-ui-react'

import axios from "axios";
import { render } from 'react-dom';

class PayOrgs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orgs: [],
      orgs_donations: {},
      orgTableRows: null,
      orgToDisplay: null,
    };

    this.getOrgsToPay();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getOrgsToPay() {
    (async () => {
      const response = await axios.get('/get-orgs-to-pay');
      this.setState({ orgs: response.data || [] });
    })();
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    this.state.orgs[name].amount_paid = value;
    this.state.orgs[name].still_owed = this.state.orgs[name].sum - value;
  }

  getOrgDonationsTableRows(org_id) {
    if (this.state.orgs_donations[org_id]) {
      this.setState({orgTableRows: this.mapDataToOrgDonationsTableRows(this.state.orgs_donations[org_id]) || []});
      return;
    }

    (async () => {
      const response = await axios.post('/get-org-donations-to-display', { org_id: org_id });

      if (response.data && Array.isArray(response.data)) {
        this.state.orgs_donations[org_id] = response.data;
        this.setState({orgTableRows: this.mapDataToOrgDonationsTableRows(this.state.orgs_donations[org_id]) || []});
      } else {
        return null;
      }
    })();
  }

  mapDataToOrgDonationsTableRows(data) {
    return data.map(row =>
      (<Table.Row>
        <Table.Cell>{row.user_id}</Table.Cell>
        <Table.Cell>{row.referred_by}</Table.Cell>
        <Table.Cell>{row.monthly_oneTime}</Table.Cell>
        <Table.Cell>{row.d_date}</Table.Cell>
        <Table.Cell>{row.sum_donation}</Table.Cell>
        <Table.Cell>{row.d_title}</Table.Cell>
        <Table.Cell>{row.d_description}</Table.Cell>
      </Table.Row>));
  }

  displayOrgDonations() {
    return (
      <div>
        <div>{}</div>
        <Table color="purple" compact celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User Id</Table.HeaderCell>
              <Table.HeaderCell>Referred By</Table.HeaderCell>
              <Table.HeaderCell>Monthly/One Time</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Sum</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.orgTableRows}
          </Table.Body>

          <Table.Footer fullWidth>
          </Table.Footer>
        </Table>
      </div>
    )
  }

  onTableRowClick(org_id) {
    this.setState({orgToDisplay: org_id});
    this.getOrgDonationsTableRows(org_id);
  }

  getTableRows() {
    return Object.keys(this.state.orgs)
      .map(org_id => this.state.orgs[org_id])
      .map(org =>
        (<Table.Row key={org.org_id} onClick={() => this.onTableRowClick(org.org_id)}>
          <Table.Cell collapsing>
            <Checkbox slider onChange={() => org.pay = !org.pay} />
          </Table.Cell>
          <Table.Cell>{org.org_name}</Table.Cell>
          <Table.Cell>
            <img src={org.img_url} style={{ width: '100px' }} />
          </Table.Cell>
          <Table.Cell>{org.admin_name}</Table.Cell>
          <Table.Cell>{org.org_admin_id}</Table.Cell>
          <Table.Cell>{org.bank_num}</Table.Cell>
          <Table.Cell>{org.branch}</Table.Cell>
          <Table.Cell>{org.account_num}</Table.Cell>
          <Table.Cell>{org.account_owner}</Table.Cell>
          <Table.Cell>{org.sum}</Table.Cell>
          <Table.Cell>
            <input type="number" min="1" max={String(org.sum)} name={org.org_id} onChange={this.handleInputChange} />
          </Table.Cell>
        </Table.Row>));
  }

  orgsToPayTable() {
    return <Table color="purple" compact celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon color='green' name='checkmark' size='small' />
          Paid
          </Table.HeaderCell>
          <Table.HeaderCell>Organization</Table.HeaderCell>
          <Table.HeaderCell>Logo</Table.HeaderCell>
          <Table.HeaderCell>Admin Name</Table.HeaderCell>
          <Table.HeaderCell>Admin Email</Table.HeaderCell>
          <Table.HeaderCell>Bank #</Table.HeaderCell>
          <Table.HeaderCell>Branch #</Table.HeaderCell>
          <Table.HeaderCell>Account #</Table.HeaderCell>
          <Table.HeaderCell>Account Owner</Table.HeaderCell>
          <Table.HeaderCell>Amount To Pay</Table.HeaderCell>
          <Table.HeaderCell>Amount Paying</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.getTableRows()}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Button size='small' onClick={() => this.payOrgs()}>Pay</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  }

  payOrgs() {
    (async () => {
      const orgs = Object.keys(this.state.orgs)
        .filter(org_id => this.state.orgs[org_id].pay)
        .map(org_id => this.state.orgs[org_id]);
      const response = await axios.post('/pay-orgs', { orgs: orgs });
      if (response.data === 'success') {
        this.getTableRows();
      } else {
        alert('Unknow problem documenting payments. Please try again later');
      }
    })();
  }

  OrgOneTimeDonations() {
    return <Table color="purple" compact celled definition selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon color='green' name='checkmark' size='small' />
            Paid
            </Table.HeaderCell>
          <Table.HeaderCell>Organization Name</Table.HeaderCell>
          <Table.HeaderCell>Org Admin Name</Table.HeaderCell>
          <Table.HeaderCell>One Time Donations Sum</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.getTableRows()}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='7'>
            <Button
              floated='right'
              icon
              labelPosition='left'
              primary
              size='small'
            >
              <Icon name='user' /> View Admins
              </Button>
            <Button size='small'>Approve</Button>
            <Button disabled size='small'>
              Approve All
              </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  }

  render() {
    const donationsFor = (<div>
      <br />
      <div>Donations To {this.state.orgToDisplay && this.state.orgs[this.state.orgToDisplay].org_name}:</div>
      {this.displayOrgDonations()}
    </div>);

    return (
      <div>
        {this.orgsToPayTable()}
        {this.state.orgTableRows && donationsFor}
      </div>)
  }
}

export default PayOrgs;