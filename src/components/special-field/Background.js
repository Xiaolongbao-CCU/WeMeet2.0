"use strict";

import React from "react";

class Background extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div>
                <div className="sky">
                    <img className="cloud site1" src="./img/main-cloud.png" />
                    <img className="cloud site2" src="./img/main-cloud1.png" />
                    <img className="cloud site3" src="./img/main-cloud.png" />
                    <img className="cloud site4" src="./img/main-cloud.png" />
                    <img className="cloud site5" src="./img/main-cloud1.png" />
                    <img className="cloud site6" src="./img/main-cloud.png" />
                    <img className="cloud site7" src="./img/main-cloud1.png" />
                    <img className="cloud site8" src="./img/main-cloud.png" />
                    <img className="cloud site9" src="./img/main-cloud1.png" />
                    <img className="cloud site10" src="./img/main-cloud.png" />

                </div>

                <div className="forest">
                    <div className="tree type1 site1" />
                    <div className="tree type2 site2" />
                    <div className="tree type3 site3" />
                    <div className="tree type2 site4" />
                    <div className="tree type1 site5" />
                    <div className="tree type3 site6" />
                    <div className='tree type2 site7' />
                    <div className='tree type1 site8' />
                    <div className='tree type3 site9' />
                    <div className='tree type2 site10' />
                </div>

                <div className="ground" />

            </div>
        );
    }
}

export default Background;
