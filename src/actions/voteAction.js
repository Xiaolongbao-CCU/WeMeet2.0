"use strict";
export function setVotingDetail(votingDetail) {
	return {
		type: "setVotingDetail",
		data: votingDetail
	};
}

export function setSecretOrNot(YesOrNo) {
	return {
		type: "setSecretOrNot",
		data: YesOrNo
	};
}

export function setVotingStart() {
	return {
		type: "setVotingStart"
	};
}

export function gotVoteFromServer(voteContent) {
	return {
		type: "gotVoteFromServer",
		data: voteContent 
	};
}