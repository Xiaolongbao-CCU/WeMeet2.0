import React from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
import {
	addChatRecord,
	addRecognitionRecord,
} from '../../actions/Actions';
import Mailbox from '../../img/mailbox.png';
import Submit from '../../img/submit.png';

class ChatInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatInputValue: '',
		};
		this.animalName = {
			1: '貓貓',
			2: '狗狗',
			3: '猩猩',
			4: '獅子',
			5: '無尾熊',
			6: '兔兔',
			7: '老虎',
			8: '狐狸',
		};
		this.handleInputPressClick = this.handleInputPressClick.bind(this);
	}

	componentWillMount() { }

	componentDidMount() { }

	handleInputPressEnter(e) {
		if (e.which === 13) {
			// 按下enter後
			e.preventDefault();
			this.handleInputPressClick();
		}
	}

	handleInputPressClick() {
		if (this.state.chatInputValue) {
			// 取得現在時間
			const date = new Date();
			// 自定義時間格式:Hour-Minute
			const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
			const animal = Number(Object.values(this.animalName).indexOf(this.props.animalName)) + 1;
			const record = {
				name: this.props.userName, // 0903 Andy Add a Temp
				userID: this.props.localUserID,
				animal,
				sendTime: formattedTime,
				text: this.state.chatInputValue,
			};
			socket.emit('chatMessage', record);
			// 加到自己畫面上的
			this.props.dispatch(addChatRecord(record));
			this.setState({
				chatInputValue: '',
			});
		}
	}

	handleInputOnChange(e) {
		this.setState({
			chatInputValue: e.target.value,
		});
	}

	render() {
		return (
			<div className="leftInput">
				<input
					className="inputArea"
					id="input-text"
					type="text"
					onKeyPress={(e) => {
						this.handleInputPressEnter(e);
					}}
					onChange={(e) => {
						this.handleInputOnChange(e);
					}}
					value={this.state.chatInputValue}
				/>
				<img className="inputArea" alt="" id="upload" src={Submit} onClick={this.handleInputPressClick} />
				<img className="inputArea" alt="" id="mailbox" src={Mailbox} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userName: state.connection.userName,
	animalName: state.connection.animalName,
	localUserID: state.connection.localUserID,
});
export default connect(mapStateToProps)(ChatInput);
