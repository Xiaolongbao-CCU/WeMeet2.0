"use strict";

import React from "react";
import ConfirmExit from "../special-field/ConfirmExit";

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMyselfAudioOn: true, //自己的聲音是否開啟
            isMyselfVideoOn: true, //自己的影像是否開啟
            isShowExitConfirm: false //是否顯示離開房間的警示框
        }
        this.onClick_toggleAudioControl = this.onClick_toggleAudioControl.bind(this);
        this.onClick_toggleVideoControl = this.onClick_toggleVideoControl.bind(this);
        this.onClick_ShowConfirm = this.onClick_ShowConfirm.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    //Button Events
    onClick_toggleAudioControl() {
        this.setState({
            isMyselfAudioOn: !this.state.isMyselfAudioOn
        });
    }

    onClick_toggleVideoControl() {
        this.setState({
            isMyselfVideoOn: !this.state.isMyselfVideoOn
        });
    }

    onClick_ShowConfirm() {
        this.setState({
            isShowExitConfirm: !this.state.isShowExitConfirm
        })
    }



    render() {
        return (
            <div className="av-control">

                <button
                    className="av-button"
                    id={this.state.isMyselfAudioOn ? 'audio-on' : 'audio-off'}
                    onClick={this.onClick_toggleAudioControl}
                />

                <button
                    className="av-button"
                    id="exit"
                    onClick={this.onClick_ShowConfirm}
                />

                <button
                    className="av-button"
                    id={this.state.isMyselfVideoOn ? 'video-on' : 'video-off'}
                    onClick={this.onClick_toggleVideoControl}
                />

                {this.state.isShowExitConfirm ? <ConfirmExit /> : null}


            </div>
        );
    }
}

export default AVcontrol;
