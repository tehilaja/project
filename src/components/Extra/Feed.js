import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

import UserAvatar from 'react-avatar';

// TODO: figure out where the feed will be enabled, what and where will be stored.
// const FeedContent = feedList.map(feed => {
//     return {
//         feedUserName: 'TehilaJ', 
//         feedAction: 'added you as a friend', 
//         feedDate: 'yesterday', 
//         feedText: 'feed text here...', 
//         numLikes: 5
//     }
// });

const FeedContent = {
    feedUserName: 'TehilaJ', 
    feedAction: 'added you as a friend', 
    feedDate: 'yesterday', 
    feedText: 'feed text here...', 
    numLikes: 5
}


const FeedExampleBasic = () => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
      <UserAvatar size = '35' shape='round' name={FeedContent.feedUserName} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
        <Feed.User>{FeedContent.feedUserName}</Feed.User> 
        {FeedContent.feedAction}
          <Feed.Date>{FeedContent.feedDate}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
        <Feed.Extra text>
          {FeedContent.feedText}
        </Feed.Extra>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />{FeedContent.numLikes} Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    {/* <Feed.Event>
      <Feed.Label image='/images/avatar/small/helen.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Helen Troy</a> added <a>2 new illustrations</a>
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <a>
            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </a>
          <a>
            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </a>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />1 Like
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='/images/avatar/small/jenny.jpg' />
      <Feed.Content>
        <Feed.Summary
          date='2 Days Ago'
          user='Jenny Hess'
          content='add you as a friend'
        />
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />8 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='/images/avatar/small/joe.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Joe Henderson</a> posted on his page
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          Ours is a life of constant reruns. We're always circling back to where
          we'd we started, then starting all over again. Even if we don't run
          extra laps that day, we surely will come back for more of the same
          another day soon.
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />5 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='/images/avatar/small/justen.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <a>
            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </a>
          <a>
            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </a>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            41 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event> */}
  </Feed>
)

export default FeedExampleBasic;
