
//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image,Segment } from 'semantic-ui-react'

class giftCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            // AllGifts: this.props.data.Allgifts,
            gifts: this.props.gifts

        }
    }
      
    render(){
        return(
            // <Segment>
                <Card>
                    <p>"in giftCard"</p>
                   
                    {this.props.gifts.l_name}

                </Card>
            // </Segment>

        )
    }

// declerate function
}

export default giftCard;