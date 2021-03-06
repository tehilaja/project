import React, { Component } from 'react'
import { Step, Segment, Image, Button, Grid, Form, Checkbox, Icon, Input, Label, Accordion, Message, Modal, Dropdown } from 'semantic-ui-react'
import axios from "axios";


////#08.05
import { PayPalButton } from "react-paypal-button-v2";
import { escapeAllStringsInObject } from '../../utilities/string';


// const Isemail = require('isemail');

//  try to git

export default class Donate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,

            // step functionality

            coreStep: 1, // the current step
            dicCompleteDonation: false,
            divActiveDonation: true,
            divActiveMore: false,
            divActivePayment: false,
            nextAble: false,
            prevAble: true,

            // step
            active: 'select Amount',
            completed: '',
            disabled1: '',
            disabled2: '',
            //
            sumDonate: this.props.data.initialDonation,
            sumBtn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //allowing user to click on  1- 10 raffle tickets
            dThrough: '', // email of came through
            showMessageReq: false,

            // set json to state
            massageErrRequireFIeld: {},
            // the request to donation for server
            donate_req: {
                "user_id": null, "org_id": this.props.data.org_id, "monthly_donation": this.props.data.initialDonation,
                "referred_by": '', "d_title": '', "d_description": '', "anonymous": false, "oneTimeCheck": false
            },
            potential_referres: [],
            allowMonthlyDonation: undefined,

            findDuser: true,
            // next level
            finishDonate: false,
            //////
            pass2step: false,
            ableDonate: false,
            oneTimeChecked: false

        }
        this.handleClick = this.handleClick.bind(this);

        //
        this.handleClickBtn = this.handleClickBtn.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.checkBoxhandleClick = this.checkBoxhandleClick.bind(this);




        // next butten
        this.nextButton = this.nextButton.bind(this);
        this.prevButton = this.prevButton.bind(this);
        this.disableNextBtn = this.disableNextBtn.bind(this);

        this.donateDisabel = this.donateDisabel.bind(this);


        // step
        this.switchStep = this.switchStep.bind(this);

        this.getPotentialReferres();
    }

    async getPotentialReferres() {
        const response = await axios.post('/get-donors-of-org', { org_id: this.state.donate_req.org_id });

        if (response.data && Array.isArray(response.data)) {
            this.setState({ potential_referres: response.data.map(referrer => referrer.user_id) });
            this.setState({allowMonthlyDonation: !this.state.potential_referres.find(r => r === this.state.donate_req.user_id)});
    }
    }


    //before all
    componentDidMount() {
        if (this.state.loggedIn) {
            this.setState(Object.assign(this.state.donate_req, { user_id: this.props.data.userName }));
        }

    }

    //~~~~~~~~~~~~~~~~~~ function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
    donateDisabel() {
        if (this.state.dThrough !== '' && this.state.donate_req.referred_by === '')
            this.setState({ ableDonate: true });
    }

    //~~~~~~~~~~ disableNextBtn  ~~~~~~``
    disableNextBtn(e) {
        if (this.state.finishDonate || !this.state.loggedIn)
            return true;
        else
            return false;
    }



    //   onClick(event: SyntheticEvent, data: object)

    handleClick = (e, { title }) => {
        this.setState({ active: title })

        switch (title) {
            case 'select Amount':
                this.setState({ coreStep: 1 });
                break
            case 'more datails':
                this.setState({ coreStep: 2 });
                break
            case 'payment':
                this.setState({ coreStep: 3 });
                break
            default:
                this.setState({ coreStep: 1 });
        }


    }
    //~~~~~~~~~swich step ~~~ 
    switchStep() {

        switch (this.state.coreStep) {
            case 1:
                this.setState({ divActiveDonation: false, divActiveMore: true, dicCompleteDonation: true, coreStep: 2 });
                break;
            case 2:
                this.setState({ divActiveMore: false, divActivePayment: true, coreStep: 3, nextAble: true });
                break;
            case 3:
                this.setState({ divActivePayment: false, nextAble: true });
                break;
            default:
                this.setState({ coreStep: 1 })
        }
    }

    // ~~~~~~~~~~~~ click on btn sum ~~~~~ 
    handleClickBtn(e) {
        this.setState({ nextAble: false })
        this.setState(Object.assign(this.state.donate_req, { monthly_donation: e.target.dataset.letter }));
    }




    //~~~~~~~~~~~~ change sum ~~~~~~~~~~~~~~
    handleChange(e) {
        if (e.target.value === '')
            this.setState({ nextAble: true });
        else
            this.setState({ nextAble: false });
        this.setState(Object.assign(this.state.donate_req, { monthly_donation: e.target.value }));
    }

    //~~~~~~~~~~~~~~~~ change mail (dThrough ~~~~~~~~~)
    handleChangeMail(referrer) {
        this.setState(Object.assign(this.state.donate_req, { referred_by: referrer }));
        this.setState({ dThrough: true });
        this.setState({ nextAble: false }); // able next btn

    }
    //d_title
    handleChangeTitle(e) {
        this.setState(Object.assign(this.state.donate_req, { d_title: e.target.value }));

    }
    //d_description
    handleChangeDescription(e) {
        this.setState(Object.assign(this.state.donate_req, { d_description: e.target.value }));

    }

    //~~~~~~~~~~~~~~~~~~~~~ donate proggress ~~~~~~~~~~~~
    // nextButton -> functionalety of donate proggress
    nextButton(e) {
        if (this.state.loggedIn) {
            // ~~ start step 1~~~
            if (this.state.coreStep === 1) {
                if (!this.state.oneTimeChecked) {

                    if (this.state.dThrough !== '')  
                    {  
                        if (this.state.donate_req.referred_by === '') 
                        {
                            this.setState({ ableDonate: true });
    
                            axios.post('/donate/findDThrouhUser', { org_id: this.state.org_id, userMail: this.state.dThrough },
                            { headers: { 'Content-Type': 'application/json' } }
                            ).then(res => {
                                if (res.status >= 400) {
                                    throw new Error("Bad response from server");
                                }
                                else if (res === "not found" || res.data.user_id === undefined) // the data is not null
                                {
                                    alert("There is no such user in system!")
                                    this.setState({ dThrough: '', ableDonate: false });
                                }
                                else { 
                                    // give a id of the donate through
                                    this.setState(Object.assign(this.state.donate_req, { referred_by: res.data.user_id }));
                                    this.setState({ ableDonate: false }); // donate able 
                                    this.setState({ nextAble: false });

                                }
                            }).catch(error => {
                                alert(error);
                            })
                        }
                        if (this.state.donate_req.referred_by !== '') {
                            this.setState({ ableDonate: false });
                            this.switchStep();
                        }
                    }
                    else { 
                        this.switchStep(); 
                    }

                    if (this.state.donate_req.referred_by !== '')
                        this.switchStep();
                }
                else {
                    this.switchStep();
                }
            } // ~~end step 1~~~
            else   // step 2 or 3                
                this.switchStep(); 
        }
        else {
            alert("you must log in to donate")
        }
    }

    prevButton(e) {
        switch (this.state.coreStep) {
            case 1:
                break;
            case 2:
                this.setState({ divActiveDonation: false, divActiveMore: false, divActivePayment: false, coreStep: 1, prevAble: false });
                // activeStep:'payment'
                break;
            case 3:
                this.setState({ divActiveDonation: false, divActiveMore: true, divActivePayment: false, coreStep: 2, nextAble: false });
                break;
            default:
                this.setState({ coreStep: 1 })
        }
    }

    async addMonthlyDonation() {
        const response = await axios.post('/add-donor-in-org', { dio: escapeAllStringsInObject(this.state.donate_req) });
        if (response.data === 'success') {
            alert("Subscription completed. Thank you!");
            window.location.assign('/');
        } else {
            alert('Error updating system. Please contact Magdilim admin');
        }
    }
    
    //PayPal button for monthly donations:
    createPayPalSubscriptionButton() {
        return (
            <PayPalButton
                amount={this.state.donate_req.monthly_donation}
                options={{ vault: true, 'clientId': 'sb' }}
                shippingPreference='NO_SHIPPING'
                onApprove={(data, actions) => {
                    this.addMonthlyDonation();

                    // Capture the funds from the transaction
                    return actions && actions.subscriptions && actions.subscriptions({
                        "billing_cycle": {
                              "frequency": {
                                "interval_unit": "MONTH",
                                "interval_count": 1
                              },
                              "tenure_type": "REGULAR",
                              "sequence": 2,
                              "total_cycles": 0 // 0 total cycles means no end date
                            }
                    });                    
                }}
                onCancel={(data) => { }}
            />
        );
    }

    async addOneTimeDonation() {
        const response = await axios.post('/add-one-time-donation', { donation: escapeAllStringsInObject(this.state.donate_req) });
        if (response.data === 'success') {
            alert('Donation successfully made. Thank you!');
            window.location.assign('/');
        } else {
            alert('Donation made, but not registered to our systems due to an error. Please contact Magdilim admin. Thank you');
        }
    }

    //PayPal button function:
    createPayPalButton() {
        return (
            <PayPalButton
                //options={{'client-id': 'AcxA_YjIODLDVnahn3WCnAUtXDhg_FTaUIFQJ_AtLWtWaOVf5rLAMoE1bttZI3CnIg8eloLovMjAP1R-'}}
                amount={this.state.donate_req.monthly_donation}
                shippingPreference='NO_SHIPPING'
                onSuccess={(details, data) => {
                    this.addOneTimeDonation();
                }}
                onCancel={(data) => { }}
            />);
    }

    checkBoxhandleClick() {
        this.setState(Object.assign(this.state.donate_req, { oneTimeCheck: true }));

    }

    // ~~~~~~~~~~ render ~~~~~~~~~~~~~~~~~~~~~```
    render() {
        const styleBotton =
        {
            margin: '1em',
            backgroundColor: '#20B2AA',
            textAlign: 'center',
            // text-decoration: none;
            display: 'inline-block',
            fontSize: '16px',
            padding: '32px 32px',
            border: '0.1em solid black'
        }
        const backgroundColor = '#20B2AA';

        return (
            <div>
                <Step.Group widths={3} stackable='tablet' ordered={true} fluid >

                    <Step
                        id='step1'
                        // divActiveDonation

                        active={this.state.divActiveDonation}
                        completed={this.state.dicCompleteDonation}
                        disabled={this.state.dicCompleteDonation}

                        // children 
                        icon='dollar'
                        link
                        // onClick={this.handleClick}
                        // onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true}
                        title='select Amount'
                        description='Choose your amount'
                    />
                    <Step
                        id='step2'
                        // active={active === 'more datails'}
                        active={this.state.divActiveMore}
                        completed={this.state.divActivePayment}
                        disabled={this.state.divActivePayment}
                        icon='edit outline'
                        link
                        // onClick={this.handleClick}
                        title='dedication'
                        description='Add a dedication'
                    />

                    <Step
                        id='step3'
                        // active={active === 'payment'}
                        active={this.state.divActivePayment}
                        disabled={!this.state.divActivePayment}
                        icon='credit card'
                        link
                        // onClick={this.handleClick}
                        title='payment'
                    // description='an additional information'

                    />
                </Step.Group>

                {!this.state.loggedIn
                    &&
                    <div>
                        Please Log In
          </div>
                }
                {this.state.coreStep === 1 &&
                    <Segment >
                        <Grid>
                            <Grid.Row>
                                <h4 style={{ marginLeft: '2em' }} >My Donation (
                            <Icon name='dollar' />USD)</h4>
                            </Grid.Row>
                            <Grid.Row style={{ paddingLeft: '4em' }}>
                                <Label style={{ backgroundColor: '#e6f2ff', fontSize: '14px' }}>
                                    <Icon name='hand point right' /> Select or enter an amount
                        </Label>
                            </Grid.Row>

                            <Grid.Row>
                                <div style={{ marginLeft: '5em' }}>
                                    {/* ~~ the sum buttons */}
                                    {this.state.sumBtn.map(sum =>
                                        <Button
                                            inverted circular
                                            style={styleBotton}
                                            key={sum*this.props.data.initialDonation}
                                            data-letter={sum*this.props.data.initialDonation} o
                                            onClick={this.handleClickBtn}>
                                            {sum*this.props.data.initialDonation}
                                        </Button>
                                    )}
                                </div>
                            </Grid.Row>
                            <Grid.Row style={{ paddingLeft: '10em' }}>
                                <div style={{ padding: '0.2em' }}>

                                    {/* ~~ amount */}
                                    <Input required
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            icon: 'eraser',
                                            content: 'restart to min sum',
                                            widths: '2em',
                                            onClick: () => {
                                                this.setState(Object.assign(this.state.donate_req, { monthly_donation: this.props.data.initialDonation }));
                                            }
                                        }}
                                        actionPosition='left'
                                        label={{ tag: true, content: 'your donation' }}
                                        labelPosition='right'
                                        placeholder="sum of monthly donation"
                                        defaultValue={this.state.donate_req.monthly_donation}
                                        value={this.state.donate_req.monthly_donation}
                                        onChange={this.handleChange}

                                    />
                                    {this.state.donate_req.monthly_donation === '' &&
                                        <Message
                                            error
                                            header='Action Forbidden'
                                            content='You must enter a sum of donation.'
                                        />
                                    }
                                </div>

                            </Grid.Row>
                            <Grid.Row>
                                <div style={{ paddingLeft: "10em" }}>
                                    <Checkbox toggle
                                        checked={!this.state.allowMonthlyDonation || this.state.donate_req.oneTimeCheck}
                                        disabled={!this.state.allowMonthlyDonation}
                                        label='one time donation'
                                        onClick={() => {
                                            this.state.donate_req.oneTimeCheck = !this.state.donate_req.oneTimeCheck;
                                            this.setState({ donate_req: this.state.donate_req });
                                        } 
                                    }
                                    />
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <label style={{ paddingLeft: '5em', color: '#20B2AA' }}>
                                    _________________________________________________________</label>
                            </Grid.Row>
                        </Grid>

                        {/*  ~~~~~~ Donate through ~~~~~~~~~~~~*/}
                        {
                            this.state.potential_referres && this.state.potential_referres.length &&
                            <div>
                        <Label style={{ backgroundColor: '#e6f2ff', fontSize: '14px', higth: '30px', marginTop: '3em' }}>
                            <Icon name='hand point right' />
                                were you referred by someone?    Please enter his e-mail and upgrade his status! :)
                </Label>
                            <br /> <br/>
                            <Dropdown text={this.state.donate_req.referred_by} placeholder='Referred By'>
                                <Dropdown.Menu>
                                    {
                                        this.state.potential_referres
                                            .map(referrer => <Dropdown.Item icon='mail' value={referrer} text={referrer} onClick={() =>this.handleChangeMail(referrer)} />)
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> || null
                        }

                        {/* ~~ form */}
                        <Form style={{ paddingTop: '1.5em', paddingLeft: '1.5em', marginLeft: '8em' }}>
    
                            <br />
                            {/* Add a dedication */}

                            <br />
                            <br />


                        </Form>

                    </Segment>
                }
                {this.state.coreStep === 2 &&
                    <div>
                        <Label tag style={{ backgroundColor: '#e6f2ff', fontSize: '12px', marginTop: '2em', marginBottom: '2em' }}>
                            {/* <Icon name='heart'   */}
                            Add a Dedication (optional)
                </Label>
                        <Form>
                            <Form.Input
                                width={4}
                                label='In Honor of:'
                                icon='heart'
                                iconPosition='left'
                                placeholder='name'
                                name="dedicatedTo"
                                onChange={this.handleChangeTitle.bind(this)}
                            />
                            <Form.TextArea
                                width={12}
                                label='Write a Dedication:'
                                rows={3}
                                placeholder='Text'
                                name="more"
                                onChange={this.handleChangeDescription.bind(this)}

                            />
                        </Form>

                        <br></br>

                    </div>
                }
                {this.state.coreStep === 3 &&
                    <div>
                        <h1>Connect to PayPal:</h1>
                        {this.state.donate_req.oneTimeCheck && this.createPayPalButton() || this.createPayPalSubscriptionButton()}
                        <br></br>
                    </div>
                }

                <div style={{ alignSelf: 'center' }}>
                    <Button.Group style={{ marginTop: '2em' }} >
                        <Button
                            name='btnPrev'
                            disabled={false}
                            color='blue'
                            labelPosition='left'
                            icon='left arrow'
                            content='prev'
                            onClick={this.prevButton}
                        />
                        <Button
                            disabled={this.state.nextAble}
                            name='btnNext'
                            color='blue'
                            labelPosition='right'
                            icon='right arrow'
                            content='Next'
                            onClick={this.nextButton}
                        />

                    </Button.Group>
                </div>
            </div>
        )
    }
}

