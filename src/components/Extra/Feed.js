import React from 'react'
import { Feed, Icon, Segment, Form } from 'semantic-ui-react'
import axios from 'axios';

import UserAvatar from 'react-avatar';
import { render } from 'react-dom';


class CommentFeed extends React.Component{
  constructor(props){
    super(props)
    this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
      userName: this.props.data.userName, 
      comments: [],
      feedId: 0,
    };
    this.getFeedComments();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateLikes = this.updateLikes.bind(this)
  }

// const FeedContent = {
//     feedUserName: 'TehilaJ', 
//     feedAction: 'added you as a friend', 
//     feedDate: 'yesterday', 
//     feedText: 'feed text here...', 
//     numLikes: 5
// }

getFeedComments = () => {
  this.state.comments.length = 0;
  // (async () => {
  //   const response = await axios.get('get-feed-comments',
  //   { feed_id: this.state.feedId },
  //     { headers: { 'Content-Type': 'application/json' } });
  //   this.setState({ comments: response.data || [] });
  // })();
  this.state.comments.push({
    feedUserName: 'TehilaJ', 
    feedAction: 'commented', 
    feedDate: 'yesterday', 
    feedText: 'feed text here...', 
    numLikes: 5
})
  alert(JSON.stringify(this.state))
}

handleChange(event) {
  this.setState({
      [event.target.name]: event.target.value
  })
}

handleSubmit(){
  this.state.newComment = {
    feedUserName: this.state.userName, 
    feedDate: new Date, 
    feedText: this.state.commentText, 
    numLikes: 5
}
}

updateLikes(){
//TODO: update number of likes
}

computeFeedComments = () => {
  return this.state.comments.map(comment => (
    <Feed.Event>
    <Feed.Label>
    <UserAvatar size = '35' shape='round' name={comment.feedUserName} />
    </Feed.Label>
    <Feed.Content>
      <Feed.Summary>
      <Feed.User>{comment.feedUserName}</Feed.User> 
      {comment.feedAction}
      <Feed.Date>{comment.feedDate}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {comment.feedText}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like>
          <Icon name='like'
          onClick ={() => comment.numLikes = comment.numLikes+1}/>
              {comment.numLikes}
               Likes
        </Feed.Like>
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
  ));
}

FeedBasic = () => (
  <Feed>
    {this.computeFeedComments()}
  </Feed>
)


render() {
  return (
    <div>
      {this.FeedBasic()}
    </div>)
}
  
  //  render(){
  //     return(
  //       <Feed>
  //   <Feed.Event>
  //     <Feed.Label>
  //     <UserAvatar size = '35' shape='round' name={FeedContent.feedUserName} />
  //     </Feed.Label>
  //     <Feed.Content>
  //       <Feed.Summary>
  //       <Feed.User>{FeedContent.feedUserName}</Feed.User> 
  //       {FeedContent.feedAction}
  //         <Feed.Date>{FeedContent.feedDate}</Feed.Date>
  //       </Feed.Summary>
  //       <Feed.Extra text>
  //       <Feed.Extra text>
  //         {FeedContent.feedText}
  //       </Feed.Extra>
  //       </Feed.Extra>
  //       <Feed.Meta>
  //         <Feed.Like>
  //           <Icon name='like'
  //           onClick ={this.updateLikes.bind(this)}/>
  //               {FeedContent.numLikes}
  //                Likes
  //         </Feed.Like>
  //       </Feed.Meta>
  //     </Feed.Content>
  //   </Feed.Event>
  //   <Segment>
  //   <Form>
  //   <Form.Field inline='verdical' onSubmit={this.handleSubmit.bind(this)}>
  //     <UserAvatar size = '35' shape='round' name={this.state.userName} />
  //       <Form.Input
  //        icon = 'comment alternate'
  //        placeholder='add comment...'
  //        name="commentText"
  //        onChange={this.handleChange.bind(this)} />
  //     </Form.Field>
  //   </Form>
  //   </Segment>
  //   </Feed>
  //     )
  //   }
}
export default CommentFeed;
