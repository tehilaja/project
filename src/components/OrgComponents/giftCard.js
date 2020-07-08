
//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment ,Label,Grid,Statistic} from 'semantic-ui-react'

const moment = require('moment');

class giftCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            gifts: this.props.gifts

        }
    }

      
    render(){
        return(
            <div style ={{marging: '0.8em' ,padding: '0.8em'}}>
            <Card style ={{ height:'500', mergin:'1em'}} >
                <Label color = 'blue' attached='top'>{this.props.gifts.l_name}</Label>
                <Image src={this.props.gifts.gift_pic} wrapped ui={false} />

                <Card.Content header={this.props.gifts.gift_name} />
                {/* <Card.Content description={this.props.gifts.gift_description} /> */}
                <Card.Description>
                            {this.props.gifts.gift_description}
                        </Card.Description>
                <Card.Content extra>
                    {/* description: {this.props.gifts.gift_description} */}
                    <Icon name = 'time'/>
                            {`Raffle will take place ${moment(this.state.gifts.g_date).fromNow()}`}
                            <br></br>
                </Card.Content>
            </Card>
                <br></br>
            </div>
        )
    }

// declerate function
}

export default giftCard;