"use strict";

import React from "react";

class VoteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisteredSelect: true,
      isMultivoteOpen: false,
      isVoteFinish: false,
      MultivoteNumber: 2,
      isQuestionAdd: false

    }
    this.onClick_ToggleVoteType = this.onClick_ToggleVoteType.bind(this);
    this.onClick_ToggleMultivote = this.onClick_ToggleMultivote.bind(this);
    this.onClick_Subtractuon = this.onClick_Subtractuon.bind(this);
    this.onClick_Addition = this.onClick_Addition.bind(this);
    this.onClick_AddVoteQuestion = this.onClick_AddVoteQuestion.bind(this);

  }

  componentWillMount() { }

  componentDidMount() { }

  onClick_ToggleVoteType() {
    this.setState({
      isRegisteredSelect: !this.state.isRegisteredSelect
    });
  }

  onClick_ToggleMultivote() {
    this.setState({
      isMultivoteOpen: !this.state.isMultivoteOpen
    });
  }

  onClick_Subtractuon() {
    if (this.state.MultivoteNumber > 2) {
      this.setState({
        MultivoteNumber: this.state.MultivoteNumber - 1
      });
    }
  }

  onClick_Addition() {
    if (this.state.MultivoteNumber < 10) {
      this.setState({
        MultivoteNumber: this.state.MultivoteNumber + 1
      });
    }
  }

  onClick_AddVoteQuestion() {
    if (this.state.MultivoteNumber < 10) {
      this.setState({
        isQuestionAdd: !this.state.isQuestionAdd
      });
    }
  }



  render() {
    return (
      <div className='voting' id='Fadein'>
        <div className='votetypeselect'>
          <button
            className='registered'
            id={this.state.isRegisteredSelect ? 'selected' : 'notselected'}
            onClick={this.onClick_ToggleVoteType}
          >記名投票
          </button>

          <button
            className='anonymous'
            id={this.state.isRegisteredSelect ? 'notselected' : 'selected'}
            onClick={this.onClick_ToggleVoteType}
          >匿名投票
          </button>
        </div>

        <div className='votequestion'>
          <input
            className='input'
            type='text'
          />
        </div>

        <div className='voteconent'>
          <div className='question'>
            <div className={this.state.isQuestionAdd ? 'delete' : 'add'} onClick={this.onClick_AddVoteQuestion}></div>
            <input className='text' type='text' value=''></input>
          </div>

        </div>

        <div className='votebottom'>
          <div className='multi-vote'>複選</div>
          <input
            className='toggle'
            type="checkbox"
            name='check-3'
            onClick={this.onClick_ToggleMultivote}
          />
          <div className='multivote-number' id={this.state.isMultivoteOpen ? 'visible' : 'hidden'}>
            <button className='subtraction' onClick={this.onClick_Subtractuon}>-</button>
            <input className='number' type='text' value={this.state.MultivoteNumber}></input>
            <button className='addition' onClick={this.onClick_Addition}>+</button>
          </div>
          <button
            className='votesubmit'
            id={this.state.isVoteFinish ? 'open' : 'close'}
          >開始投票
          </button>

        </div>
      </div >
    );
  }
}

export default VoteDetail;
