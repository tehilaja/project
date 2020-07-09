import React from 'react';
import axios from "axios";
// import Select from 'react-select';


// import 'semantic-ui-css/semantic.min.css' // css libary
import { Header, Icon, Image, Label, Menu, Tab,Grid ,Segment, Button, Feed, Accordion, Select,Dropdown} from 'semantic-ui-react'



import OrgCard from './OrgCard.js'
// import orgData from './orgData.js'


// donate
import Donate from './Donate.js'
import GiftCard from './giftCard'

// import GiftCard from '../Extra/GiftCard'

import FeedComponent from '../Extra/Feed.js'
import { Link } from 'react-router-dom';


const levelOptions = [
    { key: 'all levels',value: 'all levels', text: 'all levels' }
  ];
const TAB_PICSEL = '2000px'



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
            org_id: this.props.data.id,
            allGifts : [], //all gifts of the organization
            showGifts: [], //gifts at chosen level
            gotGiftsFlag: false,
            showLogin: false,
            showUser: false,
            org_field_of_activity:[],

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
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        // get gifts
        this.getGifts = this.getGifts.bind(this)
        // select level
        this.selectLevel = this.selectLevel.bind(this)
        this.filterChooseLevel = this.filterChooseLevel.bind(this)
        // this.getGiftsToShow = this.getGiftsToShow.bind(this)
        this.checkIfGifts = this.checkIfGifts.bind(this)

        // css
    }
// ~~~~~~~~~~~~~~~~ function ~~~~~~~~~~~~~~~~~~~~~~~~~


    // selectLevel
    
        selectLevel (e, { value }) {
            this.setState({ selectedOptionLevel: value })
            this.filterChooseLevel(value)

        }
        

    // filter a chosen level
    filterChooseLevel(filter){
        let obj = [];
        if (filter === 'all levels'){
            this.setState({showGifts: this.state.allGifts})
        }
        else
        {
            if(!this.state.allGifts.length){
                return (<Label>No gifts yet for this organization</Label>);
            }else{
                this.state.allGifts.map(element =>{
                    if(element.l_name === filter)
                        obj.push(element)
                })
                this.setState({showGifts: obj})
            }
        }

    }


    getGifts = () => {
        this.state.allGifts.length = 0;
        (async () => {
          const response = await axios.get(`/orgPage/gifts/${this.props.data.orgDetails.org_id}`,
            { org_id: this.state.org_id},
            { headers: { 'Content-Type': 'application/json' } });
            this.setState({allGifts: response.data})
            this.setState({showGifts: response.data})
           
        })();
      }

    componentDidMount()
    {   
        
        this.getGifts();
        axios.get('/orgPage/getLevels/'+this.state.org_id
		).then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
			else if (res === "no data") // the data is not null
				alert ("no data!")
			else{
				
                res.data.forEach(function(level){
                    let giftobj ={};
                    giftobj["key"]=level.level_name;
                    giftobj["value"]=level.level_name;
                    giftobj["text"]=level.level_name;
                    levelOptions.push(giftobj);
                })
			}	
		})
		.catch(error=> {
			alert(error);
        })
        
		axios.get('/orgPage/get_org_field_of_activity/'+this.props.data.id)
		.then(res => 
			{
				if (res.status >= 400) {
					throw new Error("Bad response from server");}
				else if (res === "no data") // the data is not null
					alert ("no data!")
				else{
                    this.setState({org_field_of_activity: res.data});
				}
			})
			.catch(error=> {
				alert(error);
			
            })

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
         /*add donation to dataBase */
        if (this.state.DuserName !== "") // TODO: if find in db (func findDuser)
        {
            (async () => {
		 		const response = await axios.post(
					 '/donation',
         			{ 
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
                        alert("the donation " + this.state.initialDonation+ "$ added succesfully ")
                     }
                    else if(response.data ==="fail2"){
                        alert("the referred by is incorrect")
                    }
                    else if(response.data ==="fail1"){
                        alert("failed")
                    }
               })();  
        }
        else
            alert("please enter Referred details")		
	}
 

     clickToDonate()
     {
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
    }
    

    handleClickAcording = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

    checkIfGifts(){
        if(!this.state.showGifts.length){
                return (<Label>No gifts yet for this organization</Label>);
            }else{
                return (this.state.showGifts.map(gift =>{
                    return(
                        <GiftCard  gifts ={gift}  
                        />)
                }));
            }
    }
    

//----------render------------------
    render() 
    {
        const giftComponents = this.checkIfGifts();
    
    
        const { valueLevel } = this.state // level
      
        const styles = 
        {
            fontStyle: "italic",
            color: "rgb(30, 100, 121)"
        }
        const nameDonateThrough = this.state.firstName
        const { activeIndex } = this.state

        //------  menu bar
        const panes = [
            {
            // ~~~~~~~~~~~~~~ about ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              menuItem: { key:'about', icon: 'users', content: 'About Us' },
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
                                        {/* org_field_of_activity */}
                                        { this.state.org_field_of_activity.length &&
                                        this.state.org_field_of_activity.map(field =>
                                            <Label basic as='a' content={field.field_name} icon='tag' iconPosition='right'/>
                                         )
                                         }
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
                                    {/* add link to organization homepage */}
                                    <Grid.Column textAlign='center'>
                                    {this.props.data.orgDetails.website&&
                                    // content='Next' icon='right arrow' labelPosition='right'
                                        <Button basic color='blue'
                                            size='huge' icon='world'
                                            onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href=`${this.props.data.orgDetails.website}`;
                                            }}>Visit Our Website
                                        </Button>}
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
                  Messages<Icon name='envelope' />
                </Menu.Item>
              ),
              render: () => <Tab.Pane  attached={false} >
                  <FeedComponent data={{loggedIn: this.state.loggedIn, userName: this.state.userName, feed_type: 'org', feed_type_id:this.state.org_id}}/>
                  </Tab.Pane>,
            },

            // ~~~~~~~~~~~~~~ donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {
                menuItem: { key:'donate', icon: 'money bill alternate outline', content: 'Donate' },
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
                                {giftComponents}
                            </Grid.Row>
                        </Grid>
                    
                </Tab.Pane>,
                
              },

          ]

    //---------return------------------------------
    if(this.props.data.orgDetails !== null)
    {
        return(
            <div className = "orgBody_css">
                    
                <Segment style={{ padding: '5em 0em', width: '100%', background:'#F5F5F5', textAlign:'center'}} vertical>
                    <Grid >
                    {/* <Grid style = {{margin: '2em, 0.7em'}}> */}

                        <Grid.Row>
                            <header style ={{backgroundColor: '#008080' ,backgroundImage : this.props.data.orgDetails.img_url ,width:'100%',height: '105%' ,padding: '5em ,5em', textAlign:'center'}}>
                            {/* background-color: green;0.3; */}
                                <img  src={this.props.data.orgDetails.img_url} style = {{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '28%'}}/>
                                
                                {/* style={{ padding: '3em 3em' }} */}
                                
                            </header>
                            {/* <Image  floated='right'  size='large' src={this.props.data.img} style={{ padding: '3em 3em' }} fluid /> */}
                        </Grid.Row>

                        <Grid.Row>
                            <Tab style={{ padding: '0.2em 1.5em' ,width:TAB_PICSEL}} defaultActiveIndex={2} menu={{ color:'teal' ,vertical: true, inverted: true, attached: true, tabular: true, pointing: true}} panes={panes} />
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