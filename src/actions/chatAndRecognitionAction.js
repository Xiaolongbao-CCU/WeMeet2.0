"use strict";

export function changeToAnotherChannel() {
	return {
		type: "changeToAnotherChannel",
	};
}

export function addRecognitionRecord( recordObj ) {
	return {
		type: "addRecognitionRecord",
		data: recordObj
	}
}