"use strict";

import React from "react";
import Votebox from "./Votebox";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVoteToggle: true
        };
        this.onClick_ToggleVotePage = this.onClick_ToggleVotePage.bind(this);
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
                    id='brainstorming'
                />

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
                        ? <Votebox />
                        : null
                }

            </div>
        );
    }
}

export default Toolbar;
