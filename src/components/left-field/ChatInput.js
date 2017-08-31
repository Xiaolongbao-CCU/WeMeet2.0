"use strict";

import React from "react";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="left-input">
                <div className="input-filed">
                    <input className="input-text" type="text" />
                    <button className="upload">
                    </button>
                </div>
                <div className="mailbox" />
            </div>
        );
    }
}

export default ChatInput;
