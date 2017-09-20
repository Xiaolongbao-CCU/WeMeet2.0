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
                    userName: "李佳怡", //使用者名稱
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
                    <video
                        className="video"
                        src={this.props.localVideoURL}
                        autoPlay={true}
                        muted={true}
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
                            {this.state.UserInfro.first.userName}
                        </label>
                    </div>
                    <img
                        className="user-audio"
                        src={
                            this.state.UserInfro.first.isAudioOpen
                                ? "./img/null.png"
                                : "./img/other_audio-off.png"
                        }
                    />
                    <img
                        className="user-video"
                        src={
                            this.state.UserInfro.first.isVideoOpen
                                ? "./img/null.png"
                                : "./img/other_video-off.png"
                        }
                    />
                </div>
            );
        }
        if (this.props.remoteStreamURL) {
            Object.keys(this.props.remoteStreamURL).map((userID) => {
                video.push(
                    <div className="otheruser">
                        <video
                            className="video"
                            src={this.props.remoteStreamURL[userID]}
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
                                {userID}
                            </label>
                        </div>
                        <img
                            className="user-audio"
                            src={
                                this.state.UserInfro.first.isAudioOpen
                                    ? "./img/null.png"
                                    : "./img/other_audio-off.png"
                            }
                        />
                        <img
                            className="user-video"
                            src={
                                this.state.UserInfro.first.isVideoOpen
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
                <video
                    className="main-video"
                    src={this.props.localVideoURL}
                    autoPlay={true}
                    mute={true}
                />
                <div className="other-video">
                    {video}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        localVideoURL: state.connection.localVideoURL,
        remoteStreamURL: state.connection.remoteStreamURL
    };
};

export default connect(mapStateToProps)(MainScreen);
