import React from 'react';
import { connect } from 'react-redux';
import { setMeetingTime } from '../../actions/meetingAction';

class MeetingTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 會議時間，等到結束會議，要把這個資料送到會議紀錄
			Meetingtime: {
				hour: 0,
				min: 0,
				sec: 0,
			},
		};
		this.StartMeetingTime = this.StartMeetingTime.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.recorder = setInterval(this.StartMeetingTime, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.recorder);
		this.props.dispatch(setMeetingTime(Object.values(this.state.Meetingtime)));
	}

	StartMeetingTime() {
		const meetingTime = this.state.Meetingtime;
		if (meetingTime.sec === 59) {
			meetingTime.sec = 1;
			meetingTime.min += 1;
		} else {
			meetingTime.sec += 1;
		}

		if (meetingTime.min === 59) {
			meetingTime.min = 1;
			meetingTime.hour += 1;
		}
		this.setState({
			Meetingtime: meetingTime,
		});
	}

	render() {
		/* Andy: put meeting time record here */
		return (

			<div className="left-meetingtime">
				<span id="timeText">會議進行時間</span>
				<div id="timeWrapper">
					<span>{this.state.Meetingtime.hour}時</span>
					<span>{this.state.Meetingtime.min}分</span>
					<span>{this.state.Meetingtime.sec}秒</span>
				</div>
			</div>
		);
	}
}

export default connect()(MeetingTime);
