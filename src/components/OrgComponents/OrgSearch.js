import React from 'react';
import {Redirect} from "react-router-dom";
import OrgCard from './OrgCard.js'

import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import UserPageBody from '../UserComponents/UserPageBody.js';
import Footer from '../Footer.js';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import {Grid, Icon, Segment} from 'semantic-ui-react';

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
    }

    this.getImages();
}
  
  // componentWillReceiveProps(nextProps){
  //  nextProps= this.props
  // }
  
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
    
    return(
      <div>
                <Header data={{ loggedIn: this.state.loggedIn, program_admin: this.state.program_admin, userName: this.state.userName }} />                <ImageGallery items={this.state.images} />
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
        <Footer />
      </div>
    )
  } 
}
export default OrgSearch;