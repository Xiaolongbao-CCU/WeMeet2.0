"use strict";

import React from "react";
import chat from "../lib/chat";

//component

//left-field,total 2 components
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
            loading: true,
            isVoteResultOpen: false,
            roomURL: ''
        }

        this.getRoomURL = this.getRoomURL.bind(this);
    }

    componentWillMount() {
        this.getRoomURL();

    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);
    }

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
        const { loading } = this.state;

        if (loading) {
            return (
                <div className="loader" >
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                    <Background />
                </div>
            )
        }

        return (
            <div className="container" id="in">
                {this.state.isVoteResultOpen ? <VoteResult /> : null}
                <div className="left-field">
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
