const initialState = {
    localHat:0,
    hatList:{
        'mock':0
    },
	isSixhatDetailOpen:false,
    isSixhatOpen: false
};

export default function sixhat(state = initialState, action) {
    switch (action.type) {
        case "setSixhat":
            return Object.assign({}, state, { 
                localHat: action.local,
                hatList:action.list 
            });
        case "setLocalHat":
            return Object.assign({}, state, { localHat: action.data });
        case "setSixhatList":
            return Object.assign({}, state, { hatList: action.data });
    	case "setSixhatDetailOpen":
            return Object.assign({}, state, { isSixhatDetailOpen: true });
        case "setSixhatDetailClose":
            return Object.assign({}, state, { isSixhatDetailOpen: false });
        case "setSixhatOpen":
            return Object.assign({}, state, { isSixhatOpen: true });
        case "setSixhatClose":
            return Object.assign({}, state, { isSixhatOpen: false });
        default:
            return state;
    }
}
