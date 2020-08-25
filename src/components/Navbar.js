import React, { Component } from "react";
import "../assets/scss/components/Navbar.scss";



class Navbar extends Component {

  render() {

    const items = this.props.pages.map(function(element){
      return <li key={element.id} ><div className="title-container"><i className={'fas icon icon-small icon-mr ' + element.icon} ></i><p>{element.name}</p></div></li>
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