"use strict";

import React from "react";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        return (
            <div className="left-chatbox">

                /* if message is from myself, className wiil be 'myself-message' */
                <div className="myself-message">
                    <img className="image" src="./img/test0.jpg" />
                    <div className="name">名字</div>
                    <div className="dialogbox">對話內容</div>
                    <div className="time">對話時間</div>
                </div>

                /* if message is from others, className wiil be 'others-message' */
                <div className="others-message">
                    <img className="image" src="./img/test1.jpg" />
                    <div className="name">又嘉</div>
                    <div className="dialogbox">我是又嘉安安</div>
                    <div className="time">12:00</div>
                </div>

            </div>
        );
    }
}

export default Chatroom;
