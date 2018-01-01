import React from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
import TickPic from '../../img/tick.png';
import NullPic from '../../img/null.png';
import { doneAgenda } from '../../actions/Actions';

class AgendaCheckbox extends React.Component {
	onClickToggleAgendaFinish(e) {
		const key = Number(e.target.id);
		// 取得現在時間
		const date = new Date();
		// 自定義時間格式:Hour-Minute
		const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}:${date.getSeconds()}`;
		this.props.agendaList.forEach((item, index) => {
			if (item.id === key) {
				this.props.dispatch(doneAgenda(index, formattedTime));
				socket.emit('doneAgenda', index, formattedTime);
			}
		});
	}

	render() {
		if (this.props.isFinished) {
			return (
				<input
					type="image"
					alt=""
					className="checked"
					id={this.props.inputKey}
					src={TickPic}
					onClick={(e) => {
						if (this.props.hasContent) {
							this.onClickToggleAgendaFinish(e);
						}
					}}
				/>
			);
		} return (
			<input
				type="image"
				className="checked"
				alt=""
				id={this.props.inputKey}
				src={NullPic}
				onClick={(e) => {
					if (this.props.hasContent) {
						this.onClickToggleAgendaFinish(e);
					}
				}}
			/>
		);
	}
}

export default connect()(AgendaCheckbox);
