"use strict"

import React from 'react'

class AVcontrol extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  //Button Events
  toggleAudioControl() {
  }

  toggleVideoControl() {
  }

  toggleExit() {
  }


  render() {
    <div className='av-control'>

      <button
        className='av-button'
        id={this.state.isSounding ? 'audio-off' : 'audio-on'}
        onClick={this.toggleAudioControl}
      />

      <button
        className='av-button'
        id='exit'
        onClick={this.toggleExit}
      />

      <button
        className='av-button'
        id={this.state.isStreaming ? 'video-off' : 'video-on'}
        onClick={this.toggleVideoControl}
      />

    </div>
  }

}

export default connect(mapStateToProps)(AVcontrol)