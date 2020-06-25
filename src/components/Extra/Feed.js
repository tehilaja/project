import React from 'react'
import { Button, Feed, Icon, Segment, Form } from 'semantic-ui-react'
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
      feed_type: this.props.data.feed_type,
      feed_type_id: this.props.data.feed_type_id,
      comments: [],
      feedId: 0,
      gotFeedFlag: false
    };
    this.getFeedComments();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateLikes = this.updateLikes.bind(this)
    this.calculateDate =this.calculateDate.bind(this)
  }

//TODO take care of ends ad beginnings of new months:
calculateDate(date){
  var now = new Date;

if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getYear() == now.getYear())
  return "Today";
else if (date.getDate() == now.getDate()-1 && date.getMonth() == now.getMonth() && date.getYear() == now.getYear())
  return "Yesterday";
else if ((date.getDate() > now.getDate()-7 && date.getMonth() == now.getMonth() && date.getYear() == now.getYear()))
  return "Less than a week";
return 'other';
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
      alert(JSON.stringify(this.state.comments))
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
    date: (new Date).getTime(), 
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

updateLikes(){
//TODO: update number of likes
}

computeFeedComments = () => {
  return this.state.comments.map(comment => (
    <Feed.Event>
    <Feed.Label>
    <UserAvatar size = '35' shape='round' name={comment.user_id} />
    </Feed.Label>
    <Feed.Content>
      <Feed.Summary>
      <Feed.User>{comment.user_id}</Feed.User> 
      commented
      <Feed.Date>{comment.date}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {comment.comment_text}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like>
          <Icon name='like'
          onClick ={() => comment.likes = comment.likes+1}/>
              {comment.likes}
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
  //               {FeedContent.likes}
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
