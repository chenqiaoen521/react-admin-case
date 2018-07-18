import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

// action_type
const ADD_ACTION = 'ADD';
const JIAN_ACTION = 'JIAN';
let enhancer = applyMiddleware(thunk);
//action
const add = (num) => {
	return {
    type: ADD_ACTION,
    payload: num
  }
}

const jian = (num) => {
  return {
    type: JIAN_ACTION,
    payload: num
  }
}

// state
const initalState = {
  entries: {
    count: 0
  }
}

const reducers = combineReducers({
  entries (state = {}, action) {
    switch (action.type) {
      case ADD_ACTION:
        return Object.assign({}, state, {
          count: action.payload,
        })
      case JIAN_ACTION:
        return Object.assign({}, state, {
          count: action.payload,
        })
      default:
        return state
    }
  }
});


 const store = createStore(
  reducers,
  initalState,
  enhancer
  );
 export default store
// store.dispatch(add(1))
// 
export function login (num) {
  return function (dispatch, getState) {
    if (num < 5) {
      dispatch(add(num));
    } else if (num>=5){
      dispatch(jian(0));
    }
  }
}