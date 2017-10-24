"use strict";

// lib
import React from "react";
import { connect } from "react-redux";
import chat from "../lib/chat";
import recognition from "../lib/recognition";
import socket from "../socket";
import "../lib/peer";

// redux-action
import {
    setLocalUserID,
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

//component

//left-field,total 2 components
import CVcontrol from "./left-field/CVcontrol";
import Chatroom from "./left-field/Chatroom";
import VoiceRecognition from "./left-field/VoiceRecognition";
import ChatInput from "./left-field/Chatinput";
import VoiceResult from "./left-field/VoiceResult";

//center-field, total 4 components
import Toolbar from "./center-field/Toolbar";
import MainScreen from "./center-field/MainScreen";
import AVcontrol from "./center-field/AVcontrol";
import GridGame from "./center-field/GridGame";
import KJGame from "./center-field/KJGame";
import KJGame_result from "./center-field/KJGame_result";
import Painting from "./center-field/Painting";

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
        { url: "stun:stun01.sipphone.com" },
        { url: "stun:stun.ekiga.net" },
        { url: "stun:stun.fwdnet.net" },
        { url: "stun:stun.ideasip.com" },
        { url: "stun:stun.iptel.org" },
        { url: "stun:stun.rixtelecom.se" },
        { url: "stun:stun.schlund.de" },
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun1.l.google.com:19302" },
        { url: "stun:stun2.l.google.com:19302" },
        { url: "stun:stun3.l.google.com:19302" },
        { url: "stun:stun4.l.google.com:19302" },
        { url: "stun:stunserver.org" },
        { url: "stun:stun.softjoys.com" },
        { url: "stun:stun.voiparound.com" },
        { url: "stun:stun.voipbuster.com" },
        { url: "stun:stun.voipstunt.com" },
        { url: "stun:stun.voxgratia.org" },
        { url: "stun:stun.xten.com" }
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
            isKJPlaying: false,
            isPainting: false
        };
    }

    componentWillMount() {
        this.getRoomURL();
        socket.emit("giveMeMySocketId");
        socket.emit("IAmAt", window.location.pathname, window.location.hash);
    }

    componentDidMount() {
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
            })
            .on("joinRoom", () => {
                socket.emit("join", window.location.hash);
            })
            .on("joinSuccess", () => {
                socket.emit(
                    "newParticipantA",
                    this.localUserID,
                    window.location.hash,
                    this.props.userName
                        ? this.props.userName
                        : this.props.localUserID
                );
            })
            .on("newParticipantB", participantID => {
                // console.log("接到新人加入的訊息時，檢查是否已有連線")
                // //接到新人加入的訊息時，檢查是否已有連線
                // if (this.props.connections[participantID]) {
                //     console.log("已存在，刪除該連線，再重新連線");
                //     this.props.dispatch(
                //         delParticipantConnection(participantID)
                //     );
                // }

                //主動建立連線
                // let isInitiator = true;
                // let peerConn = this.Chat.createPeerConnection(
                //     isInitiator,
                //     configuration,
                //     participantID,
                //     socket
                // );

                // peerConn
                //     .createOffer()
                //     .then(offer => {
                //         //console.log("offer" + JSON.stringify(offer));
                //         peerConn.setLocalDescription(
                //             offer,
                //             () => {
                //                 socket.emit(
                //                     "offerRemotePeer",
                //                     offer,
                //                     this.localUserID,
                //                     participantID,
                //                     this.props.userName,
                //                     this.props.isStreaming,
                //                     this.props.isSounding
                //                 );
                //                 this.props.dispatch(
                //                     addParticipantConnection({
                //                         id: participantID,
                //                         connectionObj: peerConn
                //                     })
                //                 );
                //             },
                //             error => {
                //                 console.log("set失敗了: ") + error;
                //             }
                //         );
                //     })
                //     .catch(e => {
                //         console.log("createOffer出錯了: " + e);
                //     });

                console.log("收到新人訊息(1)");
                let peerConn = new Peer(
                    `${this.props.localUserID}${participantID}`,
                    {
                        host: "140.123.175.95",
                        port: 8080,
                        path: "/peerjs",
                        debug: "3"
                    }
                );
                console.log("創建好連線物件(2)");
                window.connections = {
                    ...window.connections,
                    [participantID]: peerConn
                };
                socket.emit(
                    "callRequest",
                    this.props.localUserID,
                    participantID
                );
                console.log("通知對方建立連線物件(3)");
            })
            .on("callRequest", senderID => {
                console.log("收到連線要求(1)");
                let peerConn = new Peer(
                    `${this.props.localUserID}${senderID}`,
                    {
                        host: "140.123.175.95",
                        port: 8080,
                        path: "/peerjs",
                        debug: "3"
                    }
                );
                console.log("創建連線物件，接收連線(2)");
                window.connections = {
                    ...window.connections,
                    [senderID]: peerConn
                };
                peerConn.on("call", call => {
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
                                    remotePeer: senderID,
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
                                        remotePeer: senderID,
                                        url: url,
                                        stream: remoteStream
                                    })
                                );
                            });
                        });
                    }
                });

                socket.emit(
                    "answerCallRequest",
                    this.props.localUserID,
                    senderID
                );
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
                console.log("傳送回復，等待連線(3)");
            })
            .on("answerCallRequest", sender => {
                console.log("收到回覆");
                if (
                    window.localStream &&
                    Object.keys(window.localStream).length > 0
                ) {
                    let call = window.connections[sender].call(
                        `${sender}${this.props.localUserID}`,
                        window.localStream
                    );
                    console.log("發出連線(4)");
                    call.on("stream", remoteStream => {
                        let url = URL.createObjectURL(remoteStream);
                        console.log("收到影像囉!(5)" + remoteStream);
                        this.props.dispatch(
                            addRemoteStreamURL({
                                remotePeer: sender,
                                url: url,
                                stream: remoteStream
                            })
                        );
                    });
                } else {
                    this.Chat.getUserMedia().then(stream => {
                        window.localStream = stream;
                        let call = window.connections[sender].call(
                            `${sender}${this.props.localUserID}`,
                            window.localStream
                        );
                        console.log("發出連線(4)");
                        call.on("stream", remoteStream => {
                            console.log("收到影像囉!(5)" + remoteStream);
                            let url = URL.createObjectURL(remoteStream);
                            this.props.dispatch(
                                addRemoteStreamURL({
                                    remotePeer: sender,
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
            })
            .on("participantDisconnected", participantID => {
                window.connections = Object.assign(
                    {},
                    {
                        connections: Object.keys(
                            window.connections
                        ).reduce((result, key) => {
                            if (key !== participantID) {
                                result[key] = window.connections[key];
                            }
                            return result;
                        }, {})
                    }
                );
                this.props.dispatch(delParticipantConnection(participantID));
                this.props.dispatch(delRemoteStreamURL(participantID));
                this.props.dispatch(delRemoteUserName(participantID));
            });
        // .on("answer", (answer, sender) => {
        //     //console.log("answer" + JSON.stringify(answer));
        //     //console.log('有收到answer喔!');
        //     // this.props.connections[sender]
        //     //     .setRemoteDescription(new RTCSessionDescription(answer))
        //     //     .catch(error => {
        //     //         console.log(error);
        //     //     });
        //     window.connections[sender]
        //         .setRemoteDescription(new RTCSessionDescription(answer))
        //         .catch(error => {
        //             console.log(error);
        //         });
        //     // window.connections[sender] = this.props.connections[sender]
        //     //console.log(this.state.connections[sender].getRemoteStreams()[0]);
        // })
        // .on("offer", (offer, sender, senderName) => {
        //     //console.log("888888888888")
        //     // if (this.props.connections[sender]) {
        //     //     this.props.dispatch(delParticipantConnection(sender));
        //     // }
        //     //console.log('收到遠端的 offer，要建立連線並處理');
        //     // let isInitiator = false;
        //     // let peerConn = this.Chat.createPeerConnection(
        //     //     isInitiator,
        //     //     configuration,
        //     //     sender,
        //     //     socket
        //     // );

        //     // peerConn.setRemoteDescription(
        //     //     new RTCSessionDescription(offer),
        //     //     () => {
        //     //         if (
        //     //             Object.keys(window.localStream).length == 0 ||
        //     //             window.localStream == null ||
        //     //             window.localStream == undefined
        //     //         ) {
        //     //             this.Chat
        //     //                 .getUserMedia()
        //     //                 .then(stream => {
        //     //                     console.log(window.localStream);

        //     //                     peerConn.addStream(window.localStream);

        //     //                     peerConn.createAnswer(
        //     //                         answer => {
        //     //                             peerConn.setLocalDescription(
        //     //                                 answer,
        //     //                                 () => {
        //     //                                     socket.emit(
        //     //                                         "answerRemotePeer",
        //     //                                         answer,
        //     //                                         this.localUserID,
        //     //                                         sender,
        //     //                                         this.props.isStreaming,
        //     //                                         this.props.isSounding
        //     //                                     );
        //     //                                 },
        //     //                                 error => {
        //     //                                     console.log(error);
        //     //                                 }
        //     //                             );
        //     //                         },
        //     //                         error => {
        //     //                             console.log(error);
        //     //                         }
        //     //                     );
        //     //                 })
        //     //                 .catch(error => {
        //     //                     console.log(error);
        //     //                 });
        //     //         } else {
        //     //             console.log(window.localStream);

        //     //             peerConn.addStream(window.localStream);

        //     //             peerConn.createAnswer(
        //     //                 answer => {
        //     //                     peerConn.setLocalDescription(
        //     //                         answer,
        //     //                         () => {
        //     //                             socket.emit(
        //     //                                 "answerRemotePeer",
        //     //                                 answer,
        //     //                                 this.localUserID,
        //     //                                 sender,
        //     //                                 this.props.isStreaming,
        //     //                                 this.props.isSounding
        //     //                             );
        //     //                         },
        //     //                         error => {
        //     //                             console.log(error);
        //     //                         }
        //     //                     );
        //     //                 },
        //     //                 error => {
        //     //                     console.log(error);
        //     //                 }
        //     //             );
        //     //         }
        //     //     },
        //     //     error => {
        //     //         console.log(error);
        //     //     }
        //     // );
        //     let peerConn = new Peer(localUserID, {
        //         key: "lcl1o5jwjt027qfr"
        //     });
        //     peerConn.on("call", function(call) {
        //         if (
        //             window.localStream &&
        //             Object.keys(window.localStream).length > 0
        //         ) {
        //             call.answer(window.localStream); // Answer the call with an A/V stream.
        //             call.on("stream", function(remoteStream) {
        //                 this.props.dispatch(
        //                     addRemoteStreamURL({
        //                         [sender]: sender,
        //                         url: url,
        //                         stream: remoteStream
        //                     })
        //                 );
        //                 // Show stream in some video/canvas element.
        //             });
        //         } else {
        //             this.Chat.getUserMedia().then(stream => {
        //                 window.localStream = stream;
        //                 call.answer(window.localStream);
        //                 call.on("stream", function(remoteStream) {
        //                     this.props.dispatch(
        //                         addRemoteStreamURL({
        //                             [participantID]: participantID,
        //                             url: url,
        //                             stream: remoteStream
        //                         })
        //                     );
        //                 });
        //             });
        //         }
        //     });
        //     window.connections = {
        //         ...window.connections,
        //         [sender]: peerConn
        //     };
        // })
        // .on("onIceCandidateB", (candidate, sender) => {
        //     // if (
        //     //     this.props.connections[sender] &&
        //     //     this.props.connections[sender].remoteDescription.type
        //     // ) {
        //     //     //console.log('加到了!');
        //     this.props.connections[sender]
        //         .addIceCandidate(new RTCIceCandidate(candidate))
        //         .catch(e => {
        //             console.log("發生錯誤了看這裡: " + e);
        //         });
        //     // } else {
        //     //     this.props.dispatch(
        //     //         addCandidateQueue({
        //     //             id: sender,
        //     //             candidate: candidate
        //     //         })
        //     //     );
        //     // }
        // })
        
    }

    getRoomURL() {
        if (window.location.hash) {
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
        this.Chat.stopUserMedia();
        this.Chat.stopAudio();
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
                {this.props.isGridDetailOpen ? (
                    <GirdDetail />
                ) : this.state.isKJOpen ? (
                    <KJDetail />
                ) : this.state.isSixHatOpen ? (
                    <SixHatDetail />
                ) : null}
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
                    <Toolbar />
                    {this.props.isGridStart ? (
                        <GridGame />
                    ) : this.state.isKJPlaying ? (
                        <KJGame />
                    ) : this.state.isPainting ? (
                        <Painting />
                    ) : (
                        <MainScreen />
                    )}
                    <AVcontrol Chat={this.Chat} />
                </div>
                <div className="right-field">
                    <Agenda />
                    <Vote />
                </div>

                <Background />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.connection.userName,
        localUserID: state.connection.localUserID,
        localVideo: state.connection.localVideo,
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
