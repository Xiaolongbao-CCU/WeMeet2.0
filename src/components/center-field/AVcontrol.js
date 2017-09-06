"use strict";

import React from "react";

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMyselfAudioOn: true, //自己的聲音是否開啟
            isMyselfVideoOn: true, //自己的影像是否開啟
        }
        this.onClick_toggleAudioControl = this.onClick_toggleAudioControl.bind(this);
        this.onClick_toggleVideoControl = this.onClick_toggleVideoControl.bind(this);
        this.onClick_toggleExitRoom = this.onClick_toggleExitRoom.bind(this);
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

    onClick_toggleExitRoom() {
        //觸發離開房間，回到首頁，之後會後在加上確認離開的介面
    }

    render() {
        return (
            <div className="av-control">

                <button
                    className="av-button"
                    id={this.state.isMyselfAudioOn ? 'audio-on' : 'audio-off'}
     ㄨ               onClick={this.onClick_toggleAudioControl}
                />

                <button
                    className="av-button"
                    id="exit"
                    onClick={this.onClick_toggleExitRoom}
                />

                <button
                    className="av-button"
                    id={this.state.isMyselfVideoOn ? 'video-on' : 'video-off'}
                    onClick={this.onClick_toggleVideoControl}
                />

            </div>
        );
    }
}

export default AVcontrol;
