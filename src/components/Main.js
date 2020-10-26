import React, { Component } from "react";
import "../assets/scss/components/Main.scss";
import DiceTool from "../pages/DiceTool";
import Home from "../pages/Home";
import CharacterCreator from "../pages/CharacterCreator";
import GIFBoard from "../pages/GIFBoard";

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
        {(this.props.active === 0) ? <Home /> : null}
        {(this.props.active === 1) ? <DiceTool /> : null}
        {(this.props.active === 2) ? <CharacterCreator /> : null}
        {(this.props.active === 3) ? <GIFBoard /> : null}
      </main>
    );
  }
}

export default Main;