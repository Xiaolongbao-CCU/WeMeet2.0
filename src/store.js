import { createStore, combineReducers } from "redux";
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
	reservation
} from "./reducers/index";

let appReducer = combineReducers({
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
	reservation
});

const rootReducer = (state, action) => {
	if (action.type === "CLEAR") {
		state = undefined;
	}
	return appReducer(state, action);
};

import { loadState, saveState } from "./lib/loadState";
const persistStore = loadState();

const store = createStore(
	rootReducer,
	persistStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	saveState(
		store.getState()
	);
});

export default store;
