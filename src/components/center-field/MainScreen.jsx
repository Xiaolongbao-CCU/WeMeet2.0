import React from 'react';
import Fullscreen from 'react-full-screen';

import { connect } from 'react-redux';
import SixHatGame from './SixHatGame';
import OtherUser from './OtherUser';
import UserInfo from './UserInfo';


class MainScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 使用者資訊，是一個巢狀物件，分別會有first-無限多個子物件
			// UserInfo: {
			// 	// 第一個使用者
			// 	first: {
			// 		userIdentity: 'king', // 使用者身分，要馬是king(會議建立者)，要馬是member(會議成員)
			// 	},
			// },
			focusingOnWhichUser: {
				id: this.props.localUserID,
				url: this.props.localVideoURL,
				animalNumber: '',
			},
			isFullscreenEnabled: false,
		};
		this.mirroredVideo = 'rotateY(180deg)';
	}

	componentWillMount() {
		this.setState({
			focusingOnWhichUser: {
				id: this.props.localUserID,
				url: this.props.localVideoURL,
				// animalNumber: this.props.participantList[0].num,
			},
		});
	}

	componentDidMount() {}

	onClickSelfStream() {
		this.setState({
			focusingOnWhichUser: {
				id: this.props.localUserID,
				url: this.props.localVideoURL,
				animalNumber: this.props.participantList[0].num,
			},
		});
	}

	onClick_otherUserStream(e) {
		const key = e.target.getAttribute('data');
		const num = this.props.participantList.reduce((sum, value) => {
			if (value.id === key) {
				return (sum = value.num);
			}
		}, 0);
		this.setState({
			focusingOnWhichUser: {
				id: key,
				url: this.props.remoteStreamURL[key].url,
				animalNumber: num,
			},
		});
	}

	render() {
		const video = [];
		if (this.props.localVideoURL) {
			video.push(<div className="otherUser">
				<OtherUser
					videoURL={this.props.localVideoURL}
					isStreaming={this.props.isStreaming}
				/>
				<UserInfo
					userName={this.props.userName || this.props.animalName}
					isStreaming={this.props.isStreaming}
					isSounding={this.props.isSounding}
				/>
			</div>);
		}
		if (this.props.remoteStreamURL) {
			Object.keys(this.props.remoteStreamURL).map((userID) => {
				let remoteAnimalName;
				this.props.participantList.map((userObj) => {
					if (userObj.id == userID) {
						remoteAnimalName = userObj.animal;
					}
				});
				let remoteAnimalNumber;
				this.props.participantList.map((userObj) => {
					if (userObj.id == userID) {
						remoteAnimalNumber = userObj.num;
					}
				});
				video.push(<div className="otheruser">
					<OtherUser
						videoURL={this.props.localVideoURL}
						isStreaming={this.props.isStreaming}
					/>
					<UserInfo />
				</div>);
			});
		}
		let bigScreen;
		if (this.state.focusingOnWhichUser.url === this.props.localVideoURL) {
			const id = this.props.isLocalShareScreen ? 'stream-shareScreen' : 'stream-video';
			bigScreen = this.props.isStreaming ? (
				this.props.isSixhatOpen ?
					(<video
						className={this.props.isSixhatOpen ? 'videoset' : ''}
						src={this.props.localVideoURL}
						autoPlay
						muted
						id={id}
					/>)
					: (
						<Fullscreen
							enabled={this.state.isFullscreenEnabled}
							onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
						>
							<video
								className={this.props.isSixhatOpen ? 'videoset' : ''}
								onClick={() => this.setState({ isFullscreenEnabled: true })}
								src={this.props.localVideoURL}
								autoPlay
								muted
								id={id}
							/>
						</Fullscreen>
					)
			) : (
				<img
					className="videoset"
					src={
						`./img/animal${
							this.props.participantList[0].num
						}.jpg`
					}
				/>
			);
		} else if (this.props.remoteStreamURL[this.state.focusingOnWhichUser.id]) {
			if (
				this.props.remoteStreamURL[
					this.state.focusingOnWhichUser.id
				].url
			) {
				if (
					this.props.remoteStreamURL[
						this.state.focusingOnWhichUser.id
					].isStreaming
				) {
					const id = this.props.remoteStreamURL[
						this.state.focusingOnWhichUser.id
					].isShareScreen ? 'stream-shareScreen' : 'stream-video';
					bigScreen = (
						this.props.isSixhatOpen ? (
							<video
								className={this.props.isSixhatOpen ? 'videoset' : ''}
								src={
									this.props.remoteStreamURL[
										this.state.focusingOnWhichUser.id
									].url
								}
								autoPlay
								muted
								id={id}
							/>
						) : (
							<Fullscreen
								enabled={this.state.isFullscreenEnabled}
								onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
							>
								<video
									className={this.props.isSixhatOpen ? 'videoset' : ''}
									onClick={() => this.setState({ isFullscreenEnabled: true })}
									src={
										this.props.remoteStreamURL[
											this.state.focusingOnWhichUser.id
										].url
									}
									autoPlay
									muted
									id={id}
								/>
							</Fullscreen>
						)
					);
				} else {
					bigScreen = (
						<img
							className="videoset"
							src={
								`./img/animal${
									this.state.focusingOnWhichUser
										.animalNumber
								}.jpg`
							}
						/>
					);
				}
			}
		} else {
			this.setState({
				focusingOnWhichUser: {
					id: this.props.localUserID,
					url: this.props.localVideoURL,
					animalNumber: this.props.participantList[0].num,
				},
			});
		}
		return (
			<div className="main-screen">
				{this.props.isSixhatOpen ?
					<SixHatGame focusingOnWhichUser={this.state.focusingOnWhichUser} />
					: null}
				<div className="main-video">{bigScreen}</div>
				<div className="other-video">{video}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	animalName: state.connection.animalName,
	participantList: state.participantList,
	userName: state.connection.userName,
	localUserID: state.connection.localUserID,
	isStreaming: state.connection.isStreaming,
	isSounding: state.connection.isSounding,
	localVideoURL: state.connection.localVideoURL,
	remoteStreamURL: state.connection.remoteStreamURL,
	remoteUserName: state.connection.remoteUserName,
	isSixhatOpen: state.sixhat.isSixhatOpen,
	isLocalShareScreen: state.connection.isLocalShareScreen,
});

export default connect(mapStateToProps)(MainScreen);
