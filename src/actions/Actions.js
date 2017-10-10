"use strict";
export {
	setUserName,
	setRoomName,
	setRemoteUserName,
	setLocalUserID,
	setParticipantList,
	addParticipantList,
	delParticipantList,
	setRoomList,
	addRoom,
	delRoom,
	gotLocalVideo,
	toggleAudio,
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


export function addChatRecord(recordObj) {
	return {
		type: "addChatRecord",
		data: recordObj
	};
}
