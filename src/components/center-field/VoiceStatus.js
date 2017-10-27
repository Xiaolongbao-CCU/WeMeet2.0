"use strict";

import React from "react";
import connect from "react-redux";

class VoiceStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSetting: false
        };
        this.onClick_ToggleSetting = this.onClick_ToggleSetting.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleSetting() {
        this.setState({
            isSetting: !this.state.isSetting
        })
    }

    render() {
        return (
            <div className="voice-content" >
                <div className="voice-ai">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
                <label className="voice-text">語音辨識中...</label>

                {
                    this.state.isSetting ?
                        <div className="voice-type">
                            語言：
                            <form>
                                <select className="VoiceInput" name="language">
                                　<option value="english">英文</option>
                                　<option value="chinese">中文</option>
                                </select>
                            </form>
                            <img className="voice-arrow" src="./img/arrow_white.png"  onClick={this.onClick_ToggleSetting} />
                        </div> :
                        <div className="hover-content" onClick={this.onClick_ToggleSetting}>點我換語言</div>
                }

            </div>
        )

    }
}

export default VoiceStatus;
