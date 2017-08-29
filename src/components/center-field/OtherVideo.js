"use strict"

import React from 'react'

class OtherVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    <div className='other-video'>
      <div className='video user1'>
        <div className='other-audio-off'></div>
        <div className='user-infro king'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>威君</label>
        </div>
      </div>
      <div className='video user2'>
        <div className='user-infro member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>詩婷</label>
        </div>
      </div>
      <div className='video user3'>
        <div className='user-infro member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>成財</label>
        </div>
      </div>
      <div className='video user4'>
        <div className='user-infro member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>又嘉</label>
        </div>
      </div>
      <div className='video user5'>
        <div className='user-infro member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>宣妮</label>
        </div>
      </div>
    </div>
  }

}

export default connect(mapStateToProps)(OtherVideo)