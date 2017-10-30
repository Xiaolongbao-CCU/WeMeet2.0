"use strict";

import React from "react";

//Button Detail
import VoteDetail from "./VoteDetail";
import AddUser from "./AddUser";
import { connect } from "react-redux";
import Brainstorming from "./Brainstorming";
import ReservationDetail from "./ReservationDetail";
// Other
import MeetingTime from "./MeetingTime";
import VoiceStatus from "./VoiceStatus";
import {
    setGridDetailOpen,
    setGridStart,
    setGridOpen,
    setGridClose,
    setPaintOpen,
    setPaintClose,
    setSixhatClose
} from "../../actions/Actions";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Toggle Status
            isVoteToggle: false,
            isAddUserOpen: false,
            isBrainstormingOpen: false,
            isRerservationOpen: false,
            //Open Status
            isRecognitionOpen: false
            //Special Status
        };
        this.onClick_ToggleVotePage = this.onClick_ToggleVotePage.bind(this);
        this.onClick_ToggleRecognitionControl = this.onClick_ToggleRecognitionControl.bind(
            this
        );
        this.onClick_ToggleBrainstorming = this.onClick_ToggleBrainstorming.bind(
            this
        );
        this.onClick_TogglePainting = this.onClick_TogglePainting.bind(this);
        this.onClick_ToggleReservation = this.onClick_ToggleReservation.bind(
            this
        );
        this.closeBrainStorming = this.closeBrainStorming.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {
        this.refs.VoteDetail.style.display = "none";
    }

    //OnClick Events

    onClick_ToggleVotePage() {
        this.refs.VoteDetail.style.display =
            this.refs.VoteDetail.style.display == "block" ? "none" : "block";
    }

    onClick_ToggleBrainstorming() {
        this.setState({
            isBrainstormingOpen: !this.state.isBrainstormingOpen
        });
    }

    onClick_ToggleRecognitionControl() {
        this.setState({
            isRecognitionOpen: !this.state.isRecognitionOpen
        });
    }

    onClick_addUserControl() {
        clearTimeout(window.closeTimeOut);
        if (this.state.isAddUserOpen) {
            this.setState({
                isAddUserOpen: false
            });
        } else {
            this.setState(
                {
                    isAddUserOpen: true
                },
                () => {
                    window.closeTimeOut = setTimeout(() => {
                        this.setState({
                            isAddUserOpen: false
                        });
                    }, 1000);
                }
            );
        }
    }

    onClick_TogglePainting() {
        if (this.props.isPaintOpen) {
            this.props.dispatch(setPaintClose());
        } else {
            this.props.dispatch(setGridClose());
            this.props.dispatch(setSixhatClose());
            this.props.dispatch(setPaintOpen());
        }
    }

    onClick_ToggleReservation() {
        this.setState({
            isRerservationOpen: !this.state.isRerservationOpen
        });
    }

    closeBrainStorming() {
        this.setState({
            isBrainstormingOpen: false
        });
    }

    closeReservation() {
        this.setState({
            isRerservationOpen: false
        });
    }

    render() {
        return (
            <div className="toolbar">
                <VoiceStatus Recognizer={this.props.Recognizer} />

                <div
                    className="toolbar-button"
                    id="reservation"
                    onClick={this.onClick_ToggleReservation}
                >
                    <div className="hovertext" id="reservation">
                        預約開會
                    </div>
                </div>

                {this.state.isRerservationOpen ? (
                    <ReservationDetail
                        closeReservation={() => {
                            this.closeReservation();
                        }}
                    />
                ) : null}

                <div
                    className="toolbar-button"
                    id="brainstorming"
                    onClick={this.onClick_ToggleBrainstorming}
                >
                    <div className="hovertext" id="brainstorming">
                        腦力激盪
                    </div>
                </div>

                {this.state.isBrainstormingOpen ? (
                    <Brainstorming
                        closeBrainStorming={this.closeBrainStorming}
                    />
                ) : null}

                <div
                    className="toolbar-button"
                    id="adduser"
                    onClick={() => {
                        this.onClick_addUserControl();
                    }}
                >
                    <div className="hovertext" id="adduser">
                        邀請
                    </div>
                </div>

                {this.state.isAddUserOpen ? <AddUser /> : null}

                <div
                    className="toolbar-button"
                    id="vote"
                    onClick={this.onClick_ToggleVotePage}
                >
                    <div className="hovertext" id="vote">
                        投票
                    </div>
                </div>

                <div
                    ref="VoteDetail"
                    style={{
                        display: this.props.votingDetail.isVotingStart
                            ? "none"
                            : "display"
                    }}
                >
                    <VoteDetail />
                </div>

                <div
                    className="toolbar-button"
                    id="canvas"
                    onClick={() => {
                        this.onClick_TogglePainting();
                    }}
                >
                    <div className="hovertext" id="canvas">
                        電子白板
                    </div>
                </div>

                <MeetingTime />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        votingDetail: state.vote,
        isPaintOpen: state.paint.isPaintOpen,
        isGridStart: state.grid.isGridStart,
        isGridOpen: state.grid.isGridOpen
    };
};

export default connect(mapStateToProps)(Toolbar);
