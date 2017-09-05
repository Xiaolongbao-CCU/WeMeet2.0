"use strict";

import React from "react";
import chat from "../lib/chat";

//component

//left-field,total 4 components
import VoiceStatus from "./left-field/VoiceStatus";
import MeetingTime from "./left-field/MeetingTime";
import Chatroom from "./left-field/Chatroom";
import ChatInput from "./left-field/Chatinput";

//center-field, total 4 components
import Toolbar from "./center-field/Toolbar";
import MainScreen from "./center-field/MainScreen";
import AVcontrol from "./center-field/AVcontrol";

//center-field, total 2 components
import Agenda from "./right-field/Agenda";
import Vote from "./right-field/Vote";

//special-field, total ? components
import Background from "./special-field/Background";
import VoteResult from "./special-field/VoteResult";


class Meeting_new extends React.Component {
    constructor(props) {
        super(props);
        this.Chat = chat.createNew(this);
        this.state = {
            isVoteResultOpen: false,
            roomURL: ''
        }
        this.getRoomURL = this.getRoomURL.bind(this);
    }

    componentWillMount() {
        this.getRoomURL();
    }

    componentDidMount() { }

    getRoomURL() {
        if (window.location.hash) {
            this.setState({
                roomURL: window.location.href
            });
        } else {
            window.location.hash = Math.floor((1 + Math.random()) * 1e16)
                .toString(16)
                .substring(8);
            this.setState({
                roomURL: window.location.href
            });
        }
    }

    render() {
        return (
            <div className="container" id="in">
                {this.state.isVoteResultOpen ? <VoteResult /> : null}
                <div className="left-field">
                    <VoiceStatus />
                    <MeetingTime />
                    <Chatroom />
                    <ChatInput />
                </div>

                <div className="center-field">
                    <Toolbar />
                    <MainScreen />
                    <AVcontrol />
                </div>

                <div className="right-field">
                    <Agenda />
                    <Vote />
                </div>

                <Background />

            </div>
        )

    }
}


export default Meeting_new
