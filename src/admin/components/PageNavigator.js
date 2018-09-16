import React, { Component } from "react";
import smile from "../../static/smile.png";
class PageNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0
    };
    this.navigator = this.navigator.bind(this);
  }

  navigator(event) {
    const value = event.target.attributes.getNamedItem("position").value;
    window.scrollTo(0, value);
  }

  render() {
    return (
      <ul className="settingsBodyLeft_menu">
        <li position={140} onClick={this.navigator}>
          <img src={smile} alt="smile" /> People
        </li>
        <li position={425} onClick={this.navigator}>
          <img src={smile} alt="smile"/> Appearence
        </li>
        <p />
        <p>Advanced</p>
        <ul>
          <li position={890} onClick={this.navigator}>
            <img src={smile} alt="smile"/> Printing
          </li>
          <li position={1000} onClick={this.navigator}>
            <img src={smile} alt="smile"/> Reset
          </li>
        </ul>
      </ul>
    );
  }
}

export default PageNavigator;
