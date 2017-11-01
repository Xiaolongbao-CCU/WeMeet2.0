import socketIO from "socket.io-client";
import store from "./store";
import {
    setUserName,
    setAnimalName,
    setRoomList,
    setRemoteUserName,
    addRoom,
    delRoom,
    setParticipantList,
    addParticipantList,
    delParticipantList,
    addChatRecord,
    setRemoteVideoState,
    setRemoteAudioState,
    setVotingDetail,
    setVotingStart,
    gotVoteFromServer,
    waitingForAnimate,
    setVotingFinish,
    setAgenda,
    newAgenda,
    deleteAgenda,
    updateAgenda,
    doneAgenda,
    addRecognitionRecord,
    setGrid,
    setSixhatList,
    setLocalHat,
    setSixhat,
    setMeetingData,
    setURL,
    setReceiveData
} from "./actions/Actions";

let io = socketIO();
let socket = io.connect("https://140.123.175.95:8080");

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
        store.dispatch(setAnimalName(participantList[0].animal));
        socket.emit("joinFinish");
    })
    .on("addParticipantList", participantID => {
        store.dispatch(addParticipantList(participantID));
    })
    .on("delParticipantList", participantID => {
        store.dispatch(delParticipantList(participantID));
    });

socket.on("chatMessage", record => {
    store.dispatch(addChatRecord(record));
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
    .on("gotCreateVote", (votingDetail,time) => {
        store.dispatch(setVotingDetail(votingDetail));
        store.dispatch(setVotingStart(time));
    })
    .on("gotVoteFromServer", voteContent => {
        store.dispatch(gotVoteFromServer(voteContent));
    })
    .on("votingIsFinish", () => {
        let date = new Date();
        //自定義時間格式:Hour-Minute
        let formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? "0" : "")}${date.getMinutes()}:${date.getSeconds()}`
        store.dispatch(waitingForAnimate(formattedTime));
    });

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

socket.on("remoteUserRecognitionRecord", history => {
    store.dispatch(addRecognitionRecord(history));
});

socket
    .on("setGrid", obj => {
        store.dispatch(setGrid(obj));
    })
    .on("setGridStart", () => {
        store.dispatch(setGridStart());
    });

socket.on("setSixhatList", (localhat, obj) => {
    //store.dispatch(setLocalHat(localhat))
    store.dispatch(setSixhat(localhat, obj));
});

socket.on("AddReservation", data => {
    store.dispatch(setMeetingData(data));
    store.dispatch(setURL(data.href));
    store.dispatch(setReceiveData(true));
});

export default socket;
