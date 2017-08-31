"use strict";

import React from "react";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    //OnClick Events
    onClick_ToggleBrainstorming() { }

    onClick_ToggleInvitePage() { }

    onClick_ToggleVotePage() { }

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
                />

            </div>
        );
    }
}

export default Toolbar;
