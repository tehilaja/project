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
            loggedIn: this.props.loggedIn,
            userName: this.props.userName,
			routeMain: false,
			check_login_status: false
		}
		// this.function_log_status();
	}
	
	// componentWillReceiveProps(nextProps){
	// 	nextProps= this.props
	// }

	//the function below checks if the user is already logged in before rendering page
// 	function_log_status(){
// 		(async ()=> {
//             const response = await axios.post(
//                 '/is_logged_in',
//                 { headers: { 'Content-Type': 'application/json' } }
// 			  )
// 			if(response.data === "no user"){
// 				this.setState({
// 					loggedIn: false,
// 					userName: ""})
// 				//return;
// 			}
// 			else{
// 				this.setState({
// 					loggedIn: true,
// 					userName: response.data});
// 				this.forceUpdate();
// 				//alert("loggedIn "+this.state.loggedIn + " userName "+ this.state.userName);
// 			}
// 			this.setState({check_login_status:true})
// 	})();
// }

	// function 

	render() {
		// if(!this.state.check_login_status)
		// 	return(<h1>loading...</h1>)
			
		//TODO: function that gets all the different organizaitons in DB
		// const orgComponents = this.state.organizations.map(org =>{
		// 	return(
		// 		<OrgCard key={org.org_id} imgUrl={org.org_pic} name={org.org_name} id= {org.org_id} initialDonation= {org.min_donation} 
		// 			admin_name = {org.admin_name} field_of_acctivity = {org.field_of_acctivity} org_num = {org.org_num} description = {org.description}
		// 			working = {org.working} volunteers = {org.volunteers} friends = {org.friends}
		// 		/>)
		// })
		
		
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