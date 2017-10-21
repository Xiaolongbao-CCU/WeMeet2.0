"use strict";

import React from "react";

class ReservationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="reservation-detail" id="Fadein">
                <div className="input-field">
                    <span><img src='./img/clock.png'/></span>
                    <span className="title">開會日期</span>
                    <span className="content">開會日期</span>
                </div>
            </div>
        );
    }
}

export default ReservationDetail;
