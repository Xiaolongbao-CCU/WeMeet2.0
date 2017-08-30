import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { Provider } from "react-redux";
import Index from "./components/Index";
import Meeting from "./components/Meeting"
import Meeting_new from "./components/Meeting_new"
import store from "./store"


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Index} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/meeting_new" component={Meeting_new} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("app")
);
