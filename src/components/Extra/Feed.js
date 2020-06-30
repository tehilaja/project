import React from 'react'
import { Button, Feed, Icon, Segment, Form } from 'semantic-ui-react'
import axios from 'axios';

import UserAvatar from 'react-avatar';
import { render } from 'react-dom';

const moment = require('moment');

class CommentFeed extends React.Component{
  constructor(props){
    super(props)
    this.state = 
		{
			loggedIn: this.props.data.loggedIn, 
      userName: this.props.data.userName, 
      feed_type: this.props.data.feed_type,
      feed_type_id: this.props.data.feed_type_id,
      comments: [],
      feedId: 0,
      gotFeedFlag: false
    };
    this.getFeedCommentsPeriodically(5);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateLikes = this.updateLikes.bind(this)
    this.getCommentForCommentId = this.getCommentForCommentId.bind(this)
    this.getFeedCommentsPeriodically = this.getFeedCommentsPeriodically.bind(this)
  }



getFeedComments = () => {
  this.state.comments.length = 0;
  (async () => {
    const response = await axios.post(`fetch-feed-comments/${this.state.feed_type}/${this.state.feed_type_id}`,
    // const response = await axios.post(`/fetch-feed-comments`,
    { feed_type: this.state.feed_type,
     feed_type_id: this.state.feed_type_id },
      { headers: { 'Content-Type': 'application/json' } });
      response.data.forEach(comment => {
        this.state.comments.push(comment);
      });
      // alert(JSON.stringify(this.state.comments))
      this.setState({gotFeedFlag: !this.state.gotFeedFlag})
  })();
}

handleChange(event) {
  this.setState({
      [event.target.name]: event.target.value
  })
}

handleSubmit(){
  this.state.newComment = {
    feed_type: this.state.feed_type,
    feed_type_id: this.state.feed_type_id,
    user_id: this.state.userName, 
    date: new Date().toJSON().slice(0, 19).replace('T', ' '), 
    comment_text: this.state.commentText, 
    likes: 0
}
//TODO: add to DB
axios.post('/add-comment', this.state.newComment
    ).then(res => 
    {
      this.state.comments.push(this.state.newComment);
      this.setState({gotFeedFlag: !this.state.gotFeedFlag})

    }).catch(error=> {
        alert("error adding comment" +  error);
    })
}

getCommentForCommentId(comment_id){
  return this.state.comments.find( c => c.comment_id === comment_id )
}

getFeedCommentsPeriodically(seconds) {
  this.getFeedComments();

  setTimeout(() => {
    this.getFeedCommentsPeriodically(seconds);
  }, seconds * 1000);
}

updateLikes(comment_id){
  axios.post('/add-like', {comment_id: comment_id} 
    ).then(res => 
    {
      this.getCommentForCommentId(comment_id).likes += 1;
      this.setState({gotFeedFlag: !this.state.gotFeedFlag})

    }).catch(error=> {
        alert("error updating likes" +  error);
    })
}

computeFeedComments = () => {
  return this.state.comments.map(comment => (
    <Feed.Event>
    <Feed.Label>
    <UserAvatar size = '35' shape='round' name={comment.user_id} />
    </Feed.Label>
    <Feed.Content>
      <Feed.Summary>
      <Feed.User>{`${comment.user_id} `}</Feed.User> 
      {` commented`}
      <Feed.Date>{moment(comment.date).fromNow()}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {comment.comment_text}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like onClick ={() => this.updateLikes(comment.comment_id)}>
          <Icon name='like'/>
              {`${comment.likes} `}
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
    {/* Add new comment */}

  </Feed>
)


render() {
  return (
    <div>
      {this.FeedBasic()}
      <Segment>
    <Form onSubmit={this.handleSubmit.bind(this)}>
    <Form.Field inline='verdical' >
      <UserAvatar size = '35' shape='round' name={this.state.userName} />
        <Form.Input
        icon = 'comment alternate'
         placeholder='add comment...'
         name="commentText"
         onChange={this.handleChange.bind(this)} />
     </Form.Field>
     {/* <Button content='send' primary /> */}
   </Form>
  </Segment>
    </div>)
}
}
export default CommentFeed;
