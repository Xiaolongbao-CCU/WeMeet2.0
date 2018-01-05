"use strict";
export function setAgenda(agenda) {
	return {
		type: "setAgenda",
		data: agenda
	};
}

export function newAgenda(id) {
	return {
		type: 'newAgenda',
		data: id,
	};
}

export function deleteAgenda(key) {
	return {
		type: "deleteAgenda",
		data: key
	};
}

export function doneAgenda(key, time) {
	return {
		type: "doneAgenda",
		data: key,
		time: time
	};
}

export function updateAgenda(obj) {
	return {
		type: 'updateAgenda',
		data: obj,
	};
}