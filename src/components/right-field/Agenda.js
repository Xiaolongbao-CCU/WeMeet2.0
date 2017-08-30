"use strict";

import React from "react";

class Agenda extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        return (
            <div className="agenda-block">
                <div className="flag">
                    <div className="bar" />
                    <div className="left" />
                    <div className="right" />
                    <div className="agenda-title">議程</div>
                    <div className="agenda-content">
                        <ol>
                            <li>報告事項</li>
                            <li>議案一討論</li>
                            <li>議案二討論</li>
                            <li>討論活動</li>
                            <li>討論活動</li>
                            <li>討論活動</li>
                        </ol>
                    </div>
                    <div className="agenda-add" />
                </div>
                <img className="eagle" src="img/eagle.png" />
            </div>
        );
    }
}

export default Agenda;
