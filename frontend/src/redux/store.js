import { createStore, combineReducers } from 'redux';

const initialState = {
  user: null,
  userGroups: [],
  idToken: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USER_GROUPS':
      return { ...state, userGroups: action.payload };
    case 'SET_ID_TOKEN':
      return { ...state, idToken: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userState: userReducer,
});

const store = createStore(rootReducer);

export default store;
