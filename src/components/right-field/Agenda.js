"use strict"

import React from 'react'

class Agenda extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    <div class='agenda-block'>
      <div class='flag'>
        <div class='bar'></div>
        <div class='left'></div>
        <div class='right'></div>
        <div class='agenda-title'>議程</div>
        <div class='agenda-content'>
          <ol>
            <li>報告事項</li>
            <li>議案一討論</li>
            <li>議案二討論</li>
            <li>討論活動</li>
            <li>討論活動</li>
            <li>討論活動</li>
          </ol>
        </div>
        <div class='agenda-add'></div>
      </div>
      <img class='eagle' src='img/eagle.png' />
    </div>
  }

}

export default connect(mapStateToProps)(Agenda)