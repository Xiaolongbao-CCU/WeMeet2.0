import { createStore, combineReducers } from 'redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './lib/loadState';
import {
  roomList,
  participantList,
  connection,
  vote,
  chat,
  agenda,
  chatAndRecognition,
  time,
  grid,
  paint,
  sixhat,
  reservation,
  brainStorming,
} from './reducers/index';

const appReducer = combineReducers({
  roomList,
  participantList,
  connection,
  vote,
  chat,
  agenda,
  chatAndRecognition,
  time,
  grid,
  paint,
  sixhat,
  reservation,
  brainStorming,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    // this.state = undefined;
  }
  return appReducer(state, action);
};

const persistStore = loadState();

const store = createStore(
  rootReducer,
  persistStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

export default store;
