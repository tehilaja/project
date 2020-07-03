import React from 'react';
import { v1 as uuid } from 'uuid';
import axios from "axios";
import {Button,Divider,Form,Grid,Header,Icon,Label,Segment,} from 'semantic-ui-react';
import { escapeAllStringsInObject } from '../../utilities/string';

const emailService = require('../../utilities/email');

class NewOrg extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            org: {
                org_admin_id: '',
                admin_name: this.props.data.userName,
            },
            loggedIn: this.props.data.loggedIn,
        };

        this.handleChange = this.handleChange.bind(this)
        this.sendEmail = this.sendEmail.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    //the following function is to send an email that a new oragnization is awaiting approval
    sendEmail() {
        // TODO: get text to send, get list of mail
        emailService.sendEmail(
            //'mordeyj316@gmail.com'
            ['tehilaj97@gmail.com'],
            null,
            null,
            'A new organization is awaiting your approval',
            'organization name: '+ this.state.orgName +
            '\norganizaion description: ' + this.state.description +
            '\nusername asking to create organization: ' + this.state.userName,
            null,
        )
    }
    
    validation() {
        if (!this.state.org.org_name) {
            alert('Please fill in name of organization');
            return false;
        }
        if (!this.state.org.admin_name) {
            alert('Please fill in admin name');
            return false;
        }
        if (!this.state.org.description) {
            alert('Please fill in field of activity');
            return false;
        }
        if (!this.state.org.org_name) {
            alert('Please fill in description');
            return false;
        }

        return true;
    }
    
    // ~~~~~~~ add new org to DB

    addOrg() {
        (async () => {
            const response = await axios.post(
                '/addOrg', {org: escapeAllStringsInObject(this.state.org)}
            );
            if (response.data === 'success') {
                this.sendEmail();
                alert('Thank you for joining Magdilim. We will look into your organization and email you as soon as we approve it.');
                window.location.assign('/');
            } else {
                alert('Unknown problem creating organization. Please try again later');
            }
        })();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validation()) {
            this.addOrg();
        }
    }

    handleChange(event) {
        const { name, value, type } = event.target;
        this.state.org[name] = value;
        this.setState({ org: this.state.org});
    }

    renderInputs() {
        return (
            <div>
                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                    <a href='#'><Icon size='big' name='edit' />Enter the Details Bellow:</a>
                </Divider>
                <Form.Field>
                    <Form.Input
                        label='Name of Organization:'
                        value={this.state.org.org_name}
                        iconPosition='left'
                        placeholder={this.state.org.orgName}
                        name="org_name"
                        onChange={this.handleChange.bind(this)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label='Name of Admin:'
                        icon='user'
                        iconPosition='left'
                        placeholder={this.state.org.admin_name}
                        value={this.state.org.admin_name}
                        name="admin_name"
                        onChange={this.handleChange.bind(this)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.TextArea
                        rows={2}
                        label='Field of Activity:'
                        placeholder={this.state.org.field_of_activity}
                        value={this.state.org.field_of_activity}
                        name='field_of_activity'
                        onChange={this.handleChange.bind(this)} />
                </Form.Field>
                <Form.Field>
                    <Form.TextArea
                        label='Description:'
                        value={this.state.org.description}
                        placeholder={this.state.org.description}
                        name='description'
                        onChange={this.handleChange.bind(this)} />
                </Form.Field>                
                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                ><a href='#'>
                        <Icon size='big' name='map marker alternate' />
                            Mailing Address
                        </a>
                </Divider>
                <Form.Input
                    label='Country:'
                    placeholder={this.state.org.country}
                    value={this.state.org.country}
                    name="country"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    label='City:'
                    placeholder={this.state.org.city}
                    value={this.state.org.city}
                    name="city"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    label='Street:'
                    placeholder={this.state.org.street}
                    value={this.state.org.street}
                    name="street"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    label='Building:'
                    placeholder={this.state.org.building}
                    value={this.state.org.building}
                    name="building"
                    onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                    label='Postal Code:'
                    placeholder={this.state.org.pc_num}
                    value={this.state.org.pc_num}
                    name="pc_num"
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }


    render() {
        return (
            <div>
                <Segment style={{ padding: '1.5em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <br></br>
                        <Label as='a' color='teal' ribbon left>
                            Get Started!
                        </Label>
                        <Header as='h2' icon='globe' content='Thank you for using us for your organization!' />
                        <Segment>
                            <p style={{ fontSize: '1.33em' }}>
                                We will provide you with the design and software necessary to create an online platform for ongoing donations.
                                All we left for you to do, is focus on content that will be appealing and attract your ongoing donors.
                            </p>
                            <Label>Once you send in the following details, we will be in touch with you about creating your personal platform.</Label>
                        </Segment>
                        <br></br>
                        <br></br>
                        <Form onSubmit={this.handleSubmit.bind(this)} success>
                            {this.renderInputs()}
                         <br /><br />
                         <Label>An email will be sent once your organization gets approved.</Label>
                         <br />
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='handshake' />
                            Thank you. We will be in touch shortly.
                        </Header>
                            <br />
                            <Button content='Submit' primary />
                        </Form>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default NewOrg;
