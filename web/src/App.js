import React, { Component } from 'react';
import { createStore } from 'redux';
import './App.css';
import FriendList from './components/FriendList';

const initialState = {
  invitedGuests: [],
  friends: [
    { name: 'sarah' },
    { name: 'brittany' },
    { name: 'billy' },
    { name: 'karen' },
    { name: 'katie' },
    { name: 'matt' },
    { name: 'bailey' },
    { name: 'quincy' },
    { name: 'audrey' },
  ],
};

const updateInvite = (invites, action, response) => {
  return invites.map(invite => {
    if (invite.name === action.guest) {
      return { name: action.guest, response: response };
    } else {
      return invite;
    }
  });
};

const store = createStore((state = initialState, action) => {
  console.debug('REDUCER:', state, action);
  switch (action.type) {
    case 'FRIEND_INVITED':
      if (state.invitedGuests.map(g => g.name).includes(action.guest)) {
        return state;
      } else {
        return {
          ...state,
          invitedGuests: [...state.invitedGuests, { name: action.guest }],
        };
      }
    case 'CONFIRM_GUEST':
      return { ...state, invitedGuests: updateInvite(state.invitedGuests, action, 'yes') };
    case 'MAYBE_GUEST':
      return { ...state, invitedGuests: updateInvite(state.invitedGuests, action, 'maybe') };
    case 'DECLINE_GUEST':
      return { ...state, invitedGuests: updateInvite(state.invitedGuests, action, 'no') };
    default:
      console.warn('--- Uncaught Action:', action.type);
      return state;
  }
});

class App extends Component {
  state = store.getState();

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  onAdd = dispatch => name => () => {
    dispatch({
      type: 'FRIEND_INVITED',
      guest: name,
    });
  };

  rsvpActions = dispatch => name => ({
    onConfirm: () => {
      dispatch({ type: 'CONFIRM_GUEST', guest: name });
    },
    onMaybe: () => {
      dispatch({ type: 'MAYBE_GUEST', guest: name });
    },
    onDecline: () => {
      dispatch({ type: 'DECLINE_GUEST', guest: name });
    },
  });

  render() {
    return (
      <div className="App">
        <FriendList
          title="Invited Friends"
          friends={this.state.invitedGuests}
          actions={this.rsvpActions(store.dispatch)}
        />
        <hr />
        <FriendList
          title="Friends"
          friends={this.state.friends}
          onClick={this.onAdd(store.dispatch)}
        />
      </div>
    );
  }
}

export default App;
