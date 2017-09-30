import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import socket from "../socket";
import { setUserName } from "../actions/Actions";
import Background from "./special-field/Background";

// socket.emit("id");
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            roomName: ""
        };
        this.onClick_handleCreateRoom = this.onClick_handleCreateRoom.bind(
            this
        );
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    componentDidMount() {}

    onKeyDown(e) {
        //console.log(document.activeElement);
        switch (e.keyCode) {
            case 13:
                if (!this.refs.roomName.value) {
                    this.refs.roomName.focus();
                    return;
                }
                if (!this.refs.userName.value) {
                    this.refs.userName.focus();
                    return;
                }
                if (this.state.userName && this.state.roomName) {
                    if (
                        document.activeElement == this.refs.roomName ||
                        document.activeElement == this.refs.userName
                    ) {
                        document.activeElement.blur();
                        return;
                    }

                    if (document.activeElement == document.body) {
                        this.onClick_handleCreateRoom();
                        return;
                    }
                }
                break;
            default:
                break;
        }
    }

    onChange_userName(e) {
        this.setState({ userName: e.target.value });
    }
    onChange_roomName(e) {
        this.setState({ roomName: e.target.value });
    }
    onClick_handleCreateRoom() {
        document.removeEventListener("keydown",this.onKeyDown);
        //按下建立房間後的事件
        this.props.dispatch(setUserName(this.state.userName));
        //做好名字之後>進到房間裡
        this.props.history.push("/meeting#" + this.state.roomName);
    }

    render() {
        return (
            <div className="container">
                <div className="index">
                    <img className="indexlogo" src="./img/index_logo2.png" />
                    <br />
                    <div className="indexName">
                        名字:
                        <input
                            autoFocus={true}
                            ref="userName"
                            className="indexinput"
                            type="text"
                            onChange={e => {
                                this.onChange_userName(e);
                            }}
                        />
                        <span className="focus-border" />
                    </div>
                    <br />
                    <div className="indexMeeting">
                        房間名稱:
                        <input
                            ref="roomName"
                            className="indexinput"
                            type="text"
                            onChange={e => {
                                this.onChange_roomName(e);
                            }}
                        />
                        <span className="focus-border" />
                    </div>
                    <div
                        className="addRoom"
                        onClick={() => {
                            this.onClick_handleCreateRoom();
                        }}
                    >
                        建立房間
                    </div>
                </div>
                <Background />
            </div>
        );
    }
}

export default withRouter(connect()(Index));
