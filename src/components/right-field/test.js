<div className="cotent" id={key}>
                        {
                            this.state.isVoteSubmited ? (
                                <div>
                                    <span
                                        className="status"
                                        id={
                                            this.state.optionSelected.indexOf(key) >= 0
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={e => {
                                            this.onClick_ToggleVoteSelected(e);
                                        }}
                                    >
                                        {this.props.votingDetail.voting.option[key]}
                                    </span>
                                    <span className="bar"></span>
                                    <span className="people">
                                        {this.props.votingDetail.result[key]}
                                    </span>
                                    <div className="people-detail">
                                        投票者：{this.props.votingDetail.voting.secretOrNot
                                            ? "匿名無法觀看投票者"
                                            : this.props.votingDetail.result[key]
                                              ? this.props.votingDetail.result[
                                                    key
                                                ].voter.reduce((allName, userName) => {
                                                    return allName + userName + "\n";
                                                }, "")
                                              : ""}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <span
                                        className="status"
                                        id={
                                            this.state.optionSelected.indexOf(key) >= 0
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={e => {
                                            this.onClick_ToggleVoteSelected(e);
                                        }}
                                    >
                                        {this.props.votingDetail.voting.option[key]}
                                    </span>
                                    <span className="bar"></span>
                                    <span className="people"></span>
                                </div>
                            )
                        }
                    </div>