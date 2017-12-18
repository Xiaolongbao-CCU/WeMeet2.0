import React from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
import {
	setAgenda,
	newAgenda,
	deleteAgenda,
	updateAgenda,
	doneAgenda,
} from '../../actions/Actions';
import Branch from '../../img/branch.gif';
import Eagle from '../../img/eagle.png';

class Agenda extends React.Component {
	constructor(props) {
		super(props);
		this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(this);
	}

	componentWillMount() {}

	componentDidMount() {
		// this.scrollToBottom();
	}

	componentDidUpdate() {
		// this.scrollToBottom();
	}

	onClick_ToggleDeleteAgenda(e) {
		const key = parseInt(e.target.id, 10);
		// this.setState({
		//     ...this.state,
		//     agendaList: [
		//         ...this.state.agendaList.slice(0, key),
		//         ...this.state.agendaList.slice(key + 1)
		//     ]
		// });
		this.props.dispatch(deleteAgenda(key));
		socket.emit('deleteAgenda', key);
	}

	onClick_newAgenda(e) {
		const key = `agenda_input${this.props.agendaList.length}`;

		this.props.dispatch(newAgenda());
		socket.emit('newAgenda');
	}

	onChangeInput(e) {
		const key = parseInt(e.target.id, 10);
		// 取得現在時間
		const date = new Date();
		// 自定義時間格式:Hour-Minute
		const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}:${date.getSeconds()}`;

		this.props.dispatch(updateAgenda({
			key,
			value: e.target.value,
			time: formattedTime,
		}));
		socket.emit('updateAgenda', {
			key,
			value: e.target.value,
			time: formattedTime,
		});
	}

	onClick_Enter(e) {
		if (e.keyCode == 13) {
			e.target.blur();
		}
	}

	onClick_toggleAgendaFinish(e) {
		const key = parseInt(e.target.id, 10);
		// 取得現在時間
		const date = new Date();
		// 自定義時間格式:Hour-Minute
		const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}:${date.getSeconds()}`;
		this.props.dispatch(doneAgenda(key, formattedTime));
		socket.emit('doneAgenda', key, formattedTime);
	}

	scrollToBottom() {
		const node = this.messagesEnd;
		node.scrollIntoView({ behavior: 'smooth' });
	}

	render() {
		let agendaDetail;
		if (this.props.agendaList.length > 0) {
			agendaDetail = this.props.agendaList.map((item) => {
				const key = this.props.agendaList.indexOf(item);
				return (
					<div className="detail">
						<div className="checkbox">
							<img
								style={
									this.props.agendaList[key].isAgendaFinished
										? { animation: 'fadeIn 0.4s' }
										: {}
								}
								className="checked"
								id={key}
								onClick={(e) => {
									if (this.props.agendaList[key].content) {
										this.onClick_toggleAgendaFinish(e);
									}
								}}
								src={
									this.props.agendaList[key].isAgendaFinished
										? './img/tick.png'
										: './img/null.png'
								}
							/>
						</div>
						<input
							className="text"
							style={
								this.props.agendaList[key].isAgendaFinished
									? {
										textDecoration: 'line-through',
										background: 'transparent',
									}
									: {}
							}
							ref={`agenda_input${key}`}
							id={key}
							value={this.props.agendaList[key].content}
							onChange={(e) => {
								this.onChangeInput(e);
							}}
							onKeyUp={(e) => {
								this.onClick_Enter(e);
							}}
							maxLength="10"
							readOnly={
								this.props.agendaList[key].isAgendaFinished
									? 'readonly'
									: ''
							}
							placeholder="點此輸入議程內容"
						/>
						<div
							className="delete"
							id={key}
							onClick={(e) => {
								this.onClick_ToggleDeleteAgenda(e);
							}}
						/>
					</div>
				);
			});
		}

		return (
			<div className="agenda-block">
				<div className="pictureWrapper">
					<img className="branch" alt="" src={Branch} />
					<img className="eagle" alt="" src={Eagle} />
				</div>
				<div className="flag">
					<div className="agenda-title">議程</div>
					<div className="agenda-content">
						{agendaDetail}
						<div
							ref={(el) => {
								this.messagesEnd = el;
							}}
						/>
					</div>
					<div
						className="agenda-add"
						onClick={(e) => {
							this.onClick_newAgenda(e);
						}}
					>
						<div className="cross" />
						<div className="text" unselectable="on">
                            增加議程
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	agendaList: state.agenda,
});

export default connect(mapStateToProps)(Agenda);
