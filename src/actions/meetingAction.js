"use strict";

export function setUserName(name) {
	return {
		type: "setUserName",
		data: name
	};
}

export function setRemoteUserName(name) {
	return {
		type: "setRemoteUserName",
		data: name
	};
}

export function setLocalUserID(id) {
	return {
		type: "setLocalUserID",
		data: id
	};
}
export function setParticipantList(participantList) {
	return {
		type: "setParticipantList",
		data: participantList
	};
}

export function addParticipantList(participantID) {
	return {
		type: "addParticipantList",
		data: participantID
	};
}

export function delParticipantList(participantID) {
	return {
		type: "delParticipantList",
		data: participantID
	};
}

export function setRoomList(roomList) {
	return {
		type: "setRoomList",
		data: roomList
	};
}

export function addRoom(room) {
	return {
		type: "addRoom",
		data: room
	};
}

export function delRoom(room) {
	return {
		type: "delRoom",
		data: room
	};
}

export function gotLocalVideo(url) {
	return {
		type: "gotLocalVideo",
		data: url
	};
}

export function toggleAudio() {
	return {
		type: "toggleAudio"
	};
}

export function toggleUserMedia() {
	return {
		type: "toggleUserMedia"
	};
}


export function addParticipantConnection(participantObj) {
	return {
		type: "addParticipantConnection",
		data: participantObj
	};
}

export function delParticipantConnection(participantObj) {
	return {
		type: "delParticipantConnection",
		data: participantObj
	};
}

export function addRemoteStreamURL(streamObj) {
	return {
		type: "addRemoteStreamURL",
		data: streamObj
	};
}

export function delRemoteStreamURL(id) {
	return {
		type: "delRemoteStreamURL",
		data: id
	};
}

export function addCandidateQueue(candidateObj){
	return {
		type:"addCandidateQueue",
		data: candidateObj
	}
}