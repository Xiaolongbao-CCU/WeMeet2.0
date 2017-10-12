"use strict";

import React from "react";
import { connect } from "react-redux";

class SixHatGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSameHatType: false
    }
    this.onClick_ChangeGameType = this.onClick_ChangeGameType.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onClick_ChangeGameType() {
    this.setState({
      isSameHatType: !this.state.isSameHatType
    });
  }

  render() {
    return (
      <div>
        <div className="button1" id="changehat">交換帽子</div>
        <div
          className="button1"
          id={this.state.isSameHatType ? "samehat" : "diffhat"}
          onClick={this.onClick_ChangeGameType}
        >
          {this.state.isSameHatType ? "相同帽子" : "不同帽子"}
        </div>
      </div>
    );
  }
}

export default SixHatGame;
