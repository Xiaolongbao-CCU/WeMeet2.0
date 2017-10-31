"use strict";

import React from "react";
import { connect } from "react-redux";
import Assistant from "./Assistant";

class VoiceResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.Assistant = Assistant.createNew(this.props.interimResult);
    }

    componentDidUpdate() {
        this.Assistant = Assistant.createNew(this.props.interimResult);
    }

    render() {
        return (
            <div className="left-input">
                <div className="voiceresult-field">
                    <div className="voiceResult-text">
                        {this.props.interimResult}
                    </div>
                </div>
                <img className="mailbox" src="./img/robot.png" />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        interimResult: state.chatAndRecognition.interimResult
    };
};

export default connect(mapStateToProps)(VoiceResult);
