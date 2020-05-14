
//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment ,Label,Grid} from 'semantic-ui-react'

class GiftCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            // AllGifts: this.props.data.Allgifts,
            gifts: this.props.gifts

        }
    }
    //  l.l_name, l.min_people, l.min_sum,
    //     g.gift_id, g.gift_name,
    //     g.gift_description,g.gift_pic,
    //     g.g_date, g.winer
      
    render(){
        return(
            // <Segment>
            <div>
                <Segment>
                <Card>
                    <Label color = 'blue' attached='top'>{this.props.gifts.l_name}</Label>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Label as='a' color='blue' ribbon>
                            {this.props.gifts.l_name}
                        </Label>
                        <br></br>
                        <Card.Header>
                            {this.props.gifts.gift_name}</Card.Header>
                        <Card.Meta>1</Card.Meta>
                        <Card.Description>
                            {this.props.gifts.gift_description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                             <br></br>
                            <Icon name =  'user' />
                            min people: {this.props.gifts.min_people}
                            
                            <br></br>
                            <Icon name='dollar' />
                            min sum: {this.props.gifts.min_sum}

                            <br></br>
                            <Icon name = 'time'/>
                            the time of ending: {this.props.gifts.g_date}

                            <br></br>
                    </Card.Content>
                </Card>
                <br></br>
                </Segment>
            </div>
            // </Segment>

        )
    }

// declerate function
}

export default GiftCard;