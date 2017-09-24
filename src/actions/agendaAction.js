"use strict";
export function setAgenda(agenda) {
	return {
		type: "setAgenda",
		data: agenda
	};
}

export function newAgenda() {
	return {
		type: "newAgenda"
	};
}

export function deleteAgenda(key) {
	return {
		type: "deleteAgenda",
		data: key
	};
}

export function doneAgenda(key) {
	return {
		type: "doneAgenda",
		data: key
	};
}

export function updateAgenda(obj) {
	return {
		type: "updateAgenda",
		data: obj
	};
}
