"use strict";

import React from "react";

//Button Detail
import VoteDetail from "./VoteDetail";
import AddUser from "./AddUser";
import { connect } from "react-redux";
import Brainstorming from "./Brainstorming";
// Other 
import MeetingTime from "./MeetingTime";
import VoiceStatus from "./VoiceStatus";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Toggle Status
            isVoteToggle: false,
            isAddUserToggle: false,
            isBrainstormingToggle: false,
            //Open Status
            isRecognitionOpen: false,
            //Special Status
        };
        this.onClick_ToggleVotePage = this.onClick_ToggleVotePage.bind(this);
        this.onClick_ToggleRecognitionControl = this.onClick_ToggleRecognitionControl.bind(this);
        this.onClick_ToggleAddUserControl = this.onClick_ToggleAddUserControl.bind(this);
        this.onClick_ToggleBrainstorming = this.onClick_ToggleBrainstorming.bind(this);
        this.ClearAddUserBlock = this.ClearAddUserBlock.bind(this);
    }


    componentWillMount() { }

    componentDidMount() { 
        this.refs.VoteDetail.style.display = "none";
    }

    //OnClick Events

    onClick_ToggleVotePage() {
        this.refs.VoteDetail.style.display = (this.refs.VoteDetail.style.display == "block" ? "none":"block")
    }

    onClick_ToggleBrainstorming() {
        this.setState({
            isBrainstormingToggle: !this.state.isBrainstormingToggle
        })
    }

    onClick_ToggleRecognitionControl() {
        this.setState({
            isRecognitionOpen: !this.state.isRecognitionOpen
        })
    }

    onClick_ToggleAddUserControl() {
        this.setState({
            isAddUserToggle: !this.state.isAddUserToggle
        })
        setTimeout(this.ClearAddUserBlock, 3000);
    }

    //Others Events

    ClearAddUserBlock() {
        this.setState({
            isAddUserToggle: false
        })
    }

    render() {
        return (
            <div className="toolbar">

                <VoiceStatus />

                <button
                    className="toolbar-button"
                    id="brainstorming"
                    onClick={this.onClick_ToggleBrainstorming}
                />

                {
                    this.state.isBrainstormingToggle
                        ? <Brainstorming />
                        : null
                }

                <button
                    className="toolbar-button"
                    id="adduser"
                    onClick={this.onClick_ToggleAddUserControl}
                />

                {
                    this.state.isAddUserToggle
                        ? <AddUser />
                        : null
                }


                <button
                    className="toolbar-button"
                    id="vote"
                    onClick={this.onClick_ToggleVotePage}
                />

                <div ref="VoteDetail"
                    style={{display:(this.props.votingDetail.isVotingStart? "none":"display")}}
                >
                    <VoteDetail />
                </div>

                <MeetingTime />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        votingDetail: state.vote
    };
};

export default connect(mapStateToProps)(Toolbar);
