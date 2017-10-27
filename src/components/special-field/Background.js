"use strict";

import React from "react";

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Currentperiod: '',
            WhichStyle: ''
        }
    }

    componentWillMount() {
        this.ChangeBackgroundByTime();
    }

    componentDidMount() { }

    ChangeBackgroundByTime() {
        let today = new Date();
        var currentDateTime = today.getHours();
        currentDateTime = 6;
        if (currentDateTime >= 6 && currentDateTime <= 14) {
            this.setState({
                Currentperiod: 'morning'
            })
            // console.log('現在是早上喔!');

        } else if (currentDateTime >= 15 && currentDateTime <= 17) {
            this.setState({
                Currentperiod: 'afternoon'
            })
            // console.log('現在是下午喔!');

        } else {
            this.setState({
                Currentperiod: 'night'
            })
            // console.log('現在是晚上喔!');
        }
    }

    render() {
        let skycolor = {};
        let cloudstatus = {};
        let cssstyle = {};

        switch (this.state.Currentperiod) {
            default:
            case 'morning':
                skycolor = {
                    backgroundColor: '#c1d9e8'
                };
                break;

            case 'afternoon':
                skycolor = {
                    backgroundColor: '#ECB346'
                };
                break;

            case 'night':
                skycolor = {
                    backgroundColor: '#000022'
                };
                cloudstatus = {
                    opacity: 0.8
                }
                break;
        }

        switch (this.state.WhichStyle) {
            default:
                cssstyle = (
                    <div>
                        <div className="sky" style={skycolor}>
                        </div>
                        <div className="ground" id="nature" />
                    </div>
                )
                break;

            case 'profession':
                skycolor = {
                    backgroundColor: '#201C22'
                };
                cssstyle = (
                    <div>
                        <div className="sky" style={skycolor}>
                        </div>

                        <div className="forest">
                            <div className="tree bluemountain" />
                            <div className="tree bluemountain1" />
                        </div>
                        <div className="ground" id="universe" />
                    </div>
                )
                break;
        }

        return (
            <div>
                {cssstyle}
            </div>
        );
    }
}

export default Background;
