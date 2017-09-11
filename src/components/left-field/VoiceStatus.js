"use strict";

import React from "react";
import connect from "react-redux";

class VoiceStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="left-voice">
                <div className="voice-content">
                    <div className="voice-ai">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                    <label className="voice-text">語音辨識中...</label>
                </div>
            </div>
        )

    }
}

export default VoiceStatus;
