"use strict";

import React from "react";

class Black extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        <div class="black">

            <div class="text one">投票結束</div>
            <div class="text two">最後結果是</div>

            <div class="pyro">
                <div class="before" />
                <div class="after" />
            </div>
            <img class="animal" src="./img/voteimage.png" />
            <div class="wintext">
                超級成功<br></br>獲勝！
            </div>
            <div class="triagle" />

        </div>;
    }
}


export default Black
