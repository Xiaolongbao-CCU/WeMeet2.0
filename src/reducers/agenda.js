const agendaList = [];

export default function agenda(state = agendaList, action) {
	switch (action.type) {
		case "setAgenda":
			return action.data;
		case "newAgenda":
		return [
			...state,
			{
				id: action.data,
				content: '',
				isAgendaFinished: false,
				createTime: undefined,
				finishTime: undefined,
			},
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
					content: action.data.value,
					createTime: action.data.time
				},
				...state.slice(action.data.key + 1)
			];
		case "doneAgenda":
			return [
				...state.slice(0, action.data),
				{
					...state[action.data],
					isAgendaFinished: !state[action.data].isAgendaFinished,
					finishTime:action.time
				},
				...state.slice(action.data + 1)
			];
		default:
			return state;
	}
}
