import React from 'react';
import axios from "axios";

// import 'semantic-ui-css/semantic.min.css' // css libary
import { Header, Icon, Image, Label, Menu, Tab,Grid ,Segment, Button, Feed, Accordion} from 'semantic-ui-react'


import OrgCard from './OrgCard.js'
// import orgData from './orgData.js'
import OrgSpechCard from './OrgSpechCard.js'

// donate
import Donate from './Donate.js'


import Doners from "./Doners.js"

class OrgBody extends React.Component {
    constructor(props)
    {
        super(props)
        // this.details ={
        //     firstName: "",
        //     lastName: ""
        // }
        this.state = 
        {
            // firstName: "",
            // email: "",
            showLogin: false,
            showUser: false,
            // organization: orgData,
            btnDonateClicked: false,
            confirmBtn: false,
            initialDonation : this.props.data.orgDetails.min_donation,
            // initialDonation : this.props.orgDetails.min_donation,



            color: "F33333",
            userName: "a", // -
            DuserName: "",
            DuserId: "",
            userEmail: "", // -
            // user_id: 5 // todo : real info
            activeIndex: 0 // to active >
        }
     

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this) 
        this.clickToDonate = this.clickToDonate.bind(this) 
        this.handleClickAcording = this.handleClickAcording.bind(this)

        // this.findDuser = this.findDuser.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

        // css
    }

    componentDidMount()
    {
        // alert("first " + this.props.data.orgDetails.min_donation);
        // alert(" hi "+ this.state.initialDonation)

    }

    //---------increment +----------
    increment() 
    {
            this.setState(prevState => {
                return {
                    initialDonation: prevState.initialDonation + 1
                }
            })
    }
    //---------decrement--------------
    decrement()
     {
        if (this.state.initialDonation !== this.props.data.orgDetails.min_donation)
        {
            this.setState(prevState => {
                return {
                    initialDonation: prevState.initialDonation - 1
                }
            })
        }
    }

    //---------componentDidUpdate-------
    componentDidUpdate(prevProps, prevState) {
        // const newColor = ''
        if(prevState.initialDonation !== this.state.initialDonation) 
        {
            if(this.state.initialDonation ===this.props.data.orgDetails.min_donation)
                this.setState({color: '#F33333'})
            else
                this.setState({color: 'black'})
        }
    }

    //----------handleClick-------------
    handleClick(id)
    {
        alert("id: "+id )
        this.setState(prevState => {
            return {
                clicked: !prevState.clicked
            } 
        })
    }
    

    // ---- add Donation
	handleSubmit=(e)=>{
        e.preventDefault();
        // alert("s", this.state.DuserName)
         /*add donation to dataBase */
        if (this.state.DuserName !== "") // TODO: if find in db (func findDuser)
        {
            (async () => {
		 		const response = await axios.post(
					 '/donation',
         			{ 
                        // todo- level(update +1), 
						// user_id:this.state.user_id, org_id:this.props.data.id, monthly_donation:this.state.initialDonation,  // ---- req
                        // level:1, referred_by:this.state.DuserName
                        // this.props.data.orgDetails.min_donation
                        org_id:this.props.data.orgDetails.org_id, monthly_donation:this.state.initialDonation,  // ---- req
                        level:1, referred_by:this.state.DuserName
                    },
                     {header:{'Content-Type': 'application/json'}}
                     )
                    console.log("resp",response)
                    if(response.data === "no conection"){
                        alert("you need to login...")
                    }
                    else if(response.data ==="added succesfully!"){
                    // this.setState({loggedIn: false})
                        alert("the donation " + this.state.initialDonation+ "$ added succesfully ")
                     }
                    else if(response.data ==="fail2"){
                        alert("the referred by is incorrect")
                    }
                    else if(response.data ==="fail1"){
                        alert("the level")
                    }
               })();  
        }
        else
            alert("please enter Referred detiles")
        // this.set
		
	}
    //---------onSumbit---------------
    // onSumbit()
    // {

    // } 


    //-------- findDuser ---------
    // findDuser(){
    //     if(this.state.DuserName!="")
    //     {
    //         (async () => {
    //             const response = await axios.post(
    //                 '/findDuser',
    //                 {userD:this.state.DuserName},
    //                 {header:{'Content-Type': 'application/json'}}
    //                 )
    //                 console.log("resp",response)
    //                 if(response.data == "fail"){
    //                     alert("the user not found")
    //                 }
    //                 else if(response.data != " "){
    //                 // this.setState({loggedIn: false})
    //                 this.setState({DuserId: response.data})
    //                 alert("id " + this.state.DuserId)
    //                 }
    //             })(); 
    //     }
    //     else
    //         alert("you must to enter a name that you Referred to this organization by")
    // }

     //----------clickToDonate--------------------
     clickToDonate()
     {
         // alert("clickToDonate")
         this.setState(prevState => {
             return {
                 confirmBtn: !prevState.confirmBtn
             } 
         })
     }
    
     handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
        })
        // this.findDuser() // find the throw donate
        // alert(this.state.DuserId)
    }
    
    //## ------ css ------ ##

  
    // ## 
    handleClickAcording = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

      // step (donation)

    //   handleClick = (e, { title }) => this.setState({ active: title })
	
//----------render------------------
    render() 
    {
        const styles = 
        {
            fontStyle: "italic",
            color: "rgb(30, 100, 121)"
        }
        const nameDonateThrough = this.state.firstName
        const { activeIndex } = this.state

        // for step (donation)
        // const { active } = this.state



        //------  menu bar
        const panes = [
            {
            // ~~~~~~~~~~~~~~ about ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              menuItem: { key:'about', icon: 'users', content: 'about as' },
              render: () => 
              <Tab.Pane> 
                   <div>
                        <Segment style={{ padding: '0.5em 0em' }} vertical>
                            <Grid container stackable verticalAlign='middle'>
                                <Grid.Row>
                                    <Header as='h2' icon='address card outline' content='About' />
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header as='h3' style={{ fontSize: '1.3em' }}>
                                           : תחום הפעילות 
                                        </Header>
                                        <p style={{ fontSize: '1em' }}>
                                            {this.props.data.orgDetails.field_of_acctivity}
                                        </p>
                                       5
                                        {/* // option to hide text */}
                                        <Accordion>
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
                                                {this.props.data.orgDetails.description}
                                            </p>
                                            </Accordion.Content>
                                        </Accordion>
                                        
                                    </Grid.Column>
                                    <Grid.Column floated='right' width={6}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Image  floated='right'  size='large' src={this.props.data.orgDetails.org_pic} style={{ padding: '3em 3em' }} />
                                            </Grid.Column> 
                                            <Grid.Column>


                                            <Header as='h3' style={{ fontSize: '1.3em' }}>
                                            : מספר חברה
                                            </Header>
                                            <p style={{ fontSize: '1em' }}>
                                                {this.props.data.orgDetails.org_num}
                                            </p>
                                            <Header as='h3' style={{ fontSize: '1.3em' }}>
                                             :שם מנהל
                                            </Header>
                                            <p style={{ fontSize: '1em' }}>
                                                {this.props.data.orgDetails.admin_name}
                                            </p>
                                            <Header as='h3' style={{ fontSize: '1.3em' }}>
                                                : שנת הקמה
                                            </Header>
                                            <p style={{ fontSize: '1em' }}>
                                                {this.props.data.orgDetails.founding_year} 
                                            </p>


                                            </Grid.Column>  
                                        
                                        </Grid.Row>
                                    </Grid.Column>
                                </Grid.Row>
                                
                                <Grid.Row>
                                    <Grid.Column textAlign='center'>
                                        <Button size='huge'>Check Them Out</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </div>
                    
                <br/>
              </Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='messages'>
                  Messages<Label>15</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane  attached={false} >Tab 2 Content</Tab.Pane>,
            },

            // ~~~~~~~~~~~~~~ donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {
                menuItem: { key:'donate', icon: 'money bill alternate outline', content: 'Donate' },
                // <Menu.Item key='comments'>
                //     Messages<Label>15</Label>
                //   </Menu.Item>
                // ),
                render: () => <Tab.Pane >

                    <div className = "donate" >
                    <Segment style={{ padding: '0.5em 1.5em' }} vertical>
                        <Grid>
                            <Grid.Row>
                                <Header as='h2' icon='handshake outline' content='Donate' />
                            </Grid.Row>
                            <Grid.Row>

                           
                                <div>
                                    <Donate data={{initialDonation: this.state.initialDonation}} />
                                    {/* <Step.Group>
                                    <Step
                                        active={active === 'Shipping'}
                                        icon='truck'
                                        link
                                        onClick={this.handleClick}
                                        title='Shipping'
                                        description='Choose your shipping options'
                                    />
                                    <Step
                                        active={active === 'Billing'}
                                        icon='credit card'
                                        link
                                        onClick={this.handleClick}
                                        title='Billing'
                                        description='Enter billing information'
                                    />
                                    </Step.Group> */}
                                </div>
                                                            
                            </Grid.Row>
                            <Grid.Row>
                                
                                
                            </Grid.Row>
                        </Grid>

                    
                            

                            {/* -- Donation amount */}
                            {/* <div className = "initialDonation">
                                <label > Donation amount (per month):</label>
                                <label className= "initialDonationValue"  type="text" style={{color: this.state.color}}> {this.state.initialDonation}</label> */}
                                {/* <input className= "initialDonationValue"  type="text" style={{color: this.state.color, width:25}} placeholder = {this.state.initialDonation}></input> */}

                                {/* <lable>$  </lable>
                                <button onClick={this.decrement}>-</button>
                                <button onClick={this.increment} >+</button>
                            </div> */}

                            {/* <button className ="btnDonateOrg" onClick ={() => this.setState(prevState => {
                                return {
                                    btnDonateClicked: !prevState.btnDonateClicked
                                }})}>donate 
                            </button> */}


                            {/* Donation throw information... */}
{/*                             
                            {this.state.btnDonateClicked && 
                                <div className = "doners"> */}
                                    {/* * TODO: if no Referred to */}
                                    {/* <h4 style ={styles} >Referred to this organization by: </h4>
                                    <form className="fillFormDoners" onSubmit={this.handleSubmit}>
                                        <lable htmlFor = "dname">name: </lable>
                                        <input id = "dname"
                                            type="text" name="DuserName" onChange={this.handleChange.bind(this)} 
                                            placeholder="user Name" 
                                        /><br /><br/> */}
                                        {/* <lable>email: </lable>
                                        <input 
                                            input type="email"
                                            name="userEmail" 
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="email" 
                                        /> <br/><br/> */}
                                        
                                        {/* <input className="btnConfirm"  type="submit" value="Submit"></input>             
                                        <br/><br/>
                                    </form>
                                </div> */}
                            {/* } */}
                        </Segment>
                    </div>
                    
                </Tab.Pane>,
              },

            // ~~~~~~~~~~~~~~ gift ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              {
                menuItem: { key:'gifts', icon: 'gift', content: 'Gifts' },
                
                render: () => <Tab.Pane  attached={false} >
                   <Grid columns={3} divided>
                        <Grid.Row>
                            <Header as='h2' icon='gift' content='Gift' />
                        </Grid.Row>
                        <Grid.Row>
                                
                            <Grid.Column >
                                <p>
                                {this.props.data.orgDetails.description}
                                
                                </p>
                                ghcvdhcvghvhgdv hjjjjjjjjjjjjjjjjjjjjjj
                            </Grid.Column>

                            <Grid.Column >
                                <div className="org-spech-card">
                                    {/* <h3>id = {this.props.data.id}</h3> */}
                                    <h1> {this.props.data.orgDetails.org_name} </h1>
                                    <img src = {this.props.data.orgDetails.org_picimg}></img>
                                </div>
                                {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Tab.Pane>,
                
              },

               // ~~~~~~~~~~~~~~ comment ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              {
                menuItem: { key:'comment', icon: 'comment', content: 'comment' },                
                render: () => <Tab.Pane   >
                    <Header as='h2' icon='comment' content='Comment' />
                    <Feed>
                        <Feed.Event>
                        <Feed.Label>
                            <img src='/images/avatar/small/elliot.jpg' />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                            <Feed.User>Elliot Fu</Feed.User> added you as a friend
                            <Feed.Date>1 Hour Ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Meta>
                            <Feed.Like>
                                <Icon name='like' />4 Likes
                            </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>
                        </Feed.Event>`
                    </Feed>
                </Tab.Pane>,
              },

           

          ]

    //---------return------------------------------
        return(
            <div className = "orgBody_css">
                    
                    {/* users
                    group */}
                {/* <Header dividing textAlign='right' style={{ fontSize: '2em', padding:'0.5em, 5em', marginTop:'0.5em'}}>
                    {this.props.data.name} */}
                    {/* <  Icon  style={{ marginLeft: '0.7em' , marginRight: '1.5em', color:'blue'}} name='group' circular />  */}
                {/* fontStyle: "italic" */}
                     {/* {this.props.data.name} */}
                     {/* <Image size='massive' src={this.props.data.img} style={{marginLeft: '3em' }}/> */}
                {/* </Header> */}


                {/* <image src = {this.props.data.img} ></image> */}



                <Segment style={{ }} vertical>
                            <Grid >
                            {/* <Grid style = {{margin: '2em, 0.7em'}}> */}

                                <Grid.Row>
                                    <header style ={{backgroundColor: '#20B2AA' ,backgroundImage : this.props.data.orgDetails.org_pic ,width:'100%',height: '20em' ,padding: '2em ,2em', margin: ''}}>
                                    {/* background-color: green;0.3; */}
                                        <img  src={this.props.data.orgDetails.org_pic} style = {{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '28%'}}/>
                                        
                                        {/* style={{ padding: '3em 3em' }} */}
                                        
                                    </header>
                                    {/* <Image  floated='right'  size='large' src={this.props.data.img} style={{ padding: '3em 3em' }} fluid /> */}


                                </Grid.Row>

                                <Grid.Row>
                                    <Tab style={{ padding: '0em 0.2em' }} defaultActiveIndex={2} menu={{ color:'blue' ,vertical: true, inverted: true, attached: true, tabular: true, pointing: true}} panes={panes} />

                                </Grid.Row>
                               
                            </Grid>
                </Segment>



                <Header>
                    <Image  floated='right'  size='large' src={this.props.data.orgDetails.org_pic} style={{ padding: '3em 3em' }} />

                </Header>
                {/* // menu bar side */}
                {/* <Tab style={{ padding: '1em 0em' }} menu={{ color:'blue' ,vertical: true, inverted: true, attached: true, tabular: true, pointing: true}} panes={panes} /> */}

                 {/* --------------- css --  */}
                


                {/* //
                <h3>{nameDonateThrough}</h3>
                <p>Your name: {this.state.DuserName} {this.state.userEmail}</p>  
                 */}
            </div>
        )
    }
    
}

export default OrgBody