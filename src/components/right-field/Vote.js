"use strict";
// {   投票資料格式
//     secretOrNot:1,
//     title:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1,3]
// }
import React from "react";
import { connect } from "react-redux";
import socket from "../../socket"

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* Basic Set */
            isVoteBoxOpen: true, //投票視窗是否被點選而打開了
            isSeclected: {
                first: false,
                second: false,
                third: false
            }, //投票哪些被選取了? 會影響投票上限和觸發個別投票選項被選取
            isMyselfVoteCanSumbit: false, //我自己的投票是否完成? 若完成要觸發投票鍵開啟
            isMyselefVoteFinished: false,
            isOthersVoteFinished: false, //其他人的投票是否完成? 若完成要觸發投票完成的動作

            /* About VoteBox Detail */
            VoteFounder: "佳怡", //投票建立者

            VoteNumber: {
                first: "統計還沒做"
            }, //投票票數
            optionSelected: []
        };

        this.onClick_ToggleVoteSelected = this.onClick_ToggleVoteSelected.bind(
            this
        );
        this.onClick_ToggleVoteDetail = this.onClick_ToggleVoteDetail.bind(
            this
        );
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_ToggleVoteSelected(e) {
        let key = e.target.parentNode.id;
        if (this.props.votingDetail.voting.multiOrNot[0] == 0) {
            //單選的情況
            //先清空>再選他選的那個
            this.setState({
                isMyselfVoteCanSumbit: true,
                optionSelected: [key]
            });
        } else {
            let ticketsYouGot = this.props.votingDetail.voting.multiOrNot[1];
            if (this.state.optionSelected.includes(key)) {
                //已經被選的選項又被選>>取消他
                let k = this.state.optionSelected.indexOf(key);
                if (this.state.optionSelected.length <= 1) {
                    this.setState({
                        isMyselfVoteCanSumbit: false,
                        optionSelected: [
                            ...this.state.optionSelected.slice(0, k),
                            ...this.state.optionSelected.slice(k + 1)
                        ]
                    });
                } else {
                    this.setState({
                        optionSelected: [
                            ...this.state.optionSelected.slice(0, k),
                            ...this.state.optionSelected.slice(k + 1)
                        ]
                    });
                }
            } else {
                //如果是沒被選的選項>>要檢查有沒有超過票數
                if (
                    Object.keys(this.state.optionSelected).length + 1 ==
                    ticketsYouGot
                ) {
                    //如果投了之後剛好沒票 >> setState >> 把選項都關起來
                    this.setState({
                        isMyselfVoteCanSumbit: true,
                        optionSelected: [...this.state.optionSelected, key]
                    });
                    //關閉其他選項
                } else if (
                    Object.keys(this.state.optionSelected).length + 1 <
                    ticketsYouGot
                ) {
                    //如果投了之後小於總票數 >> setState
                    this.setState({
                        isMyselfVoteCanSumbit: true,
                        optionSelected: [...this.state.optionSelected, key]
                    });
                } else {
                    return;
                }
            }
        }
    }

    onClick_ToggleVoteDetail() {
        this.setState({
            isVoteBoxOpen: !this.state.isVoteBoxOpen
        });
    }

    onclick_sendVote() {
        console.log("g4");
        console.log(this.state.optionSelected);
        if (this.props.votingDetail.voting.secretOrNot) {
            //如果是匿名的，就不傳送sender資訊
            socket.emit("gotVoteFromUser", {
                sender: 0,
                content: this.state.optionSelected
            });
        } else {
            //不是匿名的，就傳
            socket.emit("gotVoteFromUser", {
                sender: this.props.localUserID,
                content: this.state.optionSelected
            });
        }
    }

    render() {
        let option = [];
        if (this.props.votingDetail.voting.option) {
            Object.keys(this.props.votingDetail.voting.option).map(key => {
                option.push(
                    <div className="cotent" id={key}>
                        <span
                            className="status"
                            id={
                                this.state.optionSelected.indexOf(key) >= 0
                                    ? "selected"
                                    : ""
                            }
                            onClick={e => {
                                this.onClick_ToggleVoteSelected(e);
                            }}
                        >
                            {this.props.votingDetail.voting.option[key]}
                        </span>
                        <span className="bar"> </span>
                        <span className="people">
                            {this.state.VoteNumber.first}
                        </span>
                    </div>
                );
            });
        }

        let voteDetail;
        if (this.props.votingDetail.isVotingStart) {
            voteDetail = (
                <div
                    className={this.state.isVoteBoxOpen ? "visible" : "hidden"}
                >
                    <div className="votedetail" id="one">
                        <div className="add">
                            佳怡建立了
                            {this.props.votingDetail.voting.secretOrNot
                                ? "匿名投票"
                                : "記名投票"}
                        </div>
                        <div className="issue">
                            問題：{this.props.votingDetail.voting.question}
                        </div>
                        <div className="choice">{option}</div>
                        <div className="maxVoteNumber">
                            投票上限：
                            {this.props.votingDetail.voting.multiOrNot[0]
                                ? this.props.votingDetail.voting.multiOrNot[1]
                                : "1"}
                            票
                        </div>
                        <div
                            className="votego"
                            id={
                                this.state.isMyselfVoteCanSumbit
                                    ? "open"
                                    : "closed"
                            }
                            onClick={() => {
                                this.onclick_sendVote();
                            }}
                        >
                            投票！
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="vote-block">
                <div
                    className="votebox"
                    id="one"
                    onClick={this.onClick_ToggleVoteDetail}
                    style={{
                        display: this.props.votingDetail.isVotingStart
                            ? "block"
                            : "none"
                    }}
                >
                    {this.state.isOthersVoteFinished ? (
                        <img className="voteEnd" src="../img/vote-ended.png" />
                    ) : null}
                    {this.state.isOthersVoteFinished ? (
                        <div className="voteEndtext">投票出爐囉！</div>
                    ) : null}
                </div>
                {voteDetail}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        votingDetail: state.vote,
        localUserID: state.connection.localUserID
    };
};

export default connect(mapStateToProps)(Vote);
