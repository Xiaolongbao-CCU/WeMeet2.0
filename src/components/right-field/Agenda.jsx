import React from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
import {
	newAgenda,
	deleteAgenda,
} from '../../actions/Actions';
import AgendaCheckbox from './AgendaCheckbox';
import AgendaInput from './AgendaInput';
import Branch from '../../img/branch.gif';
import Eagle from '../../img/eagle.png';

class Agenda extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.agendaListCounter = 0;
		this.onClickToggleDeleteAgenda = this.onClickToggleDeleteAgenda.bind(this);
	}

	componentWillMount() {}

	componentDidMount() {
		this.onClickNewAgenda();
		// this.scrollToBottom();
	}

	componentDidUpdate() {
		// this.scrollToBottom();
	}

	onClickToggleDeleteAgenda(e) {
		const key = Number(e.target.id);
		this.props.agendaList.forEach((item, index) => {
			if (item.id === key) {
				this.props.dispatch(deleteAgenda(index));
				socket.emit('deleteAgenda', index);
			}
		});
		// this.setState({
		//     ...this.state,
		//     agendaList: [
		//         ...this.state.agendaList.slice(0, key),
		//         ...this.state.agendaList.slice(key + 1)
		//     ]
		// });
	}

	onClickNewAgenda() {
		this.agendaListCounter += 1;
		const uniqueID = this.agendaListCounter;
		this.props.dispatch(newAgenda(uniqueID));
		socket.emit('newAgenda');
	}

	scrollToBottom() {
		const node = this.messagesEnd;
		node.scrollIntoView({ behavior: 'smooth' });
	}

	render() {
		let agendaDetail;
		if (this.props.agendaList.length > 0) {
			agendaDetail = this.props.agendaList.map(item => (
				<div className="detail">
					<div className="checkbox agendaItem">
						<AgendaCheckbox
							inputKey={item.id}
							isFinished={item.isAgendaFinished}
							hasContent={item.content}
							agendaList={this.props.agendaList}
						/>
					</div>
					<AgendaInput
						inputKey={item.i}
						isFinished={item.isAgendaFinished}
						hasContent={item.content}
						agendaList={this.props.agendaList}
					/>
					<div
						role="button"
						className="delete agendaItem"
						id={item.id}
						onClick={(e) => {
							this.onClickToggleDeleteAgenda(e);
						}}
					>x
					</div>
				</div>
			));
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
						onClick={() => {
							this.onClickNewAgenda();
						}}
					>
                        增加議程
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
