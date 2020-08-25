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
        <DiceTool />
      </main>
    );
  }
}

export default Main;