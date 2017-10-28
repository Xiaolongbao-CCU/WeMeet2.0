"use strict";

import React from "react";
import { connect } from "react-redux";
import socket from "../../socket";
import {
    setAgenda,
    newAgenda,
    deleteAgenda,
    updateAgenda,
    doneAgenda
} from "../../actions/Actions";

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     agendaList: [
        //         {
        //             content: "", //單個議程內容
        //             isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
        //         }
        //     ]
        // };
        this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(
            this
        );
        //this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        //this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() { }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onClick_ToggleDeleteAgenda(e) {
        let key = parseInt(e.target.id, 10);
        // this.setState({
        //     ...this.state,
        //     agendaList: [
        //         ...this.state.agendaList.slice(0, key),
        //         ...this.state.agendaList.slice(key + 1)
        //     ]
        // });
        this.props.dispatch(deleteAgenda(key));
        socket.emit("deleteAgenda", key);
    }

    onClick_newAgenda(e) {
        let key = "agenda_input" + this.props.agendaList.length;
        // this.setState(
        //     {
        //         agendaList: [
        //             ...this.state.agendaList,
        //             {
        //                 content: "",
        //                 isAgendaFinished: false
        //             }
        //         ]
        //     },
        //     () => {
        //         this.refs[key].focus();
        //     }
        // );
        this.props.dispatch(newAgenda());
        socket.emit("newAgenda");
    }

    onChangeInput(e) {
        let key = parseInt(e.target.id, 10);
        // this.setState({
        //     ...this.state,
        //     agendaList: [
        //         ...this.state.agendaList.slice(0, key),
        //         {
        //             ...this.state.agendaList[key],
        //             content: e.target.value
        //         },
        //         ...this.state.agendaList.slice(key + 1)
        //     ]
        // });
        this.props.dispatch(
            updateAgenda({
                key: key,
                value: e.target.value
            })
        );
        socket.emit("updateAgenda", {
            key: key,
            value: e.target.value
        });
    }

    onClick_Enter(e) {
        if (e.keyCode == 13) {
            e.target.blur()
        }
    }

    onClick_toggleAgendaFinish(e) {
        let key = parseInt(e.target.id, 10);
        // this.setState({
        //     ...this.state,
        //     agendaList: [
        //         ...this.state.agendaList.slice(0, key),
        //         {
        //             ...this.state.agendaList[key],
        //             isAgendaFinished: !this.state.agendaList[key]
        //                 .isAgendaFinished
        //         },
        //         ...this.state.agendaList.slice(key + 1)
        //     ]
        // });
        this.props.dispatch(doneAgenda(key));
        socket.emit("doneAgenda", key);
    }

    scrollToBottom() {
        const node = this.messagesEnd;
        node.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        let agendaDetail;
        if (this.props.agendaList.length > 0) {
            agendaDetail = this.props.agendaList.map(item => {
                let key = this.props.agendaList.indexOf(item);
                return (
                    <div className="detail">
                        <div className="checkbox">
                            <img
                                style={
                                    this.props.agendaList[key].isAgendaFinished
                                        ? { animation: "fadeIn 0.4s" }
                                        : {}
                                }
                                className="checked"
                                id={key}
                                onClick={e => {
                                    if (this.props.agendaList[key].content) {
                                        this.onClick_toggleAgendaFinish(e);
                                    }
                                }}
                                src={
                                    this.props.agendaList[key].isAgendaFinished
                                        ? "./img/tick.png"
                                        : "./img/null.png"
                                }
                            />
                        </div>
                        <input
                            className="text"
                            style={
                                this.props.agendaList[key].isAgendaFinished
                                    ? {
                                        textDecoration: "line-through",
                                        background: "transparent"
                                    }
                                    : {}
                            }
                            ref={"agenda_input" + key}
                            id={key}
                            value={this.props.agendaList[key].content}
                            onChange={e => {
                                this.onChangeInput(e);
                            }}
                            onKeyUp={e => {
                                this.onClick_Enter(e);
                            }}
                            maxLength="10"
                            readOnly={
                                this.props.agendaList[key].isAgendaFinished
                                    ? "readonly"
                                    : ""
                            }
                            placeholder='點此輸入議程內容'
                        />
                        <div
                            className="delete"
                            id={key}
                            onClick={e => {
                                this.onClick_ToggleDeleteAgenda(e);
                            }}
                        />
                    </div>
                );
            });
        }

        return (
            <div className="agenda-block">
                <img className="branch" src="img/branch.gif" />
                <img className="eagle" src="img/eagle.png" />
                <div className="flag">
                    <div className="bar" />
                    <div className="left" />
                    <div className="right" />
                    <div className="agenda-title">議程</div>
                    <div className="agenda-content">
                        {agendaDetail}
                        <div
                            style={{ float: "left", clear: "both" }}
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        />
                    </div>
                    <div
                        className="agenda-add"
                        onClick={e => {
                            this.onClick_newAgenda(e);
                        }}
                    >
                        <div className="cross" />
                        <div className="text" unselectable="on">
                            增加議程
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        agendaList: state.agenda
    };
};

export default connect(mapStateToProps)(Agenda);
