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
            <a href="/"><img className="logo" src="./img/index_logo2.png" /></a>
            <div className="title">
              <div className="circle">會</div>
              <div className="circle">議</div>
              <div className="circle">紀</div>
              <div className="circle">錄</div>
            </div>
          </div>
          <div className="content">
            <div className="text">
              <ul>Andy:測試文字測試文字測試文字</ul>
              <ul>Weichun:語音辨識結果在這裡!</ul>
            </div>
          </div>
        </div>
        <Background />
      </div>
    );
  }
}

export default MeetingRecord;
