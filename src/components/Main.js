import React, { Component } from "react";
import "../assets/scss/components/Main.scss";
import DiceTool from "../pages/DiceTool";

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeComponent: ""
    }
  }

  render() {
    return (
      <main className="main">
        {(this.props.active === 1) ? <DiceTool /> : null}
      </main>
    );
  }
}

export default Main;