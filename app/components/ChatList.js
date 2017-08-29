import React from 'react';
import FriendListStore from '../stores/FriendListStore';

class ChatList extends React.Component {
  constructor(props){
    super(props);
    this.state = FriendListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FriendListStore.listen(this.onChange);
  }

  componentWillUnmount() {
    FriendListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  //按下enter後的事件處理
  handleTest(e) {
      if (e.charCode == 13) {
        //按下enter後
        alert('Enter... (KeyPress, use charCode)');
      }
      if (e.keyCode == 13) {
      }
  }
 
 
  render() {
    let room = this.state.roomList.map((room) => {
        let roompage = '/meet' + room ;
        return (
            <a href={roompage}>
                <div id="roomProp">
                    <div id="circle3">
                        <img id="friend_image" src="../img/room.png"></img>
                    </div>
                    <div id="room_name">{room}</div>
                </div>
            </a>
        );
    })

    return(
        <div id='in'>
            <div className='ChatList'>
            <div id='AddRoom'>
                <label id='Addtext'>建立房間？請輸入想要的房號</label>
                <div id='AddInput'>
                    <input className="Addinputsyle" type="text" ref='roomnum' id="input-10" onKeyPress={this.handleTest}/>
                </div>
                <div id='AddGo'>
                  <a href='/main'><img id='Addgo' src='../img/index_go1.png'></img></a>
                </div>
            </div>
            <div id='chatlist_text'>現有房間清單</div>
            <div id='chatlist_online'>
                {room}
            </div>
          </div>
        </div>
    );
  }
}

export default ChatList;
