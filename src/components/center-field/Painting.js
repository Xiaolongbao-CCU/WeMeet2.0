"use strict";

import React from "react";
import socket from "../../socket";

class Painting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnlarge: false,
      isColorListOpen: false,
      isSizeListOpen: false,
      color: "black",
      size: 2,
      size_id: "size",
      imghref: "#"
    };
    this.onClick_ChangeSize = this.onClick_ChangeSize.bind(this);
    this.showColrList = this.showColrList.bind(this);
    this.showSizeList = this.showSizeList.bind(this);
    this.onClick_black = this.onClick_black.bind(this);
    this.onClick_green = this.onClick_green.bind(this);
    this.onClick_red = this.onClick_red.bind(this);
    this.onClick_blue = this.onClick_blue.bind(this);
    this.onClick_white = this.onClick_white.bind(this);
    this.onClick_yellow = this.onClick_yellow.bind(this);
    this.onClick_size1 = this.onClick_size1.bind(this);
    this.onClick_size2 = this.onClick_size2.bind(this);
    this.onClick_size3 = this.onClick_size3.bind(this);
    this.onClick_reset = this.onClick_reset.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {
        this.onResize();
        this.PaintSystem();
        socket.on("reset", () => {
            var canvas = this.refs.whiteboard;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    componentDidUpdate() {
        this.PaintSystem();
    }

    componentWillUnmount() {
        socket.off("drawing");
        socket.off("reset");
    }

    onResize() {
        var canvas = this.refs.whiteboard;
        var context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    PaintSystem() {
        var canvas = this.refs.whiteboard;
        var context = canvas.getContext("2d");
        var drawing = false;
        var current = {
            color: this.state.color,
            size: this.state.size
        };
        canvas.addEventListener("mousedown", onMouseDown, false);
        canvas.addEventListener("mouseup", onMouseUp, false);
        canvas.addEventListener("mouseout", onMouseUp, false);
        canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

        socket.on("drawing", onDrawingEvent);

        function drawLine(x0, y0, x1, y1, color, size, emit) {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = size;
            context.stroke();
            context.closePath();

            if (!emit) {
                return;
            }
            var w = canvas.width;
            var h = canvas.height;

            socket.emit("drawing", {
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: color,
                size: size
            });
        }

        function onMouseDown(e) {
            drawing = true;
            current.x = e.clientX;
            current.y = e.clientY;
        }

        function onMouseUp(e) {
            if (!drawing) {
                return;
            }
            drawing = false;
            drawLine(
                current.x,
                current.y,
                e.clientX,
                e.clientY,
                current.color,
                current.size,
                true
            );
        }

        function onMouseMove(e) {
            if (!drawing) {
                return;
            }
            drawLine(
                current.x,
                current.y,
                e.clientX,
                e.clientY,
                current.color,
                current.size,
                true
            );
            current.x = e.clientX;
            current.y = e.clientY;
        }

        function onColorUpdate(e) {
            current.color = e.target.id.Name;
        }

        // limit the number of events per second
        function throttle(callback, delay) {
            var previousCall = new Date().getTime();
            return function() {
                var time = new Date().getTime();

                if (time - previousCall >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        }

        function onDrawingEvent(data) {
            var w = canvas.width;
            var h = canvas.height;
            drawLine(
                data.x0 * w,
                data.y0 * h,
                data.x1 * w,
                data.y1 * h,
                data.color,
                data.size
            );
        }
    }

    onClick_reset() {
        var canvas = this.refs.whiteboard;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        socket.emit("reset", null);
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

    showColrList() {
        this.setState({
            isColorListOpen: !this.state.isColorListOpen
        });
    }

    showSizeList() {
        this.setState({
            isSizeListOpen: !this.state.isSizeListOpen
        });
    }

    onClick_ChangeSize() {
        this.setState({
            isEnlarge: !this.state.isEnlarge
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
            size: 5,
            size_id: "size2",
            isSizeListOpen: false
        });
    }

    onClick_size3() {
        this.setState({
            size: 10,
            size_id: "size3",
            isSizeListOpen: false
        });
    }

    render() {
        return (
            <div
                className="main-screen"
                id={this.state.isEnlarge ? "bigger" : ""}
            >
                {this.state.isEnlarge ? <div className="blackBG" /> : null}
                <div
                    className="paintingtoolbar"
                    id={this.state.isEnlarge ? "bigger" : ""}
                >
                    {this.state.isEnlarge ? (
                        <div
                            className="button2"
                            id="backtosmall1"
                            onClick={this.onClick_ChangeSize}
                        >
                            縮小
                        </div>
                    ) : (
                        <div
                            className="button2"
                            id="fullscreen1"
                            onClick={this.onClick_ChangeSize}
                        >
                            放大
                        </div>
                    )}
                    <div
                        className="button2 new"
                        id={this.state.size_id}
                        onClick={this.showSizeList}
                    >
                        粗細
                    </div>

                    <div
                        className="sizelist"
                        id={this.state.isSizeListOpen ? "visible" : ""}
                    >
                        <div
                            className="choice1"
                            id="size1"
                            onClick={this.onClick_size1}
                        >
                            細
                        </div>
                        <div
                            className="choice1"
                            id="size2"
                            onClick={this.onClick_size2}
                        >
                            中
                        </div>
                        <div
                            className="choice1"
                            id="size3"
                            onClick={this.onClick_size3}
                        >
                            粗
                        </div>
                    </div>

                    <div className="button2" id="color">
                        <div
                            className="color"
                            id={this.state.color}
                            onClick={this.showColrList}
                        />
                        顏色
                    </div>

                    <div
                        className="colorlist"
                        id={this.state.isColorListOpen ? "visible" : ""}
                    >
                        <div
                            className="choice"
                            id="black"
                            onClick={this.onClick_black}
                        />
                        <div
                            className="choice"
                            id="red"
                            onClick={this.onClick_red}
                        />
                        <div
                            className="choice"
                            id="white"
                            onClick={this.onClick_white}
                        />
                        <div
                            className="choice"
                            id="yellow"
                            onClick={this.onClick_yellow}
                        />
                        <div
                            className="choice"
                            id="green"
                            onClick={this.onClick_green}
                        />
                        <div
                            className="choice"
                            id="blue"
                            onClick={this.onClick_blue}
                        />
                    </div>
                    <div
                        className="button2"
                        id="reset1"
                        onClick={this.onClick_reset}
                    >
                        清空
                    </div>
                    <div className="button2" id="dowload-img">
                        下載
                    </div>
                </div>
                <div
                    className="paintingfield"
                    id={this.state.isEnlarge ? "bigger" : ""}
                    ref="paintingfield"
                >
                    <canvas className="whiteboard" ref="whiteboard" />
                </div>
            </div>
        );
    }
<<<<<<< HEAD
  }

  onClick_reset() {
    var canvas = this.refs.whiteboard;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("reset", null);
  }

  onClick_black() {
    this.setState({
      color: "black",
      isColorListOpen: false
    })
  }

  onClick_red() {
    this.setState({
      color: "red",
      isColorListOpen: false
    })
  }

  onClick_yellow() {
    this.setState({
      color: "yellow",
      isColorListOpen: false
    })
  }

  onClick_green() {
    this.setState({
      color: "green",
      isColorListOpen: false
    })
  }

  onClick_white() {
    this.setState({
      color: "white",
      isColorListOpen: false
    })
  }

  onClick_blue() {
    this.setState({
      color: "blue",
      isColorListOpen: false
    })
  }


  showColrList() {
    this.setState({
      isColorListOpen: !this.state.isColorListOpen
    })
  }

  showSizeList() {
    this.setState({
      isSizeListOpen: !this.state.isSizeListOpen
    })
  }

  onClick_ChangeSize() {
    this.setState({
      isEnlarge: !this.state.isEnlarge
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
      size: 5,
      size_id: "size2",
      isSizeListOpen: false
    });
  }

  onClick_size3() {
    this.setState({
      size: 10,
      size_id: "size3",
      isSizeListOpen: false
    });
  }


  render() {
    return (
      <div className="main-screen" id={this.state.isEnlarge ? "bigger" : ""}>

        {this.state.isEnlarge ? <div className="blackBG" /> : null}
        <div className="paintingtoolbar" id={this.state.isEnlarge ? "bigger" : ""}>
          {this.state.isEnlarge ?
            (<div className="button2" id="backtosmall1" onClick={this.onClick_ChangeSize}>縮小</div>) :
            (<div className="button2" id="fullscreen1" onClick={this.onClick_ChangeSize}>放大</div>)
          }
          <div className="button2 new" id={this.state.size_id} onClick={this.showSizeList}>粗細</div>

          <div className="sizelist" id={this.state.isSizeListOpen ? "visible" : ""}>
            <div className="choice1" id="size1" onClick={this.onClick_size1}>細</div>
            <div className="choice1" id="size2" onClick={this.onClick_size2}>中</div>
            <div className="choice1" id="size3" onClick={this.onClick_size3}>粗</div>
          </div>

          <div className="button2" id="color">
            <div className={this.state.isEnlarge ? "color bigger" : "color"} id={this.state.color} onClick={this.showColrList} />
            顏色
          </div>

          <div className="colorlist" id={this.state.isColorListOpen ? "visible" : ""}>
            <div className="choice" id="black" onClick={this.onClick_black} />
            <div className="choice" id="red" onClick={this.onClick_red} />
            <div className="choice" id="white" onClick={this.onClick_white} />
            <div className="choice" id="yellow" onClick={this.onClick_yellow} />
            <div className="choice" id="green" onClick={this.onClick_green} />
            <div className="choice" id="blue" onClick={this.onClick_blue} />
          </div>
          <div className="button2" id="reset1" onClick={this.onClick_reset}>清空</div>
          <a href={this.state.imghref} download="painting.png">
            <div className="button2" id="dowload-img" >下載</div>
          </a>
        </div>
        <div className="paintingfield" id={this.state.isEnlarge ? "bigger" : ""} ref="paintingfield">
          <canvas className="whiteboard" ref="whiteboard"></canvas>
        </div>
      </div>
    );
  }
=======
>>>>>>> master
}

export default Painting;
