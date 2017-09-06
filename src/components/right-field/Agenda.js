"use strict";

import React from "react";

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaList: [
                {
                    content: "我是議程一", //單個議程內容
                    isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
                },
                {
                    content: "我是議程二",
                    isAgendaFinished: false
                }
            ]
        };
        this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(
            this
        );
        this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_ToggleDeleteAgenda(e) {
        let key = e.target.id;
        this.setState({
            ...this.state,
            agendaList: [
                ...this.state.agendaList.slice(0, key),
                ...this.state.agendaList.slice(key + 1)
            ]
        });
        //socket.emit("deleteAgenda", this.state.agendaList);
    }

    onClick_ToggleAddAgenda() {
        if (this.refs.agenda_input.value) {
            let newText = this.refs.agenda_input.value;
            this.setState({
                agendaList: this.state.agendaList.concat([newText])
            });
            socket.emit("addAgenda", this.state.agendaList);
            this.refs.agenda_input.value = "";
        }
    }


    onClick_toggleAgendaFinish(e){
        let key = e.target.id
        console.log(key)
        this.setState({
            ...this.state,
            agendaList:[
                ...this.state.agendaList.slice(0,key),
                {
                    ...this.state.agendaList[key],
                    isAgendaFinished: !this.state.agendaList[key].isAgendaFinished
                },
                ...this.state.agendaList.slice(key+1)
            ]
        })
    }

    handleAgendaInputPressEnter() {
        if (key.charCode == 13) {
            //按下enter後
        }
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
                                onClick={(e)=>{this.onClick_toggleAgendaFinish(e)}}
                                src={
                                    this.state.agendaList[key].isAgendaFinished
                                        ? "./img/tick.png"
                                        : "./img/null.png"
                                }
                            />
                        </div>
                        <label
                            className="text"
                            id={
                                this.state.agendaList[key].isAgendaFinished
                                    ? "line"
                                    : ""
                            }
                        >
                            {this.state.agendaList[key].content}
                        </label>
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
                        onClick={this.onClick_ToggleAddAgenda}
                    >
                        <div className="cross" />
                        <div className="text">增加議程</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Agenda;
