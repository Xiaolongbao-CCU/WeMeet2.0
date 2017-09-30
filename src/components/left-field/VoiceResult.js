"use strict";

import React from "react";

class VoiceResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() { }

  componentDidMount() { }

  render() {
    return (
      <div className="left-input">
        <div className="voiceresult-field">
          <div className="voiceResult-text">
            語音辨識結果的文字要呈現在這兒～～～～～～～～～～
          </div>
        </div>
        <img className="mailbox" src="./img/robot.png" />
      </div>
    );
  }
}

export default VoiceResult;
