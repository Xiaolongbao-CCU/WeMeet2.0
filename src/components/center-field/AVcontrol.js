"use strict";

import React from "react";

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    //Button Events
    toggleAudioControl() {}

    toggleVideoControl() {}

    toggleExit() {}

    render() {
        return (
            <div className="av-control">

                <button
                    className="av-button"
                    onClick={this.toggleAudioControl}
                />

                <button
                    className="av-button"
                    id="exit"
                    onClick={this.toggleExit}
                />

                <button
                    className="av-button"
                    onClick={this.toggleVideoControl}
                />

            </div>
        );
    }
}

export default AVcontrol;
