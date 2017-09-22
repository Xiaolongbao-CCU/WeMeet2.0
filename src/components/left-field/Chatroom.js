"use strict";

import React from "react";
import { connect } from "react-redux";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        let chatbox = [];
        if (this.props.chatRecord) {
            this.props.chatRecord.map((record) => {
                if (record.userID == this.props.localUserID) {
                    chatbox.push(
                        <div className="myself-message">
                            <img className="image" src="./img/test0.jpg" />
                            <div className="name">{record.name}</div>
                            <div className="dialogbox">{record.text}
                            </div>
                            <div className="time">{record.sendTime}</div>
                        </div>
                    );
                } else {
                    chatbox.push(
                        <div className="others-message">
                            <img className="image" src="./img/test1.jpg" />
                            <div className="name">{record.name}</div>
                            <div className="dialogbox">{record.text}</div>
                            <div className="time">{record.sendTime}</div>
                        </div>
                    );
                }
            })
        }

        return (
            <div className="left-chatbox">
                {chatbox}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatRecord: state.chat,
        localUserID: state.connection.localUserID
    };
};

export default connect(mapStateToProps)(Chatroom);
