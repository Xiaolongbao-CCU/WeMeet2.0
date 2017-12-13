import React from 'react';
import { connect } from 'react-redux';
import {
  setGridDetailOpen,
  setSixhatDetailOpen,
} from '../../actions/Actions';

class Brainstorming extends React.Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  onClick_ToggleGridGame() {
    this.props.closeBrainStorming();
    this.props.dispatch(setGridDetailOpen());
  }

  onClick_ToggleSixHatGame() {
    this.props.closeBrainStorming();
    this.props.dispatch(setSixhatDetailOpen());
  }

  render() {
    return (
      <div className="brainstorming">
        <button
          className="toolbar-button"
          id="grid"
          onClick={() => { this.onClick_ToggleGridGame(); }}
        >
          <div className="hovertext" id="grid">九宮格發散法</div>
        </button>

        <button
          className="toolbar-button"
          id="sixhat"
          onClick={() => { this.onClick_ToggleSixHatGame(); }}
        >
          <div className="hovertext" id="sixhat">六頂思考帽法</div>
        </button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPaintOpen: state.paint.isPaintOpen,
  isGridOpen: state.grid.isGridOpen,
});

export default connect(mapStateToProps)(Brainstorming);
