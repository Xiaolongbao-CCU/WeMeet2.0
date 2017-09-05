"use strict";
// {   投票資料格式
//     secretOrNot:1,
//     title:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1,3]
// }
import React from "react";

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* Basic Set */
            VoteBoxOrder: 'one', //這是第幾個投票?有one,two,three三個 我不知道這要取啥英文名字哭
            isVoteBoxOpen: false, //投票視窗是否被點選而打開了
            isAnonymous: false, //是否是匿名投票 會影響資料是否要送出名字
            isSeclected: {
                first: false,
                second: false,
                third: false
            }, //投票哪些被選取了? 會影響投票上限和觸發個別投票選項被選取
            isMyselfVoteCanSumbit: false, //我自己的投票是否完成? 若完成要觸發投票鍵開啟
            isMyselefVoteFinished: false,
            isOthersVoteFinished: false, //其他人的投票是否完成? 若完成要觸發投票完成的動作
            MaxVoteNumber: 6, //投票上限

            /* About VoteBox Detail */
            VoteFounder: '佳怡', //投票建立者
            VoteType: {
                registered: '記名投票',
                anonymous: '匿名投票'
            }, //投票類型(記名投票or記名投票),看不要用成物件
            VoteQuestion: '投票問題', //投票問題
            VoteChoice: {
                first: '第一個選項',
                second: '第二個選項',
                third: '第三個選項'
            }, //投票選項
            VoteNumber: {
                first: '6',
                second: '7',
                third: '25'
            } //投票票數
        }

        this.onClick_ToggleVoteSelected = this.onClick_ToggleVoteSelected.bind(this);
        this.onClick_ToggleVoteDetail = this.onClick_ToggleVoteDetail.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleVoteSelected() {
        this.setState({
            isSeclected: {
                first: true,
                second: false,
                third: false
            },
        });
    }

    onClick_ToggleVoteDetail() {
        this.setState({
            isVoteBoxOpen: !this.state.isVoteBoxOpen
        });
    }

    render() {
        return (
            <div className="vote-block">
                <div className="votebox" id={this.state.VoteBoxOrder} onClick={this.onClick_ToggleVoteDetail}>
                    {this.state.isOthersVoteFinished ? <img className='voteEnd' src='../img/vote-ended.png' /> : null}
                    {this.state.isOthersVoteFinished ? <div className='voteEndtext'>投票出爐囉！</div> : null}
                </div>
                <div className={this.state.isVoteBoxOpen ? 'visible' : 'hidden'}>
                    <div className="votedetail" id={this.state.VoteBoxOrder}>
                        <div className="add">佳怡建立了{this.state.VoteType.registered}</div>
                        <div className="issue">問題：{this.state.VoteQuestion}</div>
                        <div className="choice">
                            <div className="cotent" onClick={this.onClick_ToggleVoteSelected}>
                                <span className="status" id={this.state.isSeclected.first ? 'selected' : null}>
                                    {this.state.VoteChoice.first}</span>
                                <span className="bar"> </span>
                                <span className="people">{this.state.VoteNumber.first}</span>
                            </div>
                            <div className="cotent" onClick={this.onClick_ToggleVoteSelected}>
                                <span className="status seclted" id={this.state.isSeclected.second ? 'selected' : null}>
                                    {this.state.VoteChoice.second}</span>
                                <span className="bar"> </span>
                                <span className="people">{this.state.VoteNumber.second}</span>
                            </div>
                        </div>
                        <div className="maxVoteNumber">投票上限：{this.state.MaxVoteNumber}票</div>
                        <div className="votego" id={this.state.isMyselfVoteCanSumbit ? 'open' : 'closed'}>投票！</div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Vote
