import React, { Component } from 'react'
import { Step, Segment, Image , Button, Grid,Form,Checkbox, Icon, Input, Label,Accordion, Message, Modal} from 'semantic-ui-react'
import axios from "axios";

// const Isemail = require('isemail');

//  try to git

export default class Donate extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            coreStep : 1, // the corrent step
            divActiveDonation : true,
            divActiveMore: false,
            divActivePayment: false,
            active: 'select Amount',
            sumDonate: this.props.data.initialDonation,
            sumBtn: [10,20,30,40,50,100,200], // TODO : acordind min donation
            dThrough: null, // email of came throw
            showMessageReq: false,


            // set json to state
            massageErrRequireFIeld: {},
            data: []

            //
      
        }
        this.handleClick = this.handleClick.bind(this);

        //
        this.handleClickBtn = this.handleClickBtn.bind(this);

        // handleChange (TODO - merge all)
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        // next butten
        this.nextButton = this.nextButton.bind(this);

        




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

   
    
    handleClickBtn(e) {
        this.setState({
            sumDonate: e.target.dataset.letter
        });
      }
    // TODO:
        // set completes - to steps
    
    // TODO
    // לצרף את כל השינויים לפונ' אחת עם case
    handleChange(e) {
        this.setState({sumDonate: e.target.value});
    }

    // change mail
    handleChangeMail(e) {
        this.setState({dThrough: e.target.value});
    }

    //~~~~~~~~~~~~~~~~~~~~~ donate proggress ~~~~~~~~~~~~
    // nextButton -> functionalety of donate proggress
    nextButton(e){
        /*
        TODO:
        1. dont let a next button if all must field is empty

        */
        // all require field is not empty (sumDonate)
        if (this.state.sumDonate !== '')
        {
            alert("ok");
            if(this.state.dThrough != null) 
            { // ~~ check if the user in the system (and giv theier id)
                // TODO:  check the email syntax
                axios.get('/donate/findDThrouhUser/'+this.state.dThrough
                ).then(res => 
                {
                    if (res.status >= 400) {
                        throw new Error("Bad response from server");}
                    else if (res === "not found" || res.data.user_id == undefined) // the data is not null
                        {
                            alert ("there are no user insystem!")
                            this.setState({dThrough: null})
                            // TODO: alert message in UI
                        }
                    else{ // give a id of the donate through
                        alert("user_id: " + res.data.user_id)
                        this.setState({ dThroughId: res.data });
                        
                    }	
                }).catch(error=> {
                    alert(error);
                })
            }
        }
        else
        {
            alert(" not ok") // sun is empty
            this.setState({showMessageReq : true, sumDonate: this.props.data.initialDonation} );
            // <Message
            //     error
            //     header='Action Forbidden'
            //     content='You must enter a sum of donation.'
            // />
        }
    }
    // set json to state
    // this.setState({data: {"mail"}, });      



 // ~~~~~~~~~~ render ~~~~~~~~~~~~~~~~~~~~~```
  render() 
  {
    const { active } = this.state
    const {completed} = this.state
    const styleBotton = {
        margin: '1em',
        // width: '5em',
        // higte:'5em' 
        // width: '20%',
        // hight: '20%',
        backgroundColor:'#20B2AA',

        // borderRadius: '8em',
        textAlign: 'center',
        // text-decoration: none;
        display: 'inline-block',
        fontSize: '16px',
        padding: '32px 32px',
        
        border: '0.1em solid black' 



        

        // padding: '1em, 2em'
    }

    return (
      <div>
        <Step.Group widths={3} stackable='tablet' ordered = {true} fluid >
            
            <Step
                id = 'step1'
                active={active === 'select Amount'}
                //  completes = {completed === 'select Amount'}
                //   completed
                // children 
                icon='dollar'
                link
                onClick={this.handleClick}
                // onClick={() => this.setState({showLogin: true, showUser: false, showBackButton: true}
                title='select Amount'
                description='Choose your amount'
            />
            <Step
                id = 'step2'
                active={active === 'more datails'}
                icon='edit outline'
                link
                onClick={this.handleClick}
                title='more datails'
                description='an additional information'
            />

            <Step
                id = 'step1' 
                active={active === 'payment'}
                icon='credit card'
                link
                onClick={this.handleClick}
                title='payment'
                // description='an additional information'
     
            />
        </Step.Group>
        {/*       
            <Segment attached >
                <div id = ""></div>
                <div></div>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment> */}


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
                                content: 'clear',
                                widths: '2em',
                                onClick: () => {this.setState({ sumDonate: ''})}
                                }}
                                actionPosition='left'
                                label={{ tag: true, content: 'your donation' }}
                                labelPosition='right'
                                placeholder={this.state.sumDonate}
                                defaultValue={this.state.sumDonate}
                                value={this.state.sumDonate}
                                onChange={this.handleChange}

                            />
                            {this.state.sumDonate == '' &&
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
                            label= 'Donate through:'
                            placeholder='joe@schmoe.com'
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

                        {/* <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClickAcording}
                                style={{fontSize: '1.3em' }}
                            >
                            <Icon name='dropdown' />
                                : תאור
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                            <p style={{fontSize: '1em' }}>
                                {this.props.data.description}
                            </p>
                            </Accordion.Content>
                        </Accordion> */}
                        


                        {/* <Accordion as={Form.Field} panels={
                            [
                                {
                                    key: 'details',
                                    title: 'Optional Details',
                                    content: {
                                        <p style={{fontSize: '1em' }}>
                                        {this.props.data.description}
                                        </p>
                                        as: Form.Input,
                                        label: 'Maiden Name',
                                        placeholder: 'Maiden Name',
                                        },
                                
                                        content: {
                                        as: Form.Input,
                                        label: 'Maiden Name',
                                        placeholder: 'Maiden Name',
                                        },
                                },
                                
                               

                                
                                ]
                            } */}
                         {/* /// TODO ! toggel to show their namw */}
                        <Form.Input
                            width={4}
                            label= 'In Honor of:'
                            icon='heart'
                            iconPosition='left'
                            placeholder='name'
                            name="dedicatedTo"
                            // onChange={this.handleChange.bind(this)}
					    />
                        <Form.TextArea 
                            width={12}
                            label= 'Write a Dedication:'
                            rows={3} 
                            placeholder='Text'
                            name="more"
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
            </div>
        }
        {this.state.coreStep === 3 &&
            <div>
                <h1>TODO: conection to tranzila</h1>
                 <Icon  name ='money bill alternate outline' />
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
                name = 'btnNext'
                disabled
                color='blue'
                labelPosition='left' 
                icon='left arrow'
                content='prev'
            />
            <Button
                name = 'btnPrev'
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

    </div>
    )
  }
}

