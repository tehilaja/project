import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment ,Label,Grid} from 'semantic-ui-react'

const moment = require('moment');

class GiftCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            gift: this.props.gifts
        }
    }
      
    render(){
        return(
            <div>
                <Segment>
                <Card>
                    <Label color = 'blue' attached='top'>{this.state.gift.gift_name}</Label>
                    <Image src={this.state.gift.gift_pic} wrapped ui={false} />
                    <Card.Content>
                        <Label as='a' color='blue' ribbon>
                        {this.state.gift.org_id}
                        </Label>
                        <br></br>
                        <Card.Header>
                        {`Level entered into raffle: ${this.state.gift.level_num}`}
                        </Card.Header>
                        <Card.Description>
                            {this.props.gifts.gift_description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                             <br></br>
                             {/* TODO: enter details of level */}
                            {/* <Icon name =  'user' />
                            min people: {this.props.gifts.min_people}
                            
                            <br></br>
                            <Icon name='dollar' />
                            min sum: {this.props.gifts.min_sum} */}

                            <br></br>
                            <Icon name = 'time'/>
                            {`Raffle will take place ${moment(this.state.gift.g_date).fromNow()}`}
                            <br></br>
                    </Card.Content>
                </Card>
                <br></br>
                </Segment>
            </div>

        )
    }

}

export default GiftCard;