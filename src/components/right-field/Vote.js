"use strict";

import React from "react";


class Vote extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="vote-block">
                <div className="votedetail">
                    <div className="add">佳怡 建立了投票</div>
                    <div className="issue">問題：世大運世大運世大運辦得成功嗎？</div>
                    <div className="choice">
                        <div className="cotent">
                            <span className="status">最多輸入八字元喔</span>
                            <span className="bar"> </span>
                            <span className="people">10</span>
                        </div>
                        <div className="cotent">
                            <span className="status seclted">最多輸入八字元喔</span>
                            <span className="bar"> </span>
                            <span className="people">10</span>
                        </div>
                    </div>
                    <div className="go">投票！</div>
                </div>
                <div className="votebox one" />
                <div className="votebox two" />
                <div className="votebox three" />
            </div>
        )

    }
}

export default Vote
