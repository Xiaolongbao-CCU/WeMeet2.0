"use strict";

//回傳一個具有express的library的物件，當作處理request的Callback
const express = require("express");
const ExpressPeerServer = require('peer').ExpressPeerServer;
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
//const db = require('./app/lib/db.js');

//HTTPS參數;
const option = {
    key: fs.readFileSync("./public/certificate/privatekey.pem"),
    cert: fs.readFileSync("./public/certificate/certificate.pem")
};

//對https Server內傳入express的處理
const server = require("https").createServer(option, app);
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

let peerServerOption = {
    debug: true
}
app.use('/peerjs', ExpressPeerServer(server, peerServerOption));

const io = require("socket.io")(server);

server.listen(8080);
console.log("已啟動伺服器!");

let roomList = [];
let userInRoom = {};
let votingCounter = {};
let animalName = {
    1: "貓貓",
    2: "狗狗",
    3: "猩猩",
    4: "獅子",
    5: "無尾熊",
    6: "兔兔",
    7: "老虎",
    8: "狐狸"
};
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
    //console.log("有人連線囉~" + socket.id);
    socket.emit("setRoomList", roomList);

    socket.on("giveMeMySocketId", () => {
        socket.emit("gotSocketID", socket.id);
    });

    //連線到房間內部
    socket.on("IAmAt", function (location, room) {
        if (location == "/meeting") {
            if (!userInRoom.hasOwnProperty(room)) {
                socket.emit("joinRoom");
                //console.log("欸沒房啦 先加一波");
            } else if (!userInRoom[room].includes(socket.id)) {
                socket.emit("joinRoom");
                //console.log("欸有房啦 你進來");
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
            //console.log("有人加入房間囉" + socket.id + "加入了" + room);

            if (!roomList.includes(room)) {
                //將房間加入"房間"列表
                roomList.push(room);
                socket.broadcast.emit("addRoom", room);
                socket.emit("addRoom", room);
            }

            if (!userInRoom.hasOwnProperty(room)) {
                //房間不存在，沒有人要通知，就通知新人，然後給牠隨機一種動物
                let randomNum = Math.floor(Math.random() * 8) + 1; //1~8
                let obj = {
                    id: socket.id,
                    animal: animalName[randomNum],
                    num: randomNum
                };
                userInRoom[room] = [obj];
                socket.emit("setParticipantList", userInRoom[room]);
            } else if (
                //房間存在，有人在裡面，但新人不存在房間裡
                userInRoom.hasOwnProperty(room) &&
                !userInRoom[room].includes(socket.id)
            ) {
                //對新人加在名單最前面>把名單整份發過去
                let tempAnimal = Object.assign({}, animalName);
                userInRoom[room].map(userObject => {
                    delete tempAnimal[userObject.num]
                });
                let randomNum = Math.floor(Math.random() * Object.keys(tempAnimal).length);
                let obj = {
                    id: socket.id,
                    animal: tempAnimal[Object.keys(tempAnimal)[randomNum]],
                    num: Object.keys(tempAnimal)[randomNum]
                };
                userInRoom[room].unshift(obj);
                socket.emit("setParticipantList", userInRoom[room]);
                //對房間內的人，發出新人加入的訊息
                socket.to(room).emit("addParticipantList", obj);
            }
        })
        .on("joinFinish", () => {
            socket.emit("joinSuccess")
        })
        .on("leaveRoom", function () {
            console.log("有人離開房間囉~" + socket.id);
            let room = Object.keys(socket.rooms)[1];
            socket.leave(room);
            if (userInRoom[room]) {
                if (
                    userInRoom[room].length == 1
                ) {
                    //如果房間裏面只有他，就把房間刪掉
                    socket.emit("delRoom", room);
                    socket.broadcast.emit("delRoom", room);
                    roomList.splice(roomList.indexOf(room), 1);
                    delete userInRoom[room];
                    console.log("房間已刪除!" + room);
                } else {
                    //房間有超過一人
                    userInRoom[room].map((userObj, index) => {
                        if (userObj.id == socket.id) {
                            userInRoom[room].splice(index, 1)
                        }
                    })
                }
                socket.emit("delParticipantList", socket.id);
                socket.to(room).emit("delParticipantList", socket.id);
                socket.to(room).emit("participantDisconnected", socket.id);
            }
        })
        .on("disconnecting", function () {
            console.log("有人斷線囉~" + socket.id);
            let room = Object.keys(socket.rooms)[1];
            socket.leave(room);
            if (userInRoom[room]) {
                if (
                    userInRoom[room].length == 1
                ) {
                    //如果房間裏面只有他，就把房間刪掉
                    socket.emit("delRoom", room);
                    socket.broadcast.emit("delRoom", room);
                    roomList.splice(roomList.indexOf(room), 1);
                    delete userInRoom[room];
                    console.log("房間已刪除!" + room);
                } else {
                    //房間有超過一人
                    userInRoom[room].map((userObj, index) => {
                        if (userObj.id == socket.id) {
                            userInRoom[room].splice(index, 1)
                        }

                    })
                    console.log(userInRoom[room])
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
        .on("chatMessage", (record) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("chatMessage", record)
        })
        .on("setRemoteVideoState", (state, remotePeer) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setRemoteVideoState", state, remotePeer);
        })
        .on("setRemoteAudioState", (state, remotePeer) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setRemoteAudioState", state, remotePeer);
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
            votingCounter[room] = io.sockets.adapter.rooms[room].length;
            //發給房內所有人，包含發起投票的人
            //console.log(votingDetail)
            io.in(room).emit("gotCreateVote", votingDetail);
            // socket.emit("gotCreateVote", votingDetail);
        })
        .on("gotVoteFromUser", voteContent => {
            let room = Object.keys(socket.rooms)[1];
            votingCounter[room] = votingCounter[room] - 1;
            // console.log(room);
            io.in(room).emit("gotVoteFromServer", voteContent); //把投票內容告訴房內所有人
            if (votingCounter[room] == 0) {
                io.in(room).emit("votingIsFinish");
            }
        });

    // socket.on("requestVideoFromUser", function (sender) {
    //     console.log("使用者:" + socket.id + "請求了他的錄影BLOB檔");
    // });

    // socket.on("getHistory", room => {
    //     db.History.find(
    //         {
    //             room: room
    //         },
    //         function (err, data) {
    //             if (err) throw err;
    //             socket.emit("onHistoryResult", data);
    //         }
    //     );
    // });

    socket.on("recognitionRecord", function (_history) {
        let room = Object.keys(socket.rooms)[1];
        //console.log("有結果!")
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

    socket
        .on("setGrid", obj => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setGrid", obj);
        })
        .on("setGridStart", () => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit("setGridStart");
        });
    //1018 Andy Added 電子白板
    socket.
        on("drawing", (data) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit('drawing', data);
        })
        .on("reset", (key) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit('reset', key);
        });

    //1028 Andy Added 預約開會
    socket.
        on("reserveMeeting", (data) => {
            let room = Object.keys(socket.rooms)[1];
            socket.to(room).emit('AddReservation', data);
        });

    socket.on('setAllUserRandomHat', (randomNumberArray) => {
        let room = Object.keys(socket.rooms)[1];
        let hatList = {}
        let localHat = 0;
        userInRoom[room].map((participant) => {
            let hat = randomNumberArray.shift()
            hatList[participant.id] = hat
            if (participant.id == socket.id) {
                localHat = hat
            }
        })
        io.in(room).emit('setSixhatList', localHat, hatList)
    })
});

//沒有定義路徑，則接收到請求就執行這個函數
app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
