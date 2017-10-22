"use strict";
import socket from "../socket";
import { setInterimResult, addRecognitionRecord } from "../actions/Actions";

let Recognition = {
    //MeetingActions, MeetingStore, socket, room
    createNew: Meeting => {
        //模組物件
        let recognizer = {};

        //模組接口的需求:Select選單物件、中途判定之文字輸出口、最終結果文字輸出口
        let final_transcript = "";
        let isRecognizing = false;
        let shouldStop = false;
        let start_timestamp;
        let ddd = new Date();

        recognizer.id = "";

        let recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        // recognizer.setLanguage = (dialect) => {
        //     console.log(dialect.value);
        //     recognition.lang = dialect.value;
        // }
        //************預設中文
        recognition.lang = "cmn-Hant-TW";
        recognizer.toggleButtonOnclick = () => {
            // if (Meeting.state.isRecognizing) {
            //     recognition.stop();
            //     Meeting.setState({
            //         isRecognizing : false
            //     })
            // } else {
            //     final_transcript = '';
            //     ignore_onend = false;
            //     start_timestamp = event.timeStamp;
            //     recognition.start();
            //     Meeting.setState({
            //         isRecognizing : true
            //     })
            // }
        };

        //************直接開始
        final_transcript = "";

        //recognition.start();

        recognition.onstart = () => {
            console.log("Recognition On Start");
            start_timestamp = ddd.getTime();
            isRecognizing = true;
        };

        recognition.onerror = event => {
            if (event.error == "no-speech") {
                console.log("Recognition On Error，偵測不到麥克風訊號，請調整裝置的設定。");
                isRecognizing = false;
            }
            if (event.error == "audio-capture") {
                console.log("Recognition On Error，偵測不到麥克風，請正確安裝。");
                isRecognizing = false;
                shouldStop = true;
            }
            if (event.error == "not-allowed") {
                isRecognizing = false;
                shouldStop = true;
                if (event.timeStamp - start_timestamp < 100) {
                    console.log(
                        "Recognition On Error，麥克風的權限被阻擋，請至chrome://settings/contentExceptions#media-stream更改設定"
                    );
                } else {
                    console.log("Recognition On Error，存取麥克風被拒。");
                }
            }
            // Meeting.setState({
            //     isRecognizing:false,
            //     recognitionResult:""
            // })
        };

        recognition.onend = () => {
            console.log("recognition On end");
            isRecognizing = false;
            if (!shouldStop) {
                console.log("recognition Start again");
                recognition.start();
                isRecognizing = true;
                // Meeting.setState({
                //     isRecognizing:false,
                //     recognitionResult:""
                // })
            }
            shouldStop = false;
        };

        recognition.onresult = event => {
            console.log("有聽到有聽到!");
            let interim_transcript = "";
            //版本過舊的情況
            // if (typeof(event.results) == 'undefined') {
            //     recognition.onend = null;
            //     recognition.stop();
            //     Meeting.setState({
            //         isRecognizing:false
            //     })
            //     return;
            // }
            let date = new Date();
            //自定義時間格式:Hour-Minute
            let time =
                date.getHours() +
                ":" +
                (date.getMinutes() < 10 ? "0" : "") +
                date.getMinutes();

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    Meeting.props.dispatch(
                        addRecognitionRecord({
                            sendTime: time,
                            userID: recognizer.id,
                            text: event.results[i][0].transcript
                        })
                    );
                    socket.emit("recognitionRecord", {
                        sendTime: time,
                        userID: recognizer.id,
                        text: event.results[i][0].transcript
                    });
                    // final_transcript = event.results[i][0].transcript;
                    // Meeting.setState({
                    //     recognitionResult:final_transcript
                    // });
                    // final_transcript = ''
                    Meeting.props.dispatch(setInterimResult(""));
                } else {
                    interim_transcript += event.results[i][0].transcript;
                    // interim_transcript += event.results[i][0].transcript;
                    Meeting.props.dispatch(
                        setInterimResult(interim_transcript)
                    );
                    // Meeting.setState({
                    //     recognitionResult:interim_transcript
                    // });
                }
            }
        };
        return recognizer;
    }
};

module.exports = Recognition;
