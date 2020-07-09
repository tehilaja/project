import React from 'react';
import { v1 as uuid } from 'uuid';
import axios from "axios";
import {Button,Divider,Form,Grid,Header,Icon,Label,Segment,Dropdown} from 'semantic-ui-react';
import { escapeAllStringsInObject } from '../../utilities/string';

const emailService = require('../../utilities/email');

// -----------------------------------

const addressDefinitions = ["a","b","c"];

const fieldOptions = [
    // { key: 'all organization',text: 'all organization', value: 'all organization' }
];
    
class NewOrgPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            org: {
                org_admin_id: this.props.data.userName,
                admin_name: `${this.props.data.first_name} ${this.props.data.last_name}`,
                field_of_activity: null
            },
            loggedIn: this.props.data.loggedIn,
            
            program_admin: this.props.data.program_admin,
            routeMain: false,
            allowAddPrize: false,
            showAddPrize: false,
            orgAproved: false,
            searchQuery: '',
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendEmail = this.sendEmail.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
    }
    // -----------------------
  


    componentDidMount() {
        window.scrollTo(0, 0);

        //--get_field_of_activity
        axios.get('/get_field_of_activity').then(res => 
        {
            if (res.status >= 400) {
                throw new Error("Bad response from server");}
                return res
            }).then(respones=>
                {
                if(respones.data==="no data") //TODO: if no last donation///
                   {
                       // alert(respones.data)
                   } 
                else{ 
                    this.setState({fieldOfActivity: respones.data});
                    respones.data.forEach(function(field){
                    let fieldtobj ={};
                    fieldtobj["key"]=field.field_name;
                    fieldtobj["value"]=field.field_name;
                    fieldtobj["text"]=field.field_name;
                    fieldOptions.push(fieldtobj);
                })
        }
        }).catch(error=> {
            // alert(error);
        })
    }

    selectLevel (e, { value }) {
        this.setState({ selectedOptionLevel: value })
        this.setState(Object.assign(this.state.org,{field_of_activity:value}));
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
            'organization name: '+ this.state.org.org_name +
            '\norganizaion description: ' + this.state.org.description +
            '\nusername asking to create organization: ' + this.state.org.admin_name,
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
        if (!this.state.org.field_of_activity) {
            alert('Please fill in field of activity');
            return false;
        }
        if (!this.state.org.description) {
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
        const { searchQuery, value } = this.state
        const { valueLevel } = this.state // level


        return (
            <div>
                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                    <a href='#' style={{ color:'#9ACD32'}}><Icon size='big' name='edit' />Enter the Details Bellow:</a>
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
                        disabled
                    />
                     <Form.Input
                        label='Email of Admin:'
                        icon='envelope'
                        iconPosition='left'
                        placeholder={this.state.org.org_admin_id}
                        value={this.state.org.org_admin_id}
                        name="org_admin_id"
                        disabled
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label='Website:'
                        icon='user'
                        iconPosition='left'
                        placeholder={this.state.org.website}
                        value={this.state.org.website}
                        name="website"
                        onChange={this.handleChange.bind(this)}
                    />
                </Form.Field>
                <Form.Field>
                    {/* ------------------------------------------------------- */}
                    {/* label='Field of Activity:' */}
                    <label >Field of Activity:</label>
                    <Dropdown
                        fluid
                        // multiple
                        onChange={this.selectLevel}
                        options={fieldOptions}
                        placeholder={this.state.org.field_of_activity}
                        // search
                        selection
                        value={value}
                    />
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
                ><a href='#' style={{ color:'#9ACD32'}}>
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
                <Segment style={{ padding: '1.5em 0em' }} vertical textAlign='center'>
                    <Grid container>
                        <br></br>
                        <Header as='h2' icon='globe' content='Thank you for using us for your organization!' />
                        <Segment textAlign='left'>
						<Label as='a' color='olive' ribbon left>
                            Get Started!
                        </Label>
                            <p style={{ fontSize: '1.33em' }}>
                                We will provide you with the design and software necessary to create an online platform for ongoing donations.
                                All we left for you to do, is focus on content that will be appealing and attract your ongoing donors.
                            </p>
                            <Label>Once you send in the following details, we will be in touch with you about creating your personal platform.</Label>
                        </Segment>
                        <br></br>
                        <br></br>
						<Segment textAlign='left'>
                        <Form onSubmit={this.handleSubmit.bind(this)} success>
                            {this.renderInputs()}
                         <br /><br />
                         <Label>An email will be sent to you once your organization gets approved.</Label>
                         <br />
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='handshake' />
                            Thank you. We will be in touch shortly.
                        </Header>
                            <br />
                            <Button content='Submit' primary />
                        </Form>
						</Segment>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default NewOrgPage;
