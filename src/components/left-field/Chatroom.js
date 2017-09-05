"use strict";

import React from "react";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatlog: []
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        let chatbox = [];
        /* if message is from myself, className wiil be 'myself-message'
          if message is from others, className wiil be 'others-message' */
        if (this.state.chatlog.length > 0) {
            //this obj need to have name,text,sendTime properties
            this.state.chatlog.map(obj => {
                if (obj.userID == this.localUserID) {
                    chatbox.push(
                        <div className="myself-message">
                            <img className="image" src="./img/test0.jpg" />
                            <div className="name">{obj.name}</div>
                            <div className="dialogbox">{obj.text}</div>
                            <div className="time">{obj.sendTime}</div>
                        </div>
                    );
                } else {
                    chatbox.push(
                        <div className="others-message">
                            <img className="image" src="./img/test1.jpg" />
                            <div className="name">{obj.name}</div>
                            <div className="dialogbox">{obj.text}</div>
                            <div className="time">{obj.sendTime}</div>
                        </div>
                    );
                }
            });
        }
        return (
            <div className="left-chatbox">
                <div className="myself-message">
                    <img className="image" src="./img/test0.jpg" />
                    <div className="name">名字</div>
                    <div className="dialogbox">對話內容</div>
                    <div className="time">12:00</div>
                </div>

                <div className="others-message">
                    <img className="image" src="./img/test1.jpg" />
                    <div className="name">又嘉</div>
                    <div className="dialogbox">我是又嘉安安</div>
                    <div className="time">12:00</div>
                </div>
                {chatbox}
            </div>
        );
    }
}

export default Chatroom;
