"use strict";

import React from "react";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {
    	this.timer = setInterval(this.getSystemTime, 1000);
    }

    render() {
        return (
        	<div className="main-screen" />
        );
    }
}

export default MainScreen;
