import {combineReducers} from 'redux';

const initialState = {
  users: [],
  chats: []
};

function itemReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CHATS':
      return Object.assign({}, state, {
        chats: action.chats
      });
    case 'UPDATE_USERS':
      return Object.assign({}, state, {
        users: action.users
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers ({
  itemReducer
});

export default itemReducer;