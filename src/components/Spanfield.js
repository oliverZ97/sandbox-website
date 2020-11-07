import React, { Component } from "react";

class Spanfield extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-label">
                <label htmlFor={this.props.label}>{this.props.name}</label>
                <div className="d-flex flex-column justify-content-center span-container">
                    <span className={"span-sm text-dark " + this.props.classlist} data-name={this.props.label}>{this.props.value}</span>
                </div>
            </div>
        );
    }
}

export default Spanfield;