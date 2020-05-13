import React from 'react';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import Header from './Header.js';
import Footer from './Footer.js';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import {Grid, Segment} from 'semantic-ui-react';

//TODO: get images from S3 that are the fliers of the prizes
const images = [
    {
      original: 'https://i.dansdeals.com/wp-content/uploads/2018/08/29102624/jlem-696x344.jpg',
      thumbnail:"", //'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://images-na.ssl-images-amazon.com/images/I/81W89sK72RL._AC_SL1500_.jpg',
    //   thumbnail: 'https://picsum.photos/id/1019/250/150/',
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
                        "Best Prize Ever!"
                        </div>
                        <p style={{ fontSize: '1.33em' }}>didn't even know i was entered into the raffle</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <div as='h3' style={{ fontSize: '2em' }}>
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
export default OrgSearch;