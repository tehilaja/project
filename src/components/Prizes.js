import React from 'react';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import HeaderP from './Header.js';
import Footer from './Footer.js';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import GiftCard from './OrgComponents/giftCard'


import {Grid, Icon, Segment,Button,Image,Header} from 'semantic-ui-react';

const s3Util = require('../utilities/upload').methods;
const levelOptions =[{ key: 'all levels',value: 'all levels', text: 'all levels' }];
const filterButton =[];

class Prizes extends React.Component{
  constructor(props) {
    super(props)  
    this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
            program_admin: this.props.data.program_admin,
            routeMain: false,
            check_login_status: false,
            images: [],
            filterImeges:[],
            allgiftLevels:[],
            filterGift:[],
            orgs:[],
            selectedOrg: null
           
        }
        
        // this.getImages();
        this.handleClickBtnOrg = this.handleClickBtnOrg.bind(this);

        
  }
  
  componentDidMount()
  {
    axios.get('/list_of_org').then(res => 
      {
        if (res.status >= 400) {
          throw new Error("Bad response from server");}
        else if (res === "no data") // the data is not null
          alert ("no data!")
        else{
          this.setState({orgs: res.data})
        }	
      }).catch(error=> {
        alert(error);
      })

    // -------------
    axios.get('/get_gift_and_levels').then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
			else if (res === "no data") // the data is not null
				alert ("no data!")
			else{
        this.setState({allgiftLevels: res.data})
        this.setState({filterGift: res.data})
        
        // -----
        const imgs = res.data.map(gift => {
          const image = {};          
          image.original = gift.gift_pic;
          image.thumbnail = gift.gift_pic;
          return image;
        });
        this.setState({images: imgs});
        this.setState({filterImeges: imgs});

        
        
        // ------
      
			}	
		})
		.catch(error=> {
			alert(error);
		})
  }


    getImages() {
        s3Util.getFilesFromFolder('prizes', (res) => {
          if (Array.isArray(res)) {

            const imgs = res.map(url => {
              const image = {};
              image.original = url;
              image.thumbnail = url;
              return image;
            });
            this.setState({images: imgs});

          }
        });
      }

      handleClickBtnOrg(e, { value }){
        this.filterChooseOrg(value);

      }

      filterChooseOrg(filter)
      {
        let obj = [];
        let objG = []
        if (filter === 'all organization' ){
          this.setState({filterImeges: this.state.images});
          this.setState({filterGift: this.state.allgiftLevels})
        }
        else{
          this.state.allgiftLevels.map(element =>{
            if(element.org_name === filter)
            {
                objG.push(element)
                const image = {};
                image.original = element.gift_pic;
                image.thumbnail = element.gift_pic;
                obj.push(image)
            }
          })
        this.setState({filterImeges: obj})
        this.setState({filterGift: objG})
        }
      }

        
      //     this.state.allgiftLevels.map(gift =>{
      //       if(gift.l_name === filter)
      //       objG.push(gift)
      //   })
      //   this.setState({showGifts: objG})
      // }
    

  render() {

    const giftComponents = this.state.filterGift.map(gift =>{
      return(
        <GiftCard gifts={gift}/>
        )
    })

    const { valueLevel } = this.state // level

    const styleBotton = 
    {
        margin: '1em',
        backgroundColor:'olive',
        textAlign: 'center',
        // text-decoration: none;
        display: 'inline-block',
        fontSize: '12px',
        padding: '24px 24px',
        border: '0.1em solid black' 
    }
    const styleBottonOrg ={
      margin: '1em',
      border: '0.1em solid black' ,
      size: '5em, 10em'
      // display: 'inline-block'
    }
    return(
      <div>
          <div style ={{marginTop:'2em', marginLeft:'10em'}} >
            <div></div>
            <Icon size ='huge' name = 'gift'></Icon>
            <label style ={{fontSize: '40px'}} >  Prizes</label>
           <br/><br/>
              <div style ={{marginLeft:'5em'}}>
              <Button 
                  inverted circular 
                  // content = "all organization"
                  key="all organization"
                  // data-letter="all organization"
                  style = {{margin: '1em',border: '0.1em solid black',size: '5em, 10em',backgroundColor: 'olive'}}
                  value = "all organization"
                  // lable = "All organization"
                  onClick={this.handleClickBtnOrg}>All organization
                  {/*  floated='right'  size='tiny'  style={{ padding: '3em 3em' }}  */}
                  </Button>
              {this.state.orgs.map(org=>
                <Button
                  inverted circular
                  style = {styleBottonOrg} 
                  key={org.org_id} 
                  data-letter={org.org_id}
                  value = {org.org_name}
                  onClick={this.handleClickBtnOrg}>
                  <Image size ='tiny' src={org.img_url}/>
                  {/*  floated='right'  size='tiny'  style={{ padding: '3em 3em' }}  */}
                </Button>
                )}
            </div>
          </div>
          {/* </Grid.Row> */}
        {/* </Grid> */}
        <br/><bt/>
        
        <div style = {{marginLeft :'5em',marginLeft: '14em', marginTop:'3em',marginBottom:'2em'}}>
          {/* ~~ the sum buttons */}
          {filterButton.map(sums =>
              <Button 
                  inverted circular 
                  style = {styleBotton} 
                  key={sums} 
                  data-letter={sums}
                  onClick={this.handleClickBtn}>
                  {sums}
              </Button>
          )}
          </div>
            <ImageGallery items={this.state.filterImeges} />
            <Segment>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <div as='h3' style={{ fontSize: '2em' }}>
                    <Icon size='big' name='gift' />
                    "Best Prize Ever!"
                    </div>
                    <p style={{ fontSize: '1.33em' }}>"didn't even know I was entered into the raffle!"</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <div as='h3' style={{ fontSize: '2em' }}>
                    <Icon size='big' name='users' />
                    "I got all my friends involved!"
                    </div>
                    <p style={{ fontSize: '1.33em' }}>
                    This time our efforts built something that <b>lasts forever</b>
                    </p>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <div style ={{padding: '1em', margin:'3em'}}>
                    <Header as='h4' style ={{marginLeft: '20em'}}>
                      <Icon name='hand point right' />
                      <Header.Content>The prizes for this Organizaition Organization</Header.Content>
                    </Header>
                    <br/>
                    <div style ={{display: 'flex', flexDirection: 'row', padding: '1em', margin:'1em'}}> 
                      {giftComponents}
                    </div>
                    
                  </div>
                
                </Grid.Row>
            </Grid>
            </Segment>
      </div>
    )
  } 
}
export default Prizes;