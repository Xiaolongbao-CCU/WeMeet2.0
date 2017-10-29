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

let reducers = combineReducers({
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

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
