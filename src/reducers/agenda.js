const agendaList = [
	{
		content: "", //單個議程內容
		isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
	}
];

export default function agenda(state = agendaList, action) {
	switch (action.type) {
		case "setAgenda":
			return action.data;
		case "newAgenda":
			return [
				...state,
				{
					content: "",
					isAgendaFinished: false
				}
			];
		case "deleteAgenda":
			return [
				...state.slice(0, action.data),
				...state.slice(action.data + 1)
			];

		case "updateAgenda":
			return [
				...state.slice(0, action.data.key),
				{
					...state[action.data.key],
					content: action.data.value
				},
				...state.slice(action.data.key + 1)
			];
		case "doneAgenda":
			return [
				...state.slice(0, action.data),
				{
					...state[action.data],
					isAgendaFinished: !state[action.data].isAgendaFinished
				},
				...state.slice(action.data + 1)
			];
		default:
			return state;
	}
}
