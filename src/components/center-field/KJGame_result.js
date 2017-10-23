"use strict";

import React from "react";

class KJGame_result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.uplist = this.uplist.bind(this);
    this.downlist = this.downlist.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    uplist();
    downlist();
  }

  uplist() {
    var scrollNode = this.listScroll;
    if (scrollNode.scrollTop != 0) {
      scrollNode.scrollTop -= 5;
    }
  }

  downlist() {
    var scrollNode = this.listScroll;
    if (scrollNode.scrollTop != scrollNode.scrollHeight) {
      scrollNode.scrollTop += 5;
    }
  }

  render() {
    let test = [];
    let text = '';
    for (let i = 0; i <= 10; i++) {
      test.push(
        <div className="honey-element">
          <div className="text">Wemeet{text}</div>
        </div>
      )
    }

    return (
      <div className="main-screen" >

        <div className="button4" />

        <div className="KJGame_second">
          <div className="honeylist" >
            <div
              className="up"
              onMouseMove={this.uplist}
              onClick={this.uplist}
            ><img className="img" src="./img/arrow_up.png" />
            </div>

            <div className="content" ref={(el) => { this.listScroll = el; }}>
              {test}
            </div>

            <div
              className="down"
              onMouseMove={this.downlist}
              onClick={this.downlist}
            ><img className="img" src="./img/arrow_down.png" />
            </div>

          </div>

          <div className="gamecontent">
            <div className="KJ">
              <div className="honey-input" />
              <div className="honey-input" />
              <div className="honey-process">
                <img className="honey-arrow" src="./img/honey_arrow.png" />
                <img className="honey-arrow1" src="./img/honey_arrow.png" />
              </div>
              <div className="honey-output" />
            </div>
            <div className="KJ">
              <div className="honey-input" />
              <div className="honey-input" />
              <div className="honey-process">
                <img className="honey-arrow" src="./img/honey_arrow.png" />
                <img className="honey-arrow1" src="./img/honey_arrow.png" />
              </div>
              <div className="honey-output" />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default KJGame_result;
