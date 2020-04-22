import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom";

import axios from "axios";
import { async } from "q";

import OrgCard from './organization/OrgCard.js'
import orgData from './organization/orgData.js'


// class YourComponent extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.state = {
// 		isFetchingData: false,
// 		data: null
// 	  };
// 	}
  
// 	componentDidMount () {
// 	  this.setState({ isFetchingData: true });
// 	  apiCall().then((data) => {
// 		this.setState({
// 		  isFetchingData: true,
// 		  data
// 		});
// 	  });
// 	}
  
// 	render () {
// 	  if (!this.state.data) {
// 		return <p>No data</p>;
// 	  }
  
// 	  if (!this.state.isLoading) {
// 		return <p>Loading data</p>;
// 	  }
  
// 	  // Render your component with data
// 	}
//   }
class Body extends React.Component
{
//-----------constructor----------------------
	constructor(props)
	{
		super(props)
		//------state--
		this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
			userName: this.props.data.userName, 
			organizations: [],
			clickOrg: false,


			// **
			isFetchingData: false,
			data: null
			// id: "3"
		}
		this.selectOrg = this.selectOrg.bind(this)
		this.handleClick = this.handleClick.bind(this)
		// this.fetch_org_data = this.fetch_org_data.bind(this)
	}
//------------function-------------------------

		componentDidMount () {

// ~~~~~~~~~~ get (select *) 
		let self = this;
        fetch('/data', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({organizations: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
 

			// this.fetch_org_data()
		//   this.setState({ isFetchingData: true });
		//   apiCall().then((data) => {
		// 	this.setState({
		// 	  isFetchingData: true,
		// 	  data
		// 	});
		//   });
	}



	//the function below has Server fetch data about organizations from datbase: 
	// fetch_org_data(){






	// (async ()=> {
	// 	const response = await axios.post(
	// 		'/fetch_org_data',
	// 		{ headers: { 'Content-Type': 'application/json' } }
	// 	)
	// 	alert("responce: " + response.data)
	// 	if(response.data === "failed to get org data"){
	// 		alert("failed to get org data");
	// 		return;
	// 	}
	// 	else {
				// var orgNewData = JSON.parse(response.data)




				// var orgNewData = response.data
				// alert(orgNewData)


				// var f = orgNewData.prototype.map()
				// alert(f)

				// orgNewData = JSON.parse(JSON.stringify(response.data))
				// alert(orgNewData)



				// this.setState({organizations:orgNewData.conversations})
				// this.setState({f:orgNewData})



				
	// 		if(response.data != null){

	// 			const orgNewData = JSON.parse(response.data)
	// 			alert(orgNewData)
	// 			this.setState({organizations: orgNewData});

	// 			// this.setState({organizations: response.data});
	// 		}
	// 		else{
	// 			this.setState({organizations: orgData});
	// 	}
	// }
		
	// })();}

	//------------------
	selectOrg(event) 
	{
        // const {name, value, type, checked} = event.target
        // type === "checkbox" ? 
        //     this.setState({
        //         [name]: checked
        //     })
        // :
        // this.setState({
        //     [name]: value
		// }) 
		const {id} = event.target
	}

	//----------------------
	handleClick(id)
    {
		if (this.state.clickOrg === true)
			alert("id: " +id )
		
	}
	// logout()

//--------------render------------------------
	render()
	{

		// **
		// if (!this.state.isLoading) 
		// {
		// 	return <p>Loading data</p>;
		// }

		const orgComponents = this.state.organizations.map(org =>{
			return(
				<OrgCard key={org.org_id} imgUrl={org.org_pic} name={org.org_name} id= {org.org_id} initialDonation= {org.min_donation}/>)
		})
			
			 

		// ---orgComponents (card)---
		// const orgComponents = this.state.organizations.map(org => {
		// 		return (
		// 	<OrgCard key={org.id} imgUrl={org.imgUrl} name={org.name} id= {org.id} initialDonation= {org.initialDonation}/>)
		// })


		

		// //-----Redirect--------
		// if (this.state.clickOrg === true){
		// 	return <Redirect to = {{
		// 		pathname: '/OrgPage',
		// 		state: {id: this.state.id}
		// 	}} />
		// }

	//-----------return------------------------------
		return(
			<div>
				<myButton /> 
				{orgComponents}
			</div>
		)
	}

}

export default Body
