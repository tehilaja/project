import React from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

//TODO: map over all organizations in DB
//make row positive on toggle
const getTableRows = () => (
    <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>Hatzala</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>180</Table.Cell>
        <Table.Cell>1800$</Table.Cell>
      </Table.Row>
);

const OrgMonthlyDonations = () => (
  <Table color="purple" compact celled definition selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
        <Icon color='green' name='checkmark' size='small' />
        Paid
        </Table.HeaderCell>
        <Table.HeaderCell>Organization Name</Table.HeaderCell>
        <Table.HeaderCell>Org Admin Name</Table.HeaderCell>
        <Table.HeaderCell>Monthly Doners</Table.HeaderCell>
        <Table.HeaderCell>Monthly Sum</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {getTableRows()}
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
)

const OrgOneTimeDonations = () => (
    <Table color="purple" compact celled definition selectable>
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
        {getTableRows()}
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
  )

export default OrgMonthlyDonations;