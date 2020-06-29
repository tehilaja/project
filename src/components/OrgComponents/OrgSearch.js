import React from 'react';
import {Redirect} from "react-router-dom";
import OrgCard from './OrgCard.js'

import axios from "axios";
import { async } from "q";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import {Grid, Header, Icon, Segment} from 'semantic-ui-react';

const s3Util = require('../../utilities/upload').methods;


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
            orgs: []
    }

    this.getImages();
}
  

componentDidMount () {

  // ~~~~~~~~~~ get (select *) fetching organizations from Server:
  let self = this;
      fetch('/data', {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({orgs: data});
      }).catch(err => {
      console.log('caught it!',err);
  })

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
  
    
    const orgComponents = this.state.orgs.map(org =>{
      return(
        <div style ={{display: 'flex', flexDirection: 'row', padding: '0.5em', margin:'0.5em'}}>
        <OrgCard org={org}
        />
        </div>)
    })

    return(
      <div>
                <ImageGallery items={this.state.images} />
                <Segment color='red'>
									<Header as='h2' icon='globe' content='Donate to Organization' />
									<Carousel 
									swipeable={true}
									draggable={true}
									showDots={true}
									responsive={responsive}
									ssr={true} // means to render carousel on server-side.
									infinite={true}
									autoPlay={this.props.deviceType !== "mobile" ? true : false}
									autoPlaySpeed={2000}
									keyBoardControl={true}
									// customTransition="all .5"
									transitionDuration={500}
									containerClass="carousel-container"
									removeArrowOnDeviceType={["tablet", "mobile"]}
									deviceType={this.props.deviceType}
									dotListClass="custom-dot-list-style"
									itemClass="carousel-item-padding-40-px">
										{orgComponents}
									</Carousel>
								</Segment>
                <Segment>
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
      </div>
    )
  } 
}
export default OrgSearch;