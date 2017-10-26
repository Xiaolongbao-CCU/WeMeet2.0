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
import { 
    setGridDetailOpen,
    setPaintOpen,
    setPaintClose
 } from "../../actions/Actions";

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
        this.onClick_TogglePainting = this.onClick_TogglePainting.bind(this);
        this.onClick_ToggleReservation = this.onClick_ToggleReservation.bind(this);
        this.ClearAddUserBlock = this.ClearAddUserBlock.bind(this);

    }


    componentWillMount() { }

    componentDidMount() {
        this.refs.VoteDetail.style.display = "none";
    }

    //OnClick Events

    onClick_ToggleVotePage() {
        this.refs.VoteDetail.style.display = (this.refs.VoteDetail.style.display == "block" ? "none" : "block")
    }

    onClick_ToggleBrainstorming() {
        // this.setState({
        //     isBrainstormingToggle: !this.state.isBrainstormingToggle
        // })
        this.props.dispatch(setGridDetailOpen())
    }

    onClick_ToggleRecognitionControl() {
        this.setState({
            isRecognitionOpen: !this.state.isRecognitionOpen
        })
    }

    onClick_ToggleAddUserControl() {
        var timer;
        this.setState({
            isAddUserToggle: !this.state.isAddUserToggle
        })
    }

    onClick_TogglePainting() {
        if(this.props.isPaintOpen){
            this.props.dispatch(setPaintClose())
        } else {
            this.props.dispatch(setPaintOpen())
        }
        
    }

    onClick_ToggleReservation() {

    }

    //Others Events

    // AdduserControl() {
    //     console.log(this.state.isAddUserToggle);
    //     if (this.state.isAddUserToggle) {
    //         var timer = setTimeout(this.ClearAddUserBlock, 3000);
    //         console.log('引發A');
    //     } else {
    //         clearTimeout(timer);
    //         console.log('引發B');
    //     }
    // }

    ClearAddUserBlock() {
        this.setState({
            isAddUserToggle: false
        })
    }

    render() {
        return (
            <div className="toolbar">

                <VoiceStatus />

                <div
                    className="toolbar-button"
                    id="reservation"
                    onClick={this.onClick_ToggleReservation}
                >
                    <div className="hovertext" id="reservation">預約開會</div>
                </div>

                <div
                    className="toolbar-button"
                    id="brainstorming"
                    onClick={this.onClick_ToggleBrainstorming}
                >
                    <div className="hovertext" id="brainstorming">腦力激盪</div>
                </div>

                {
                    this.state.isBrainstormingToggle
                        ? <Brainstorming />
                        : null
                }

                <div
                    className="toolbar-button"
                    id="adduser"
                    onClick={this.onClick_ToggleAddUserControl}
                >
                    <div className="hovertext" id="adduser">邀請</div>
                </div>

                {
                    this.state.isAddUserToggle
                        ? <AddUser />
                        : null
                }


                <div
                    className="toolbar-button"
                    id="vote"
                    onClick={this.onClick_ToggleVotePage}
                >
                    <div className="hovertext" id="vote">投票</div>
                </div>

                <div ref="VoteDetail"
                    style={{ display: (this.props.votingDetail.isVotingStart ? "none" : "display") }}
                >
                    <VoteDetail />
                </div>

                <div
                    className="toolbar-button"
                    id="canvas"
                    onClick={()=>{this.onClick_TogglePainting()}}
                >
                    <div className="hovertext" id="canvas">電子白板</div>
                </div>

                <MeetingTime />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        votingDetail: state.vote,
        isPaintOpen: state.paint.isPaintOpen
    };
};

export default connect(mapStateToProps)(Toolbar);
