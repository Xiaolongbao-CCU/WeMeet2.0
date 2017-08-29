"use strict"

import React from 'react'

class MeetingTime extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    /* Andy: put meeting time record here */
    <div className='left-meetingtime'>
      會議進行時間： 3分59秒
    </div>
  }

}

export default connect(mapStateToProps)(MeetingTime)
