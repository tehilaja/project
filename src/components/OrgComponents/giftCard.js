
//card for show gifts (in orgPage)

import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image } from 'semantic-ui-react'

class giftCard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            AllGifts: this.props.data.Allgifts

        }
    }
      
    render(){
        return(
            <div>
                <p>"in giftCard"</p>
                {this.state.AllGifts[0].l_name}

            </div>

        )
    }

// declerate function
}

export default giftCard;