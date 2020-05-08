import React, { Component } from 'react'
import { Step, Segment, Image , Button, Grid,Form,Checkbox, Icon, Input, Label,Accordion, Message, Modal} from 'semantic-ui-react'
import axios from "axios";

////#08.05
import { PayPalButton } from "react-paypal-button-v2";


// const Isemail = require('isemail');

//  try to git

export default class Donate extends Component {
    constructor(props)
    {
        super(props)
        this.state = {

            // stef functionalety
            coreStep : 1, // the corrent step
            dicCompleteDonation: false,
            divActiveDonation : true,
            divActiveMore: false,
            divActivePayment: false,
            // activeStep:  'select Amount',
            nextAble: false,
            prevAble: true,

            // step
            
            active: 'select Amount',
            completed: '',
            disabled1: '',
            disabled2: '',
            //
            sumDonate: this.props.data.initialDonation,
            sumBtn: [10,20,30,40,50,100,200], // TODO : acordind min donation
            dThrough: '', // email of came throw
            showMessageReq: false,
            // dThroughId: '',


            // set json to state
            massageErrRequireFIeld: {},
            // the request to donation for server
            donate_req: {"user_id": 2, "org_id":this.props.data.org_id, "monthly_donation": this.props.data.initialDonation,
            "referred_by": '',"d_title": '',"d_description": '',"is_anonim" : false },
            
            findDuser: true,
            // next level
            finishDonate: false,
            //////
            pass2step: false,
            ableDonate:false

            // (user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id
            // TODO: 
      
        }
        this.handleClick = this.handleClick.bind(this);

        //
        this.handleClickBtn = this.handleClickBtn.bind(this);

        // handleChange (TODO - merge all)
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);


        // next butten
        this.nextButton = this.nextButton.bind(this);
        this.disableNextBtn = this.disableNextBtn.bind(this);

    
        // ~~~~~~~~
        this.donationProcess = this.donationProcess.bind(this);

        this.donateDisabel = this.donateDisabel.bind(this);


        // step
        this.switchStep = this.switchStep.bind(this);

    

    }

    //~~~~~~~~~~~~~~~~~~ function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
    donateDisabel()
    {
        if(this.state.dThrough !== '' && this.state.donate_req.referred_by === '')
            this.setState({ableDonate: true});
    }
    //~~~~~~~~~~~~~~~~~~~`

    donationProcess(){
        // TODO: massage that donate sucsess
        
        // this.setState({ donate_req.org_id: 5});
        // this.setState(Object.assign(this.state.donate_req,{org_id:'5'}));

        // req 
        axios.post('/donationProcess', this.state.donate_req
        ).then(res => 
        {
            alert("res is: " + res.data)

        }).catch(error=> {
            alert("error donationProcess" +  error);
        })
    }

    //~~~~~~~~~~ disableNextBtn  ~~~~~~``
    disableNextBtn(e){
        if(this.state.finishDonate)
            return true;
        else
            return false;
    }



//   onClick(event: SyntheticEvent, data: object)

    handleClick = (e, { title }) =>
    {
        // TODO:
        this.setState({ active: title })


// ? TODO : show the prev state        
        switch(title) {
            case 'select Amount':
                this.setState({coreStep: 1});
                break
            case 'more datails':
                this.setState({coreStep: 2});
                break
            case 'payment':
                this.setState({coreStep: 3});
                break
            default:
                this.setState({coreStep: 1});
          }

        
    }
    //~~~~~~~~~swich step ~~~ 
    switchStep()
    {
    
        switch(this.state.coreStep) {
            case 1:
                // alert("dThrough" + this.state.dThrough)
                // && this.state.donate_req.referred_by === '' )) // the mail doas not checkin
                // if(this.state.donate_req.referred_by === '' )
                // {
                //     alert("not finish")
                //     this.setState({massageErrRequireFIeld:true});
                //     alert("not 1")
                // }
                             
                // else{
                    alert("pass to 2")
                    this.setState({divActiveDonation: false, divActiveMore: true, dicCompleteDonation:true, coreStep: 2});
                    // activeStep:'more datails'
                   
                // }
                break;
            case 2:
                this.setState({divActiveMore: false, divActivePayment: true, coreStep: 3, nextAble: true});
                // activeStep:'payment'
                break;
            case 3:
                this.setState({divActivePayment: false, nextAble: true});
                break;
            default:
                // this.setState({ activeStep:' select Amount', coreStep: 1 })
                this.setState({ coreStep:1})
          }
    }

    // ~~~~~~~~~~~~ click on btn sum ~~~~~ 
    handleClickBtn(e) {
        // if(!(this.state.dThrough !== '' & this.state.donate_req.referred_by ==='')) // mail not empty ant not valid
        this.setState({nextAble: false})
        this.setState(Object.assign(this.state.donate_req,{monthly_donation:e.target.dataset.letter}));
      }
    // TODO:
        // set completes - to steps
    

    //~~~~~~~~handleChange   
    // TODO
    // לצרף את כל השינויים לפונ' אחת עם case


    //~~~~~~~~~~~~ change sum ~~~~~~~~~~~~~~
    handleChange(e) {
        if(e.target.value === '')
            this.setState({nextAble: true});
        else
            this.setState({nextAble: false});
        this.setState(Object.assign(this.state.donate_req,{monthly_donation: e.target.value}));
    }

    //~~~~~~~~~~~~~~~~ change mail (dThrow ~~~~~~~~~)
    handleChangeMail(e) 
    {
        this.setState(Object.assign(this.state.donate_req,{referred_by: ''}));
        this.setState({dThrough: e.target.value});
        this.setState({nextAble: false}); // able next btn

    }
    //d_title
    handleChangeTitle(e){
        this.setState(Object.assign(this.state.donate_req,{d_title: e.target.value}));

    }
    //d_description
    handleChangeDescription(e){
        this.setState(Object.assign(this.state.donate_req,{d_description: e.target.value}));

    }

    //~~~~~~~~~~~~~~~~~~~~~ donate proggress ~~~~~~~~~~~~
    // nextButton -> functionalety of donate proggress
    nextButton(e)
    {
        // ~~ start step 1~~~
        if( this.state.coreStep === 1) 
        {
                    // TODO: מיותר? מתי נעשת הבדיקה
            // if(this.state.donate_req.monthly_donation !== '') // sume field is not empty 
            // {
                // ~~ statr dThrow 
                if(this.state.dThrough !== '')  // dTrow -> need check if user exist in system (give a id)
                {
                    // TODO:    check the email syntax    
                    if(this.state.donate_req.referred_by === '') //-> check if do a request before
                    {
                        this.setState({ableDonate: true});
                        axios.get('/donate/findDThrouhUser/'+this.state.dThrough
                        ).then(res => 
                        {
                            if (res.status >= 400) {
                                throw new Error("Bad response from server");}
                            else if (res === "not found" || res.data.user_id === undefined) // the data is not null
                                {
                                    alert ("there are no user in system!")
                                    this.setState({dThrough: '' ,ableDonate: false});

                                    
                                    // , nextAble:false});
                                    // TODO: alert message in UI
                                }
                            else{ // give a id of the donate through
                                this.setState(Object.assign(this.state.donate_req,{referred_by: res.data.user_id}));
                                this.setState({ableDonate: false}); // donate able 
                                this.setState({nextAble: false});
                                
                            }	
                        }).catch(error=> {
                            alert(error);
                        })
                    }
                    
                    // check if finish a req
                    if (this.state.donate_req.referred_by !== ''){
                        this.setState({ableDonate: false});
                        this.switchStep();

                    }
                    alert("findDuser: " + this.state.findDuser + " finishDonate " + this.state.finishDonate)
                }
                // TODO (alert)
                else{ // the mail is ok
                    this.switchStep(); // switch step
                }
                // // ~~ end dThrow 
                // if(this.state.donate_req.referred_by === '' && this.dThrough !== '') // the mail doas not checkin
            // }
            // // # TODO !!!!
            // // ? מיותר? הכפתור לא מאופשר... DELETE?
            // else// the sum is empty
            // {
            //     alert(" not ok") // sun is empty
            //     this.setState({showMessageReq : true});
            //         // , sumDonate: this.props.data.initialDonation} );
            //     this.setState(Object.assign(this.state.donate_req,{monthly_donation: this.props.data.initialDonation}));
            //     // <Message
            //     //     error
            //     //     header='Action Forbidden'
            //     //     content='You must enter a sum of donation.'
            //     // />
            // }

            // -> // DO: delete the option of a empty sum
            if (this.state.donate_req.referred_by !== '')
                this.switchStep();
        } // ~~end step 1~~~
        else   // step 2 or 3                
            this.switchStep(); // switch step
    }

    // # 08.05 -> paypel
    createPayPalSubscriptionButton(vault) {

        return (
            <PayPalButton
                options={{ vault: true }}
                createSubscription={(data, actions) => {
                    return actions.subscription.create({ plan_id: 'P-XXXXXXXXXXXXXXXXXXXXXXXX' });
                }}
                onApprove={(data, actions) => {
                    // Capture the funds from the transaction 
                    return actions.subscription.get().then(function (details) {
                        // Show a success message to your buyer 
                        alert("Subscription completed");
                        // OPTIONAL: Call your server to save the subscription 
                        return fetch("/paypal-subscription-complete",
                            { method: "post", body: JSON.stringify({ orderID: data.orderID, subscriptionID: data.subscriptionID }) });
                    });
                }}
            />
        )
    }

    //PayPal button function:
    createPayPalButton() {

        return (
            <PayPalButton
                amount={this.state.sumDonate.toString()}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    });
                }}
            />)
    }
  


 // ~~~~~~~~~~ render ~~~~~~~~~~~~~~~~~~~~~```
  render() 
  {
   

    const styleBotton = 
    {
        margin: '1em',
        backgroundColor:'#20B2AA',
        textAlign: 'center',
        // text-decoration: none;
        display: 'inline-block',
        fontSize: '16px',
        padding: '32px 32px',
        border: '0.1em solid black' 
    }

    return (
      <div>
        <Step.Group widths={3} stackable='tablet' ordered = {true} fluid >
            
            <Step
                id = 'step1'
                // divActiveDonation
                
                active = {this.state.divActiveDonation}
                completed = {this.state.dicCompleteDonation}
                disabled = {this.state.dicCompleteDonation}

                // children 
                icon='dollar'
                link
                // onClick={this.handleClick}
                // onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true}
                title='select Amount'
                description='Choose your amount'
            />
            <Step
                id = 'step2'

                // active={active === 'more datails'}
                active = {this.state.divActiveMore}
                completed = {this.state.divActivePayment}
                disabled = {this.state.divActivePayment}
                icon='edit outline'
                link
                // onClick={this.handleClick}
                title='more datails'
                description='an additional information'
            />

            <Step
                id = 'step1' 
                // active={active === 'payment'}
                active = {this.state.divActivePayment}
                disabled = {!this.state.divActivePayment}
                icon='credit card'
                link
                // onClick={this.handleClick}
                title='payment'
                // description='an additional information'
     
            />
        </Step.Group>
        {/*       

        {/* divActiveDonation */}
        {this.state.coreStep === 1 && 
        // {this.state.divActiveDonation && 
            <Segment >
                <Grid>
                    <Grid.Row> 
                        <h4 style = {{marginLeft: '2em'}} >Donation amount (USD)</h4>
                    </Grid.Row>
                    <Grid.Row style ={{ paddingLeft: '4em'}}>
                        <Label style = {{backgroundColor: '#e6f2ff', fontSize: '14px'}}> 
                            <Icon name='hand point right' /> Select an amount or type another amount
                        </Label>
                    </Grid.Row>

                    <Grid.Row>
                    
                        {/* <h3 style = {{textAlign: 'center'}}>select amount:</h3> */}
                        <div>
                            {/* ~~ the sum buttons */}
                            {this.state.sumBtn.map(sums =>
                                <Button inverted circular style = {styleBotton} key={sums} data-letter={sums} onClick={this.handleClickBtn}>
                                {sums}
                                </Button>
                            )}
                        </div>
                    </Grid.Row>
                    <Grid.Row style ={{paddingLeft: '10em'}}>
                        <div style ={{padding: '0.2em'}}>
                            {/* <label  > other: </label> */}
                            {/* ~~ amount */}
                            <Input required
                                action={{
                                color: 'teal',
                                labelPosition: 'left',
                                icon: 'eraser',
                                content: 'restar to min sum',
                                widths: '2em',
                                onClick: () => 
                                    { 
                                        // TODO: message that not empty- end fill the minimum sum

                                        // this.setState(Object.assign(this.state.donate_req,{monthly_donation: ''}));
                                        // this.setState({nextAble: true});

                                        this.setState(Object.assign(this.state.donate_req,{monthly_donation: this.props.data.initialDonation}));

                                        // alert("state: " + this.state.donate_req.monthly_donation)

                                    }
                                // {this.setState({ sumDonate: ''})}
                                }}
                                actionPosition='left'
                                label={{ tag: true, content: 'your donation' }}
                                labelPosition='right'
                                placeholder= "sum of monthly donation"
                                defaultValue={this.state.donate_req.monthly_donation}
                                value={this.state.donate_req.monthly_donation}
                                onChange={this.handleChange}

                            />
                            {this.state.donate_req.monthly_donation == '' &&
                            <Message
                                error
                                header='Action Forbidden'
                                content='You must enter a sum of donation.'
                                />
                            }
                            {/* <Input
                                icon='tags'
                                iconPosition='left'
                                label={{ tag: true, content: 'Add Tag' }}
                                labelPosition='right'
                                placeholder='Enter tags'
                            /> */}

                            {/* <input value={this.state.sumDonate} style = {{textAlign: 'center'}} onChange={this.handleChange} /> */}
                            {/* <label> USD</label> */}
                        </div>
                        
                    </Grid.Row> 
                    {/* ADD ? */}
                    {/* <label > Donation amount (per month):</label> */}
  
                    <Grid.Row>  
                        <label style ={{paddingLeft: '5em' , color: '#20B2AA'}}>
                            _________________________________________________________</label>
                    </Grid.Row>  
                </Grid>

                {/* ~~ form */}
                <Form style = {{paddingTop: '1.5em' , paddingLeft: '1.5em'}}>
                    {/* <Form.Input
                        width={4}
						label= 'Donate through:'
						icon='user outline'
						iconPosition='left'
						placeholder='Donate through userName'
						name="dThrough"
						// onChange={this.handleChange.bind(this)}
					/> */}
                    <Form.Input
                            icon='mail'
                            iconPosition='left'
                            name = "dThrough"
                            id='dedicationEmail'
                            placeholder='mail'
                            width ={4}
                            // control={Input}
                            label= 'Donate through: (mail)'
                            placeholder='joe@schmoe.com'
                            value = {this.state.dThrough}
                            onChange = {this.handleChangeMail}
                            // error={{
                            //     content: 'Please enter a valid email address',
                            //     pointing: 'below',
                            // }}
                    />
                    {/* // TODO */}
                    {/* ~~ check if email is valid */}
                    {/* { this.state.dThrough && 
                        <div>{Isemail.validate(this.state.dThrough) &&
                        <div>valid</div> }
                        </div>
                    } */}
                    <Form.Button content='check' />

                        
                        {/* <Form.Field
                            label = 'Last Name'
                            width={4}
                            input = ''
                            placeholder='Sum donation'
                        /> */}
                        {/* Add a dedication */}
                        <Label tag style = {{backgroundColor: '#e6f2ff', fontSize: '12px' ,marginTop:'2em', marginBottom:'2em'}}> 
                            {/* <Icon name='heart'   */}
                            Add a dedication (optional)
                        </Label>



                         {/* /// TODO ! toggel to show their namw */}
                        <Form.Input
                            width={4}
                            label= 'In Honor of:'
                            icon='heart'
                            iconPosition='left'
                            placeholder='name'
                            name="dedicatedTo"
                            onChange={this.handleChangeTitle.bind(this)}
					    />
                        <Form.TextArea 
                            width={12}
                            label= 'Write a Dedication:'
                            rows={3} 
                            placeholder='Text'
                            name="more"
                            onChange={this.handleChangeDescription.bind(this)}

                        />
                        <Form.Field required>
                            < Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>

                        <Button type='submit'>Submit</Button>
                    </Form>
                    {/* <Grid.Row>
                        sum of donation: {this.state.sumDonate}
                    </Grid.Row> */}
            
            
            </Segment>
        }
        {/* ~~~ step 2 - more details */}
        {/*  // TODO: check if thesync find duser (by mail) found */}
        {this.state.coreStep === 2 && 
            <div>
                i am at 2
                 <Form>
                    <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
                <br></br>

            </div>
        }
        {this.state.coreStep === 3 &&
            <div>
                 <h1>Connection to PayPal:</h1>
                        <Icon name='money bill alternate outline' />
                        {this.createPayPalButton()}
                 <br></br>
                {/* DONATE */}
                <Button 
                    style = {{padding: '10em'}}
                    onClick = {this.donationProcess }
                    // referred_by
                    // disabled ={ !this.state.finishDonate }
                    disabled ={this.state.ableDonate}
                >DONATE</Button>

                <br></br>
            </div>
        }


        {/* <Button as='a' inverted={!fixed} onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true})}> */}


        {/* {this.state.showLogin && <LoginForm record={this.handlerClick}/>}
                    {this.state.showUser && <UserRegistrationForm />}
                    {!this.state.showLogin && !this.state.showUser &&
                    <div>
                    <But */}

        <div style ={{alignSelf: 'center'}}>
        <Button.Group >
            <Button
                name = 'btnPrev'
                // disabled = {this.disableButtons}
                disabled ={true}
                // active={active === 'select Amount'}

                color='blue'
                labelPosition='left' 
                icon='left arrow'
                content='prev'
            />
            <Button
                disabled ={this.state.nextAble}
                name = 'btnNext'
                color='blue'
                labelPosition='right' 
                icon='right arrow'
                content='Next'
                onClick = {this.nextButton}


                // label={{ basic: true, color: 'blue', pointing: 'right', icon:'right arrow' }}
                //  content: '2,048' }}
            />

        </Button.Group>
        </div>
        {/*  nassage of incoret value */}
        {/* { this.state.showMessageReq && <Modal
            trigger={this.nextButton}
            header='Reminder!'
            content='Call Benjamin regarding the reports.'
            actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
        />} */}

        {/* <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            onClose={this.close}
            >
            <Modal.Header>Delete Your Account</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete your account</p>
            </Modal.Content>9
            <Modal.Actions>
                <Button onClick={this.close} negative>
                No
                </Button>
                <Button
                onClick-={this.close}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Yes'
                />
            </Modal.Actions>
        </Modal> */}
        {/* ~~~ @ check ~~~ */}
        <div>
            <Button
                onClick = {this.switchStep}
            >
            </Button>
            
            {/* <p> {this.state.sumDonate} </p> */}
            <p>"referBy" {this.state.donate_req.referred_by} </p>
            <p>"sum " {this.state.donate_req.monthly_donation} </p>
            <p> "finish donae" {this.state.donate_req.referred_by}</p>
            <p> "dThrough": {this.state.dThrough} </p>
            <p>"core step" {this.state.coreStep} </p>

        </div>
    </div>
    )
  }
}

