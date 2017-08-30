"use strict";

import React from "react";

class Background extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        return (
            <div>
                <div class="sky">
                    <img class="cloud site1" src="./img/main-cloud.png" />
                    <img class="cloud site2" src="./img/main-cloud1.png" />
                    <img class="cloud site3" src="./img/main-cloud.png" />
                    <img class="cloud site4" src="./img/main-cloud.png" />
                    <img class="cloud site5" src="./img/main-cloud1.png" />
                    <img class="cloud site6" src="./img/main-cloud.png" />
                    <img class="cloud site7" src="./img/main-cloud1.png" />
                </div>

                <div class="forest">
                    <div class="tree type1 site1" />
                    <div class="tree type2 site2" />
                    <div class="tree type3 site3" />
                    <div class="tree type2 site4" />
                    <div class="tree type1 site5" />
                    <div class="tree type3 site6" />
                </div>

                <div class="ground" />

            </div>
        );
    }
}

export default Background;
