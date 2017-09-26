"use strict";

import React from "react";

class CVcontrol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatroomstatus: true //是否在聊天模式? 如果不是則是語音辨識模式，要切換meeting.js的
    };
    this.onClick_Chatroom = this.onClick_Chatroom.bind(this);
    this.onClick_VoiceRecognition = this.onClick_VoiceRecognition.bind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  onClick_Chatroom() {
    if (this.state.isChatroomstatus) {
      return;
    } else {
      this.setState({
        isChatroomstatus: !this.state.isChatroomstatus
      });
    }
  }

  onClick_VoiceRecognition() {
    if (!this.state.isChatroomstatus) {
      return;
    } else {
      this.setState({
        isChatroomstatus: !this.state.isChatroomstatus
      });
    }
  }

  render() {
    return (
      <div className="CVcontrol">
        <div
          className="chatroom"
          id={this.state.isChatroomstatus ? "selected" : "no-selected"}
          onClick={this.onClick_Chatroom}
        > 聊天室
         </div>

        <div
          className="voice-recognition"
          id={this.state.isChatroomstatus ? "no-selected" : "selected"}
          onClick={this.onClick_VoiceRecognition}
        > 語音辨識
        </div >
      </div >
    );
  }
}

export default CVcontrol;
