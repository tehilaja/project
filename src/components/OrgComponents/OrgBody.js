import React from 'react';
import axios from "axios";
// import Select from 'react-select';


// import 'semantic-ui-css/semantic.min.css' // css libary
import { Header, Icon, Image, Label, Menu, Tab,Grid ,Segment, Button, Feed, Accordion, Select,Dropdown} from 'semantic-ui-react'



import OrgCard from './OrgCard.js'
// import orgData from './orgData.js'
import OrgSpechCard from './OrgSpechCard.js'

// donate
import Donate from './Donate.js'
import giftCard from './giftCard'

import Donors from "./Donors.js"
import FeedComponent from '../Extra/Feed.js'


const levelOptions = [
    { key: 'all levels',value: 'all levels', text: 'all levels' },
    { key: 'all Donars',value: 'all Donars', text: 'all Donars' },
    { key: 'silver',value: 'silver', text: 'silver' },
    { key: 'gold',value: 'gold', text: 'gold' },
    { key: 'platinum',value: 'platinum', text: 'platinum' },
  ];



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
            loggedIn: this.props.data.loggedIn,
			userName: this.props.data.userName,
            org_id: this.props.data.orgDetails.org_id,
            Allgifts : [], // the information about gifts
            giftShow: [],

            showLogin: false,
            showUser: false,

            // organization: orgData,
            btnDonateClicked: false,
            confirmBtn: false,
            initialDonation : this.props.data.orgDetails.min_donation,
            field_of_activity: this.props.data.org_field_of_activity,
           
            // initialDonation : this.props.orgDetails.min_donation,



            color: "F33333",
            DuserName: "",
            DuserId: "",
            userEmail: "", // -

            activeIndex: 0, // to active >
            selectedOptionLevel: null // gift
        }
     

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this) 
        this.clickToDonate = this.clickToDonate.bind(this) 
        this.handleClickAcording = this.handleClickAcording.bind(this)

        // this.findDuser = this.findDuser.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        // get gifts
        this.getGifts = this.getGifts.bind(this)
        // select level
        this.selectLevel = this.selectLevel.bind(this)
        this.filterChooseLevel = this.filterChooseLevel.bind(this)

        this.listOfField = this.listOfField.bind(this)


        // css
    }
// ~~~~~~~~~~~~~~~~ function ~~~~~~~~~~~~~~~~~~~~~~~~~


    // selectLevel
    
        selectLevel (e, { value }) {
            this.setState({ selectedOptionLevel: value })
            this.filterChooseLevel(value)

        }
        

    // filter an a choosen level
    filterChooseLevel(filter){
        let obj = [];
        if (filter === 'all levels'){
            this.setState({giftShow: this.state.Allgifts})
            // alert("all : "+ this.state.giftShow.length)
        }
        else
        {
            this.state.Allgifts.map(element =>
            {
                if(element.l_name === filter)
                    // this.state.giftShow.push(element)
                    obj.push(element)

            })
            this.setState({giftShow: obj})
            // alert("gifts: " + JSON.stringify(this.state.giftShow))
        }

    }



// get gifts list (call from commponentDidMount )
// /orgPage/gifts/:org_id

    getGifts()
    {
        axios.get('/orgPage/gifts/'+this.props.data.orgDetails.org_id).then(res => 
        {
            if (res.status >= 400) {
                throw new Error("Bad response from server");}
            // this.setState(Object.assign(this.state.donate_req,{referred_by: res.data.user_id}));
            // alert("res: \n"+ JSON.stringify(res.data[0].l_name)); // how data came from server
            // alert("res:\n" + res)
                return res
            }).then(respones=>
                {
                    this.setState({Allgifts: respones.data});
                    this.setState({giftShow: respones.data}); 
 
                    // 

            // alert("data \n " + JSON.stringify(res.data))
            // if (this.state.Allgifts !== null){
            //     // alert(this.state.Allgifts[0].l_name)
            //     alert(" Allgifts: \n" , this.state.Allgifts)
            // }
                


                // alert(this.Allgifts[0].l_name)
  
                    	
        }).catch(error=> {
            alert(error);
        })
    }



    componentDidMount()
    {
        // alert("org details: \n"+ JSON.stringify(this.props.data))
        // alert("org_id \n" + this.props.data.orgDetails.org_id )
        // fetch('/data', {
        //     method: 'GET'
        // }).then(function(response) {
        //     if (response.status >= 400) {
        //         throw new Error("Bad response from server");
        //     }
        //     return response.json();
        // }).then(function(data) {
        //     this.setState({Allgifts: data});
        // }).catch(err => {
        // console.log('caught it!',err);
        // })
    
    
        this.getGifts()
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
                    if(response.data === "no connection"){
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
    
    listOfField()
    {

    }

      // step (donation)

    //   handleClick = (e, { title }) => this.setState({ active: title })
	
//----------render------------------
    render() 
    {
        // all gifts show
        
        const giftComponents = this.state.giftShow.map(gift =>{
            return(
                <giftCard  gifts ={gift}  
                />)
        })
       
        // const levelOptions = [
        //     { key: 'all', value: 'all', text: 'all' },
        //     { key: 'silver', value: 'silver', text: 'silver' },
        //     { key: 'gold', value: 'gold', text: 'gold' },
        //     { key: 'platinium', value: 'platinium', text: 'platinium' }
        //   ]
        const { valueLevel } = this.state // level
      
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
              <Tab.Pane > 
                   <div style={{paddingLeft: '2em'}}>
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
                                            {/*  TODO : show list of activity */}
                                            {/* {this.state.field_of_activity} */}
                                            {/* {this.props.data.orgDetails.field_of_activity} */}
                                        </p>
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
                                                <Image  floated='right'  size='large' src={this.props.data.orgDetails.img_url} style={{ padding: '3em 3em' }} />
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
              render: () => <Tab.Pane  attached={false} >
                  <FeedComponent data={{loggedIn: this.state.loggedIn, userName: this.state.userName, feed_type: 'org', feed_type_id:this.state.org_id}}/>
                  </Tab.Pane>,
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
                        <Grid style ={{paddingLeft: '2em'}}>
                            <Grid.Row>
                                <Header as='h2' icon='handshake outline' content='Donate' />
                            </Grid.Row>
                            <Grid.Row>                           
                                <div>
                                    <Donate data={{initialDonation: this.state.initialDonation, org_id: this.props.data.orgDetails.org_id,loggedIn: this.props.data.loggedIn,userName: this.props.data.userName}} />
                                   
                                </div>
                                                            
                            </Grid.Row>
                            <Grid.Row>                                
                            </Grid.Row>
                        </Grid>
                        </Segment>
                    </div>
                    
                </Tab.Pane>,
              },

            // ~~~~~~~~~~~~~~ gift ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              {
                menuItem: { key:'gifts', icon: 'gift', content: 'Prizes' },
                
                render: () => 
                    <Tab.Pane  attached={true} >
                        <Grid style ={{marginLeft:'1em' ,width: '100%'}} columns={3} divided>
                            <Grid.Row>
                                <Header style ={{marginLeft:'1em'}} as='h2' icon='gift' content='Prizes' />
                            </Grid.Row>
                            <Grid.Row>
                                <Label style = {{fontSize: '16px' ,marginTop:'2em', marginBottom:'2em'}}> 
                                    the prizes of this organization: 
                                </Label>
                            </Grid.Row>
                            <Grid.Row>
                                {/* selection option (level select) */}
                                <Dropdown
                                    // fluid
                                    selectio
                                    // selectOnNavigation 
                                    onChange={this.selectLevel}
                                    options={levelOptions}
                                    placeholder='Choose an option'
                                    selection
                                    value={valueLevel}
                                />
                            </Grid.Row>

                            <Grid.Row>  

                                {/* show the gifts
                                    // TODO: filter objects
                                */}
	                              {giftComponents}
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
    if(this.props.data.orgDetails !== null)
    {
        return(
            <div className = "orgBody_css">
                    
                <Segment style={{ }} vertical>
                    <Grid >
                    {/* <Grid style = {{margin: '2em, 0.7em'}}> */}

                        <Grid.Row>
                            <header style ={{backgroundColor: '#008080' ,backgroundImage : this.props.data.orgDetails.img_url ,width:'100%',height: '100%' ,padding: '2em ,2em', margin: ''}}>
                            {/* background-color: green;0.3; */}
                                <img  src={this.props.data.orgDetails.img_url} style = {{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '28%'}}/>
                                
                                {/* style={{ padding: '3em 3em' }} */}
                                
                            </header>
                            {/* <Image  floated='right'  size='large' src={this.props.data.img} style={{ padding: '3em 3em' }} fluid /> */}
                        </Grid.Row>

                        <Grid.Row>
                            <Tab style={{ padding: '0.2em 1.5em' }} defaultActiveIndex={2} menu={{ color:'teal' ,vertical: true, inverted: true, attached: true, tabular: true, pointing: true}} panes={panes} />

                        </Grid.Row>
                        
                    </Grid>
                </Segment>


                <Header>
                    <Image  floated='right'  size='large' src={this.props.data.orgDetails.img_url} style={{ padding: '3em 3em' }} />

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
    
}

export default OrgBody