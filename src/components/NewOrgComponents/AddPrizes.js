import React from 'react';
import {Redirect} from "react-router-dom";


import { v1 as uuid } from 'uuid';

import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import NewOrg from './NewOrg.js';
import Footer from '../Footer.js';

import DatePicker from './DatePicker.js'
import { Button, Divider, Form , Segment} from 'semantic-ui-react';

import ImageUploader from 'react-images-upload';

const emailService = require('../../utilities/email');
const uploadFileUtil = require('../../utilities/upload').methods;

class AddPrizes extends React.Component{
    constructor(props){
        super(props)
    this.state ={
        statusInRaffle: "all",
        autowinner: 'true',
        pictures: [],
        attachments: null,
    }
    this.onDrop = this.onDrop.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.uploadImage = this.uploadFirstAttachment.bind(this);
}
handleChange = (e, { statusInRaffle }) => this.setState({ statusInRaffle })
handleChangeName(event){
    this.setState({
        [event.target.name]: event.target.value
    })
}
handleWinnerChange = (e, { autowinner }) => this.setState({ autowinner })

onDrop(event) {
    const files = event.target.files;
    
    const attachments = [];

    Object.keys(files).forEach(fileKey => {

        const file = files[fileKey];
        emailService.emailAttachementFromFile(file, (attachment) => attachments.push(attachment));      
        
    });

    this.setState({
        attachments: attachments,
    });


    // this.setState({
    //  pictures: this.state.pictures.concat(event),
    // });
}

sendEmail() {
    // TODO: get text to send, get list of mail
    emailService.sendEmail(
        //'rachelletikva@gmail.com'
        ['tehilaj97@gmail.com'],
        null,
        null,
        'Email send from Magdilim!!!!!!!',
        'What do you think about this body????????',
        this.state.attachments,
        (error, info) => {
            if (error) {
                console.log('error:\n'+JSON.stringify(error));
            } else {
                console.log('info:\n'+JSON.stringify(info));
            }            
        }
    )
}

uploadFirstAttachment() {
    (async () => {
        const fileNamePrefix = `${this.state.orgName}_${uuid()}`;
        const attachment = this.state.attachments[0];
        //TODO: save url to db in callback
        await uploadFileUtil.uploadDataUrlFile(attachment.path, attachment.filename,  fileUrl => alert('file url:' + fileUrl), fileNamePrefix, 'prizes');
    })();
}

handleSubmit=(e)=>
    {
        this.sendEmail();
        this.uploadFirstAttachment();
        e.preventDefault();
        //alert(JSON.stringify(this.state));
    }
    render() {
        const { statusInRaffle } = this.state
        const { autowinner } = this.state

        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Input
                        label= 'Gift Description:'
                        placeholder='Gift Description:'
                        name="giftName:"
                        onChange={this.handleChangeName.bind(this)}
                    />
            <label><b>Select the status of the Donors to enter the raffle:</b></label>
        <Form.Group inline>
          <Form.Radio
            label='All Donors'
            statusInRaffle='all'
            checked={statusInRaffle === 'all'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Silver'
            statusInRaffle='silver'
            checked={statusInRaffle === 'silver'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Gold'
            statusInRaffle='gold'
            checked={statusInRaffle === 'gold'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Platinum'
            statusInRaffle='platinum'
            checked={statusInRaffle === 'platinum'}
            onChange={this.handleChange}
          />
        </Form.Group>
          {/* YOUR CHOICE: {this.state.statusInRaffle} */}
          <br></br>
          <label><b>Choose your winner option:</b></label>
        <Form.Group widths='equal'>
          <Form.Radio
            label='Get Winner Automatically'
            autowinner = 'true'
            checked={autowinner === 'true'}
            onChange={this.handleWinnerChange}
          />
          <Form.Radio
            label='Send List of Donors to Enter Raffle'
            autowinner = 'false'
            checked={autowinner === 'false'}
            onChange={this.handleWinnerChange}
          />
        </Form.Group>
        
        {/* YOUR CHOICE: automatic winner: {this.state.autowinner} */}
        <br></br>
        <div><b>Choose a date for your raffle</b></div>
        <DatePicker />
        <Divider as='h4'
        className='header'
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
        <a href='#'>Upload a Raffle Flier (optional):</a>
        </Divider>
        <label><b>The flier will automatically be emailed to all donors</b></label>
        <Segment raised>
            <input label='Choose images' type='file' onChange={this.onDrop} multiple/>
        {/* <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        /> */}
        <br/><br/>
        </Segment>
        <Button content='Submit Prize' primary />
        </Form>
        </div>
        )
    }   
}
export default AddPrizes;