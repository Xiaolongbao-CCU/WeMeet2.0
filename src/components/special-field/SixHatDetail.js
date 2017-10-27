"use strict";

import React from "react";
import { connect } from "react-redux";
import { setSixhatOpen, setSixhatDetailClose } from "../../actions/Actions";

class SixHatDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hadBeenPlayed: false,
            Whichpage: ""
        };
        this.onClick_ToggleNextPage = this.onClick_ToggleNextPage.bind(this);
        this.onClick_TogglePreviousPage = this.onClick_TogglePreviousPage.bind(
            this
        );
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_start() {
        this.props.dispatch(setSixhatDetailClose());
        this.props.dispatch(setSixhatOpen());
    }

    onClick_ToggleNextPage() {
        this.setState({
            Whichpage: "teachingPage"
        });
    }

    onClick_TogglePreviousPage() {
        this.setState({
            Whichpage: "startPage"
        });
    }

    render() {
        let SixHatPage;
        switch (this.state.Whichpage) {
            case "teachingPage":
                SixHatPage = (
                    <div className="teachingPage">
                        <div className="exit" />
                        <div className="title">
                            <div className="logo" id="SixHat" />
                            <div className="line" />
                            <label className="text">遊戲教學</label>
                        </div>
                        <div className="teachingText">
                            <ul>
                                <li id="fadeIn">
                                    第一個階段：請確立好要解決的問題，就像確定目標畫好地圖。
                                </li>
                                <li id="fadeIn1">
                                    第二個階段：每一種顏色的帽子代表一種思維，當你戴上其中一頂時，你就只能採用該種思維模式來考慮問題。
                                </li>
                            </ul>
                        </div>
                        <div className="teachingSixhat">
                            <img
                                className="teachingImg"
                                id="fadeIn2"
                                src="./img/teaching_sixhat.png"
                            />
                        </div>
                        <div className="bottom-field">
                            <div
                                className="button"
                                onClick={() => {
                                    this.onClick_start();
                                }}
                            >
                                開始遊戲
                            </div>
                            <div
                                className="button"
                                onClick={() => {
                                    this.onClick_TogglePreviousPage();
                                }}
                            >
                                回上一頁
                            </div>
                        </div>
                    </div>
                );
                break;

            case "startPage":
            default:
                SixHatPage = (
                    <div className="startPage">
                        <div className="exit" />
                        <div className="title">
                            <div className="logo" id="SixHat" />
                            <div className="line" />
                            <label className="text">六頂思考帽法</label>
                        </div>
                        <div className="left-field">
                            <img className="img" src="./img/sixhat_img.png" />
                            <div className="text">
                                遊戲簡介：以六種顏色的帽子代表六種不同思考模式的創造思考技法，幫助團隊進行全方位的思考以及評估。
                            </div>
                        </div>
                        <div className="right-field">
                            <div className="instruction">
                                <label className="type">時機</label>
                                <div className="line" />
                                <ul className="list">
                                    <li>確認完解決的問題時使用此技法，使大家能用不同的思維來審思問題。</li>
                                    <li>人數限制6至12人</li>
                                </ul>
                            </div>
                            <div className="instruction">
                                <label className="type">應用範圍</label>
                                <div className="line" />
                                <ul className="list">
                                    <li>水平式思考</li>
                                    <li>整理思維</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bottom-field">
                            <div
                                className="button"
                                onClick={() => {
                                    this.onClick_start();
                                }}
                            >
                                開始遊戲
                            </div>
                            <div
                                className="button"
                                onClick={this.onClick_ToggleNextPage}
                            >
                                看教學
                            </div>
                        </div>
                    </div>
                );
                break;
        }

        return <div className="brainstorming-field">{SixHatPage}</div>;
    }
}

export default connect()(SixHatDetail);
