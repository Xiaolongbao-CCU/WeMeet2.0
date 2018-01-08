import React from 'react';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';

class BigScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreenEnabled:false,
        };
    }
    render(){
        if(this.props.isStreaming){
            if(this.props.isSixhatOpen){
                return  (
                    <video
                        className="videoset"
                        src={this.props.videoURL}
                        autoPlay="true"
                        muted="true"
                        id={this.props.isShareScreen}
                    />
                )
            } else {
                return (
                    <Fullscreen
                        enabled={this.state.isFullscreenEnabled}
                        onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
                    >
                        <video
                                onClick={() => this.setState({isFullscreenEnabled: true})}
                                src={this.props.videoURL}
                                autoPlay={true}
                                muted={true}
                                id={this.props.isShareScreen}
                        />
                    </Fullscreen>
                )
            }
        } else {
            if(this.props.isSixhatOpen){
                return(
                    <img
                        className="videoset"
                        src={`/img/animal${this.props.animal}.jpg`}
                    />
                )
            } else {
                return(
                    <img
                        src={`/img/animal${this.props.animal}.jpg`}
                    />
                )
            }
        }
    }
}

export default connect()(BigScreen);