"use strict";
// {   投票資料格式
//     secretOrNot:1,
//     title:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1,3]
// }
import React from "react";
import { connect } from "react-redux";

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* Basic Set */
            isVoteBoxOpen: false, //投票視窗是否被點選而打開了
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
                first: "6",
                second: "7",
                third: "25"
            }, //投票票數
            optionSelected: {}
        };

        this.onClick_ToggleVoteSelected = this.onClick_ToggleVoteSelected.bind(
            this
        );
        this.onClick_ToggleVoteDetail = this.onClick_ToggleVoteDetail.bind(
            this
        );
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleVoteSelected(e) {
        if (this.state.optionSelected[e.target.parentNode.id]) {
            this.setState({
                optionSelected: {
                    ...this.state.optionSelected,
                    [e.target.parentNode.id]: false
                }
            });
        } else {
            this.setState({
                optionSelected: {
                    ...this.state.optionSelected,
                    [e.target.parentNode.id]: true
                }
            });
        }
    }

    onClick_ToggleVoteDetail() {
        this.setState({
            isVoteBoxOpen: !this.state.isVoteBoxOpen
        });
    }

    render() {
        let votebox;
        if (this.props.votingDetail.isVotingReady) {
            votebox = (
                <div
                    className="votebox"
                    id="one"
                    onClick={this.onClick_ToggleVoteDetail}
                >
                    {this.state.isOthersVoteFinished
                        ? <img
                            className="voteEnd"
                            src="../img/vote-ended.png"
                        />
                        : null}
                    {this.state.isOthersVoteFinished
                        ? <div className="voteEndtext">投票出爐囉！</div>
                        : null}
                </div>
            );
        }

        let option = [];
        Object.keys(this.props.votingDetail.voting.option).map(key => {
            option.push(
                <div
                    className="cotent"
                    id={key}
                    onClick={e => {
                        this.onClick_ToggleVoteSelected(e);
                    }}
                >
                    <span
                        className="status"
                        id={this.state.optionSelected[key] ? "selected" : null}
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

        return (
            <div className="vote-block">
                {votebox}
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
                        <div className="choice">
                            {option}
                        </div>
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
                        >
                            投票！
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        votingDetail: state.vote
    };
};

export default connect(mapStateToProps)(Vote);
