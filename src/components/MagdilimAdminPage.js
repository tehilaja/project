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

const OrgTables = () => (
  <Table color="purple" compact celled definition selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
        <Icon color='green' name='checkmark' size='large' />
        Paid
        </Table.HeaderCell>
        <Table.HeaderCell>Organization</Table.HeaderCell>
        <Table.HeaderCell>Registration Date</Table.HeaderCell>
        <Table.HeaderCell>E-mail address</Table.HeaderCell>
        <Table.HeaderCell>Number Of Doners</Table.HeaderCell>
        <Table.HeaderCell>Monthly Sum</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {getTableRows()}
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='5'>
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

export default OrgTables;