"use strict";
// {   投票資料格式
//     secretOrNot:1, 0:記名 1:匿名
//     question:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1(0:一票 1:多票),3(多票是幾票)],
// }
import React from "react";

class VoteDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisteredSelect: true,
            isMultivoteOpen: false,
            isVoteFinish: false,
            MultivoteNumber: 2,
            voting: {
                secretOrNot: 0,
                multiOrNot: [0],
                question: "",
                option: {
                    option0: ""
                }
            }
        };
        this.onClick_ToggleMultivote = this.onClick_ToggleMultivote.bind(this);
        this.onClick_Subtractuon = this.onClick_Subtractuon.bind(this);
        this.onClick_Addition = this.onClick_Addition.bind(this);
        this.onClick_AddVoteQuestion = this.onClick_AddVoteQuestion.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_Registered() {
        if (this.state.isRegisteredSelect) {
            return;
        } else {
            this.setState({
                isRegisteredSelect: !this.state.isRegisteredSelect,
                voting: {
                    ...this.state.voting,
                    secretOrNot: 0
                }
            });
        }
    }

    onClick_Anonymous() {
        if (!this.state.isRegisteredSelect) {
            return;
        } else {
            this.setState({
                isRegisteredSelect: !this.state.isRegisteredSelect,
                voting: {
                    ...this.state.voting,
                    secretOrNot: 1
                }
            });
        }
    }

    onEnterQuestion(e) {
        //如果按enter，而且有輸入東西
        if (e.which == 13 && e.target.value) {
            this.setState({
                voting: {
                    ...this.state.voting,
                    question: e.target.value
                }
            });
        } else if (e.which == 13 && !e.target.value) {
            alert("沒輸入東西 要改紅框");
        }
    }

    onBlurQuestion(e) {
        if (!e.target.value) {
            alert("沒輸入問題，要給提醒/改紅框");
        } else {
            this.setState({
                voting: {
                    ...this.state.voting,
                    question: e.target.value
                }
            });
        }
    }

    onEnterOption(e) {
        //案enter而且有輸入值得情況下
        if (e.which == 13 && e.target.value) {
            //檢查是否為第一個值
            if (this.state.voting.option) {
                //不是第一個的話，檢查是修改舊的還是新增一個選項
                if (
                    e.target.id ==
                    "option" +
                        (Object.keys(this.state.voting.option).length - 1)
                ) {
                    //如果是最後一個選項，就在他後面新增一個，然後加一個空格
                    this.setState({
                        voting: {
                            ...this.state.voting,
                            option: {
                                ...this.state.voting.option,
                                [e.target.id]: e.target.value,
                                ["option" +
                                    Object.keys(this.state.voting.option)
                                        .length]: ""
                            }
                        }
                    });
                } else {
                    //如果已經有這個選項了，就是修改舊的，不用加格子
                    this.setState({
                        voting: {
                            ...this.state.voting,
                            option: {
                                ...this.state.voting.option,
                                [e.target.id]: e.target.value
                            }
                        }
                    });
                }
            } else {
                //如果沒有的話，就新增那個值，然後做一個新的空格
                this.setState({
                    voting: {
                        ...this.state.voting,
                        option: {
                            ...this.state.voting.option,
                            [e.target.id]: e.target.value,
                            ["option" +
                                Object.keys(this.state.voting.option)
                                    .length]: ""
                        }
                    }
                });
            }
        }
    }

    onBlurOption(e) {
        if (!e.target.value) {
            alert("沒輸入問題，要給提醒");
        } else {
            //檢查是否為第一個值
            if (this.state.voting.option) {
                //不是第一個的話，檢查是修改舊的還是新增一個選項
                if (
                    e.target.id ==
                    "option" +
                        (Object.keys(this.state.voting.option).length - 1)
                ) {
                    //如果是最後一個選項，就在他後面新增一個，然後加一個空格
                    this.setState({
                        voting: {
                            ...this.state.voting,
                            option: {
                                ...this.state.voting.option,
                                [e.target.id]: e.target.value,
                                ["option" +
                                    Object.keys(this.state.voting.option)
                                        .length]: ""
                            }
                        }
                    });
                } else {
                    //如果已經有這個選項了，就是修改舊的，不用加格子
                    this.setState({
                        voting: {
                            ...this.state.voting,
                            option: {
                                ...this.state.voting.option,
                                [e.target.id]: e.target.value
                            }
                        }
                    });
                }
            } else {
                //如果沒有的話，就新增那個值，然後做一個新的空格
                this.setState({
                    voting: {
                        ...this.state.voting,
                        option: {
                            ...this.state.voting.option,
                            [e.target.id]: e.target.value,
                            ["option" +
                                Object.keys(this.state.voting.option)
                                    .length]: ""
                        }
                    }
                });
            }
        }
    }

    onClick_ToggleMultivote() {
        //如果原本是多票>改成單票
        if (this.state.isMultivoteOpen) {
            this.setState({
                isMultivoteOpen: !this.state.isMultivoteOpen,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [0]
                }
            });
        } else {
            this.setState({
                isMultivoteOpen: !this.state.isMultivoteOpen,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber]
                }
            });
        }
    }

    onClick_Subtractuon() {
        if (this.state.MultivoteNumber > 2) {
            this.setState({
                MultivoteNumber: this.state.MultivoteNumber - 1,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber - 1]
                }
            });
        }
    }

    onClick_Addition() {
        if (this.state.MultivoteNumber < 10) {
            this.setState({
                MultivoteNumber: this.state.MultivoteNumber + 1,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber + 1]
                }
            });
        }
    }

    onClick_AddVoteQuestion() {
        if (this.state.MultivoteNumber < 10) {
            this.setState({
                isQuestionAdd: !this.state.isQuestionAdd
            });
        }
    }

    render() {
        let option = [];
        for (let key in this.state.voting.option) {
            option.push(
                <div className="question">
                    <div
                        className={this.state.isQuestionAdd ? "delete" : "add"}
                        onClick={this.onClick_AddVoteQuestion}
                        id={key}
                        ref={key}
                    />
                    <input
                        className="text"
                        type="text"
                        id={key}
                        ref={key}
                        placeholder="請輸入投票選項"
                        onKeyPress={e => {
                            this.onEnterOption(e);
                        }}
                        onBlur={e => {
                            this.onBlurOption(e);
                        }}
                    />
                </div>
            );
            this.refs.key = this.state.voting.option[key];
        }

        return (
            <div className="voting" id="Fadein">
                <div className="votetypeselect">
                    <button
                        className="registered"
                        id={
                            this.state.isRegisteredSelect
                                ? "selected"
                                : "notselected"
                        }
                        onClick={() => {
                            this.onClick_Registered();
                        }}
                    >
                        記名投票
                    </button>

                    <button
                        className="anonymous"
                        id={
                            this.state.isRegisteredSelect
                                ? "notselected"
                                : "selected"
                        }
                        onClick={() => {
                            this.onClick_Anonymous();
                        }}
                    >
                        匿名投票
                    </button>
                </div>

                <div className="votequestion">
                    <input
                        className="input"
                        ref="votequestion"
                        type="text"
                        placeholder="請輸入投票問題"
                        onKeyPress={e => {
                            this.onEnterQuestion(e);
                        }}
                        onBlur={e => {
                            this.onBlurQuestion(e);
                        }}
                    />
                </div>

                <div className="voteconent">
                    {option}
                </div>

                <div className="votebottom">
                    <div className="multi-vote">複選</div>
                    <input
                        className="toggle"
                        type="checkbox"
                        name="check-3"
                        onClick={this.onClick_ToggleMultivote}
                    />
                    <div
                        className="multivote-number"
                        id={this.state.isMultivoteOpen ? "visible" : "hidden"}
                    >
                        <button
                            className="subtraction"
                            onClick={this.onClick_Subtractuon}
                        >
                            -
                        </button>
                        <input
                            className="number"
                            type="text"
                            value={this.state.MultivoteNumber}
                        />
                        <button
                            className="addition"
                            onClick={this.onClick_Addition}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="votesubmit"
                        id={this.state.isVoteFinish ? "open" : "close"}
                    >
                        開始投票
                    </button>

                </div>
            </div>
        );
    }
}

export default VoteDetail;
