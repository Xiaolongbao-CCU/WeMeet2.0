"use strict";

import React from "react";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInputValue: ""
        };
        this.handleInputPressClick = this.handleInputPressClick.bind(this); 
    }

    componentWillMount() { }

    componentDidMount() { }

    handleInputPressEnter(e) {
        if (e.which == 13) {
            //按下enter後
            e.preventDefault();
            this.handleInputPressClick();
        }
    }

    handleInputPressClick() {
        let inputText = this.state.chatInputValue;
        this.props.Chat.sendText(inputText);
        this.setState({
            chatInputValue: ""
        })
    }

    handleInputOnChange(e) {
        this.setState({
            chatInputValue: e.target.value
        });
    }

    render() {
        return (
            <div className="left-input">
                <div className="input-filed">
                    <input
                        className="input-text"
                        ref="input_text"
                        type="text"
                        onKeyPress={e => {
                            this.handleInputPressEnter(e);
                        }}
                        onChange={e => {
                            this.handleInputOnChange(e);
                        }}
                        value={this.state.chatInputValue}
                    />
                    <button className="upload" onClick={this.handleInputPressClick} />
                </div>
                <img className="mailbox" src="./img/mailbox.png" />
            </div>
        );
    }
}

export default ChatInput;
