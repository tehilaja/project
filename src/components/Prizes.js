import React from 'react';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import Header from './Header.js';
import Footer from './Footer.js';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import {Grid, Icon, Segment} from 'semantic-ui-react';

const s3Util = require('../utilities/upload').methods;

class Prizes extends React.Component{
  constructor(props) {
    super(props)  
    this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
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
    

  render() {
    return(
      <div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
                <ImageGallery items={this.state.images} />
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
                        This time our efforts will build something that will <b>last forever</b>
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
export default Prizes;