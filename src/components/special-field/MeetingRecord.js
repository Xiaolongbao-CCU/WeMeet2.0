import React from "react";
import Background from "./Background";
import { connect } from "react-redux";

class MeetingRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clear = true;
        this.wasPressed = false;
    }

    componentWillMount() {}

    componentDidMount() {
        window.document.addEventListener("keydown", e => {
            this.fkey(e);
        });
        // window.document.addEventListener('keypress',(e)=>{fkey(e)})
        // window.document.addEventListener('keyup',(e)=>{fkey(e)})

    }

    componentWillUnmount() {
        if (this.clear) {
            window.localStorage.clear();
            this.props.dispatch({'type':'CLEAR'})
        }
    }

    fkey(e) {
        e = e || window.event;
        if (this.wasPressed) return;
        if (e.keyCode == 116) {
            this.clear = false;
            this.wasPressed = true;
        } else {
            this.clear = true;
        }
    }

    render() {
        let meetingRecord = []
        let tempTime = ''
        if(this.props.chatRecord){
            this.props.chatRecord.map(record => {
                let time = record.sendTime
                let temp = undefined
                if(time !== tempTime){
                    let timeMessage = `-----${time.substring(0,2)}點${time.substring(3,5)}分-----`
                    meetingRecord.push(
                        <li>
                            {timeMessage}
                        </li>
                    )
                    tempTime = time
                }
                temp = `${record.name} : ${record.text}`
                meetingRecord.push(
                    <li>
                        {temp}
                    </li>
                )
                
            });
        }

        let recognitionRecord = []
        let tempTime2 = ''
        if(this.props.recognitionRecord){
            this.props.recognitionRecord.map(record => {
                let time = record.sendTime
                let temp = undefined
                if(time !== tempTime2){
                    let timeMessage = `-----${time.substring(0,2)}點${time.substring(3,5)}分-----`
                    recognitionRecord.push(
                        <li>
                            {timeMessage}
                        </li>
                    )
                    tempTime2 = time
                }
                temp = `${record.name} : ${record.text}`
                recognitionRecord.push(
                    <li>
                        {temp}
                    </li>
                )
                
            });
        }
        let participant = `${this.props.localUserName}、${Object.values(this.props.remoteUserName).join('、')}`
        return (
            <div className="container">
                <div className="meetingrecord">
                    <div className="banner">
                        <a href="/">
                            <img className="logo" src="./img/index_logo2.png" />
                            <div className="backtoindex">回首頁</div>
                        </a>
                        <div className="title">
                            <div className="circle">會</div>
                            <div className="circle">議</div>
                            <div className="circle">紀</div>
                            <div className="circle">錄</div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="old-data">
                            <div className="title">會議日期：2017/09/27</div>
                            <div className="title">
                                與會人員：{participant}                            </div>
                            <div className="title">
                                會議長度：
                                {`${this.props.time[0]}小時${this.props.time[1]}分${this.props.time[2]}秒`}
                            </div>
                            <div className="text">
                            語音辨識逐字稿:
                                <ul>
                                    {recognitionRecord.length ? recognitionRecord : '無'}
                                </ul>
                            聊天紀錄:
                                <ul>
                                    {meetingRecord.length ? meetingRecord:'無'}
                                </ul>
                                
                            </div>
                        </div>

                        <div className="new-data">
                        </div>
                    </div>
                </div>
                <img className="ballon type1" src="./img/ballon.png" />
                <img className="ballon type2" src="./img/ballon.png" />
                <img className="ballon type3" src="./img/ballon.png" />
                <img className="ballon type4" src="./img/ballon.png" />
                <img className="ballon type5" src="./img/ballon.png" />
                <img className="ballon type6" src="./img/ballon.png" />
                <img className="moutain" src="./img/mountain.png" />
                <Background />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        localUserName:state.connection.userName,
        time: state.time,
        participantList: state.participantList,
        chatRecord:state.chat,
        recognitionRecord: state.chatAndRecognition.recognitionRecord,
        remoteUserName: state.connection.remoteUserName
    };
};
export default connect(mapStateToProps)(MeetingRecord);
