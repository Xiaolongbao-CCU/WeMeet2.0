const chatRoomState = {
    "interimResult":"",
	"isInChatNow": true,
	"recognitionRecord":[]
};

export default function chatRoomControl(state = chatRoomState, action) {
    switch (action.type) {
        case "changeToAnotherChannel":
            return  Object.assign({}, state, { "isInChatNow": !state.isInChatNow });
        case "addRecognitionRecord":
        	return Object.assign({},state,{
        		"recognitionRecord": state.recognitionRecord.concat(action.data)
        	})
        case "setInterimResult":
            return Object.assign({}, state, { "interimResult": action.data });
        default:
            return state;
    }
}