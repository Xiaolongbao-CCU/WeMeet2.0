"use strict"

import React from 'react'

class Black extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    <div class='black'>
      /* 投票結果-1 */
      <div class='text one'>投票結束</div>
      <div class='text two'>最後結果是</div>
      
      /* 投票結果-2 */
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      <img class='animal' src='./img/voteimage.png' /></img>
      <div class='wintext'>超級成功<br>獲勝！</div>
      <div class='triagle'></div>

    </div>
  }

}

export default connect(mapStateToProps)(Black)