"use strict";

import React from "react";

class ReservationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationHref: "",
            date: ""
        };
        this.onClick_ToggleReservation = this.onClick_ToggleReservation.bind(this);
        this.date = "";
    };

    componentWillMount() { }

    componentDidMount() {
        //执行一个laydate实例
        laydate.render({
            elem: document.getElementById('datetime'),
            type: 'datetime',
            theme: '#cb253e',
            format: 'yyyy年MM月dd日 HH時mm分',
            min: 0,
            max: 120,
            done: function (value, date, endDate) {
                let element = document.getElementById('date');
                let inputdate = date.year.toString().padLeft(2, "0") + date.month.toString().padLeft(2, "0") +
                    date.date.toString().padLeft(2, "0") + "T" + date.hours.toString().padLeft(2, "0") +
                    date.minutes.toString().padLeft(2, "0") + date.seconds.toString().padLeft(2, "0");
                element.value = inputdate;
            }
        });
    }

    onClick_ToggleReservation() {
        let Ref = this.refs;
        let inputdate = this.date;
        let Hash = Math.floor((1 + Math.random()) * 1e16).toString(16).substring(8);
        let URL = "https://140.123.175.95:8080/meeting?hash=" + Hash;
        let new_href = "https://www.google.com/calendar/render?action=TEMPLATE&trp=true&sf=true&output=xml"
            + "&dates=" + Ref.date.value + "/" + Ref.date.value +
            "&details=" + Ref.note.value + "%0A" + URL + "&location=" + Ref.site.value +
            "&text=" + Ref.title.value;
        console.log(new_href);
        this.setState({
            reservationHref: new_href
        });
    }

    render() {
        return (
            <div className="reservation-detail" id="Fadein">
                <div className="input-field bigtitle">預約開會</div>
                <div className="input-field">
                    <span><img className="img" src='./img/calendar.png' /></span>
                    <span className="title">開會日期</span>
                    <input className="content" id="datetime" onChange={this.onClick_ToggleReservation} />
                    <input type="hidden" id="date" ref="date" />
                </div>
                <div className="input-field">
                    <span><img className="img" src='./img/location.png' /></span>
                    <span className="title" >開會地點</span>
                    <input className="content" ref="site" onChange={this.onClick_ToggleReservation} />
                </div>
                <div className="input-field">
                    <span><img className="img" src='./img/aim.png' /></span>
                    <span className="title" >開會主題</span>
                    <input className="content" ref="title" onChange={this.onClick_ToggleReservation} />
                </div>
                <div className="input-field">
                    <span><img className="img" src='./img/note.png' /></span>
                    <span className="title" >備註</span>
                    <input className="content" ref="note" onChange={this.onClick_ToggleReservation} />
                </div>
                <a href={this.state.reservationHref}><div className="submit" >預約</div></a>

            </div>
        );
    }
}

export default ReservationDetail;
