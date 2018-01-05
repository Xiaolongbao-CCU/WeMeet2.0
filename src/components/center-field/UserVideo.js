import React from 'react';
import { connect } from 'react-redux';
import Animal1 from '../../img/animal1.jpg';
import Animal2 from '../../img/animal2.jpg';
import Animal3 from '../../img/animal3.jpg';
import Animal4 from '../../img/animal4.jpg';
import Animal5 from '../../img/animal5.jpg';
import Animal6 from '../../img/animal6.jpg';
import Animal7 from '../../img/animal7.jpg';
import Animal8 from '../../img/animal8.jpg';


class UserVideo extends React.Component {

	onClickSelfStream() {
		this.setState({
			focusingOnWhichUser: {
				id: this.props.localUserID,
				url: this.props.localVideoURL,
				animalNumber: this.props.participantList[0].num
			}
		});
	}

	render(){
		if (this.props.isStreaming) {
			return (
				<video
					autoPlay
					muted
					onClick={() => {
						this.onClickSelfStream();
					}}
				>
					<source src={this.props.videoURL} />
				</video>
			);
		}
		return (
			<img
				alt="profile"
				className="img"
				src={`/img/animal${this.props.animal}.jpg`}
				onClick={() => {
					this.onClickSelfStream();
				}}
			/>
		);
	}
	
}


export default connect()(UserVideo);