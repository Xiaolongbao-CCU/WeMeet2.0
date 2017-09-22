import React from "react";
import Background from "./special-field/Background";

// socket.emit("id");
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.onClick_handleCreateRoom = this.onClick_handleCreateRoom.bind(this);
    }

    componentDidMount() {
    }

    onClick_handleCreateRoom() {
        //按下建立房間後的事件
    }


    render() {
        return (
            <div className="container">
                <div className="index">
                    <img className="indexlogo" src="./img/index_logo2.png" />
                    <br />
                    <div className="indexName">
                        名字:
                        <input className="indexinput" type="text" />
                        <span className="focus-border"></span>
                    </div>
                    <br />
                    <div className="indexMeeting">
                        房間名稱:
                        <input className="indexinput" type="text" />
                        <span className="focus-border"></span>
                    </div>
                    <div
                        className="addRoom"
                        onClick={this.onClick_handleCreateRoom}
                    >
                        建立房間
                    </div>
                </div>
                <Background />
            </div>
        );
    }
}

export default Index;
