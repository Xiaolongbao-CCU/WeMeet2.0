"use strict";
import React from "react";
import socket from "../../socket";

class ReservationResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedMeeting: {},
      receivedURL: "",
      isResultDetailOpen: false
    };
    this.onClick_ToggleDetail = this.onClick_ToggleDetail.bind(this);
  };

  componentWillMount() { }

  componentDidMount() { }

  onClick_ToggleDetail() {
    this.setState({
      isResultDetailOpen: !this.state.isResultDetailOpen
    })
  }

  render() {
    return (
      <div>
        <div className="ReceviedMeeting" onClick={this.onClick_ToggleDetail}>
          <img className="mail" src="./img/mail.png" />
          <div className="content">您有預約開會通知！</div>
        </div>

        {
          this.state.isResultDetailOpen ?
            <div className="Recevied-Detail">
              <div className="recevied-filed">
                <span><img className="img" src='./img/calendar.png' /></span>
                <span className="title">2017年10月29日 04時00分{this.state.receivedMeeting.datetime}</span>
              </div>
              <div className="recevied-filed">
                <span><img className="img" src='./img/location.png' /></span>
                <span className="title">線上開會{this.state.receivedMeeting.location}</span>
              </div>
              <div className="recevied-filed">
                <span><img className="img" src='./img/aim.png' /></span>
                <span className="title">常態會議{this.state.receivedMeeting.title}</span>
              </div>
              <a href={this.state.receivedURL} target="_blank">
                <div className="add-button">加到Google日曆</div>
              </a>
            </div>
            : null
        }

      </div>
    );
  }
}

export default ReservationResult;
