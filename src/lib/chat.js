"use strict";
import {
    gotLocalVideo,
    addRemoteStreamURL,
    delRemoteStreamURL,
    addParticipantConnection,
    turnOnUserAudio,
    toggleAudio,
    turnOnUserMedia,
    toggleUserMedia,
    setRemoteVideoState,
    setRemoteAudioState,
    addChatRecord
} from "../actions/Actions";
import socket from "../socket";

let Chat = {
    createNew: Meeting => {
        let fileChannels = {};
        let msgChannels = {};
        //取得使用者端的影像
        Chat.getUserMedia = () => {
            return new Promise((resolve, reject) => {
                navigator.mediaDevices
                    .getUserMedia({
                        video: {
                            width: { max: 1024 },
                            height: { max: 776 }
                        },
                        audio: true
                    })
                    .then(stream => {
                        if (
                            stream.getVideoTracks().length > 0 ||
                            stream.getAudioTracks().length > 0
                        ) {
                            let videoURL = window.URL.createObjectURL(stream);
                            window.localStream = stream;
                            Meeting.props.dispatch(gotLocalVideo(videoURL));
                            if (stream.getVideoTracks().length > 0) {
                                Chat.startUserMedia();
                                Meeting.props.dispatch(turnOnUserMedia());
                                //Meeting.props.dispatch(toggleUserMedia());
                            }
                            if (stream.getAudioTracks().length > 0) {
                                Chat.startAudio();
                                Meeting.props.dispatch(turnOnUserAudio());
                                //Meeting.props.dispatch(toggleAudio());
                            }
                            resolve(stream);
                        } else {
                            console.log("沒聲音也沒影像欸QQ? 我覺得不行");
                            window.history.back();
                            reject("沒聲音也沒影像欸QQ? 我覺得不行");
                        }
                    })
                    .catch(e => {
                        //alert("無法偵測到您的麥克風或鏡頭，請重新授權，WeMeet基於WebRTC連線，必需要其中");
                        alert(e.name);
                        console.log(e.name);
                        console.log(e);
                        reject(e);
                        //window.history.back();
                    });
            });
        };

        Chat.startUserMedia = () => {
            window.localStream.getVideoTracks()[0].enabled = true;
        };

        Chat.toggleUserMedia = () => {
            window.localStream.getVideoTracks()[0].enabled = !window.localStream.getVideoTracks()[0]
                .enabled;
        };

        Chat.stopUserMedia = () => {
            window.localStream.getVideoTracks()[0].stop();
        };

        Chat.startAudio = () => {
            window.localStream.getAudioTracks()[0].enabled = true;
        };

        Chat.toggleAudio = () => {
            window.localStream.getAudioTracks()[0].enabled = !window.localStream.getAudioTracks()[0]
                .enabled;
        };

        Chat.stopAudio = () => {
            window.localStream.getAudioTracks()[0].stop();
        };

        //建立點對點連線物件，以及為連線標的創建影像視窗
        Chat.createPeerConnection = (
            isInitiator,
            config,
            remotePeer,
            socket
        ) => {
            let peerConn = new RTCPeerConnection(config);
            peerConn.onicecandidate = event => {
                if (event.candidate) {
                    //console.log('local端找到ice candidate>要傳出去: ' + JSON.stringify(event.candidate));
                    socket.emit(
                        "onIceCandidateA",
                        event.candidate,
                        Meeting.localUserID,
                        remotePeer
                    );
                }
            };
         
                if (Object.keys(window.localStream).length == 0 || window.localStream == null || window.localStream == undefined) {
                    console.log("沒視訊...")
                    Chat.getUserMedia()
                    .then(stream => {
                        window.localStream = stream
                        console.log("重新拿到stream了")
                        console.log(window.localStream)
                        peerConn.addStream(window.localStream);
                    }).catch(error=>{
                        console.log(error)
                    })
                } else {
                    console.log(window.localStream)
                    peerConn.addStream(window.localStream);
                }
            
            if (Meeting.props.candidateQueue) {
                if (Meeting.props.candidateQueue[Meeting.localUserID]) {
                    Meeting.props.candidateQueue[
                        Meeting.localUserID
                    ].map(candidateObj => {
                        peerConn.addIceCandidate(
                            new RTCIceCandidate(candidateObj)
                        );
                    });
                }
            }
            if (isInitiator) {
                //console.log('Createing Data Channel');
                //建立資料傳送頻道、訊息傳送頻道
                let fileChannel = peerConn.createDataChannel("files");
                console.log('已經建立通道: ' + fileChannel.label);
                let msgChannel = peerConn.createDataChannel("messages");
                console.log('已經建立通道: ' + msgChannel.label);
                fileChannels[remotePeer] = fileChannel;
                msgChannels[remotePeer] = msgChannel;

                //建立成功後，立即處理
                onDataChannelCreated(fileChannel);
                onDataChannelCreated(msgChannel);

                // //開啟通道後，初始化download物件
                // downloadAnchor.textContent = '';
                // downloadAnchor.removeAttribute('download');
                // if (downloadAnchor.href) {
                //     //停止連結的引用/作用
                //     URL.revokeObjectURL(downloadAnchor.href);
                //     downloadAnchor.removeAttribute('href');
                // }
            }
            //如果不是開房的，是加入別人的房間
            //如果有連線成功，會接到這個事件
            peerConn.ondatachannel = event => {
                console.log("收到通道訊息: ", event.channel.label);
                //加入別人建立的頻道
                if (event.channel.label == "files") {
                    //開啟通道後，初始化HTML元素
                    // downloadAnchor.textContent = '';
                    // downloadAnchor.removeAttribute('download');
                    // if (downloadAnchor.href) {
                    //     URL.revokeObjectURL(downloadAnchor.href);
                    //     downloadAnchor.removeAttribute('href');
                    // }
                    let fileChannel = event.channel;
                    fileChannels[remotePeer] = fileChannel;
                    console.log("已經加入通道: " + event.channel.label);
                    onDataChannelCreated(fileChannel);
                } else if (event.channel.label == "messages") {
                    let msgChannel = event.channel;
                    msgChannels[remotePeer] = msgChannel;
                    console.log("已經加入通道: " + event.channel.label);
                    onDataChannelCreated(msgChannel);
                }
            };
        
            // send any ice candidates to the other peer
            peerConn.onaddstream = event => {
                console.log("收到遠端加入影像");
                let url = URL.createObjectURL(event.stream);
                Meeting.props.dispatch(
                    addRemoteStreamURL({
                        remotePeer,
                        url: url,
                        stream: event.stream
                    })
                );
            };

            peerConn.onremovestream = event => {
                console.log("收到遠端離開");
                // console.log('Remote stream removed. Event: ', event);
                Meeting.props.dispatch(delRemoteStreamURL(remotePeer));
            };

            Meeting.props.dispatch(
                addParticipantConnection({
                    id: remotePeer,
                    connectionObj: peerConn
                })
            );
            return peerConn;
        };

        //建立資料傳遞頻道後，立即處理的函數
        let onDataChannelCreated = channel => {
            channel.onopen = () => {
                console.log("channel: " + channel.label + " 已經開啟! ");
            };
            channel.onmessage = event => {
                if (channel.label == "files") {
                    if (typeof event.data === "string") {
                        let received = new window.Blob(receiveBuffer);
                        receiveBuffer = [];
                        fileContainer = URL.createObjectURL(received);
                    }
                    //把每個ArrayBuffer都存在同一個陣列裡
                    receiveBuffer.push(event.data); //把資料push進陣列
                } else if (channel.label == "messages") {
                    let record = JSON.parse(event.data);
                    Meeting.props.dispatch(addChatRecord(record));
                }
            };
            channel.onerror = (error)=>{
                console.log("channel:" + channel.label + " 出了問題! " + error)
            }
        };

        Chat.sendText = value => {
            if (!value) {
                return;
            }
            //取得現在時間
            let date = new Date();
            //自定義時間格式:Hour-Minute
            let formattedTime =
                date.getHours() +
                ":" +
                (date.getMinutes() < 10 ? "0" : "") +
                date.getMinutes();
            let record = {
                name: Meeting.props.userName, //0903 Andy Add a Temp
                userID: Meeting.localUserID,
                sendTime: formattedTime,
                text: value
            };
            //傳給別人的
            for (let id in msgChannels) {
                msgChannels[id].send(JSON.stringify(record));
            }
            //加到自己畫面上的
            Meeting.props.dispatch(addChatRecord(record));
        };

        // Chat.sendFileToUser = (files) => {
        //     if (!files) {
        //         alert('沒有給我檔案我生77喔!');
        //         return;
        //     }
        //     //這個功能是直接將檔案廣播給房內的人，沒有存進資料庫
        //     //假設一次上傳多個檔案，files[0]指的是第一個傳的檔案
        //     //這裡暫時只做單一檔案上傳功能
        //     //webrtc的data channel一次最多只能傳送16*1024Bytes的檔案
        //     let file = files;
        //     console.log('File is ' + [file.name, file.size, file.type, file.lastModifiedDate].join(', '));

        //     let chunkSize = 16384;
        //     //切割檔案的，並傳入起始點，從頭開始切
        //     let sliceFile = (offset) => {
        //         //讀取<input>中的檔案
        //         let reader = new window.FileReader();
        //         //讀取完成時觸發此函數
        //         reader.onload = (e) => {
        //             //把讀取好的檔案透過fileChannel傳送給「所有」遠端使用者
        //             for (let id in fileChannels) {
        //                 //e.target.result是一個ArrayBuffer，長度為:16384bytes，把他送給遠端使用者
        //                 fileChannels[id].send(e.target.result);
        //                 //如果檔案總大小>0+16384>再呼叫一次sliceFile(0+16384+16384+...)>遞迴
        //                 if (file.size > offset + e.target.result.byteLength) {
        //                     window.setTimeout(sliceFile, 0, offset + chunkSize);
        //                 } else {
        //                     fileChannels[id].send(JSON.stringify({
        //                         'fileName': file.name,
        //                         'fileSize': file.size,
        //                         'fileType': file.type
        //                     }));
        //                 }
        //             }
        //         };
        //         //從檔案開頭，切一塊16384的檔案下來
        //         let slice = file.slice(offset, offset + chunkSize);
        //         reader.readAsArrayBuffer(slice);
        //     };
        //     sliceFile(0);
        // };

        // Chat.sendFileToDB = (localUserID, files) => {
        //     //假設一次上傳多個檔案，files[0]指的是第一個傳的檔案
        //     //這裡只做單一檔案上傳功能
        //     let file = files;
        //     console.log('File is ' + [file.name, file.size, file.type, file.lastModifiedDate].join(', '));
        //     let reader = new window.FileReader();
        //     reader.onload = (e) => {
        //         let xhr = new XMLHttpRequest();
        //         xhr.open("POST", "https://140.123.175.95:8787/api/db/create/photo", true);
        //         xhr.setRequestHeader('Content-Type', 'application/json');
        //         xhr.send(JSON.stringify({
        //             id: localUserID,
        //             data: e.target.result
        //         }));
        //     };
        //     reader.readAsDataURL(file);
        // };
        return Chat;
    }
};

module.exports = Chat;
