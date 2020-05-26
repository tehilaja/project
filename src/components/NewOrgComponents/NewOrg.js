import React from 'react';

import { Redirect } from "react-router-dom";

import { v1 as uuid } from 'uuid';


import axios from "axios";

import { async } from "q";
import ImageUploader from 'react-images-upload';
import { GoOrganization } from "react-icons/ai";
////---------------


import {
    Button,
    Container,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Label,
    List,
    Menu,
    Radio,
    Responsive,
    Segment,
    Sidebar,
    Step,
    Visibility,
} from 'semantic-ui-react'


const uploadFile = require('../../utilities/upload').methods.uploadFile;

class NewOrg extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            pswd: "",
            validPswd: false,
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
            //////////////////
            orgName: '',
            admin_name: '',
            description: '',
            phone: '',
            email: '',
            //mailing information:
            city: "",
            building: "",
            street: "",
            p_code: "",
            //more info:
            pictures: [],
            minDonation: 10,
            allowOneTimeDonations: false,
            // org_num:"",
            // branch:"",
            // account_num:"",
            // bank_num:"",
            // description:"",
            // field_of_acctivity:"",
            // founding_year:"",
            // working:"",
            // volunteers:"",
            flag_done: false,
            file: "",
            file_name: "",
            selectedImage: null,
            image_url: null,

            newOrg_req: {"user_id": 2, "org_id":this.props.data.org_id, "monthly_donation": this.props.data.initialDonation,
            "referred_by": '',"d_title": '',"d_description": '',"is_anonim" : false },
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlerClick = this.handlerClick.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
    }
    
    //another try:
    fileSelctedHandler = event => {
        this.setState({
            pictures:event.target.files[0]
        })
        this.fileUploadHandler();
    }

    fileUploadHandler = () => {
        (async () => {
            const response = await axios.post(
                '/upload-file',
                {
                    file: this.state.pictures,
                    key: 'try/try.jpg',
                },
                {header:{'Content-Type': 'application/json'}}
                );
               console.log("resp",response);
             
          })();  
    }

    onSelectFile(event) {
        this.setState({ selectedImage: event.target.files[0] });
    }


    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "file" ? this.setState({ [name]: event.target.files[0] }) : this.setState({ [name]: value })
    }



    handleSubmit = (e) => {

        (async () => {
            const fileNamePrefix = `${this.state.orgName}_${uuid()}`
            //TODO: save url to db in callback
            await uploadFile(this.state.selectedImage, fileUrl => alert('file url:' + fileUrl), fileNamePrefix, 'organizations');
        })();

        e.preventDefault();
        /*add new org to dataBase */
        // if (this.state.DuserName != "") // TODO: if find in db (func findDuser)
        // {
        //  // TODO : nust filde....
        // }

        // alert(JSON.stringify(this.state))


        (async () => {
            const response = await axios.post(
                '/addOrg',
                {
                    // org_name,admin_name,description,field_of_acctivity,img_url,min_donation,org_num,branch,account_num,bank_num,founding_year,working,volunteers,friends,city_id,building,street,p_code)
                    // TODO : all data
                    // org_name: this.state.orgName,admin_name:this.state.admin_name,img_url:this.state.photo, monthly_donation:this.state.minDonation,  // ---- req
                },
                { header: { 'Content-Type': 'application/json' } }
            )
            console.log("resp", response)
            if (response.data === "no connection") {
                alert("you need to login...")
            }
            else if (response.data === "added succesfully!") {
                // this.setState({loggedIn: false})
                alert("the organization " + this.state.orgName + "added succesfully ")
                //  }
                // else if(response.data ==="fail2"){
                //     alert("the referred by is incorrect")
                // }
                // else if(response.data ==="fail1"){
                //     alert("the level")
            }
        })();
        // }

        // else
        //     alert("please enter Referred detiles")
        this.setState({ flag_done: true });
    }

    //function to deal with passing state to parent component:
    handlerClick(flagDone) {
        this.setState({
            flagDone: true,
        });
        this.props.record(flagDone)
    }

    //---------increment + ----------

    increment() {
        this.setState(prevState => {
            return {
                minDonation: prevState.minDonation + 1
            }
        })
    }

    //---------decrement - -------------
    decrement() {
        if (this.state.minDonation > 1)
            this.setState({ minDonation: this.state.minDonation - 1 })
    }


    render() {
        return (
            <div>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <br></br>
                        <Label as='a' color='teal' ribbon left>
                            Get Started!
                </Label>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Thank you for using us for your organization!
                </Header>
                        <Segment>
                            <p style={{ fontSize: '1.33em' }}>
                                We will provide you with the design and software necessary to create an online platform for ongoing donations.
                                All we left for you to do, is focus on content that will be appealing and attract your ongoing doners.
                </p>
                        </Segment>
                        <br></br>
                        <br></br>
                        {/* <Grid relaxed='very' stackable centered> */}
                        <Form onSubmit={this.handleSubmit.bind(this)} success>
                            <Divider
                                as='h4'
                                className='header'
                                horizontal
                                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                            >
                                <a href='#'>Enter the Details Bellow:</a>
                            </Divider>
                            {/* info about organization */}
                            <h4></h4>
                            <Form.Field>
                                <Form.Input
                                    label='name of organization:'
                                    iconPosition='left'
                                    placeholder='Organization name'
                                    name="orgName"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Field>
                            <br /><br />
                            <Form.Field>
                                {/* <Form.label>name of Admin:</Form.label> */}
                                <Form.Input
                                    label='name of Admin:'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Admin name'
                                    name="admin_name"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Field>
                            <br /><br />
                            <Form.Field>
                                <Form.TextArea
                                    label='Description:'
                                    placeholder='Tell us more about your organization...'
                                    name='description'
                                    onChange={this.handleChange.bind(this)} />
                            </Form.Field>
                            <Divider
                                as='h4'
                                className='header'
                                horizontal
                                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                            >
                                <a href='#'>Organization Contact Info:</a>
                            </Divider>
                            <Form.Input
                                label='Phone number:'
                                icon='phone'
                                iconPosition='left'
                                placeholder='Phone number'
                                name="phone"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                label='email:'
                                icon='envelope'
                                iconPosition='left'
                                placeholder='email'
                                name="email"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Divider
                                as='h4'
                                className='header'
                                horizontal
                                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                            >
                                <a href='#'>Mailing Address</a>
                            </Divider>
                            <Form.Input
                                label='Building:'
                                placeholder='Building'
                                name="building"//////////////
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                label='street:'
                                placeholder='street'
                                name="street"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                label='city:'
                                placeholder='city'
                                name="city"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                label='postal code:'
                                placeholder='postal code'
                                name="p_code"
                                onChange={this.handleChange.bind(this)}
                            />
                            <Divider
                                as='h4'
                                className='header'
                                horizontal
                                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                            >
                                <a href='#'>Upload a Photo:</a>
                            </Divider>
                            <Segment raised>
                                {/* <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    /> */}
                                <input label='Choose image' type='file' onChange={this.onSelectFile} />
                                <br /><br />
                            </Segment>
                            {/* // TODO : STYLE height */}
                            {/* set minimum donation per month */}
                            <div>
                                <Divider
                                    as='h4'
                                    className='header'
                                    horizontal
                                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                                >
                                    <a href='#'>Set minimum monthly doation</a>
                                </Divider>

                                <label > $ </label>
                                <lable name="minDonation">{this.state.minDonation}  </lable>
                                <button onClick={this.decrement.bind(this)}>-</button>
                                <button onClick={this.increment.bind(this)}>+</button>
                            </div>
                            <br></br>
                            <br></br>
                            <Radio toggle
                                label="Allow One-time Donations" />
                            <Divider
                                    as='h4'
                                    className='header'
                                    horizontal
                                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                                >
                                    <a href='#'>User Status</a>
                                </Divider>

                            <Radio toggle
                                label="User status is based on the sum of money brought to the organiztion in his downline" />
                            <br></br>
                            <br></br>
                            <Label>Default: User status is based only on the number of Doners in his Downline</Label>
                            {/* TODO: deal with figuring out the user status */}
                            {/* TODO: see which details are actually necessay for us */}
                            {/* <a href='#'>More Details:</a>
                    </Divider>
                    <br/><br/>
                    <lable className= "newOrgLable"> field_of_acctivity: </lable>
                    <input type="text" name="field_of_acctivity" onChange={this.handleChange.bind(this)}/>
                    <br/><br/>
                    <lable className= "newOrgLable"> founding_year: </lable>
                    <input type="text" name="founding_year" onChange={this.handleChange.bind(this)}/>
                    <br/><br/>
                    <lable className= "newOrgLable"> working: </lable>
                    <input type="text" name="working" onChange={this.handleChange.bind(this)}/>
                    <br/><br/>
                    <lable className= "newOrgLable"> volunteers: </lable>
                    <input type="text" name="volunteers" onChange={this.handleChange.bind(this)}/>
                    <br/><br/>
                    <lable className= "newOrgLable"> friends: </lable>
                    <input type="text" name="friends" onChange={this.handleChange.bind(this)}/>*/}
                            <br /><br />
                            <br />
                            <Button content='Submit' primary />
                        </Form>
                        {/* </Grid> */}
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default NewOrg;
