import socketIO from "socket.io-client";
import store from "./store";
import {
    setRoomList,
    setRemoteUserName,
    addRoom,
    delRoom,
    setParticipantList,
    addParticipantList,
    delParticipantList,
    setRemoteVideoState,
    setRemoteAudioState,
    setVotingDetail,
    setVotingStart,
    gotVoteFromServer,
    setVotingFinish,
    setAgenda,
    newAgenda,
    deleteAgenda,
    updateAgenda,
    doneAgenda,
    addRecognitionRecord
} from "./actions/Actions";

let io = socketIO();
let socket = io.connect("https://140.123.175.95:8787");

socket
    .on("setRoomList", list => {
        if (list.length) {
            store.dispatch(setRoomList(list));
        }
    })
    .on("setRemoteUserName", idAndName => {
        store.dispatch(setRemoteUserName(idAndName));
    })
    .on("addRoom", room => {
        store.dispatch(addRoom(room));
    })
    .on("delRoom", room => {
        store.dispatch(delRoom(room));
    });

socket
    .on("setParticipantList", participantList => {
        store.dispatch(setParticipantList(participantList));
    })
    .on("addParticipantList", participantID => {
        store.dispatch(addParticipantList(participantID));
    })
    .on("delParticipantList", participantID => {
        store.dispatch(delParticipantList(participantID));
    });

socket
    .on("setRemoteVideoState", (state, remotePeer) => {
        store.dispatch(
            setRemoteVideoState({ isStreaming: state, remotePeer: remotePeer })
        );
    })
    .on("setRemoteAudioState", (state, remotePeer) => {
        store.dispatch(
            setRemoteAudioState({ isSounding: state, remotePeer: remotePeer })
        );
    });

socket
    .on("gotCreateVote", votingDetail => {
        store.dispatch(setVotingDetail(votingDetail));
        store.dispatch(setVotingStart());
    })
    .on("gotVoteFromServer", voteContent => {
        store.dispatch(gotVoteFromServer(voteContent));
    })
    .on("votingIsFinish", ()=>{
        store.dispatch(setVotingFinish())
    })

socket
    .on("setAgenda", function(list) {
        store.dispatch(setAgenda(list));
    })
    .on("newAgenda", () => {
        store.dispatch(newAgenda());
    })
    .on("deleteAgenda", key => {
        store.dispatch(deleteAgenda(key));
    })
    .on("updateAgenda", obj => {
        store.dispatch(updateAgenda(obj));
    })
    .on("doneAgenda", key => {
        store.dispatch(doneAgenda(key));
    });

socket.on("remoteUserRecognitionRecord",history=>{
    store.dispatch(addRecognitionRecord(history))
})
export default socket;
