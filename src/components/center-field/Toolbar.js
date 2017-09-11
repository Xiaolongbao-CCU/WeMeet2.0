"use strict";

import React from "react";
import VoteDetail from "./VoteDetail";
import AddUser from "./AddUser";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Toggle Status
            isVoteToggle: false,
            isAddUserToggle: false,
            //Open Status
            isRecognitionOpen: false,
            //Special Status
        };
        this.onClick_ToggleVotePage = this.onClick_ToggleVotePage.bind(this);
        this.onClick_ToggleRecognitionControl = this.onClick_ToggleRecognitionControl.bind(this);
        this.onClick_ToggleAddUserControl = this.onClick_ToggleAddUserControl.bind(this);
        this.ClearAddUserBlock = this.ClearAddUserBlock.bind(this);
    }


    componentWillMount() { }

    componentDidMount() {
    }

    //Others Events


    //OnClick Events
    onClick_ToggleBrainstorming() { }

    onClick_ToggleInvitePage() { }

    onClick_ToggleVotePage() {
        this.setState({
            isVoteToggle: !this.state.isVoteToggle
        });
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

    ClearAddUserBlock() {
        this.setState({
            isAddUserToggle: false
        })
    }

    render() {
        return (
            <div className="toolbar">

                <button
                    className="toolbar-button"
                    id="moreinfro"
                    onClick=""
                />



                <button
                    className="toolbar-button"
                    id={this.state.isRecognitionOpen ? 'recognition-on' : 'recognition-off'}
                    onClick={this.onClick_ToggleRecognitionControl}
                />



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



                <button className="toolbar-button" id="brainstorming" />

                <button
                    className="toolbar-button"
                    id="vote"
                    onClick={this.onClick_ToggleVotePage}
                />

                {
                    this.state.isVoteToggle
                        ? <VoteDetail />
                        : null
                }

            </div>
        );
    }
}

export default Toolbar;
