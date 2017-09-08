"use strict";

import React from "react";

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
<<<<<<< HEAD
            agendaList: {
                first: {
                    number: 1, //議程順序
                    content: '我是議程一', //單個議程內容
                    isAgendaFinished: true, //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
                },
                second: {
                    number: 2,
                    content: '我是議程二',
                    isAgendaFinished: false,
=======
            agendaList: [
                {   
                    content: "", //單個議程內容
                    isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
>>>>>>> refs/remotes/origin/master
                }
            ]
        };
        this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(
            this
        );
        //this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        //this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

    onClick_ToggleDeleteAgenda(e) {
        let key = parseInt(e.target.id, 10)
        this.setState({
            ...this.state,
            agendaList: [
                ...this.state.agendaList.slice(0, key),
                ...this.state.agendaList.slice(key + 1)
            ]
        });
        //socket.emit("deleteAgenda", this.state.agendaList);
    }

    onClick_newAgenda(e){
        let key = "agenda_input"+this.state.agendaList.length
        this.setState({
            agendaList: [
                ...this.state.agendaList,
                {
                    content:"",
                    isAgendaFinished:false
                }
            ]
        },
            ()=>{this.refs[key].focus()}
        )
    }

    onChangeInput(e){
        let key = parseInt(e.target.id, 10)
        this.setState({
            ...this.state,
            agendaList:[
                ...this.state.agendaList.slice(0,key),
                {
                    ...this.state.agendaList[key],
                    content:e.target.value
                },
                ...this.state.agendaList.slice(key+1)
            ]
        })
    }

    onClick_toggleAgendaFinish(e){
        let key = parseInt(e.target.id, 10)
        console.log([
                ...this.state.agendaList.slice(0,key),
                {
                    ...this.state.agendaList[key],
                    isAgendaFinished: !this.state.agendaList[key].isAgendaFinished
                },
                ...this.state.agendaList.slice(key+1)
            ])
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
                        <input 
                            ref={"agenda_input" + key}
                            id={key}
                            value= {this.state.agendaList[key].content}
                            onChange={e=>this.onChangeInput(e)}
                        />
                 
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
<<<<<<< HEAD

                        <div className="detail">
                            <div className="checkbox">
                                <img className="checked" src={this.state.agendaList.first.isAgendaFinished ? "./img/tick.png" : ""} />
                            </div>
                            <label className="text" id={this.state.agendaList.first.isAgendaFinished ? "line" : ""}>
                                {this.state.agendaList.first.content}
                            </label>
                            <div className="delete" onClick={this.onClick_ToggleDeleteAgenda}></div>
                        </div>

                        <div className="detail">
                            <div className="checkbox">
                                <img className="checked" src={this.state.agendaList.second.isAgendaFinished ? "./img/tick.png" : ""} />
                            </div>
                            <label className="text" id={this.state.agendaList.second.isAgendaFinished ? "line" : ""}>
                                {this.state.agendaList.second.content}
                            </label>
                            <div className="delete" onClick={this.onClick_ToggleDeleteAgenda}></div>
                        </div>

                        <div className="detail">
                            <div className="checkbox">
                                <img className="checked" src={this.state.agendaList.second.isAgendaFinished ? "./img/tick.png" : ""} />
                            </div>
                            <input className="input" type="text" ref="agendaInputText" onKeyPress={key => { this.handleAgendaInputPressEnter(key); }} />
                            <div className="delete" onClick={this.onClick_ToggleDeleteAgenda}></div>
                        </div>


=======
                        {agendaDetail}
>>>>>>> refs/remotes/origin/master
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
