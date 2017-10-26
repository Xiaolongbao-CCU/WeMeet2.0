"use strict";
export {
	setUserName,
	setAnimalName,
	setRoomName,
	setRemoteUserName,
	delRemoteUserName,
	setLocalUserID,
	setParticipantList,
	addParticipantList,
	delParticipantList,
	setRoomList,
	addRoom,
	delRoom,
	gotLocalVideo,
	turnOnUserAudio,
	toggleAudio,
	turnOnUserMedia,
	toggleUserMedia,
	addParticipantConnection,
	delParticipantConnection,
	addRemoteStreamURL,
	setRemoteVideoState,
	setRemoteAudioState,
	delRemoteStreamURL,
	addCandidateQueue,
	setMeetingTime
} from './meetingAction';

export {
	setVotingDetail,
	setSecretOrNot,
	setVotingStart,
	gotVoteFromServer,
	setVotingFinish
} from './voteAction'


export {
	setAgenda,
	newAgenda,
	deleteAgenda,
	doneAgenda,
	updateAgenda
} from './agendaAction'

export {
	changeToAnotherChannel,
	addRecognitionRecord,
	setInterimResult
} from './chatAndRecognitionAction'

export {
	setGrid,
	setGridDetailOpen,
	setGridDetailClose,
	setGridStart,
	setGridClose
} from "./grid"

export {
	setPaintOpen,
	setPaintClose
} from "./paint"

export function addChatRecord(recordObj) {
	return {
		type: "addChatRecord",
		data: recordObj
	};
}
