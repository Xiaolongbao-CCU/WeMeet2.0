"use strict";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toggleAudio, toggleUserMedia } from "../../actions/Actions";
import socket from  "../../socket"
import ConfirmExit from "../special-field/ConfirmExit";

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShowExitConfirm: false 是否顯示離開房間的警示框
        };
        this.onClick_toggleAudioControl = this.onClick_toggleAudioControl.bind(
            this
        );
        this.onClick_toggleVideoControl = this.onClick_toggleVideoControl.bind(
            this
        );
        // this.onClick_ShowConfirm = this.onClick_ShowConfirm.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

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
        this.props.history.push("/record" + this.props.roomName.substring(35))
    }

    render() {
        return (
            <div className="av-control">
                <button
                    className="av-button"
                    id={this.props.isSounding ? "audio-on" : "audio-off"}
                    onClick={this.onClick_toggleAudioControl}
                />

                <button
                    className="av-button"
                    id="exit"
                    onClick={()=>{this.onClick_showRecord()}}
                />

                <button
                    className="av-button"
                    id={this.props.isStreaming ? "video-on" : "video-off"}
                    onClick={this.onClick_toggleVideoControl}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        localUserID:state.connection.localUserID,
        roomName:state.connection.roomName,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding
    };
};

export default withRouter(connect(mapStateToProps)(AVcontrol));
