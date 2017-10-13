import React from "react";
import Background from "./Background";
import { connect } from "react-redux";

class MeetingRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        let meetingRecord = [];
        if (this.props.recognitionRecord) {
            this.props.recognitionRecord.map(record => {
                meetingRecord.push(
                    <ul>
                        {this.props.remoteUserName[record.userID] &&
                            this.props.remoteUserName[record.userID] !==
                            record.userID
                            ? this.props.remoteUserName[record.userID]
                            : this.props.participantList.reduce((sum,value)=>{
                                if(value.id == recood.userID){
                                    return sum = value.animal
                                }
                            },"")}
                        {":"}
                        {record.text}
                    </ul>
                );
            });
        }
        console.log(this.props)
        return (
            <div className="container">
                <div className="meetingrecord">
                    <div className="banner">
                        <a href="/"><img className="logo" src="./img/index_logo2.png" />
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
                            <div className="title">與會人員：Andy、威君、詩婷、又嘉、宣妮、成財</div>
                            <div className="title">會議長度：
                            {this.props.time[0]}小時{this.props.time[1]}分{this.props.time[2]}秒
                            </div>
                            <div className="text">
                                {meetingRecord}
                            </div>
                        </div>

                        <div className="new-data">
                            <textarea className="text">
                                {meetingRecord}
                            </textarea>
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
        time:state.time,
        participantList: state.participantList,
        recognitionRecord: state.chatAndRecognition.recognitionRecord,
        remoteUserName: state.connection.remoteUserName
    };
};
export default connect(mapStateToProps)(MeetingRecord);
