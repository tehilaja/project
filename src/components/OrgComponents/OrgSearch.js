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

import {Grid, Segment} from 'semantic-ui-react';


//TODO: have the images be from S3 - all the organization images
//pehaps it should be done in component did mount
const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },];

class OrgSearch extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
			      routeMain: false,
			      check_login_status: false
		}
}
  
	// componentWillReceiveProps(nextProps){
	// 	nextProps= this.props
	// }


	render() {
		
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
                <ImageGallery items={images} />
                <Segment>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <div as='h3' style={{ fontSize: '2em' }}>
                        "Thanks Magdilim"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>for enabling us to create an ongoing platform</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <div as='h3' style={{ fontSize: '2em' }}>
                        "This campaign will be different!"
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
export default OrgSearch;