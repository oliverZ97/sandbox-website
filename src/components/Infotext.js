import React, { Component } from "react";

class Infotext extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}

export default Infotext;