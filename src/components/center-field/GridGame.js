"use strict";

import React from "react";
import { connect } from "react-redux";
import { setGrid } from "../../actions/Actions";
import socket from "../../socket";

class GridGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnlarge: false
    };
    this.onClick_ChangeSize = this.onClick_ChangeSize.bind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  onChangeInput(e) {
    let key = e.target.getAttribute("data");
    let a = parseInt(key.substring(5, 6));
    let b = parseInt(key.substring(7, 8));
    let c = parseInt(key.substring(9, 10));
    this.props.dispatch(
      setGrid({
        position: [a, b, c],
        value: e.target.value
      })
    );
    socket.emit("setGrid", {
      position: [a, b, c],
      value: e.target.value
    });
    // this.setState({
    //     grid:[
    //         ...this.state.grid.slice(0,a),
    //         [
    //             ...this.state.grid[a].slice(0,b),
    //             [
    //                 ...this.state.grid[a][b].slice(0,c),
    //                 e.target.value,
    //                 ...this.state.grid[a][b].slice(c+1)
    //             ],
    //             ...this.state.grid[a].slice(b+1)
    //         ],
    //         ...this.state.grid.slice(a+1)
    //     ]
    // })
  }

  onClick_ChangeSize() {
    this.setState({
      isEnlarge: !this.state.isEnlarge
    });
  }

  onClick_clearGrid() {
    this.props.dispatch(setGrid({
      position: "all",
      value: ""
    }))

  }

  render() {
    let result = [];
    let order = [
      "first",
      "second",
      "third",
      "forth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth"
    ];
    order.map((number, index) => {
      let name = "divTable" + " " + number;
      let innerGrid = [];
      for (let i = 0; i < 3; i++) {
        let outerKey = "grid" + ":" + index + ":" + i;
        let input = [];
        for (let j = 0; j < 3; j++) {
          let innerKey = outerKey + ":" + j;
          input.push(
            <div className="divTableCell">
              <textarea
                className="TableInput"
                value={this.props.grid[index][i][j]}
                ref={innerKey}
                data={innerKey}
                onChange={e => {
                  this.onChangeInput(e);
                }}
              />
            </div>
          );
        }
        innerGrid.push(
          <div className="divTableRow" data={outerKey}>
            {input}
          </div>
        );
      }
      result.push(<div className={name}>{innerGrid}</div>);
    });

    return (
      <div className="main-screen" id={this.state.isEnlarge ? "bigger" : ""} >
        {
          this.state.isEnlarge ?
            <div className="blackBG" /> : null
        }
        <div className="gametoolbar" id={this.state.isEnlarge ? "bigger" : ""}>
        {
          this.state.isEnlarge ?
          <div className="button2" id="backtosmall" onClick={this.onClick_ChangeSize}>縮小</div> :
          <div className="button2" id="fullscreen" onClick={this.onClick_ChangeSize}>放大</div>
        }
          <div className="button2" id="reset" onClick={() => { this.onClick_clearGrid() }}>清空</div>
          <div className="button2" id="dowload">下載</div>
          <div className="button2" id="shutdown">結束</div>
        </div>

        {result}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: state.grid.grid
  };
};
export default connect(mapStateToProps)(GridGame);
