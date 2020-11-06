import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="input-label">
      <label htmlFor={this.props.label}>{this.props.name}</label>
      <input className="input" name={this.props.label} type={this.props.type} placeholder={this.props.placeholder} min="0" onInput={this.updateStats}></input>
  </div>
    );
  }
}

export default Input;