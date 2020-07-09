import React from 'react';
import axios from "axios";
import { Button, Dimmer, Divider, Form, Grid, Loader, Segment, Header, Container } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

import * as emailUtil from '../../utilities/email';

class About extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            { 
                loggedIn: this.props.data.loggedIn, 
                userName: this.props.data.userName,
            }
    }


    componentDidMount() {
        window.scrollTo({
            top: 1000,
            left: 0,
            behavior: 'smooth'
          });
    }
    


    render() {
        return (
            <Segment textAlign='center'>
            <Container placeholder 
            style={{
                height: '500px',
                display: 'inline-block',
                backgroundImage: `url(`+`https://magdilim-organization-images.s3.amazonaws.com/organizations/1_b897aba0-c219-11ea-9736-7f3354e03867_people.jpg`+`)`,
                backgroundSize: 'cover',}}>
                    <br />
                    <br />
                    <br />
            <Header inverted as='h2' icon='globe' content='Magdilim' />

            </Container>
<Segment>
                <br /><br />
                <Header as='h2' icon='globe' content='Who is Magdilim?' />
                <Header as='h3' textAlign='left'>
                {`Magdilim is a fundraising platform, similar to other popular fundraising platforms, only with a new initiative – integrating the business method of Multi Level Marketing. 
                The business method of MML is where a distributer of a certain product gets a percentage based on the number of people in his downline.
                \nAn individual’s downline, is made up of all the people he distributed the product to, plus all the people they distributed to.
                \n\nIn Magdilim, we will give each long term donor of an organization a certain status based on the amount of people in his downline or the sum of money collected through his downline,
                according to the status criteria deffined by each organization.
                \n\n
                To do so, it is necessary to keep track of the order at which all the donors of each organization joined the campaign. 
                \n
                To give each user a status and update their status at each new donation in reasonable time,we used time efficient algorithms that will make your user experience that much more enjoyable.
                We used top security technologies so you can rest assured, your information will be secure.
                Each organization, will continuously reward their donors based on their status, encouraging them to grow their network of supporters.
                Our motto is- put in some effort now, and continue being rewarded forever... `} 
                </Header>
                <br /><br />
                </Segment>
            </Segment>
        )
    }
}

export default About;