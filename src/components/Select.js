import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const data = this.props.content.map((obj, index) => {
        return <option key={index}>{obj}</option>
    });

    return (
        <div className="input-label">
        <label htmlFor={this.props.label}>{this.props.name}</label>
        <select id={this.props.id} className="input" name={this.props.label} onChange={this.props.chnage}>
            {data}
        </select>
    </div>
    );
  }
}

export default Select;