"use strict";

import React from "react";

class MeetingTime extends React.Component {
    constructor(props) {
        super(props);
        this.getSystemTime = this.getSystemTime.bind(this);
        this.state={
            time: ""
        }
    }

    componentWillMount() { }

    componentDidMount() {
        this.timer = setInterval(this.getSystemTime, 1000);
    }

    getSystemTime() {
        let d = new Date();
        d =
            d.getFullYear() +
            "-" +
            ("0" + (d.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + d.getDate()).slice(-2) +
            " " +
            ("0" + d.getHours()).slice(-2) +
            ":" +
            ("0" + d.getMinutes()).slice(-2) +
            ":" +
            ("0" + d.getSeconds()).slice(-2);
        this.setState({
            time: d
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        /* Andy: put meeting time record here */
        return (
            
                <div className="left-meetingtime">
                    會議進行時間： {this.state.time}
                </div>
        );
    }
}

export default MeetingTime;
