"use strict";

import React from "react";

class GridGame extends React.Component {
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
        {
          this.state.isEnlarge ?
            <div className="backtosmall" onClick={this.onClick_ChangeSize} ></div> :
            <div className="button1" id="fullscreen" onClick={this.onClick_ChangeSize}>放大</div>
        }

        {
          this.state.isEnlarge ?
            <div className="blackBG" /> :
            <div className="button1" id="reset" >清空</div>
        }

        < div className="divTable first" >
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable second">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable third">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable forth">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable fifth">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable sixth">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable seventh">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable eighth">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>

        <div className="divTable ninth">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
              <div className="divTableCell">
                <textarea className="TableInput" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GridGame;
