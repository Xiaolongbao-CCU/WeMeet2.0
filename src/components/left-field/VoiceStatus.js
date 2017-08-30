"use strict";

import React from "react";
import connect from "react-redux";

class VoiceStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        return(
                /* 目前打算只會變動圖片和文字 */
            <div className="left-voice">
                <div className="voice-content">
                    <img className="voice-img" src="img/recognizing.png" />
                    <label className="voice-text">語音辨識中...</label>
                </div>
            </div>
        )
        
    }
}

export default VoiceStatus;
