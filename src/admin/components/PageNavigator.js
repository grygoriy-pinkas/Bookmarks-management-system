import React, { Component } from "react";
import smile from "../../static/smile.png";
class PageNavigator extends Component {
  constructor(props) {
    super(props);
    this.navigator = this.navigator.bind(this);
  }

  navigator(event) {
    const value = event.target.attributes.getNamedItem("position").value;
    window.scrollTo(0, value);
  }

  render() {
    return (
      <ul className="settingsBodyLeft_menu">
        <li className="settingsBodyLeft_menuItem" position={140} onClick={this.navigator}>
          <img src={smile} alt="smile" /> People
        </li>
        <li className="settingsBodyLeft_menuItem" position={465} onClick={this.navigator}>
          <img src={smile} alt="smile"/> Appearance
        </li>
        <p />
        <p>Advanced</p>
        <ul>
          <li className="settingsBodyLeft_menuItem" position={890} onClick={this.navigator}>
            <img src={smile} alt="smile"/> Printing
          </li>
          <li className="settingsBodyLeft_menuItem" position={1000} onClick={this.navigator}>
            <img src={smile} alt="smile"/> Reset
          </li>
        </ul>
      </ul>
    );
  }
}

export default PageNavigator;
