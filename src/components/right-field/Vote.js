"use strict"

import React from 'react'

class Vote extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
      <div class='vote-block'>
        <div class='votedetail'>
          <div class='add'>佳怡 建立了投票</div>
          <div class='issue'>問題：世大運世大運世大運辦得成功嗎？</div>
          <div class='choice'>
            <div class='cotent'>
              <span class='status'>最多輸入八字元喔</span>
              <span class='bar'>　</span>
              <span class='people'>10</span>
            </div>
            <div class='cotent'>
              <span class='status seclted'>最多輸入八字元喔</span>
              <span class='bar'>　</span>
              <span class='people'>10</span>
            </div>
          </div>
          <div class='go'>投票！</div>
        </div>
        <div class='votebox one'></div>
        <div class='votebox two'></div>
        <div class='votebox three'></div>
      </div>
    </div>
  }

}

export default connect(mapStateToProps)(Vote)