"use strict";

import React from "react";
import { connect } from "react-redux";
import SixHatGame from "./SixHatGame";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //使用者資訊，是一個巢狀物件，分別會有first-無限多個子物件
            UserInfro: {
                //第一個使用者
                first: {
                    userIdentity: "king" //使用者身分，要馬是king(會議建立者)，要馬是member(會議成員)
                }
            },
            focusingOnWhichUser: {
                id: this.props.localUserID,
                url: this.props.localVideoURL,
                animalNumber: this.props.participantList[0].num
            },
            isSixHatPlaying: false
        };
    }

    componentWillMount() {
        this.setState({
            focusingOnWhichUser: {
                id: this.props.localUserID,
                url: this.props.localVideoURL,
                animalNumber: this.props.participantList[0].num
            }
        });
    }

    componentDidMount() { }

    onClickSelfStream() {
        this.setState({
            focusingOnWhichUser: {
                id: this.props.localUserID,
                url: this.props.localVideoURL,
                animalNumber: this.props.participantList[0].num
            }
        });
    }

    onClick_otherUserStream(e) {
        let key = e.target.getAttribute("data");
        let num = this.props.participantList.reduce((sum, value) => {
            if (value.id == key) {
                return (sum = value.num + 1);
            }
        }, 0);
        this.setState({
            focusingOnWhichUser: {
                id: key,
                url: this.props.remoteStreamURL[key].url,
                animalNumber: num
            }
        });
    }

    render() {
        let video = [];
        if (this.props.localVideoURL) {
            video.push(
                <div className="otheruser">
                    <div className="video">
                        {this.props.isStreaming ? (
                            <video
                                src={this.props.localVideoURL}
                                autoPlay={true}
                                muted={true}
                                onClick={() => {
                                    this.onClickSelfStream();
                                }}
                            />
                        ) : (
                                <img
                                    className="img"
                                    src={
                                        "./img/animal" +
                                        (this.props.participantList[0].num + 1) +
                                        ".jpg"
                                    }
                                    onClick={() => {
                                        this.onClickSelfStream();
                                    }}
                                />
                            )}
                    </div>
                    <div
                        className="user-infro"
                        id={this.state.UserInfro.first.userIdentity}
                    >
                        <img
                            className="user-image"
                            src="./img/user-image.png"
                        />
                        <label className="user-name">
                            {this.props.userName || this.props.animalName}
                        </label>
                    </div>
                    <img
                        className="user-audio"
                        src={
                            this.props.isSounding
                                ? "./img/null.png"
                                : "./img/other_audio-off.png"
                        }
                    />
                    <img
                        className="user-video"
                        src={
                            this.props.isStreaming
                                ? "./img/null.png"
                                : "./img/other_video-off.png"
                        }
                    />
                </div>
            );
        }
        if (this.props.remoteStreamURL) {
            Object.keys(this.props.remoteStreamURL).map(userID => {
                let remoteAnimalName = this.props.participantList.reduce(
                    (sum, value) => {
                        if (value.id == userID) {
                            return (sum = value.animal);
                        }
                    },
                    ""
                );
                let remoteAnimalNumber = this.props.participantList.reduce(
                    (sum, value) => {
                        if (value.id == userID) {
                            return (sum = value.num + 1);
                        }
                    },
                    0
                );
                video.push(
                    <div className="otheruser">
                        <div className="video">
                            {this.props.remoteStreamURL[userID].isStreaming ? (
                                <video
                                    src={this.props.remoteStreamURL[userID].url}
                                    autoPlay={true}
                                    data={userID}
                                    onClick={e => {
                                        this.onClick_otherUserStream(e);
                                    }}
                                />
                            ) : (
                                    <img
                                        className="img"
                                        src={
                                            "./img/animal" +
                                            remoteAnimalNumber +
                                            ".jpg"
                                        }
                                        data={userID}
                                        onClick={e => {
                                            this.onClick_otherUserStream(e);
                                        }}
                                    />
                                )}
                        </div>
                        <div
                            className="user-infro"
                            id={this.state.UserInfro.first.userIdentity}
                        >
                            <img
                                className="user-image"
                                src="./img/user-image.png"
                            />
                            <label className="user-name">
                                {this.props.remoteUserName[userID] &&
                                    this.props.remoteUserName[userID] !== userID
                                    ? this.props.remoteUserName[userID]
                                    : remoteAnimalName}
                            </label>
                        </div>
                        <img
                            className="user-audio"
                            src={
                                this.props.remoteStreamURL[userID].isSounding
                                    ? "./img/null.png"
                                    : "./img/other_audio-off.png"
                            }
                        />
                        <img
                            className="user-video"
                            src={
                                this.props.remoteStreamURL[userID].isStreaming
                                    ? "./img/null.png"
                                    : "./img/other_video-off.png"
                            }
                        />
                    </div>
                );
            });
        }
        let bigScreen;
        if (this.state.focusingOnWhichUser.url == this.props.localVideoURL) {
            bigScreen = this.props.isStreaming ? (
                <video
                    className={this.state.isSixHatPlaying ? "videoset" : ""}
                    src={this.props.localVideoURL}
                    autoPlay={true}
                    muted={true}
                />
            ) : (
                    <img
                        className="user-image"
                        src={
                            "./img/animal" +
                            (this.props.participantList[0].num + 1) +
                            ".jpg"
                        }
                    />
                );
        } else {
            if (this.props.remoteStreamURL[this.state.focusingOnWhichUser.id]) {
                if (
                    this.props.remoteStreamURL[
                        this.state.focusingOnWhichUser.id
                    ].url
                ) {
                    if (
                        this.props.remoteStreamURL[
                            this.state.focusingOnWhichUser.id
                        ].isStreaming
                    ) {
                        bigScreen = (
                            <video
                                src={
                                    this.props.remoteStreamURL[
                                        this.state.focusingOnWhichUser.id
                                    ].url
                                }
                                autoPlay={true}
                                muted={true}
                            />
                        );
                    } else {
                        bigScreen = (
                            <img
                                className="user-image"
                                src={
                                    "./img/animal" +
                                    (this.state.focusingOnWhichUser.animalNumber) +
                                    ".jpg"
                                }
                            />
                        );
                    }
                }
            }
        }
        return (
            <div className="main-screen">
                {this.state.isSixHatPlaying ? <SixHatGame /> : null}
                <div className="main-video">
                    {bigScreen}
                </div>

                <div className="other-video">{video}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        animalName: state.connection.animalName,
        participantList: state.participantList,
        userName: state.connection.userName,
        localUserID: state.connection.localUserID,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding,
        localVideoURL: state.connection.localVideoURL,
        remoteStreamURL: state.connection.remoteStreamURL,
        remoteUserName: state.connection.remoteUserName
    };
};

export default connect(mapStateToProps)(MainScreen);
