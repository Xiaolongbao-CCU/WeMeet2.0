import React from 'react';
import { connect } from 'react-redux';

function OtherUser({ videoURL, isStreaming }) {
	if (isStreaming) {
		return (
			<video
				autoPlay
				muted
				onClick={() => {
					this.onClickSelfStream();
				}}
			>
				<source src={videoURL} />
			</video>
		);
	}
	return (
		<img
			alt="profile"
			className="img"
			src={
				`./img/animal${
					this.props.participantList[0].num
				}.jpg`
			}
			onClick={() => {
				this.onClickSelfStream();
			}}
		/>
	);
}


export default connect()(OtherUser);
