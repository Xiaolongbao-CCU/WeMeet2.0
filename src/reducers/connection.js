import socket from "../socket";

const initialState = {
    userName: "",
    roomName:"",
    localUserID: "",
    localVideoURL: "",
    isStreaming: false,
    isSounding: false,
    connections: {}, //存放連線中的人的socket.id
    remoteStreamURL: {}, //存放連線中的人的stream
    remoteUserName: {},
    candidateQueue: {}
};

export default function connection(state = initialState, action) {
    switch (action.type) {
        case "setUserName":
            return Object.assign({}, state, { userName: action.data });
        case "setRoomName":
            return Object.assign({}, state, { roomName: action.data });
        case "setRemoteUserName":
            let userID = action.data.id;
            let userName = action.data.name;
            return {
                ...state,
                remoteUserName: {
                    ...state.remoteUserName,
                    [userID]: userName
                }
            };
        case "setLocalUserID":
            return Object.assign({}, state, { localUserID: action.data });
        case "gotLocalVideo":
            return Object.assign({}, state, { localVideoURL: action.data });
        case "toggleAudio":
            return Object.assign({}, state, {
                isSounding: !state.isSounding
            });
        case "toggleUserMedia":
            return Object.assign({}, state, {
                isStreaming: !state.isStreaming
            });

        case "addParticipantConnection":
            return {
                ...state,
                connections: {
                    ...state.connections,
                    [action.data.id]: action.data.connectionObj
                }
            };
        case "delParticipantConnection":
            return Object.assign({}, state, {
                connections: Object.keys(
                    state.connections
                ).reduce((result, key) => {
                    if (key !== action.data) {
                        result[key] = state.connections[key];
                    }
                    return result;
                }, {})
            });
        case "addCandidateQueue":
            return {
                ...state,
                candidateQueue: {
                    ...state.candidateQueue,
                    [action.data.id]: action.data.candidate
                }
            };
        case "addRemoteStreamURL":
            return {
                ...state,
                remoteStreamURL: {
                    ...state.remoteStreamURL,
                    [action.data.id]: {
                        ...state.remoteStreamURL[action.data.id],
                        url: action.data.url
                    }
                }
            };

        case "setRemoteVideoState":
            console.log(action.data.remotePeer);
            return {
                ...state,
                remoteStreamURL: {
                    ...state.remoteStreamURL,
                    [action.data.remotePeer]: {
                        ...state.remoteStreamURL[action.data.remotePeer],
                        isStreaming: action.data.isStreaming
                    }
                }
            };

        case "setRemoteAudioState":
            return {
                ...state,
                remoteStreamURL: {
                    ...state.remoteStreamURL,
                    [action.data.remotePeer]: {
                        ...state.remoteStreamURL[action.data.remotePeer],
                        isSounding: action.data.isSounding
                    }
                }
            };

        case "delRemoteStreamURL":
            return Object.assign({}, state, {
                remoteStreamURL: Object.keys(
                    state.remoteStreamURL
                ).reduce((result, key) => {
                    if (key !== action.data) {
                        result[key] = state.remoteStreamURL[key];
                    }
                    return result;
                }, {})
            });
        default:
            return state;
    }
}
