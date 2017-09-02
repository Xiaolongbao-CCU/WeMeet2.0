"use strict";

import React from "react";

class VoteResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstPageFinished: false,
            isAllFinished: false,
            VoteResult: '超級成功' //投票結果要傳到這
        }
        this.onClick_ToggleNextPage = this.onClick_ToggleNextPage.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleNextPage() {
        if (this.state.isFirstPageFinished == false) {
            this.setState({
                isFirstPageFinished: !this.state.isFirstPageFinished
            });
        };

        if (this.state.isAllFinished == false) {
            //要傳給meeting_new說使用者已經看完，要刪除這個元件
        }
    }

    render() {
        return (
            <div className="black" onClick={this.onClick_ToggleNextPage}>

                <div className={this.state.isFirstPageFinished ? 'hidden' : 'visible'}>
                    <div className="text one">投票結束</div>
                    <div className="text two">最後結果是</div>
                </div>

                <div className={this.state.isFirstPageFinished ? 'visible' : 'hidden'}>
                    <div className="pyro">
                        <div className="before" />
                        <div className="after" />
                    </div>
                    <img className="animal" src="./img/voteimage.png" />
                    <div className="wintext">{this.state.VoteResult}<br></br>獲勝！</div>
                    <div className="triagle" />

                </div>

                {this.state.isFirstPageFinished ? <embed className='hidden' src="../img/congration.mp3" /> : null}

            </div>
        )
    }
}


export default VoteResult
