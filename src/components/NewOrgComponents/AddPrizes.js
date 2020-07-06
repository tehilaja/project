import React, { useState } from 'react';
import { Redirect } from "react-router-dom";


import { v1 as uuid } from 'uuid';

import axios from "axios";
import { async } from "q";


import {DatePicker, getDate} from './DatePicker.js'
import { Button, Divider, Form, Segment } from 'semantic-ui-react';

import { escapeAllStringsInObject } from '../../utilities/string';

const emailService = require('../../utilities/email');
const uploadFileUtil = require('../../utilities/upload').methods;

class AddPrizes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusInRaffle: "all",
            autowinner: 'true',
            pictures: [],
            attachments: null,
            levels: this.props.levels,
            prize: {
                org_id: this.props.org_id,
                level_num: 0,
                raffle: false,
            },
        }
        this.onDrop = this.onDrop.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleWinnerChange = this.handleWinnerChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.uploadImage = this.uploadFirstAttachment.bind(this);
    }

    handleChangeInput(event) {
        this.state.prize[event.target.name] = event.target.value;
        this.setState({prize: this.state.prize});
    }

    handleStatusChange(level_num) {
        this.state.prize.level_num = level_num;
        this.setState({prize: this.state.prize});
    }

    handleWinnerChange() {
        this.state.prize.raffle = !this.state.prize.raffle;
        this.setState({prize: this.state.prize});
    }

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
    }

    sendEmail() {
        // TODO: get list of emails
        emailService.sendEmail(
            //'rachelletikva@gmail.com'
            ['tehilaj97@gmail.com'],
            null,
            null,
            'A New Gift sent from Magdilim!!!!!!!',
            'Check out the following gift!!!!!!',
            this.state.attachments,
            (error, info) => {
                if (error) {
                    console.log('error:\n' + JSON.stringify(error));
                } else {
                    console.log('info:\n' + JSON.stringify(info));
                }
            }
        )
    }

    uploadFirstAttachment(callback) {
        (async () => {
            const fileNamePrefix = `${this.state.prize.org_id}_${uuid()}`;
            const attachment = this.state.attachments[0];
            await uploadFileUtil.uploadDataUrlFile(attachment.path, attachment.filename, fileUrl => callback(fileUrl), fileNamePrefix, 'prizes');
        })();
    }

    savePrize(onSuccess) {
        (async () => {
            this.state.prize.g_date = getDate();
            const response = await axios.post('/add-prize', {gift: escapeAllStringsInObject(this.state.prize)});
            if (response.data === 'success') {
                alert('Prize added succefully');
                onSuccess();
            } else {
                alert('Unknow error adding prize. Please try again later');
            }
        })();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const afterUploadIfNeeded = (fileUrl) => {
            this.state.prize.gift_pic = fileUrl;
            this.setState({prize: this.state.prize});
            this.savePrize(() => {
                this.sendEmail();
                document.dispatchEvent(new Event('prizeAdded'));
            });
        };
        
        this.state.attachments && this.state.attachments.length && this.uploadFirstAttachment(afterUploadIfNeeded) || afterUploadIfNeeded(null);
    }

    getFilePreview(src) {alert('dfdf'+src);
        return (<div name="file_preview">
            <img src={src} style={{ height: '100px', marginTop: '30px' }} />
        </div>);
    }

    getStatusesRadioButtons() {
        const { statusInRaffle } = this.state;

        const statusesRadioButtons = this.state.levels.map(level => (
            <Form.Radio
                label={level.level_name}
                checked={this.state.prize.level_num === level.level_num}
                onChange={() => this.handleStatusChange(level.level_num)}
                name={level.level_name}
            />));
        
        return [
            <Form.Radio
                label='All Donors'
                checked={this.state.prize.level_num === 0}
                onChange={() => this.handleStatusChange(0)}
                name='all'
            />,
            ...statusesRadioButtons
        ];
    }

    onDateChange(event, data) {
        const [currentDate, setNewDate] = useState(null);
        setNewDate(data.value);
        alert(data.value);
    }


    render() {
        const { autowinner } = this.state
      

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        label='Gift Name:'
                        placeholder='Gift Name:'
                        name="gift_name"
                        onChange={this.handleChangeInput}
                    />
                    <Form.Input
                        label='Gift Description:'
                        placeholder='Gift Description:'
                        name="gift_description"
                        onChange={this.handleChangeInput}
                    />
                    <label><b>Select the status of the Donors to enter the raffle:</b></label>
                    <Form.Group inline>
                        {this.getStatusesRadioButtons()}
                    </Form.Group>
                    {/* YOUR CHOICE: {this.state.statusInRaffle} */}
                    <br></br>
                    <label><b>Choose your winner option:</b></label>
                    <Form.Group widths='equal'>
                        <Form.Radio
                            label='Get Winner Automatically'
                            checked={!this.state.prize.raffle}
                            onChange={this.handleWinnerChange}
                        />
                        <Form.Radio
                            label='Send List of Donors to Enter Raffle'
                            checked={this.state.prize.raffle}
                            onChange={this.handleWinnerChange}
                        />
                    </Form.Group>

                    {/* YOUR CHOICE: automatic winner: {this.state.autowinner} */}
                    <br></br>
                    <div><b>Choose a date for your raffle</b></div>
                    <DatePicker/>                    
                    <Divider as='h4'
                        className='header'
                        horizontal
                        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                        <a href='#'>Upload a Raffle Flier (optional):</a>
                    </Divider>
                    <label><b>The flier will automatically be emailed to all donors</b></label>
                    <Segment raised>
                        <input label='Choose images' type='file' onChange={this.onDrop} multiple />
                        {this.state.attachments && this.state.attachments.length && this.getFilePreview(this.state.attachments[0].path) || null}
                        <br /><br />
                    </Segment>
                    <Button content='Submit Prize' primary />
                </Form>
            </div>
        )
    }
}
export default AddPrizes;