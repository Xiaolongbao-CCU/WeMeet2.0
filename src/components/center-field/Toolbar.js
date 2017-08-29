"use strict"

import React from 'react'

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  //OnClick Events
  onClick_ToggleBrainstorming() {
  }

  onClick_ToggleInvitePage() {
  }

  onClick_ToggleVotePage() {
  }

  render() {
    <div className='toolbar'>

      /* MoreInfro */
      <button
        className='toolbar-button'
        id='moreinfro'
        onClick=''
      />

      /* Brainstorming */
      <button
        className='toolbar-button'
        id={this.state.isBrainstormingOpen ? 'brainstorming-off' : 'brainstorming-on'}
        onClick={this.onClick_ToggleBrainstorming.bind(this)}
      />

      /* AddUser */
      <button
        className='toolbar-button'
        id='adduser'
        onClick={this.onClick_ToggleInvitePage.bind(this)}
      />

      /* Recognition */
      <button
        className='toolbar-button'
        id='recognition'
        onClick={this.Recognizer.toggleButtonOnclick}
      />

      /* vote */
      <button
        className='toolbar-button'
        id='vote'
        onClick={this.onClick_ToggleVotePage.bind(this)}
      />

      </div>
  }

}

export default connect(mapStateToProps)(Toolbar)