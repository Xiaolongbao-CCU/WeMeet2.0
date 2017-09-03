"use strict";

import React from "react";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    handleInputPressEnter(key) {
        if (key.charCode == 13) {
            //按下enter後
            key.preventDefault();
            this.handleInputPressClick();
        }
    }

    handleInputPressClick() {
        let inputText = this.refs.input_text.value;
        /********** important!! **************/
        //the inputText need to send to chat.js, but still not work -by Andy */
        this.Chat.sendText(inputText);
        this.refs.input_text.value = "";
    }

    render() {
        return (
            <div className="left-input">
                <div className="input-filed">
                    <input
                        className="input-text"
                        ref="input_text"
                        type="text"
                        onKeyPress={key => {
                            this.handleInputPressEnter(key);
                        }}
                    />
                    <button className="upload">
                    </button>
                </div>
                <div className="mailbox" />
            </div>
        );
    }
}

export default ChatInput;
