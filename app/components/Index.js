import React from 'react';
import ChatList from './ChatList';

class Index extends React.Component {
  constructor(props){
    super(props);
  }
 
 //按下enter後的事件處理
  handleTest(e) {
      if (e.charCode == 13) {
        //按下enter後
      }
  }

  render() {
    return(
      <div className="container" >
        <div className='Index'>
          <div className="logo">
            <div id="in"><img id='Indexlogo' src="../img/index_logo.png"/></div>
          </div>
          <div className='inputName'>
            <span className="input input--isao">
              <input ref='UserName' ref='Username' onKeyPress={this.handleTest} className="input__field input__field--isao" type="text" id="input-38" />
              <label className="input__label input__label--isao" for="input-38" data-content="請輸入你的名字">
                <span className="input__label-content input__label-content--isao">請輸入你的名字</span>
              </label>
            </span>
          </div>
          
        </div>

        <ChatList />

      </div>
    );
  }
}

export default Index;
