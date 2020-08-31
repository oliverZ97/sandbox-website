import React, { Component } from "react";
import "../assets/scss/components/Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.setActiveComponent = this.setActiveComponent.bind(this);
  }

  setActiveComponent(comp) {
    this.props.setActive(comp)
  }

  render() {

    const items = this.props.pages.map((element) => {
      return <li onClick={() => {this.setActiveComponent(element.id)}} key={element.id} ><div className="title-container"><i className={'fas icon icon-small icon-mr ' + element.icon} ></i><p>{element.name}</p></div></li>
    });

    return (
      <nav className="navbar">
        <div className="opacity-container"></div>
        <ul className="navbar-content">
            {items}
        </ul>
      </nav>
    );
  }
}

export default Navbar; 