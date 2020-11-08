import React, { Component } from "react";
import titleimg from "../assets/img/Barbar.jpg";

class StartCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>MIDGARD 5 - Character Creator</h3>
                    <img src={titleimg} className="titleimg"></img>
                </div>
            </div>
        );
    }
}

export default StartCard;