"use strict";

import React from "react";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    //OnClick Events
    onClick_ToggleBrainstorming() {}

    onClick_ToggleInvitePage() {}

    onClick_ToggleVotePage() {}

    render() {
        return (
            <div className="toolbar">

                /* MoreInfro */
                <button className="toolbar-button" id="moreinfro" onClick="" />

                /* Brainstorming */
                <button
                    className="toolbar-button"

                />

                /* AddUser */
                <button
                    className="toolbar-button"
                    id="adduser"

                />

                /* Recognition */
                <button className="toolbar-button" id="recognition" />

                /* vote */
                <button
                    className="toolbar-button"
                    id="vote"
                />

            </div>
        );
    }
}

export default Toolbar;
