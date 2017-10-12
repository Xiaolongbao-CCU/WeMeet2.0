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
    this.OthersTextappear = this.OthersTextappear.bind(this);
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

  OthersTextappear() {

  }

  render() {
    return (
      <div className="sixhat-field">
        <div className="bigscreen-sixhat">
          <div className="teaching">介紹ˇ
根據事實與資訊的思考。在問題分析流程中的「界定問題」及「蒐集資訊」時，應特別運用白帽思考，區分哪些是事實，那些只是意見。
</div>
          <img className="hat-img" src="./img/sixhat_white.png" />
          <div className="hat-type" id="white">你是中立、客觀的代表</div>
          <div className="hat-text" id="white">負責陳述問題事實</div>
        </div>

        <div className="others-sixhat">
          <div className="other-hat">
            <div className="hat-text">你是中立、客觀的代表</div>
            <img className="hat-img" onMouseOver={this.OthersTextappear} src="./img/other_white.png" />
          </div>
          <div className="other-hat">
            <div className="hat-text">你是中立、客觀的代表</div>
            <img className="hat-img" onMouseOver={this.OthersTextappear} src="./img/other_white.png" />
          </div>
          <div className="other-hat">
            <div className="hat-text">你是中立、客觀的代表</div>
            <img className="hat-img" onMouseOver={this.OthersTextappear} src="./img/other_white.png" />
          </div>
        </div>
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
