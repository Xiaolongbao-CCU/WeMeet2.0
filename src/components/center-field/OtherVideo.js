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
      /* user1-user5 need to be statusful */
      <div className='video' id='user1'>
        <div className='other-audio-off'></div>
        <div className='user-infro' id='king'>
          /* this img need to change to video tag */
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>名字</label>
        </div>
      </div>
      <div className='video' id='user2'>
        <div className='user-infro' id='member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>詩婷</label>
        </div>
      </div>
      <div className='video' id='user3'>
        <div className='user-infro' id='member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>成財</label>
        </div>
      </div>
      <div className='video' id='user4'>
        <div className='user-infro' id='member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>又嘉</label>
        </div>
      </div>
      <div className='video' id='user5'>
        <div className='user-infro' id='member'>
          <img className='user-image' src='./img/user-image.png' />
          <label className='user-name'>宣妮</label>
        </div>
      </div>
    </div>
  }

}

export default connect(mapStateToProps)(OtherVideo)