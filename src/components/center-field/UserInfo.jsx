import React from 'react';
import { connect } from 'react-redux';
import UserImage from '../../img/user-image.png';
import AudioOff from '../../img/other_audio-off.png';
import VideoOff from '../../img/other_video-off.png';
import Null from '../../img/null.png';


function UserInfo({ userName, isSounding, isStreaming }) {
	let audio;
	let video;
	if (isSounding) {
		audio = (<img
			className="user-audio"
			alt=""
			src={Null}
		/>);
	} else {
		audio = (<img
			className="user-audio"
			alt=""
			src={AudioOff}
		/>);
	}
	if (isStreaming) {
		video = (
			<img
				className="user-video"
				alt=""
				src={Null}
			/>
		);
	} else {
		video = (
			<img
				className="user-video"
				alt=""
				src={VideoOff}
			/>
		);
	}
	return (
		<div
			className="user-info"
		>
			<img
				alt="userimage"
				className="user-image"
				src={UserImage}
			/>
			<span className="user-name">
				{userName}
			</span>
			{audio}
			{video}
		</div>
	);
}


export default connect()(UserInfo);
