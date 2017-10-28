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
	setVotingFinish,
	selfSubmitVote,
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
	setInterimResult,
	setLanguage
} from './chatAndRecognitionAction'

export {
	setGrid,
	setGridDetailOpen,
	setGridDetailClose,
	setGridStart,
	setGridOpen,
	setGridClose
} from "./gridAction"

export {
	setPaintOpen,
	setPaintClose
} from "./paintAction"

export {
	setSixhatDetailOpen,
	setSixhatDetailClose,
	setSixhatOpen,
	setSixhatClose
} from './sixhatAction'


export function addChatRecord(recordObj) {
	return {
		type: "addChatRecord",
		data: recordObj
	};
}
