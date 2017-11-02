"use strict";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toggleAudio, toggleUserMedia } from "../../actions/Actions";
import socket from "../../socket"

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShowExitConfirm: false 是否顯示離開房間的警示框
            isShareScreenStart: false
        };
        this.onClick_toggleAudioControl = this.onClick_toggleAudioControl.bind(this);
        this.onClick_toggleVideoControl = this.onClick_toggleVideoControl.bind(this);
        this.onClick_startShare = this.onClick_startShare.bind(this);

        // this.onClick_ShowConfirm = this.onClick_ShowConfirm.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    //Button Events
    onClick_toggleAudioControl() {
        this.props.Chat.toggleAudio();
        socket.emit(
            "setRemoteAudioState",
            !this.props.isSounding,
            this.props.localUserID
        );
        this.props.dispatch(toggleAudio());
    }

    onClick_toggleVideoControl() {
        this.props.Chat.toggleUserMedia();
        socket.emit(
            "setRemoteVideoState",
            !this.props.isStreaming,
            this.props.localUserID
        );
        this.props.dispatch(toggleUserMedia());
    }

    onClick_showRecord() {
        this.props.history.push("/record" + this.props.roomName.substring(37))
    }

    onClick_startShare() {
        this.setState({
            isShareScreenStart: !this.state.isShareScreenStart
        })
    }

    render() {
        return (
            <div className="av-control">

                <div
                    className="av-button"
                    id={this.props.isSounding ? "audio-on" : "audio-off"}
                    onClick={this.onClick_toggleAudioControl}
                >
                    <div className="hovertext" id={this.props.isSounding ? "audio-on" : "audio-off"}>
                        {this.props.isSounding ? "靜音" : "取消靜音"}
                    </div>
                </div>

                <div
                    className="av-button"
                    id="exit"
                    onClick={() => { this.onClick_showRecord() }}
                >
                    <div className="hovertext" id="exit">結束會議</div>
                </div>

                <div
                    className="av-button"
                    id={this.props.isStreaming ? "video-on" : "video-off"}
                    onClick={this.onClick_toggleVideoControl}
                >
                    <div className="hovertext" id={this.props.isStreaming ? "video-on" : "video-off"}>
                        {this.props.isStreaming ? "開啟視訊" : "取消視訊"}
                    </div>
                </div>

                <div
                    className="sharescreen"
                    id={this.state.isShareScreenStart ? "active" : "no-active"}
                    onClick={this.onClick_startShare}
                >
                    <label
                        className="sharetext"
                        id={this.state.isShareScreenStart ? "active" : ""}
                    >
                        {this.state.isShareScreenStart ? "取消共享" : "共享螢幕"}
                    </label>
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        localUserID: state.connection.localUserID,
        roomName: state.connection.roomName,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding
    };
};

export default withRouter(connect(mapStateToProps)(AVcontrol));
