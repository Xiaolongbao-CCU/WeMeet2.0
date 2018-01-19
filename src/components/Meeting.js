// lib
import React from "react";
import { connect } from "react-redux";
import chat from "../lib/chat";
import recognition from "../lib/recognition";
import socket from "../socket";
import "../lib/peer";
import "../scss/meeting.scss";

// redux-action
import {
    setRoomList,
    setLocalUserID,
    setUserName,
    setRoomName,
    setRemoteUserName,
    delRemoteUserName,
    addParticipantList,
    addParticipantConnection,
    delParticipantConnection,
    addRemoteStreamURL,
    delRemoteStreamURL,
    addCandidateQueue,
    toggleUserMedia,
    toggleAudio
} from "../actions/Actions";

import {
    setGridDetailOpen,
    setGridStart,
    setGridOpen,
    setGridClose,
    setPaintOpen,
    setPaintClose,
    setSixhatClose,
    setReservationDetailState,
    setVotingDetailState,
    setBrainStormingState,
    setGridDetailClose,
    setSixhatDetailClose
} from "../actions/Actions";

//component

//left-field,total 2 components
import CVcontrol from "./left-field/CVcontrol";
import Chatroom from "./left-field/Chatroom";
import VoiceRecognition from "./left-field/VoiceRecognition";
import ChatInput from "./left-field/ChatInput";
import VoiceResult from "./left-field/VoiceResult";

//center-field, total 4 components
import Toolbar from "./center-field/Toolbar";
import AVcontrol from "./center-field/AVcontrol";
import CenterField from './center-field/CenterField';

//right-field, total 2 components
import Agenda from "./right-field/Agenda";
import Vote from "./right-field/Vote";

//special-field, total ? components
import Background from "./special-field/Background";
import VoteResult from "./special-field/VoteResult";
import GirdDetail from "./special-field/GirdDetail";
import SixHatDetail from "./special-field/SixHatDetail";
import ReservationResult from "./center-field/ReservationResult";

let configuration = {
    iceServers: [
        { urls: "stun:stun01.sipphone.com" },
        { urls: "stun:stun.ekiga.net" },
        { urls: "stun:stun.fwdnet.net" },
        { urls: "stun:stun.ideasip.com" },
        { urls: "stun:stun.iptel.org" },
        { urls: "stun:stun.rixtelecom.se" },
        { urls: "stun:stun.schlund.de" },
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stunserver.org" },
        { urls: "stun:stun.softjoys.com" },
        { urls: "stun:stun.voiparound.com" },
        { urls: "stun:stun.voipbuster.com" },
        { urls: "stun:stun.voipstunt.com" },
        { urls: "stun:stun.voxgratia.org" },
        { urls: "stun:stun.xten.com" },
    ]
};

document.ondblclick = function () {
    return false;
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
            isKJPlaying: false,
        };
        this.closeAll = this.closeAll.bind(this);
    }

    componentWillMount() {
        this.getRoomURL();
        socket.emit("giveMeMySocketId");
        socket.emit("IAmAt", window.location.pathname, window.location.hash);
    }

    componentDidMount() {
        if (
            !this.props.userName &&
            window.sessionStorage.hasOwnProperty("userName")
        ) {
            this.props.dispatch(setUserName(window.sessionStorage.userName));
        }
        window.connections = {};
        window.localStream = {};
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
                this.Chat
                    .getUserMedia()
                    .then(stream => {
                        console.log(stream);
                        window.localStream = stream;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                if (window.Peer && window.Peer.disconnected) {
                    window.Peer.reconnect();
                } else {
                    window.peerConstructor = Peer;
                    let peer = window.peerConstructor(id, {
                        host: "wemeet.tw",
                        port: 8888,
                        path: "/api",
                        secure: true,
                        config: configuration,
                        debug: 3
                    });
                    window.Peer = peer;
                    window.Peer.on("call", call => {
                        if (
                            window.localStream &&
                            Object.keys(window.localStream).length > 0
                        ) {
                            call.answer(window.localStream);
                            call.on("stream", remoteStream => {
                                console.log("收到影像啦!" + stream);
                                let url = URL.createObjectURL(remoteStream);
                                this.props.dispatch(
                                    addRemoteStreamURL({
                                        remotePeer: call.peer,
                                        url: url,
                                        stream: remoteStream
                                    })
                                );
                            });
                        } else {
                            this.Chat.getUserMedia().then(stream => {
                                call.answer(window.localStream);
                                call.on("stream", remoteStream => {
                                    let url = URL.createObjectURL(remoteStream);
                                    console.log("收到影像啦!" + stream);
                                    this.props.dispatch(
                                        addRemoteStreamURL({
                                            remotePeer: call.peer,
                                            url: url,
                                            stream: remoteStream
                                        })
                                    );
                                });
                            });
                        }
                        socket.emit(
                            "setRemoteVideoState",
                            true,
                            this.props.localUserID
                        );
                        socket.emit(
                            "setRemoteAudioState",
                            true,
                            this.props.localUserID
                        );
                    });
                }
            })
            .on("joinRoom", () => {
                socket.emit("join", window.location.hash);
            })
            .on("joinSuccess", () => {
                if (!this.props.userName) {
                    this.props.dispatch(setUserName(this.props.animalName));
                }
                socket.emit(
                    "newParticipantA",
                    this.localUserID,
                    window.location.hash,
                    this.props.userName
                );
            })
            .on("newParticipantB", participantID => {
                console.log("收到新人訊息(1)");
                if (
                    window.localStream &&
                    Object.keys(window.localStream).length > 0
                ) {
                    let call = window.Peer.call(
                        participantID,
                        window.localStream
                    );
                    call.on("stream", remoteStream => {
                        let url = URL.createObjectURL(remoteStream);
                        console.log("收到影像囉!(5)" + remoteStream);
                        this.props.dispatch(
                            addRemoteStreamURL({
                                remotePeer: participantID,
                                url: url,
                            })
                        );
                    });
                } else {
                    this.Chat.getUserMedia().then(stream => {
                        window.localStream = stream;
                        let call = window.Peer.call(
                            participantID,
                            window.localStream
                        );
                        console.log("發出連線(4)");
                        call.on("stream", remoteStream => {
                            console.log("收到影像囉!(5)" + remoteStream);
                            let url = URL.createObjectURL(remoteStream);
                            this.props.dispatch(
                                addRemoteStreamURL({
                                    remotePeer: participantID,
                                    url: url
                                })
                            );
                        });
                    });
                }
                socket.emit(
                    "setRemoteVideoState",
                    true,
                    this.props.localUserID
                );
                socket.emit(
                    "setRemoteAudioState",
                    true,
                    this.props.localUserID
                );
                socket.emit(
                    "setRemoteUserName",
                    this.props.localUserID,
                    this.props.userName,
                    participantID
                );
            })
            .on("participantDisconnected", participantID => {
                this.props.dispatch(delParticipantConnection(participantID));
                this.props.dispatch(delRemoteStreamURL(participantID));
                this.props.dispatch(delRemoteUserName(participantID));
            })
            .on("callShareScreenInvoker", (participantID, uuid) => {
                if (
                    window.localStream &&
                    Object.keys(window.localStream).length > 0
                ) {
                    let call = window.Peer.call(
                        participantID + uuid,
                        window.localStream
                    );
                    call.on("stream", remoteStream => {
                        let url = URL.createObjectURL(remoteStream);
                        console.log("收到影像囉!(5)" + remoteStream);
                        this.props.dispatch(
                            addRemoteStreamURL({
                                remotePeer: participantID,
                                url: url,
                                isShareScreen: true
                            })
                        );
                    });
                } else {
                    this.Chat.getUserMedia().then(stream => {
                        window.localStream = stream;
                        let call = window.Peer.call(
                            participantID + uuid,
                            window.localStream
                        );
                        console.log("發出連線(4)");
                        call.on("stream", remoteStream => {
                            console.log("收到影像囉!(5)" + remoteStream);
                            let url = URL.createObjectURL(remoteStream);
                            this.props.dispatch(
                                addRemoteStreamURL({
                                    remotePeer: participantID,
                                    url: url,
                                    isShareScreen: true
                                })
                            );
                        });
                    });
                }
            })
            .on("callCloseShareScreenInvoker", participantID => {
                if (
                    window.localStream &&
                    Object.keys(window.localStream).length > 0
                ) {
                    let call = window.Peer.call(
                        participantID,
                        window.localStream
                    );
                    call.on("stream", remoteStream => {
                        let url = URL.createObjectURL(remoteStream);
                        console.log("收到影像囉!(5)" + remoteStream);
                        this.props.dispatch(
                            addRemoteStreamURL({
                                remotePeer: participantID,
                                url: url
                            })
                        );
                    });
                } else {
                    this.Chat.getUserMedia().then(stream => {
                        window.localStream = stream;
                        let call = window.Peer.call(
                            participantID,
                            window.localStream
                        );
                        console.log("發出連線(4)");
                        call.on("stream", remoteStream => {
                            console.log("收到影像囉!(5)" + remoteStream);
                            let url = URL.createObjectURL(remoteStream);
                            this.props.dispatch(
                                addRemoteStreamURL({
                                    remotePeer: participantID,
                                    url: url
                                })
                            );
                        });
                    });
                }
            });
    }

    getRoomURL() {
        let temp = window.location.href.split("?hash=");
        console.log(temp[0], temp[1]);
        if (temp.length >= 2) {
            window.location.href = temp[0] + "#" + temp[1];
            this.setState({
                roomURL: window.location.href
            });
            this.props.dispatch(setRoomName(window.location.href));
        } else if (window.location.hash) {
            this.setState({
                roomURL: window.location.href
            });
            this.props.dispatch(setRoomName(window.location.href));
        } else {
            window.location.hash = Math.floor((1 + Math.random()) * 1e16)
                .toString(16)
                .substring(8);
            this.setState({
                roomURL: window.location.href
            });
            this.props.dispatch(setRoomName(window.location.href));
        }
    }

    closeAll() {
        if (this.props.isGridDetailOpen) {
            this.props.dispatch(setGridDetailClose());
        }
        if (this.props.isBrainstormingOpen) {
            this.props.dispatch(setBrainStormingState(false));
        }
        if (this.props.isSixhatDetailOpen) {
            this.props.dispatch(setSixhatDetailClose());
        }
        if (this.props.isRerservationDetailOpen) {
            this.props.dispatch(setReservationDetailState(false));
        }
        if (this.props.isPaintOpen) {
            this.props.dispatch(setPaintClose());
        }
        if (this.props.isVotingDetailOpen) {
            this.props.dispatch(setVotingDetailState(false));
        }
    }

    componentWillUnmount() {
        socket.emit("leaveRoom");
        if (this.props.isStreaming) {
            this.Chat.stopUserMedia();
            this.props.dispatch(toggleUserMedia());
        }
        if (this.props.isSounding) {
            this.Chat.stopAudio();
            this.props.dispatch(toggleAudio());
        }

        this.Recognizer.stop();

        socket
            .off("gotSocketID")
            .off("joinRoom")
            .off("joinSuccess")
            .off("newParticipantB")
            .off("callRequest")
            .off("answerCallRequest")
            .off("answer")
            .off("offer")
            .off("onIceCandidateB")
            .off("participantDisconnected");
        window.Peer.disconnect();
    }

    render() {
        let center = undefined;
        switch (this.props.WhatPage) {
            case "one":
                Content = <ul />;
                break;
            case "two":
                Content = <ul>{this.sixhat[localHat][1].indrotuction}</ul>;
                break;
            case "three":
                let li = this.sixhat[localHat][1].example.map(string => {
                    return <li>{string}</li>;
                });
                Content = <ul>{li}</ul>;
                break;
        }
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
                {this.props.isVotingFinish && this.props.isAnimateOpen ? (
                    <VoteResult />
                ) : null}
                {this.props.isGridDetailOpen ? (
                    <GirdDetail closeAll={this.closeAll} />
                ) : null}
                {this.props.isSixhatDetailOpen ? <SixHatDetail closeAll={this.closeAll} /> : null}
                <div className="left-field">
                    <CVcontrol />
                    {this.props.isInChatNow ? (
                        <Chatroom />
                    ) : (
                            <VoiceRecognition Recognizer={this.Recognizer} />
                        )}
                    {this.props.isInChatNow ? (
                        <ChatInput Chat={this.Chat} />
                    ) : (
                            <VoiceResult Recognizer={this.Recognizer} />
                        )}
                </div>
                <div className="center-field">
                    <Toolbar Recognizer={this.Recognizer} />
                    <CenterField isGridOpen={this.props.isGridOpen} isPaintOpen={this.props.isPaintOpen} />
                    <AVcontrol Chat={this.Chat} Meeting={this} />
                </div>
                <div className="right-field">
                    <Agenda />
                    <Vote />
                </div>

                <Background />
                {this.props.isReceivedData ? <ReservationResult /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.connection.userName,
        animalName: state.connection.animalName,
        localUserID: state.connection.localUserID,
        localVideo: state.connection.localVideo,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding,
        connections: state.connection.connections,
        remoteStreamURL: state.connection.remoteStreamURL,
        candidateQueue: state.connection.candidateQueue,
        isInChatNow: state.chatAndRecognition.isInChatNow,

        isGridDetailOpen: state.grid.isGridDetailOpen,
        isGridOpen: state.grid.isGridOpen,
        isGridStart: state.grid.isGridStart,

        isPaintOpen: state.paint.isPaintOpen,

        isSixhatDetailOpen: state.sixhat.isSixhatDetailOpen,
        isSixhatOpen: state.sixhat.isSixhatOpen,

        isVotingFinish: state.vote.isVotingFinish,
        isVotingDetailOpen: state.vote.isVotingDetailOpen,
        isAnimateOpen: state.vote.isAnimateOpen,

        isReceivedData: state.reservation.isReceivedData,
        isRerservationDetailOpen: state.reservation.isRerservationDetailOpen,

        isBrainstormingOpen: state.brainStorming
    };
};

export default connect(mapStateToProps)(Meeting);
