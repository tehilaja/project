

//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment ,Label,Grid,Feed,Button} from 'semantic-ui-react'

class LastDonationCard extends React.Component{
    constructor(props){
        super(props)
        this.state =
        {
            timeDate: JSON.stringify(this.props.ldonation.d_date)
        }
    }
    /*
     d.user_id, d.org_id, u.user_name ,d.d_title,d.d_description, d.anonymous,d.d_date, d.referred_by, o.img_url
    */

    spliteDate()
    {
        const date = this.state.timeDate
        // splite("T")

    }
      
    render(){
        return(
            // <Segment>
            <div style ={{marging: '0.8em' ,padding: '0.8em'}}>
                {/* <Segment style ={{marging: '0.8em'}}> */}
                <Card style ={{border: '5px solid #999'}} >
                    <Card.Content>
                        <Image 
                        floated='right'
                        size='tiny'
                        src={this.props.ldonation.img_url}
                        />
                        <Card.Header>
                            <Icon name = 'user'/>
                            {this.props.ldonation.user_name}
                            </Card.Header>
                        <Card.Meta>
                            {this.state.timeDate}
                            {/* {this.props.ldonation.d_date.splite("T")} */}
                            </Card.Meta>
                        <Card.Description>
                            <strong> {this.props.ldonation.d_title}</strong> 
                            <br></br> 
                            {this.props.ldonation.d_description}
                        </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        <div>
                            <Button
                                basic
                                name = 'go to organitation page'
                                // disabled ={true}
                                color='green'
                                labelPosition='right' 
                                icon='right arrow'
                                lableColor = 'green'
                                content='move to organitation page'
                            />
                        </div>
                        {/* <div className='ui two buttons'>
                        <Button basic color='green'>
                        <Button
                            basic
                            name = 'go to organitation page'
                            // disabled ={true}
                            color='green'
                            labelPosition='left' 
                            icon='left arrow'
                            content='move to organitation page'
                        />
                            
                        </Button>
                        <Button basic color='red'>
                            Decline
                        </Button>
                        </div> */}
                    </Card.Content>
                </Card>
                    {/* <Feed>
                        <Feed.Event
                            image={this.props.ldonation.img_url}
                            date={this.props.ldonation.d_data}
                            summary={this.props.ldonation.d_title}
                            extraText={this.props.ldonation.d_description}
                       />
                    </Feed> */}
                    <br></br>
                {/* </Segment> */}
            </div>
           

        )
    }

// declerate function
}

export default LastDonationCard;