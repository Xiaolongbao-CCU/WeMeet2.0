"use strict";

// lib
import React from "react";
import { connect } from "react-redux";
import chat from "../lib/chat";
import recognition from "../lib/recognition";
import socket from "../socket";

// redux-action
import {
    setLocalUserID,
    setRoomName,
    setRemoteUserName,
    addParticipantList,
    addParticipantConnection,
    delParticipantConnection,
    delRemoteStreamURL,
    addCandidateQueue,
    toggleUserMedia,
    toggleAudio
} from "../actions/Actions";

//component

//left-field,total 2 components
import CVcontrol from './left-field/CVcontrol';
import Chatroom from "./left-field/Chatroom";
import VoiceRecognition from "./left-field/VoiceRecognition"
import ChatInput from "./left-field/Chatinput";
import VoiceResult from "./left-field/VoiceResult";

//center-field, total 4 components
import Toolbar from "./center-field/Toolbar";
import MainScreen from "./center-field/MainScreen";
import AVcontrol from "./center-field/AVcontrol";
import GridGame from "./center-field/GridGame";
import KJGame from "./center-field/KJGame";
import KJGame_result from "./center-field/KJGame_result";

//right-field, total 2 components
import Agenda from "./right-field/Agenda";
import Vote from "./right-field/Vote";

//special-field, total ? components
import Background from "./special-field/Background";
import VoteResult from "./special-field/VoteResult";
import GirdDetail from "./special-field/GirdDetail";
import KJDetail from "./special-field/KJDetail";
import SixHatDetail from "./special-field/SixHatDetail";

let configuration = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302"
            ]
        },
        {
            urls: "stun:stun.services.mozilla.com"
        }
    ]
};

class Meeting extends React.Component {
    constructor(props) {
        super(props);
        this.Chat = chat.createNew(this);
        this.Recognizer = recognition.createNew(this);
        this.state = {
            loading: true,
            isVoteResultOpen: false,
            isJiugonggeOpen: false,
            isKJOpen: false,
            isSixHatOpen: false,
            isJiugonggePlaying: false,
            isKJPlaying: false
        };
        this.localStreamURL = "";
    }

    componentWillMount() {
        this.getRoomURL();
        socket.emit("giveMeMySocketId");
        socket.emit("IAmAt", window.location.pathname, window.location.hash);
    }

    componentDidMount() {

        setTimeout(() => this.setState({ loading: false }), 1500);
        /*
            取得網址
            拿socketid
            連線
        */
        socket
            .on("gotSocketID", id => {
                this.localUserID = id;
                this.Recognizer.id = this.localUserID;
                this.props.dispatch(setLocalUserID(id));
                this.Chat.getUserMedia(
                    this.localUserID,
                    window.location.hash,
                    socket
                );

            })
            .on("joinRoom", () => {
                socket.emit("join", window.location.hash);
            })
            .on("newParticipantB", participantID => {
                //接到新人加入的訊息時，檢查是否已有連線
                if (this.props.connections[participantID]) {
                    console.log("已存在，刪除該連線，再重新連線");
                    this.props.dispatch(
                        delParticipantConnection(participantID)
                    );
                }
                //主動建立連線
                let isInitiator = true;
                let peerConn = this.Chat.createPeerConnection(
                    isInitiator,
                    configuration,
                    participantID,
                    socket
                );

                peerConn
                    .createOffer()
                    .then(offer => {
                        //console.log("offer" + JSON.stringify(offer));
                        peerConn.setLocalDescription(offer);
                        socket.emit(
                            "offerRemotePeer",
                            offer,
                            this.localUserID,
                            participantID,
                            this.props.userName,
                            this.props.isStreaming,
                            this.props.isSounding
                        );
                    })
                    .catch(e => {
                        console.log("發生錯誤了看這裡: " + e);
                    });
                this.props.dispatch(
                    addParticipantConnection({
                        id: participantID,
                        connectionObj: peerConn
                    })
                );
            })
            .on("answer", (answer, sender) => {
                //console.log("answer" + JSON.stringify(answer));
                //console.log('有收到answer喔!');
                let settingPromise = this.props.connections[
                    sender
                ].setRemoteDescription(new RTCSessionDescription(answer));
                //console.log(this.state.connections[sender].getRemoteStreams()[0]);
            })
            .on("offer", (offer, sender, senderName) => {
                //console.log("888888888888")
                if (this.props.connections[sender]) {
                    this.props.dispatch(delParticipantConnection(sender));
                }
                //console.log('收到遠端的 offer，要建立連線並處理');
                let isInitiator = false;
                let peerConn = this.Chat.createPeerConnection(
                    isInitiator,
                    configuration,
                    sender,
                    socket
                );

                peerConn
                    .setRemoteDescription(new RTCSessionDescription(offer))
                    .then(() => {
                        if (!isInitiator && this.Chat.localStream) {
                            peerConn.addStream
                        }
                    })
                    .then(() => {
                        return peerConn.createAnswer();
                    })
                    .then(answer => {
                        console.log("創建好本地端的 " + answer + "，要傳出去");
                        peerConn.setLocalDescription(answer)
                            .then(() => {
                                socket.emit(
                                    "answerRemotePeer",
                                    answer,
                                    this.localUserID,
                                    sender,
                                    this.props.isStreaming,
                                    this.props.isSounding
                                );
                            })
                    })
                    .catch(e => {
                        console.log("發生錯誤了看這裡:" + e);
                    });
            })
            .on("onIceCandidateB", (candidate, sender) => {
                if (
                    this.props.connections[sender] &&
                    this.props.connections[sender].remoteDescription.type
                ) {
                    //console.log('加到了!');
                    this.props.connections[sender]
                        .addIceCandidate(new RTCIceCandidate(candidate))
                        .catch(e => {
                            console.log("發生錯誤了看這裡: " + e);
                        });
                } else {
                    this.props.dispatch(
                        addCandidateQueue({
                            id: sender,
                            candidate: candidate
                        })
                    );
                }
            })
            .on("participantDisconnected", participantID => {
                // this.setState(
                //     Object.assign({}, this.state, {
                //         connections: Object.keys(
                //             this.props.connections
                //         ).reduce((result, key) => {
                //             if (key !== participantID) {
                //                 result[key] = this.state.connections[key];
                //             }
                //             return result;
                //         }, {})
                //     })
                // )
                this.props.dispatch(delParticipantConnection(participantID));
                this.props.dispatch(delRemoteStreamURL(participantID));
            });
    }

    getRoomURL() {
        if (window.location.hash) {
            this.setState({
                roomURL: window.location.href
            });
            this.props.dispatch(setRoomName(window.location.href))
        } else {
            window.location.hash = Math.floor((1 + Math.random()) * 1e16)
                .toString(16)
                .substring(8);
            this.setState({
                roomURL: window.location.href
            });
            this.props.dispatch(setRoomName(window.location.href))
        }
    }

    componentWillUnmount() {
        socket.emit("leaveRoom");
        if (this.props.isStreaming) {
            this.Chat.toggleUserMedia();
            this.props.dispatch(toggleUserMedia());

        }
        if (this.props.isSounding) {
            this.Chat.toggleAudio();
            this.props.dispatch(toggleAudio());

        }
        this.Chat.stopUserMedia()
        this.Chat.stopAudio()
        socket
            .off("gotSocketID")
            .off("joinRoom")
            .off("newParticipantB")
            .off("answer")
            .off("offer")
            .off("onIceCandidateB")
            .off("participantDisconnected");
    }
    render() {
        const { loading } = this.state;

        if (loading) {
            return (
                <div className="loader">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube" />
                        <div className="sk-cube2 sk-cube" />
                        <div className="sk-cube4 sk-cube" />
                        <div className="sk-cube3 sk-cube" />
                    </div>
                    <Background />
                </div>
            );
        }

        return (
            <div className="container" id="in">
                {this.state.isVoteResultOpen ? <VoteResult /> : null}
                {
                    this.props.isGridDetailOpen ? <GirdDetail /> :
                        this.state.isKJOpen ? <KJDetail /> :
                            this.state.isSixHatOpen ? <SixHatDetail /> : null
                }
                <div className="left-field">
                    <CVcontrol />
                    {this.props.isInChatNow ? <Chatroom /> : <VoiceRecognition Recognizer={this.Recognizer} />}
                    {this.props.isInChatNow ? <ChatInput Chat={this.Chat} /> : <VoiceResult Recognizer={this.Recognizer} />}
                </div>

                <div className="center-field">
                    <Toolbar />
                    {
                        this.props.isGridStart ? <GridGame /> :
                            this.state.isKJPlaying ? <KJGame_result /> :
                                <MainScreen />
                    }
                    <AVcontrol Chat={this.Chat} />
                </div >

                <div className="right-field">
                    <Agenda />
                    <Vote />
                </div>

                <Background />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.connection.userName,
        localUserID: state.connection.localUserID,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding,
        connections: state.connection.connections,
        remoteStreamURL: state.connection.remoteStreamURL,
        candidateQueue: state.connection.candidateQueue,
        isInChatNow: state.chatAndRecognition.isInChatNow,
        isGridDetailOpen: state.grid.isGridDetailOpen,
        isGridStart: state.grid.isGridStart
    };
};

export default connect(mapStateToProps)(Meeting);
