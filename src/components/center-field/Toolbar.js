"use strict";

import React from "react";
import VoteDetail from "./VoteDetail";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Toggle Status
            isVoteToggle: false,
            isRecognitionToggle: false,
            //Open Status
            isRecognitionOpen: true
        };
        this.onClick_ToggleVotePage = this.onClick_ToggleVotePage.bind(this);
        this.onClick_ToggleRecognitionControl = this.onClick_ToggleRecognitionControl.bind(this);
    }


    componentWillMount() { }

    componentDidMount() { }

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

                {
                    this.state.isRecognitionToggle
                        ? <VoteDetail />
                        : null
                }

                <button
                    className="toolbar-button"
                    id="adduser"
                />

                <button className="toolbar-button" id="recognition" />

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
