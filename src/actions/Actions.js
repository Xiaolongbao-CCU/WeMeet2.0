"use strict";
export {
	setUserName,
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
	delRemoteStreamURL,
	addCandidateQueue
} from './meetingAction';

export {
	setVotingDetail,
	setSecretOrNot,
	setVotingStart,
	gotVoteFromServer
} from './voteAction'


export {
	setAgenda,
	newAgenda,
	deleteAgenda,
	doneAgenda,
	updateAgenda
} from './agendaAction'

export function addChatRecord(recordObj) {
	return {
		type: "addChatRecord",
		data: recordObj
	};
}
