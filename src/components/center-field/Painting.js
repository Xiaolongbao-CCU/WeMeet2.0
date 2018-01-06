import React from "react";
import socket from "../../socket";
import Size from '../../img/size.ico';
import Reset from '../../img/reset.png';

class Painting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isColorListOpen: false,
            isSizeListOpen: false,
            color: "black",
            size: 2,
            size_id: "size",
            imghref: "#"
        };
        this.isDrawing = false;
        this.prevX = 0;
        this.currX = 0;
        this.prevY = 0;
        this.currY = 0;
        this.ctx;
        this.w;
        this.h;

    }

    componentWillMount() { }

    componentDidMount() {
        console.log(Size);
        console.log(Reset);
        let canvas = this.refs.whiteboard;
        this.ctx = canvas.getContext("2d");
        this.w = canvas.width;
        this.h = canvas.height;
        this.onResize();
        socket.on("reset", () => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        socket.on("drawing", data => {
            onDrawingEvent(data)
        });
        window.addEventListener('resize', this.onResize, false);
        this.findxy = this.findxy.bind(this)
    }

    componentWillUnmount() {
        socket.off("drawing");
        socket.off("reset");
    }

    onResize() {
        let parent = this.refs.paintingfield;
        this.refs.whiteboard.width = parent.getBoundingClientRect().width;
        this.refs.whiteboard.height = parent.getBoundingClientRect().height;
    }

    drawLine(x0, y0, x1, y1, color, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // limit the number of events per second
    throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    findxy(e,res) {
        if (res == 'down') {
            let rect = this.refs.whiteboard.getBoundingClientRect()
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - rect.left
            this.currY = e.clientY - rect.top
            this.isDrawing = true;
        }
        if (res == 'up' || res == "out") {
            this.isDrawing = false;
        }
        if (res == 'move') {
            if (this.isDrawing) {
                let rect = this.refs.whiteboard.getBoundingClientRect()
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - rect.left
                this.currY = e.clientY - rect.top
                this.drawLine(this.prevX,this.prevY,this.currX,this.currY,this.state.color,this.state.size);
                socket.emit("drawing", {
                    x0: this.prevX / this.w,
                    y0: this.prevY / this.h,
                    x1: this.currX / this.w,
                    y1: this.currY / this.h,
                    color: this.state.color,
                    size: this.state.size
                });
            }
        }
    }

    onDrawingEvent(data) {
        this.drawLine(
            data.x0 * this.w,
            data.y0 * this.h,
            data.x1 * this.w,
            data.y1 * this.h,
            data.color,
            data.size
        );
    }

    onClick_reset() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        socket.emit("reset");
    }

    onClick_black() {
        this.setState({
            color: "black",
            isColorListOpen: false
        });
    }

    onClick_red() {
        this.setState({
            color: "red",
            isColorListOpen: false
        });
    }

    onClick_yellow() {
        this.setState({
            color: "yellow",
            isColorListOpen: false
        });
    }

    onClick_green() {
        this.setState({
            color: "green",
            isColorListOpen: false
        });
    }

    onClick_white() {
        this.setState({
            color: "white",
            isColorListOpen: false
        });
    }

    onClick_blue() {
        this.setState({
            color: "blue",
            isColorListOpen: false
        });
    }

    showColorList() {
        this.setState({
            isColorListOpen: !this.state.isColorListOpen
        });
    }

    showSizeList() {
        this.setState({
            isSizeListOpen: !this.state.isSizeListOpen
        });
    }

    onClick_size1() {
        this.setState({
            size: 2,
            size_id: "size1",
            isSizeListOpen: false
        });
    }

    onClick_size2() {
        this.setState({
            size: 4,
            size_id: "size2",
            isSizeListOpen: false
        });
    }

    onClick_size3() {
        this.setState({
            size: 6,
            size_id: "size3",
            isSizeListOpen: false
        });
    }

    render() {
        return (
            <div
                className="main-screen"
            >
                <div
                    className="gametoolbar"
                >
                    <div
                        className="button2"
                        id={this.state.size_id}
                        onClick={()=>this.showSizeList()}
                    >
                        <img src={Size}/>
                        <span>粗細</span>
                    </div>

                    <div
                        className="sizelist"
                        id={this.state.isSizeListOpen ? "visible" : ""}
                    >
                        <div
                            className="choice1"
                            id="size1"
                            onClick={()=>this.onClick_size1()}
                        >
                            細
                        </div>
                        <div
                            className="choice1"
                            id="size2"
                            onClick={()=>this.onClick_size2()}
                        >
                            中
                        </div>
                        <div
                            className="choice1"
                            id="size3"
                            onClick={()=>this.onClick_size3()}
                        >
                            粗
                        </div>
                    </div>

                    <div className="button2" id="color">
                        <div
                            className="color"
                            id={this.state.color}
                            onClick={()=>this.showColorList()}
                        />
                        <span>顏色</span>
                    </div>

                    <div
                        className="colorlist"
                        id={this.state.isColorListOpen ? "visible" : ""}
                    >
                        <div
                            className="choice"
                            id="black"
                            onClick={()=>this.onClick_black()}
                        />
                        <div
                            className="choice"
                            id="red"
                            onClick={()=>this.onClick_red()}
                        />
                        <div
                            className="choice"
                            id="white"
                            onClick={()=>this.onClick_white()}
                        />
                        <div
                            className="choice"
                            id="yellow"
                            onClick={()=>this.onClick_yellow()}
                        />
                        <div
                            className="choice"
                            id="green"
                            onClick={()=>this.onClick_green()}
                        />
                        <div
                            className="choice"
                            id="blue"
                            onClick={()=>this.onClick_blue()}
                        />
                    </div>
                    <div
                        className="button2"
                        id="reset1"
                        onClick={()=>this.onClick_reset()}
                    >
                        <img src={Reset}/>
                        <span>清空</span>
                    </div>
                </div>
                <div
                    className="paintingfield"
                    ref="paintingfield"
                >
                    <canvas 
                        className="whiteboard" 
                        ref="whiteboard" 
                        onMouseDown={(e)=>this.findxy(e,'down')}
                        onMouseMove={(e)=>this.findxy(e,'move')}
                        onMouseUp={(e)=>this.findxy(e,'up')}
                        onMouseOut={(e)=>this.findxy(e,'up')}
                    />
                </div>
            </div>
        );
    }
}

export default Painting;
