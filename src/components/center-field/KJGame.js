"use strict";

import React from "react";

class KJGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnlarge: false
    }
    this.onClick_ChangeSize = this.onClick_ChangeSize.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onClick_ChangeSize() {
    this.setState({
      isEnlarge: !this.state.isEnlarge
    })
  }

  render() {
    return (
      <div className="main-screen" id={this.state.isEnlarge ? "bigger" : ""} >
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>
        <div className="hex-field">
          <div className="hexagonal">
            <textarea className="hexInput"></textarea>
          </div>
        </div>

      </div>
    );
  }
}

export default KJGame;
