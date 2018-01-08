import React from "react";
import { connect } from "react-redux";
import SixHatGame from "./SixHatGame";
import UserVideo from './UserVideo';
import UserInfo from './UserInfo';
import BigScreen from "./BigScreen";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //使用者資訊，是一個巢狀物件，分別會有first-無限多個子物件
            focusingOnWhichUser: this.props.localUserID
        };
    }

    componentWillMount() {
        
    }

    componentDidMount() {
    }

    render() {
        let video = [];
        if (this.props.localVideoURL) {
            video.push(
                <div className="otheruser" key={this.props.localUserID}>
                    <div className="video">
                        <UserVideo 
                            videoURL={this.props.localVideoURL}
                            isStreaming={this.props.isStreaming}
                            animal={this.props.participantList[0].num}
                            callback={this.onClickSelfStream}
                            userID={this.props.localUserID}
                            MainScreen={this}
                        />
                    </div>
                    <UserInfo
                        userName={this.props.userName || this.props.animalName}
                        isStreaming={this.props.isStreaming}
                        isSounding={this.props.isSounding} />
                </div>
            );
        }
        if (this.props.remoteStreamURL) {
            Object.keys(this.props.remoteStreamURL).forEach(userID => {
                let remoteAnimalName;
                this.props.participantList.forEach(userObj => {
                    if (userObj.id == userID) {
                        remoteAnimalName = userObj.animal;
                    }
                });
                let remoteAnimalNumber;
                this.props.participantList.forEach(userObj => {
                    if (userObj.id == userID) {
                        remoteAnimalNumber = userObj.num;
                    }
                });
                video.push(
                    <div className="otheruser" key={userID}>
                        <div className="video">
                            <UserVideo
                                videoURL={this.props.remoteStreamURL[userID].url}
					            isStreaming={this.props.remoteStreamURL[userID].isStreaming}
                                animal={remoteAnimalNumber}
                                callback={this.onClick_otherUserStream}
                                userID={userID}
                                MainScreen={this}
                            />
                        </div>
                        <UserInfo   
                            userName={this.props.remoteUserName[userID] &&
                                this.props.remoteUserName[userID] !== userID
                                    ? this.props.remoteUserName[userID]
                                    : remoteAnimalName}
                            isStreaming={this.props.remoteStreamURL[userID].isStreaming}
                            isSounding={this.props.remoteStreamURL[userID].isSounding}/>
                    </div>
                );
            });
        }
        let bigScreen;
        if (this.state.focusingOnWhichUser === this.props.localUserID) {
            //let isShareScreen = this.props.isLocalShareScreen ? 'stream-shareScreen' : 'stream-video'
            bigScreen = 
            <BigScreen 
                isStreaming={this.props.isStreaming}
                isSixhatOpen={this.props.isSixhatOpen}
                videoURL={this.props.localVideoURL}
                isShareScreen='stream-video'
                animal={this.props.participantList[0].num}
            />
        } else {
            let focusUserID = this.state.focusingOnWhichUser;
            //let isShareScreen = this.props.remoteStreamURL[focusUserID].isShareScreen ? 'stream-shareScreen' : 'stream-video'
            if(this.props.remoteStreamURL[focusUserID]){
                let animal;
                this.props.participantList.forEach(obj=>{
                    if(obj.id === focusUserID){
                        animal = obj.animal
                    }
                })
                bigScreen = 
                <BigScreen
                    isStreaming={this.props.remoteStreamURL[focusUserID].isStreaming}
                    isSixhatOpen={this.props.isSixhatOpen}
                    videoURL={this.props.remoteStreamURL[focusUserID].url}
                    isShareScreen='stream-video'
                    animal={animal}
                />
            } else {
                // this.setState({
                //     focusingOnWhichUser: {
                //         id: this.props.localUserID,
                //         url: this.props.localVideoURL,
                //         animalNumber: this.props.participantList[0].num
                //     }
                // });
            }
        }
        return (
            <div className="main-screen">
                {this.props.isSixhatOpen ? <SixHatGame focusingOnWhichUser={this.state.focusingOnWhichUser}/> : null}
                <div className="main-video">{bigScreen}</div>
                <div className="other-video">{video}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
        isLocalShareScreen: state.connection.isLocalShareScreen
    };
};

export default connect(mapStateToProps)(MainScreen);
