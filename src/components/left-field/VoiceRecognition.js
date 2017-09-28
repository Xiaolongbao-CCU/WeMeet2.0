"use strict";

import React from "react";
import { connect } from "react-redux";

class VoiceRecognition extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        let RecognitionRecord = [];
        if (this.props.recognitionRecord) {
            this.props.recognitionRecord.map(record => {
                if (record.userID == this.props.localUserID) {
                    RecognitionRecord.push(
                        <div className="myself-message">
                            <img className="image" src="./img/test0.jpg" />
                            <div className="name">
                                {this.props.localUserName ||
                                    "u_" + record.userID.substring(0, 4)}
                            </div>
                            <div className="dialogbox">{record.text}</div>
                            <div className="time">{record.sendTime}</div>
                        </div>
                    );
                } else if (
                    record.userID &&
                    record.userID !== this.props.localUserID
                ) {
                    RecognitionRecord.push(
                        <div className="others-message">
                            <img className="image" src="./img/test1.jpg" />
                            <div className="name">
                                {this.props.remoteUserName[record.userID] &&
                                this.props.remoteUserName[record.userID] !==
                                    record.userID
                                    ? this.props.remoteUserName[record.userID]
                                    : "u_" + record.userID.substring(0, 4)}
                            </div>
                            <div className="dialogbox">{record.text}</div>
                            <div className="time">{record.sendTime}</div>
                        </div>
                    );
                }
            });
        }

        return <div className="left-chatbox">{RecognitionRecord}</div>;
    }
}

const mapStateToProps = state => {
    return {
        localUserName: state.connection.userName,
        remoteUserName: state.connection.remoteUserName,
        localUserID: state.connection.localUserID,
        recognitionRecord: state.chatAndRecognition.recognitionRecord
    };
};

export default connect(mapStateToProps)(VoiceRecognition);
