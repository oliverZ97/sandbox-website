import React, { Component } from "react";

class Numberinput extends Component {
  constructor(props) {
    super(props);

    this.returnValue = this.returnValue.bind(this);
  }

  returnValue() {
    let value = document.getElementById("input_" + this.props.label.toLowerCase()).value;
    this.props.function(this.props.label.toLowerCase(), parseInt(value));
  }

  render() {
    return (
      <div className="input-label">
        <label htmlFor={this.props.label}>{this.props.name}</label>
        <input id={"input_" + this.props.label.toLowerCase()}
          className={"input " + this.props.classlist}
          name={this.props.label}
          type={this.props.type}
          placeholder={this.props.placeholder}
          min="1"
          onInput={this.returnValue}></input>
      </div>
    );
  }
}

export default Numberinput;