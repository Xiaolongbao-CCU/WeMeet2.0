"use strict";

import React from "react";

class SixHatDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  render() {
    return (
      <div className="brainstorming-field">
        <div className="title">
          <div className="logo" id="SixHat" />
          <div className="line" />
          <label className="text">六頂思考帽法</label>
        </div>
        <div className="exit" />
        <div className="left-field">
          <img className="img" src="./img/sixhat_img.png" />
          <div className="text">遊戲簡介：以六種顏色的帽子代表六種不同思考模式的創造思考技法，幫助團隊進行全方位的思考以及評估。
</div>
        </div>
        <div className="right-field">
          <div className="instruction">
            <label className="type">時機</label>
            <div className="line"></div>
            <ul className="list">
              <li>確認完解決的問題時使用此技法，使大家能用不同的思維來審思問題。</li>
              <li>人數限制6至12人</li>
            </ul>
          </div>
          <div className="instruction">
            <label className="type">應用範圍</label>
            <div className="line"></div>
            <ul className="list">
              <li>水平式思考</li>
              <li>整理思維</li>
            </ul>
          </div>
        </div>
        <div className="bottom-field">
          <div className="button">開始遊戲</div>
          <div className="button">看教學</div>
        </div>
      </div>
    )
  }
}


export default SixHatDetail