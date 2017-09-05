"use strict";

import React from "react";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //使用者資訊，是一個巢狀物件，分別會有first-無限多個子物件
            UserInfro: {
                //第一個使用者
                first: {
                    userName: '李佳怡', //使用者名稱
                    userIdentity: 'king', //使用者身分，要馬是king(會議建立者)，要馬是member(會議成員)
                    userVideoURL: './img/user1.jpg', //使用者影像URL
                    isAudioOpen: true,
                    isVideoOpen: true
                },
                second: {
                    userName: '劉威君',
                    userIdentity: 'member',
                    userVideoURL: './img/user2.jpg',
                    isAudioOpen: true,
                    isVideoOpen: true
                },
                third: {
                    userName: '鄭又嘉',
                    userIdentity: 'member',
                    userVideoURL: './img/user3.jpg',
                    isAudioOpen: true,
                    isVideoOpen: true
                },
                forth: {
                    userName: '宣妮',
                    userIdentity: 'member',
                    userVideoURL: './img/user4.jpg',
                    isAudioOpen: true,
                    isVideoOpen: true
                },
                fifth: {
                    userName: '朱詩婷',
                    userIdentity: 'member',
                    userVideoURL: './img/user5.jpg',
                    isAudioOpen: true,
                    isVideoOpen: true
                },
                sixth: {
                    userName: '林成財',
                    userIdentity: 'member',
                    userVideoURL: './img/user1.jpg',
                    isAudioOpen: true,
                    isVideoOpen: true
                }
            }
        }
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="main-screen">
                <div className="main-video" />
                <div className="other-video">

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.first.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.first.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.first.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.first.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.first.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.second.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.second.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.second.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.second.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.second.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.third.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.third.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.third.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.third.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.third.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.forth.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.forth.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.forth.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.forth.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.forth.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.fifth.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.fifth.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.fifth.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.fifth.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.fifth.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                    <div className="otheruser">
                        <img className="video" src={this.state.UserInfro.sixth.userVideoURL} />
                        <div className="user-infro" id={this.state.UserInfro.sixth.userIdentity}>
                            <img className="user-image" src="./img/user-image.png" />
                            <label className="user-name">{this.state.UserInfro.sixth.userName}</label>
                        </div>
                        <img className="user-audio" src={this.state.UserInfro.sixth.isAudioOpen ? "./img/other_audio-on.png" : "./img/other_audio-off.png"} />
                        <img className="user-video" src={this.state.UserInfro.sixth.isVideoOpen ? "./img/other_video-on.png" : "./img/other_video-off.png"} />
                    </div>

                </div>
            </div>
        )
    }
}

export default MainScreen;
