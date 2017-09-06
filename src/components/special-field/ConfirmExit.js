"use strict";

import React from "react";

class ConfirmExit extends React.Component {
  constructor(props) {
    super(props);
    this.onClick_ToggleExitRoom = this.onClick_ToggleExitRoom.bind(this);
    this.onClick_ToggleBack = this.onClick_ToggleBack.bind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  onClick_ToggleExitRoom() {
    //觸發離開發顯
  }

  onClick_ToggleBack() {
  }

  render() {
    return (
      <div className="blackone">
        <div className="room-exit">
          <p className="">確定要結束會議並顯示會議紀錄？</p>
          <button className="yes" onClick={this.onClick_ToggleExit}>是</button>
          <button className="no" onClick={this.onClick_ToggleBack}>否</button>
        </div>
      </div>
    )
  }
}


export default ConfirmExit

