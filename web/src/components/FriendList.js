import React from 'react';
import Logger from '../../../shared/logger';
import Friend from './Friend';
import Invite from './Invite';

const FriendList = ({ title, friends, onClick, actions }) => (
  <Logger name={"Friend's List"}>
    <section>
      <h1>{title}</h1>
      {friends.map((friend, idx) => {
        if (actions) {
          return <Invite key={idx} {...friend} actions={actions(friend.name)} />;
        } else {
          return <Friend key={idx} {...friend} onClick={onClick} />;
        }
      })}
    </section>
  </Logger>
);

export default FriendList;
