"use strict";

import React from "react";
import { connect } from "react-redux";

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
            }
        };
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        let video = [];
        if (this.props.localVideoURL) {
            video.push(
                <div className="otheruser">
                    <div className="video">
                        <video
                            src={this.props.localVideoURL}
                            autoPlay={true}
                            muted={true}
                        />
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
                            {this.props.userName ||
                                "u_" + this.props.localUserID.substring(0, 4)}
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
                video.push(
                    <div className="otheruser">
                        <video
                            className="video"
                            src={this.props.remoteStreamURL[userID].url}
                            autoPlay={true}
                        />
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
                                    : "u_" + userID.substring(0, 4)}
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
        return (
            <div className="main-screen">
                <div className="main-video">
                    <video
                        src={this.props.localVideoURL}
                        autoPlay={true}
                        muted={true}
                    />
                </div>
                <div className="other-video">{video}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
