"use strict"

import React from 'react'

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    <div className='left-input'>
      <div className='input-filed'>
        <input className='input-text' type='text' />
        <button className='upload'>
        /* 先暫時拿來當提交建，目前還沒完成 */
        </button>
      </div>
      <div className='mailbox'></div>
    </div>
  }

}

export default connect(mapStateToProps)(ChatInput)
