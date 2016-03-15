import {List, Map} from 'immutable';

function setState(state, newState) {
  const mergedState = state.merge(newState);
  console.log('State in setState', state)
  return mergedState
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    const round = state.getIn(['vote', 'round'], 0);
    // return state.setIn(['hasVoted', entry], round)
    return state.set("myVote", Map({ round: round, entry}))
  } else {
    return state;
  }
}

function resetVote(state) {
  const round = state.getIn(['vote', 'round'], 0);
  const roundLastVotedIn = state.getIn(['myVote', 'round'])
  if (round !== roundLastVotedIn) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

function restart(state){
  console.log('hitting restart function', state)
  return state.remove('winner')
  // return setState(state);
}

export default function(state = Map(), action) {
  console.log('REDUCE', action)
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  case 'RESTART':
    return restart(state)
  }
  return state;
}