"use strict";

import React from "react";

class GridGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnlarge: false,
            grid:[
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]],
                [["1","2","3"],["4","5","6"],["7","8","9"]]
            ]
        };
        this.onClick_ChangeSize = this.onClick_ChangeSize.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

    onChangeInput(e){
        let key = e.target.getAttribute("data")
        let a = parseInt(key.substring(5,6))
        let b = parseInt(key.substring(7,8))
        let c = parseInt(key.substring(9,10))

        this.setState({
            grid:[
                ...this.state.grid.slice(0,a),
                [
                    ...this.state.grid[a].slice(0,b),
                    [
                        ...this.state.grid[a][b].slice(0,c),
                        e.target.value,
                        ...this.state.grid[a][b].slice(c+1)
                    ],
                    ...this.state.grid[a].slice(b+1)
                ],
                ...this.state.grid.slice(a+1)
            ]
        })
    }

    onClick_ChangeSize() {
        this.setState({
            isEnlarge: !this.state.isEnlarge
        });
    }

    render() {
        let grid = [];
        let order = [
            "first",
            "second",
            "third",
            "forth",
            "fifth",
            "sixth",
            "seventh",
            "eighth",
            "ninth"
        ];

        order.map((number,index) => {
            let name = "divTable" + " " + number;
            let innerGrid = [];
            for (let i = 0; i < 3; i++) {
                let outerKey = "grid"+":"+index+":"+i
                let input = [];
                for (let j = 0; j<3; j ++){
                    let innerKey = outerKey + ":" + j
                    input.push(
                        <div className="divTableCell">
                            <textarea 
                                className="TableInput" 
                                value={this.state.grid[index][i][j]}
                                ref={innerKey}
                                data={innerKey}
                                onChange={(e)=>{
                                    this.onChangeInput(e)
                                }}
                            />
                        </div>
                    )
                }
                innerGrid.push(
                    <div className="divTableRow" data={outerKey}>
                        {input}
                    </div>
                );
            }
            grid.push(<div className={name}>{innerGrid}</div>);
        });

        return (
            <div
                className="main-screen"
                id={this.state.isEnlarge ? "bigger" : ""}
            >
                {this.state.isEnlarge ? (
                    <div
                        className="backtosmall"
                        onClick={this.onClick_ChangeSize}
                    />
                ) : (
                    <div
                        className="button1"
                        id="fullscreen"
                        onClick={this.onClick_ChangeSize}
                    >
                        放大
                    </div>
                )}

                {this.state.isEnlarge ? (
                    <div className="blackBG" />
                ) : (
                    <div className="button1" id="reset">
                        清空
                    </div>
                )}
                {grid}
            </div>
        );
    }
}

export default GridGame;
