import React from 'react';
import {Redirect} from "react-router-dom";
import OrgCard from './OrgCard.js'

import axios from "axios";
import { async } from "q";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import {Grid, Header, Icon, Segment,Search,Dropdown, Label} from 'semantic-ui-react';

const s3Util = require('../../utilities/upload').methods;

const orgOptions = [
  { key: 'all organization',value: 'all organization', text: 'all organization' }
];


class OrgSearch extends React.Component{
  constructor(props) {
    super(props)  
    this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
            program_admin: this.props.data.program_admin,
            routeMain: false,
            check_login_status: false,
            images: [],
            orgs: [],
            filterOrg:[],
            org_fieldOfActivity: [],
            fieldOfActivity: [] // the info of last donation

    }

    this.getImages();
    this.filterChooseOrg = this.filterChooseOrg.bind(this);
    this.selectLevel = this.selectLevel.bind(this);

    
}
  

componentDidMount () 
{

  // ~~~~~~~~~~ get (select *) fetching organizations from Server:

  this.state.orgs.length = 0;
  (async () => {
    const response = await axios.get(`/data`);
      // alert("gift:\n "+ JSON.stringify(response.data))
      this.setState({orgs: response.data})
      this.setState({filterOrg: this.state.orgs})
      
     
  })();


  //  ---- org_field_of_activity
  axios.get('/org_field_of_activity').then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
				return res
			}).then(respones=>
				{
					// alert("lastDonation \n" + JSON.stringify(respones.data))
					if(respones.data==="no data") //TODO: if no last donation///
            alert(respones.data)
          else{ 
            // alert("fields: \n"+ JSON.stringify(respones.data))
            this.setState({org_fieldOfActivity: respones.data});
          }
		}).catch(error=> {
			alert(error);
    })
    
  //--get_field_of_activity
  axios.get('/get_field_of_activity').then(res => 
		{
			if (res.status >= 400) {
				throw new Error("Bad response from server");}
				return res
			}).then(respones=>
				{
					// alert("lastDonation \n" + JSON.stringify(respones.data))
					if(respones.data==="no data") //TODO: if no last donation///
            alert(respones.data)
          else{ 
            this.setState({fieldOfActivity: respones.data});
            // alert(" donaition: \n" + JSON.stringify(respones.data))
            respones.data.forEach(function(field){
              let giftobj ={};
              giftobj["key"]=field.field_name;
              giftobj["value"]=field.field_name;
              giftobj["text"]=field.field_name;
              orgOptions.push(giftobj);
            })
          }
		}).catch(error=> {
			// alert(error);
		})

}
selectLevel (e, { value }) {
  this.setState({ selectedOptionLevel: value })
  this.filterChooseOrg(value)

}

  // filter a chosen level
  filterChooseOrg(filter){
    // let listOrg = []
    let obj = [];
    if (filter == 'all organization'){
      this.setState({filterOrg: this.state.orgs})
        // alert("all : "+ this.state.giftShow.length)
    }
    else
    {
      // TODO - the field and org
      let indexOrg;
      this.state.org_fieldOfActivity.forEach(orgf=>{ // find the org of this fields
        if(orgf.field_name === filter){
          indexOrg = this.state.orgs.findIndex(x => x.org_id === orgf.org_id);
          obj.push(this.state.orgs[indexOrg])
        }
      
          // indexOrg = this.state.orgs.org_id === org.org_id
      })
      // this.state.orgs.map(element =>{
      //       if(element.org_id === filter)
      //           obj.push(element)
      //   })
        this.setState({filterOrg: obj})
        // alert("gifts: \n" + JSON.stringify(this.state.showGifts))
    }

}
  
  getImages() {
    s3Util.getFilesFromFolder('organizations', (res) => {
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


  
  render() {

    const { valueLevel } = this.state // level

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
      };
  
    
    const orgComponents = this.state.filterOrg.map(org =>{
      return(
        <div style ={{display: 'flex', flexDirection: 'row', padding: '0.5em', margin:'0.5em'}}>
        <OrgCard org={org}
        />
        </div>)
    })

    return(
      <Segment style={{ padding: '5em 0em', width: '100%', background:'#F5F5F5', textAlign:'center'}}>
        <ImageGallery items={this.state.images} />
        <Segment textAlign='center'>
        <Label labelPosition='left' as='a' color='olive' ribbon left>
            Search Through Magdilim Organizations!
          </Label>
          <Header  as='h2' content='Organizations' />
          <br/>
          <lable>Search Through our Organization</lable>
        <br/>
        <Dropdown style ={{marginTop:'2em'}}
          // fluid
          selectio
          // selectOnNavigation 
          onChange={this.selectLevel}
          options={orgOptions}
          placeholder='Choose an option'
          selection
          value={valueLevel}
      />
        <Header>Click on an Organization</Header>
        <div style ={{display: 'flex', flexDirection: 'row', padding: '1em', margin:'1em'}}> 
        {orgComponents}
        </div>
                <br/>
                <br/>
                <Segment textAlign='left'>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <div as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='globe' />
                        "Thanks Magdilim"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>for enabling us to create an ongoing platform</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <div as='h3' style={{ fontSize: '2em' }}>
                        <Icon size='big' name='building' />
                        "This campaign will be different!"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>
                        This time, our efforts will build something that will <b>last forever</b>
                        </p>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                </Segment>
                </Segment>
    )
  } 
}
export default OrgSearch;