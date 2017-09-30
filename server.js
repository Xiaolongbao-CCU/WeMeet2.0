"use strict";

//回傳一個具有express的library的物件，當作處理request的Callback
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(
    bodyParser.urlencoded({
        type: "image/*",
        extended: false,
        limit: "50mb"
    })
);
app.use(
    bodyParser.json({
        type: "application/*",
        limit: "50mb"
    })
);
app.use(
    bodyParser.text({
        type: "text/plain"
    })
);
const fs = require("fs");
//const db = require('./app/lib/db.js');

let roomList = [];
let userInRoom = {};
let votingCounter = {};

//HTTPS參數
// const option = {
//     key: fs.readFileSync("./public/certificate/privatekey.pem"),
//     cert: fs.readFileSync("./public/certificate/certificate.pem")
// };

//對https Server內傳入express的處理物件
const server = require("http").createServer(app);
const io = require("socket.io")(server);
server.listen(8787);
console.log("已啟動伺服器!");

// app.get("/api/db/history", (req, res) => {
//     db.History.find({ "room": '#53ee66' }, (err, data) => {
//         if (err) console.log(err);
//         console.log(data);
//         res.send('有成功喔!');
//     });
// });

//資料庫「新增」部分
// app.post("/api/db/history", (req, res) => {
//     let { roomName, record } = req.body;
//     db.History.create({
//         room: roomName,
//         history: record
//     }, function(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send('新增成功^^');
//         }
//     });
// });

// app.post("/api/db/create/photo", (req, res) => {
//     db.Account.findOneAndUpdate({ username: 'change' }, { photo: req.body.data }, (err, data) => {
//         if (err) console.log(err);
//         console.log('photo success');
//     });
// });

// app.post("/api/db/save/video", (req, res) => {

// });

io.on("connection", function (socket) {
    console.log("有人連線囉~" + socket.id);
    socket.emit("setRoomList", roomList);

    socket.on("giveMeMySocketId", () => {
        socket.emit("gotSocketID", socket.id);
    });

    //直接連線到房間內部的話
    socket.on("IAmAt", function (location, room) {
        if (location == "/meeting") {
            if (!userInRoom.hasOwnProperty(room)) {
                socket.emit("joinRoom");
                console.log("欸沒房啦 先加一波");
            } else if (!userInRoom[room].includes(socket.id)) {
                socket.emit("joinRoom");
                console.log("欸有房啦 你進來");
            }
        }
    });

    // socket.on("OpenBrain", function(list) {
    //     socket.broadcast.emit("OpenBrainForAll", list);
    // });

    socket
        .on("join", function (room) {
            //將使用者加入房間
            socket.join(room);
            console.log("有人加入房間囉" + socket.id + "加入了" + room);

            if (!roomList.includes(room)) {
                //將房間加入"房間"列表
                roomList.push(room);
                socket.broadcast.emit("addRoom", room);
                socket.emit("addRoom", room);
            }

            if (!userInRoom.hasOwnProperty(room)) {
                //房間不存在，沒有人要通知，就通知新人
                userInRoom[room] = [socket.id];
                socket.emit("addParticipantList", socket.id);
            } else if (
                userInRoom.hasOwnProperty(room) &&
                !userInRoom[room].includes(socket.id)
            ) {
                //房間存在，有人在裡面，但新人不存在房間裡
                //對新人加在名單最前面>把名單整份發過去
                userInRoom[room].unshift(socket.id);
                socket.emit("setParticipantList", userInRoom[room]);
                //對房間內的人，發出新人加入的訊息
                socket.to(room).emit("addParticipantList", socket.id);
            }
        })
        .on("leaveRoom", function () {
            console.log("有人離開房間囉~" + socket.id);
            let room = Object.keys(socket.rooms)[1];
            socket.leave(room);
            if (userInRoom[room]) {
                if (
                    userInRoom[room].length == 1 &&
                    userInRoom[room].includes(socket.id)
                ) {
                    //如果房間裏面只有他，就把房間刪掉
                    socket.emit("delRoom", room);
                    socket.broadcast.emit("delRoom", room);
                    roomList.splice(roomList.indexOf(room), 1);
                    delete userInRoom[room];
                    console.log("房間已刪除!" + room);
                } else {
                    userInRoom[room].splice(
                        userInRoom[room].indexOf(socket.id),
                        1
                    );
                }
                socket.emit("delParticipantList", socket.id);
                socket.to(room).emit("delParticipantList", socket.id);
                socket.to(room).emit("participantDisconnected", socket.id);
            }
        });

    socket
        .on("newParticipantA", function (msgSender, room, userName) {
            socket.to(room).emit("newParticipantB", msgSender);
            socket.to(room).emit("setRemoteUserName", {
                id: msgSender,
                name: userName
            });
        })
        .on("offerRemotePeer", function (
            offer,
            sender,
            receiver,
            senderName,
            isStreaming,
            isSounding
        ) {
            socket.to(receiver).emit("offer", offer, sender, senderName);
            socket.to(receiver).emit("setRemoteUserName", {
                id: sender,
                name: senderName
            });
            socket
                .to(receiver)
                .emit("setRemoteVideoState", isStreaming, sender);
            socket.to(receiver).emit("setRemoteAudioState", isSounding, sender);
        })
        .on("answerRemotePeer", function (
            answer,
            sender,
            receiver,
            isStreaming,
            isSounding
        ) {
            socket.to(receiver).emit("answer", answer, sender);
            socket.to(receiver).emit("setRemoteVideoState", isStreaming, sender);
            socket.to(receiver).emit("setRemoteAudioState", isSounding, sender);
        })
        .on("onIceCandidateA", function (candidate, sender, receiver) {
            socket.to(receiver).emit("onIceCandidateB", candidate, sender);
        })
        .on("setRemoteVideoState", (state, remotePeer) => {
            console.log("有送了")
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setRemoteVideoState", state, remotePeer);
        })
        .on("setRemoteAudioState", (state, remotePeer) => {
            console.log("有送了")
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setRemoteAudioState", state, remotePeer);
        })
        .on("disconnecting", function () {
            console.log("有人斷線囉~" + socket.id);
            let room = Object.keys(socket.rooms)[1];
            socket.leave(room);
            if (userInRoom[room]) {
                if (
                    userInRoom[room].length == 1 &&
                    userInRoom[room].includes(socket.id)
                ) {
                    //如果房間裏面只有他，就把房間刪掉
                    socket.emit("delRoom", room);
                    socket.broadcast.emit("delRoom", room);
                    roomList.splice(roomList.indexOf(room), 1);
                    delete userInRoom[room];
                    console.log("房間已刪除!" + room);
                } else {
                    userInRoom[room].splice(
                        userInRoom[room].indexOf(socket.id),
                        1
                    );
                }
                socket.emit("delParticipantList", socket.id);
                socket.to(room).emit("delParticipantList", socket.id);
                socket.to(room).emit("participantDisconnected", socket.id);
            }
        });

    socket
        .on("setAgenda", function (list) {
            socket.broadcast.emit("setAgenda", list);
        })
        .on("newAgenda", () => {
            socket.broadcast.emit("newAgenda");
        })
        .on("deleteAgenda", key => {
            socket.broadcast.emit("deleteAgenda", key);
        })
        .on("updateAgenda", obj => {
            socket.broadcast.emit("updateAgenda", obj);
        })
        .on("doneAgenda", key => {
            socket.broadcast.emit("doneAgenda", key);
        });

    socket
        .on("createVote", votingDetail => {
            let room = Object.keys(socket.rooms)[1];
            votingCounter[room] = io.sockets.adapter.rooms[room].length
            //發給房內所有人，包含發起投票的人
            //console.log(votingDetail)
            io.in(room).emit("gotCreateVote", votingDetail);
            // socket.emit("gotCreateVote", votingDetail);
        })
        .on("gotVoteFromUser", voteContent => {
            let room = Object.keys(socket.rooms)[1];
            votingCounter[room] = votingCounter[room] - 1
            // console.log(room);
            io.in(room).emit("gotVoteFromServer", voteContent); //把投票內容告訴房內所有人
            if (votingCounter[room] == 0) {
                io.in(room).emit("votingIsFinish");
            }
        });

    socket.on("requestVideoFromUser", function (sender) {
        console.log("使用者:" + socket.id + "請求了他的錄影BLOB檔");
    });

    socket.on("recognitionRecord", function (_history) {
        let room = Object.keys(socket.rooms)[1];
        console.log("有結果!")
        socket.to(room).emit("remoteUserRecognitionRecord", _history);
        // console.log(_history);
        // db.History.create(
        //     {
        //         room: room,
        //         history: _history
        //     },
        //     function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         }
        //     }
        // );

    });

    socket.on("getHistory", room => {
        db.History.find(
            {
                room: room
            },
            function (err, data) {
                if (err) throw err;
                socket.emit("onHistoryResult", data);
            }
        );
    });
});

//沒有定義路徑，則接收到請求就執行這個函數
app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
