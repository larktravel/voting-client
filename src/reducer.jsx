import {List, Map} from 'immutable';

function setState(state, newState) {
  console.log('state', state)
  console.log('newState', newState)
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    // return state.set('hasVoted', entry);
    const round = state.getIn(['vote', 'round'], 0);
    return state.setIn(['hasVoted', entry], round)
  } else {
    return state;
  }
}

function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
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