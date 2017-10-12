"use strict";

import React from "react";
import { connect } from "react-redux";
import { setGridDetailClose, setGridStart } from "../../actions/Actions";

class GirdDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hadBeenPlayed: false
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_exit() {
        this.props.dispatch(setGridDetailClose());
    }
    onClick_start() {
        this.props.dispatch(setGridDetailClose());
        this.props.dispatch(setGridStart());
        socket.emit('setGridStart');
    }
    render() {
        return (
            <div className="brainstorming-field">
                <div className="title">
                    <div className="logo" id="grid" />
                    <div className="line" />
                    <label className="text">九宮格分析法</label>
                </div>
                <div
                    className="exit"
                    onClick={() => {
                        this.onClick_exit();
                    }}
                />
                <div className="left-field">
                    <img className="img" src="./img/grid_img.png" />
                    <div className="text">
                        遊戲簡介：將想發想的主題寫在中央，然後向八個方向去思考，加深加廣思考範圍，讓思考更有條理和效率。
                    </div>
                </div>
                <div className="right-field">
                    <div className="instruction">
                        <label className="type">時機</label>
                        <div className="line" />
                        <ul className="list">
                            <li>團隊沒有太多的想法</li>
                            <li>想加深加廣思考範圍</li>
                        </ul>
                    </div>
                    <div className="instruction">
                        <label className="type">應用範圍</label>
                        <div className="line" />
                        <ul className="list">
                            <li>分析問題</li>
                            <li>擬訂計畫</li>
                            <li>創意發想</li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-field">
                    <div className="button" onClick={() => {this.onClick_start();}}>開始遊戲</div>
                    <div className="button">觀看教學</div>
                    <div className="button" id={this.state.hadBeenPlayed ? "" : "closed"}>歷史紀錄</div>
                </div>
            </div>
        );
    }
}

export default connect()(GirdDetail);
