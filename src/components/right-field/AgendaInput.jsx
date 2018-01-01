import React from 'react';
import { connect } from 'react-redux';
import { updateAgenda } from '../../actions/Actions';
import socket from '../../socket';

class AgendaInput extends React.Component {
	constructor(props) {
		super(props);
	}

	onChangeInput(e) {
		const key = Number(e.target.id);
		// 取得現在時間
		const date = new Date();
		// 自定義時間格式:Hour-Minute
		const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}:${date.getSeconds()}`;
		this.props.agendaList.forEach((item, index) => {
			if (item.id === key) {
				this.props.dispatch(updateAgenda({
					key: index,
					value: e.target.value,
					time: formattedTime,
				}));
				socket.emit('updateAgenda', {
					key: index,
					value: e.target.value,
					time: formattedTime,
				});
			}
		});
	}

	onClickEnter(e) {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	}


	render() {
		if (this.props.isAgendaFinished) {
			return (
				<input
					className="text agendaItem"
					style={{
						textDecoration: 'line-through',
						background: 'transparent',
					}}
					id={this.props.inputKey}
					value={this.props.content}
					onChange={(e) => {
						this.onChangeInput(e);
					}}
					onKeyUp={(e) => {
						this.onClickEnter(e);
					}}
					maxLength="10"
					readOnly="readonly"
					placeholder="點此輸入議程內容"
				/>
			);
		} return (
			<input
				className="text agendaItem"
				id={this.props.inputKey}
				value={this.props.content}
				onChange={(e) => {
					this.onChangeInput(e);
				}}
				onKeyUp={(e) => {
					this.onClickEnter(e);
				}}
				readOnly=""
				placeholder="點此輸入議程內容"
			/>
		);
	}
}

export default connect()(AgendaInput);
