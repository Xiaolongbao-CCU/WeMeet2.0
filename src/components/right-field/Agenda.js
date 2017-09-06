"use strict";

import React from "react";

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaList: {
                first: {
                    number: 1, //議程順序
                    content: '我是議程一', //單個議程內容
                    isAgendaFinished: false, //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
                },
                second: {
                    number: 2,
                    content: '我是議程二',
                    isAgendaFinished: false,
                }
            }
        }
        this.onClick_ToggleDeleteAgenda = this.onClick_ToggleDeleteAgenda.bind(this);
        this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_ToggleDeleteAgenda() {
        this.setState({
            agendaList: this.state.agendaList.filter(item => {
                return item !== key;
            })
        });
        socket.emit("deleteAgenda", this.state.agendaList);
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

    handleAgendaInputPressEnter() {
        if (key.charCode == 13) {
            //按下enter後
        }
    }

    render() {
        let agendaDetail;
        if (this.state.agendaList.length > 0) {
            agenda = this.state.agendaList.map(item => {
                return (
                    <div className="detail">
                        <div className="checkbox">
                            <img className="checked" src={this.state.agendaList.first.isAgendaFinished ? "./img/tick.png" : ""} />
                        </div>
                        <label className="text" id={this.state.agendaList.first.isAgendaFinished ? "line" : ""}>
                            {this.state.agendaList.first.content}
                        </label>
                        <div className="delete" onClick={this.onClick_ToggleDeleteAgenda}></div>
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
                            <input className="input" type="text" ref="agendaInputText" onKeyPress={key => { this.handleAgendaInputPressEnter(key); }/>
                            <div className="delete" onClick={this.onClick_ToggleDeleteAgenda}></div>
                        </div>


                    </div>
                    <div className="agenda-add" onClick={this.onClick_ToggleAddAgenda}>
                        <div className='cross' />
                        <div className='text'>增加議程</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Agenda;
