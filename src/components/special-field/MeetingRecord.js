import React from "react";
import Background from "./Background";

// socket.emit("id");
class MeetingRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }

  componentDidMount() { }


  render() {
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
            <div className="title">會議日期：2017/09/27</div>
            <div className="title">與會人員：Andy、威君、詩婷、又嘉、宣妮、成財</div>
            <div className="title">會議長度：1小時00分</div>
            <div className="text">
              <ul>Andy：測試文字測試文字測試文字</ul>
              <ul>Weichun：語音辨識結果在這裡!</ul>
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

export default MeetingRecord;
