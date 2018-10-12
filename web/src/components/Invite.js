import React from 'react';
import Friend from './Friend';
const Invite = ({ name, response, actions }) => (
  <React.Fragment>
    <Friend name={name} response={response} />
    {response !== null && (
      <div className="actions">
        <button onClick={actions.onConfirm}>Yes</button>
        <button onClick={actions.onMaybe}>Maybe</button>
        <button onClick={actions.onDecline}>Decline</button>
      </div>
    )}
  </React.Fragment>
);

export default Invite;
