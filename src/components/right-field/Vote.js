"use strict";
// {   投票資料格式
//     secretOrNot:1,
//     title:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1,3]
// }
import React from "react";
import { connect } from "react-redux";
import socket from "../../socket";
import { selfSubmitVote } from "../../actions/Actions";
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
            isMyselfVoteCanSumbit: false,
            isVoteSubmited: false, //我是否提交投票? 完成會換成等待他人投票中

            /* About VoteBox Detail */
            VoteFounder: "佳怡", //投票建立者

            VoteNumber: {
                first: ""
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
        if (!this.props.isSelfSubmit) {
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
                    sender: this.props.userName || this.props.localUserID,
                    content: this.state.optionSelected
                });
            }
            this.props.dispatch(selfSubmitVote());
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
                        <span className="bar" />
                        <span className="people">
                            {this.props.isSelfSubmit
                                ? this.props.votingDetail.result[key]
                                  ? this.props.votingDetail.result[key].sum
                                  : 0
                                : ""}
                        </span>
                        {this.props.isSelfSubmit ? (
                            <div className="people-detail">
                                投票者：{this.props.votingDetail.voting.secretOrNot
                                    ? "匿名無法觀看投票者"
                                    : this.props.votingDetail.result[key]
                                      ? this.props.votingDetail.result[
                                            key
                                        ].voter.reduce((allName, userName) => {
                                            return allName + userName + "、";
                                        }, "")
                                      : ""}
                            </div>
                        ) : null}
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
                            {this.props.votingDetail.voting.creator} 發起了
                            {this.props.votingDetail.voting.secretOrNot
                                ? "匿名投票"
                                : "記名投票"}
                        </div>
                        <div className="issue">
                            投票問題：{this.props.votingDetail.voting.question}
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
                            className={
                                this.props.isSelfSubmit ? "votewait" : "votego"
                            }
                            id={
                                this.state.isMyselfVoteCanSumbit
                                    ? "open"
                                    : "closed"
                            }
                            onClick={() => {
                                this.onclick_sendVote();
                            }}
                        >
                            {this.props.isVotingFinish //1. 先審核是否所有人投票完，如果投完就不會有任何東西
                                ? null
                                : this.props.isSelfSubmit ? "等待他人投票中 " : "投票！" //2. 再來確認自己的投票是否已提交，沒有是按鈕，有是等待投票
                            }
                            {this.props.isVotingFinish ? null : this.props
                                .isSelfSubmit ? (
                                <img src="./img/wait.gif" />
                            ) : null}
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
                    {this.props.isVotingFinish ? (
                        <img className="voteEnd" src="../img/vote-ended.png" />
                    ) : null}
                    {this.props.isVotingFinish ? (
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
        userName: state.connection.userName,
        votingDetail: state.vote,
        isVotingFinish: state.vote.isVotingFinish,
        isSelfSubmit: state.vote.isSelfSubmit,
        localUserID: state.connection.localUserID,
        connection: state.connection.connections
    };
};

export default connect(mapStateToProps)(Vote);
