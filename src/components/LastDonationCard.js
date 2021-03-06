
//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment ,Label,Grid,Feed,Button} from 'semantic-ui-react'
import {Redirect} from "react-router-dom";

const moment = require('moment');


class LastDonationCard extends React.Component{
    constructor(props){
        super(props)
        this.state =
        {
            timeDate: JSON.stringify(this.props.ldonation.d_date),
            name: null,
            time: null,
            date:null,
            routeOrgPage: false,
            move: "donate to " + this.props.ldonation.org_name
        }
    }
    /*
     d.user_id, d.org_id, u.user_name ,d.d_title,d.d_description, d.anonymous,d.d_date, d.referred_by, o.img_url
    */
   componentDidMount () {
    let time ;
    let date;
    const name = "donate to " + this.props.ldonation.org_name

    this.setState({name: this.props.ldonation.user_id.split("@")[0]});

    this.setState({date: this.state.timeDate.split("T")[0]});
    this.setState({time: (this.state.timeDate.split("T")[1]).split(".")[0] });

   }

    spliteDate()
    {
        const date = this.state.timeDate

    }
      
    render(){

        if (this.state.routeOrgPage === true){
            window.location.assign(`/OrgPage/`+`${this.props.ldonation.org_id}`);
            } 

        return(
            // <Segment>
            <div style ={{marging: '0.8em' ,padding: '0.8em'}}>
                {/* <Segment style ={{marging: '0.8em'}}> */}
                <Card style ={{border: '2px solid #708090', height:'300px'}} >
                    <Card.Content>
                        <Image 
                        floated='right'
                        size='tiny'
                        src={this.props.ldonation.img_url}
                        />
                        <Card.Header>
                            <Icon name = 'user'/>
                            {this.state.name}
                            </Card.Header>
                        <Card.Meta>
                        {moment(this.state.date).fromNow()}
                            <br/>
                            {/* {this.state.time} */}
                            {/* {this.props.ldonation.d_date.splite("T")} */}
                        </Card.Meta>
                        <Card.Description>
                            <strong> {this.props.ldonation.d_title}</strong> 
                            <br></br> 
                            {this.props.ldonation.d_description}
                        </Card.Description>
                        <br/>
                        <Icon loading circular name ='heart' size = 'big' color ='olive'></Icon>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Button
                                basic
                                name = 'go to organitation page'
                                // disabled ={true}
                                color='olive'
                                labelPosition='right' 
                                icon='right arrow'
                                lableColor = 'olive'
                                content= {this.state.move}
                                onClick = {() => this.setState(prevState => {
                                    return {
                                        routeOrgPage: !prevState.routeOrgPage}
                                      })}
                            />
                        </div>
                       
                    </Card.Content>
                </Card>
                    <br></br>
            </div>
           

        )
    }

// declerate function
}

export default LastDonationCard;