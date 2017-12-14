import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { setUserName } from "../actions/Actions"
import Background from "./special-field/Background"
import "../scss/index.scss"

import Top from "../img/logo_top.png"
import Text from "../img/logo_text.png"
import Bottom from "../img/logo_bottom.png"
import Arrow from "../img/arrow.png"
import UserImage from "./img/user-image.png"

// socket.emit("id");
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: "",
			roomName: ""
		}
		this.onClick_handleCreateRoom = this.onClick_handleCreateRoom.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
	}

	componentWillMount() {
		document.addEventListener("keydown", this.onKeyDown)
		this.props.dispatch({ type: "CLEAR" })
		window.localStorage.clear()
		console.log(window.localStorage)
	}

	componentDidMount() {}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.onKeyDown)
	}

	onKeyDown(e) {
		// console.log(document.activeElement);
		switch (e.keyCode) {
			case 13:
				if (!this.refs.roomName.value) {
					this.refs.roomName.focus()
					return
				}
				if (!this.refs.userName.value) {
					this.refs.userName.focus()
					return
				}
				if (this.state.userName && this.state.roomName) {
					if (
						document.activeElement == this.refs.roomName ||
						document.activeElement == this.refs.userName
					) {
						document.activeElement.blur()
						return
					}
					if (document.activeElement == document.body) {
						// document.removeEventListener("keydown", this.onKeyDown);
						this.onClick_handleCreateRoom()
					}
				}
				break
			default:
				break
		}
	}

	onChange_userName(e) {
		this.setState({ userName: e.target.value })
	}
	onChange_roomName(e) {
		this.setState({ roomName: e.target.value })
	}
	onClick_handleCreateRoom() {
		document.removeEventListener("keydown", this.onKeyDown)
		// 按下建立房間後的事件
		this.props.dispatch(setUserName(this.state.userName))
		window.sessionStorage.setItem("userName", this.state.userName)
		// 做好名字之後>進到房間裡
		this.props.history.push(`/meeting#${this.state.roomName}`)
	}

	render() {
		return (
			<div className="container">
				<div className="index">
					<img className="logo-top" alt="" src={Top} />
					<img className="logo-text" alt="" src={Text} />
					<img className="logo-bottom" alt="" src={Bottom} />
					<div className="indexName">
						<div className="icon-field">
							<img
								className="icon-image"
								alt=""
								src={UserImage}
							/>
						</div>
						<input
							autoFocus
							ref="userName"
							className="indexinput"
							type="text"
							placeholder="請輸入你的名字"
							onChange={e => {
								this.onChange_userName(e)
							}}
						/>
					</div>
					<br />
					<div className="indexMeeting">
						<div className="icon-field">
							<img
								className="icon-image"
								alt=""
								src="./img/meeting.png"
							/>
						</div>
						<input
							ref="roomName"
							className="indexinput"
							type="text"
							placeholder="請輸入房間名稱"
							onChange={e => {
								this.onChange_roomName(e)
							}}
						/>
					</div>
					<div
						className="addRoom"
						onClick={() => {
							this.onClick_handleCreateRoom()
						}}
					>
						<img className="icon-image" alt="" src={Arrow} />
					</div>
				</div>
				<Background />
			</div>
		)
	}
}

export default withRouter(connect()(Index))
