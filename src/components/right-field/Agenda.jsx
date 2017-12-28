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
import AgendaCheckbox from './AgendaCheckbox';
import AgendaInput from './AgendaInput';
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
						<div className="checkbox agendaItem">
							<AgendaCheckbox
								inputKey={key}
								isFinished={this.props.agendaList[key].isAgendaFinished}
								hasContent={this.props.agendaList[key].content}
							/>
						</div>
						<AgendaInput
							inputKey={key}
							isFinished={this.props.agendaList[key].isAgendaFinished}
							hasContent={this.props.agendaList[key].content}
						/>
						<div
							className="delete agendaItem"
							id={key}
							onClick={(e) => {
								this.onClick_ToggleDeleteAgenda(e);
							}}
						>xxxx
						</div>
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
