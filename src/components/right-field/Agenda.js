"use strict";

import React from "react";
import socket from '../../socket';

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaList: [
                {
                    content: "", //單個議程內容
                    isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
                }
            ]
        };
        this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(
            this
        );
        //this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        //this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleDeleteAgenda(e) {
        let key = parseInt(e.target.id, 10)
        this.setState({
            ...this.state,
            agendaList: [
                ...this.state.agendaList.slice(0, key),
                ...this.state.agendaList.slice(key + 1)
            ]
        });
        socket.emit("updateAgenda", this.state.agendaList);
    }

    onClick_newAgenda(e) {
        let key = "agenda_input" + this.state.agendaList.length
        this.setState({
            agendaList: [
                ...this.state.agendaList,
                {
                    content: "",
                    isAgendaFinished: false
                }
            ]
        },
            () => { this.refs[key].focus() }
        )
    }

    onChangeInput(e) {
        let key = parseInt(e.target.id, 10)
        this.setState({
            ...this.state,
            agendaList: [
                ...this.state.agendaList.slice(0, key),
                {
                    ...this.state.agendaList[key],
                    content: e.target.value
                },
                ...this.state.agendaList.slice(key + 1)
            ]
        })
        socket.emit("updateAgenda", this.state.agendaList);
    }

    onClick_toggleAgendaFinish(e) {
        let key = parseInt(e.target.id, 10)
        this.setState({
            ...this.state,
            agendaList: [
                ...this.state.agendaList.slice(0, key),
                {
                    ...this.state.agendaList[key],
                    isAgendaFinished: !this.state.agendaList[key].isAgendaFinished
                },
                ...this.state.agendaList.slice(key + 1)
            ]
        })
        socket.emit("updateAgenda", this.state.agendaList);
    }

    render() {
        let agendaDetail;
        if (this.state.agendaList.length > 0) {
            agendaDetail = this.state.agendaList.map(item => {
                let key = this.state.agendaList.indexOf(item);
                return (
                    <div className="detail">
                        <div className="checkbox">
                            <img
                                className="checked"
                                id={key} 
                                onClick={(e)=>{
                                    if(this.state.agendaList[key].content){
                                        this.onClick_toggleAgendaFinish(e)
                                    }
                                }}
                                src={
                                    this.state.agendaList[key].isAgendaFinished
                                        ? "./img/tick.png"
                                        : "./img/null.png"
                                }
                            />
                        </div>
                        <input 
                            style={
                                this.state.agendaList[key].isAgendaFinished? {textDecoration:"line-through"}:{}
                            }
                            ref={"agenda_input" + key}
                            id={key}
                            value= {this.state.agendaList[key].content}
                            onChange={e=>this.onChangeInput(e)}
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
                    </div>

                    <div
                        className="agenda-add"
                        onClick={e => {
                            this.onClick_newAgenda(e);
                        }}
                    >
                        <div className="cross" />
                        <div className="text"
                        >增加議程</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Agenda;
