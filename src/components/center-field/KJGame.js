"use strict";

import React from "react";

class KJGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexAddedPosition: []
    }
    this.onClick_addhex = this.onClick_addhex.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onClick_addhex() {
    let AddedPosition = this.refs; //錯的
    this.setState({
      hexAddedPosition: AddedPosition
    })
  }

  render() {
    //position is [left,top]

    let hexNotAddedContent = [];
    let hexAddedContent = [];
    let hexposition = [
      /* 假設以[34,28]為中心
       * 左上角 [-6%,-12%] , 右上角 [+6%,-12%]
       * 中間往左 [-12%,不動], 中間往右 [+12%,不動]
       * 左下角 [-6%,+12%] , 右下角 [+6%,+12%] 
      */
      [28, 16], [40, 16], //六邊形上面兩個
      [22, 28], [46, 28], //六邊形兩旁兩個
      [28, 40], [40, 40] //六邊形下面兩個
    ];


    hexposition.map((position) => {
      const site = {
        left: position[0].toString() + '%',
        top: position[1].toString() + '%'
      }
      hexNotAddedContent.push(
        <div className="hex" style={site} ref={position}>
          <div className="hexagonal" id="notyetwrite">
            <div className="hexadd" onClick={this.onClick_addhex}>+</div>
          </div>
        </div>
      );
    });


    return (
      <div className="main-screen" >
        <div className="center">
          <div className="hexagonal" id="white">
            <textarea className="hexInput" placeholder="請輸入欲發想的主題"></textarea>
          </div>
        </div>


        <div className="center-border" id="one">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>
        <div className="center-border" id="two">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>
        <div className="center-border" id="three">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>
        <div className="center-border" id="four">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>
        <div className="center-border" id="five">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>
        <div className="center-border" id="six">
          <div className="hexagonal" id="whiteyellow">
            <textarea className="hexInput" placeholder="請輸入聯想到的字彙"></textarea>
          </div>
        </div>

        {hexNotAddedContent}
        {hexAddedContent}

      </div>
    );
  }
}

export default KJGame;
