"use strict";

import React from "react";

class Brainstorming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGridToggle: false,
      isSixHatToggle: false,
      isKJToggle: false
    }
    this.onClick_ToggleGridGame = this.onClick_ToggleGridGame.bind(this);
    this.onClick_ToggleSixHatGame = this.onClick_ToggleSixHatGame.bind(this);
    this.onClick_ToggleKJGame = this.onClick_ToggleKJGame.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onClick_ToggleGridGame() {
    this.setState({
      isGridToggle: true,
    });
  }

  onClick_ToggleSixHatGame() {
    this.setState({
      isSixHatToggle: true
    });
  }

  onClick_ToggleKJGame() {
    this.setState({
      isKJoggle: true
    });
  }

  render() {
    return (
      <div className="brainstorming">
        <button
          className="toolbar-button"
          id="grid"
          onClick={this.onClick_ToggleGridGame}
        />

        <button
          className="toolbar-button"
          id="sixhat"
          onClick={this.onClick_ToggleSixHatGame}
        />

        <button
          className="toolbar-button"
          id="KJ"
          onClick={this.onClick_ToggleKJGame}
        />

      </div>
    );
  }
}

export default Brainstorming;
